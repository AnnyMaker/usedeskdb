import requestPromise, {Options} from "request-promise";
import {injectable} from "inversify";


function sendWithFullResponse(options: Options): Promise<HttpResponse> {
    options.resolveWithFullResponse = true;
    return requestPromise(options).then(createHttpResponse)
}

export interface HttpResponse<T = any> {
    readonly status: number;
    readonly headers: any;
    readonly data: T;
    readonly multipart?: Buffer[];
}

export interface RetryConfig {
    maxRetries: number;
    statusCodes?: number[];
    ioErrorCodes?: string[];
    backOffFactor?: number;
    maxDelayInMillis: number;
}

export function defaultRetryConfig(): RetryConfig {
    return {
        maxRetries: 4,
        statusCodes: [503],
        ioErrorCodes: ["ECONNRESET", "ETIMEDOUT"],
        backOffFactor: 0.5,
        maxDelayInMillis: 60 * 1000
    };
}

function validateRetryConfig(retry: RetryConfig) {
    if (retry.maxRetries < 0) {
        throw new Error("maxRetries must be a non-negative integer");
    }

    if (typeof retry.backOffFactor !== "undefined") {
        if (retry.backOffFactor < 0) {
            throw new Error("backOffFactor must be a non-negative number");
        }
    }

    if (retry.maxDelayInMillis < 0) {
        throw new Error("maxDelayInMillis must be a non-negative integer");
    }

    if (!Array.isArray(retry.ioErrorCodes)) {
        throw new Error("ioErrorCodes must be an array");
    }
}

interface LowLevelResponse {
    statusCode: number;
    headers: any;
    body: string;
    request: any;
}


class DefaultHttpResponse implements HttpResponse {
    public readonly status: number;
    public readonly headers: any;
    private readonly request: string;
    private readonly parsedData: any;

    constructor(resp: LowLevelResponse) {
        this.status = resp.statusCode;
        this.headers = resp.headers;
        this.parsedData = resp.body;
        this.request = resp.request;
    }

    get data(): any {
        return this.parsedData;
    }
}

const createHttpResponse = (res: LowLevelResponse): HttpResponse => {
    return new DefaultHttpResponse(res);
}

@injectable()
export class HttpClient {
    constructor(private readonly retry: RetryConfig = defaultRetryConfig()) {
        if (this.retry) {
            validateRetryConfig(this.retry);
        }
    }

    public async send(config: Options): Promise<HttpResponse> {
        return sendWithFullResponse(config)
            .catch(err => {
                if (err.response) {
                    throw new Error(JSON.stringify(createHttpResponse(err.response)))
                }
                if (err.error.code === "ETIMEDOUT") {
                    throw new Error(`Error while making request: ${err.message}.`);
                }
                throw new Error(`Error while making request: ${err.message}. Error code: ${err.error.code}`);
            })
    }

    public async sendWithRetry(config: Options, retryAttempts: number = 0): Promise<HttpResponse> {
        return sendWithFullResponse(config)
            .catch(err => {
                const [delayMillis, canRetry] = this.getRetryDelayMillis(retryAttempts, err);
                if (canRetry && delayMillis <= this.retry.maxDelayInMillis) {
                    return this.waitForRetry(delayMillis).then(() => {
                        return this.sendWithRetry(config, retryAttempts + 1);
                    });
                }
                if (err.response) {
                    throw new Error(JSON.stringify(createHttpResponse(err.response)));
                }
                if (err.error.code === "ETIMEDOUT") {
                    throw new Error(`Error while making request: ${err.message}.`);
                }
                throw new Error(`Error while making request: ${err.message}. Error code: ${err.error.code}`);
            });
    }

    private async waitForRetry(delayMillis: number): Promise<any> {
        if (delayMillis > 0) {
            return new Promise(resolve => {
                setTimeout(resolve, delayMillis);
            });
        }
        return Promise.resolve();
    }

    private parseRetryAfterIntoMillis(retryAfter: string): number {
        const delaySeconds: number = parseInt(retryAfter, 10);
        if (!isNaN(delaySeconds)) {
            return delaySeconds * 1000;
        }

        const date = new Date(retryAfter);
        if (!isNaN(date.getTime())) {
            return date.getTime() - Date.now();
        }
        return -1;
    }

    private backOffDelayMillis(retryAttempts: number): number {
        if (retryAttempts === 0) {
            return 0;
        }

        const backOffFactor = this.retry.backOffFactor || 0;
        const delayInSeconds = 2 ** retryAttempts * backOffFactor;
        return Math.min(delayInSeconds * 1000, this.retry.maxDelayInMillis);
    }

    private getRetryDelayMillis(retryAttempts: number, err: any): [number, boolean] {
        if (!this.isRetryEligible(retryAttempts, err)) {
            return [0, false];
        }
        let response = err.response;
        let headers = response ? response.headers : undefined;
        if (headers && headers["retry-after"]) {
            const delayMillis = this.parseRetryAfterIntoMillis(headers["retry-after"]);
            if (delayMillis > 0) {
                return [delayMillis, true];
            }
        }

        return [this.backOffDelayMillis(retryAttempts), true];
    }

    private isRetryEligible(retryAttempts: number, err: any): boolean {
        if (!this.retry) {
            return false;
        }

        if (retryAttempts >= this.retry.maxRetries) {
            return false;
        }
        if (err.response) {
            const statusCodes = this.retry.statusCodes || [];
            return statusCodes.indexOf(err.response.status) !== -1;
        }

        const retryCodes = this.retry.ioErrorCodes || [];
        return retryCodes.indexOf(err.error.code) !== -1;
    }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
