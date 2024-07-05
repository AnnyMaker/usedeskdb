import {ValidationError} from "express-validator";


export default class HttpError extends Error {
    private readonly errors;
    constructor(private code: number, message: string, errors: ValidationError[] = []) {
        super(message);
        this.errors = errors;
    }

    public getCode(): number {
        return this.code;
    }

    public getErrors() {
        return this.errors;
    }
}