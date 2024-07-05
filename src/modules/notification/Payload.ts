export default class Payload<T = any> {
    constructor(private payload: T) {}

    getPayload(): T {
        return  this.payload;
    }
}