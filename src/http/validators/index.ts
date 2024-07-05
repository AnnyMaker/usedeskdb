import {ValidationChain, validationResult} from "express-validator";
import HttpError from "../../modules/error/HttpError";
import notificationValidators from "./notification";
import {NextFunction, Request, Response} from "express/ts4.0";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            next(new HttpError(400, 'invalid request', errors.array()));
        }
        next();
    }
}

export {
    validate,
    notificationValidators
};