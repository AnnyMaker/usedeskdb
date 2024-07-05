import {Response, Request, NextFunction} from "express";

const notificationRouter = require('express').Router();
const {tokenAdd, deleteToken, sendNotification} = require('../controllers/notification');
import {validate, notificationValidators} from "../validators";


notificationRouter.post(
    '/token',
    validate(notificationValidators.addTokenValidators),
    tokenAdd
);

notificationRouter.delete(
    '/token',
    validate(notificationValidators.deleteTokenValidators),
    deleteToken
);

notificationRouter.post(
    '/send',
    validate(notificationValidators.sendNotification),
    (req: Request, res: Response, next: NextFunction) => {
        sendNotification(req, res).catch((e: Error) => {
            console.log(e);
            next(e);
        })
    });


export default notificationRouter;
