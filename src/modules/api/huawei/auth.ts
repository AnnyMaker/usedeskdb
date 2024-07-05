import {OptionsWithUri} from "request-promise";
import {HttpClient, HttpMethod} from "./utils/apiRequest";
import {HcmConfig} from "./hcmNamespace";
import {injectable} from "inversify";

@injectable()
export class AuthClient {
    private readonly httpClient: HttpClient;
    private token: string;

    constructor(
        private config: HcmConfig,
        private httpMethod: HttpMethod = 'POST',
        private endpoint: string = 'https://oauth-login.cloud.huawei.com/oauth2/v3/token') {
        this.httpClient = new HttpClient();
    }

    public getToken(): string {
        return this.token;
    }

    getAppId = () => this.config.appId;

    refreshToken = () => {
        let option = {} as OptionsWithUri;
        option.uri = this.config.authUrl ? this.config.authUrl : this.endpoint;
        option.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        option.form = {
            grant_type: "client_credentials",
            client_secret: this.config.appSecret,
            client_id: this.config.appId
        };
        option.method = this.httpMethod;
        option.json = true;
        return this.httpClient.sendWithRetry(option).then(res => {
            this.token = res.data.access_token;
            return this.token;
        });
    }
}