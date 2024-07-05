import ExpressErrorHandler from "./ExpressErrorHandler";
import {ErrorRequestHandler} from "express";
import {Request, Response, NextFunction} from "express/ts4.0";
import HttpError from "./HttpError";
import {injectable} from "inversify";
import {logger} from "../logger";

@injectable()
export default class RestExpressErrorHandler  extends ExpressErrorHandler{
    getHandler(): ErrorRequestHandler {
        return (err: any, req: Request, res: Response, next: NextFunction) => {
            const httpError: HttpError = this.getHttpError(err);
            logger.error(`code: ${httpError.getCode()}, message: ${httpError.message}`)
            return res.send({
                code: httpError.getCode(),
                message: httpError.message,
                errors: httpError.getErrors()
            });
        }
    }
}