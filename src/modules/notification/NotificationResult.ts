export default class NotificationResult<TokenType = string> {
    private error: Error;
    private isSent = true;
    private _message = '';

    constructor(private token: TokenType) {}

    setError(error: Error) {
        this.error = error;
        this.isSent = false;
    }

    get message() {
        return this.hasError() ? this.error.message : this._message;
    }

    set message(message: string) {
        this._message = message
    }

    hasError = (): boolean  => {
        return !!this.error;
    }


    getToken(): TokenType {
        return this.token;
    }

    isSuccess(): boolean {
        return this.isSent;
    }

}