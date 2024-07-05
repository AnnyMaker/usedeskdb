import {Message, MsgRequest, MsgResponse} from "../message/message";
import {OptionsWithUri} from "request-promise";
import {AuthClient} from "../auth";
import {HttpClient} from "../utils/apiRequest";
import {injectable, inject} from "inversify";

const TOKENTIMEOUTERR = "80200003";
const BASE_URL = 'https://push-api.cloud.huawei.com/v1';

@injectable()
class HuaweiPush {
    constructor(
        @inject(AuthClient) private authClient: AuthClient,
        @inject(HttpClient) private httpClient: HttpClient) {
    }

    public async send(message: Message, validationOnly: boolean = false, dryRun: boolean = true) {
        let request: MsgRequest = {
            validate_only: validationOnly,
            message
        };

        if (!this.authClient) {
            throw new Error("can't refresh token because getting auth client fail");
        }
        if (!this.authClient.getToken()) {
            await this.authClient.refreshToken();
        }
        let result = await this.sendRequest(request, dryRun);
        if (result.code === TOKENTIMEOUTERR) {
            await this.authClient.refreshToken();
            result = await this.sendRequest(request, dryRun);
        }
        return result;
    }

    private sendRequest(req: MsgRequest, dryRun?: boolean): Promise<MsgResponse> {
        const options = {
            uri: `${BASE_URL}/${this.authClient.getAppId()}/messages:send`,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${this.authClient.getToken()}`
            },
            body: req,
            json: true
        } as OptionsWithUri

        return dryRun
            ? this.httpClient.sendWithRetry(options).then(res => res.data)
            : this.httpClient.send(options).then(res => res.data);
    }
}

export {
    HuaweiPush
}