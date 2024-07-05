export default class NotificationToken<T = any> {

    constructor(private token: T) {}

    getToken(): T {
        return this.token;
    }
}