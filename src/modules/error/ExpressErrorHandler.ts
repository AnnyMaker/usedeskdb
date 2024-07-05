import {ErrorRequestHandler} from "express";
import HttpError from "./HttpError";
import {injectable} from "inversify";

@injectable()
export default abstract class ExpressErrorHandler {

    abstract getHandler(): ErrorRequestHandler


    protected getHttpError(err: any): HttpError {
        switch (err.constructor) {
            case HttpError:
                return err;
            case Error:
                return new HttpError(500, err.message)
            default:
                return new HttpError(500, err);
        }
    }
}