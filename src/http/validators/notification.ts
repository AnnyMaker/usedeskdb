import {body, ValidationChain} from "express-validator";
import HttpError from "../../modules/error/HttpError";

const token = body('token').isString();
const recipient = body('recipient_id').isString();
const recipientType = body('recipient_type').isString();
const locale = body('locale').isString().isLength({min: 2, max: 2});
const tokenType = body('token_type').isString().optional()


const isFromUser = body('from').custom((value: string) => {
    if(value === 'user') {
        return true;
    }
    throw new HttpError(400, 'the request to send was ignored because it was not created by the user');
});

const notEmptyAdditionalId = body('ticket.additional_id').notEmpty();

const addTokenValidators: ValidationChain[] = [token, recipient, recipientType, locale, tokenType];
const deleteTokenValidators: ValidationChain[] = [token];
const sendNotification: ValidationChain[] = [isFromUser, notEmptyAdditionalId];


const notificationValidators = {
    addTokenValidators,
    deleteTokenValidators,
    sendNotification
}

export default notificationValidators;