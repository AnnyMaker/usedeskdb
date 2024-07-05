import {Request, Response} from "express";
import ChatAction from "../../../modules/usedesk/webhooks/ChatAction";
import {getRecipientByExternalId} from "../../../modules/services/recipient";
import HttpError from "../../../modules/error/HttpError";
import PushService from "../../../modules/services/PushService";
import {DictionaryCodes} from "../../../utility/DictionaryCodes";

const sendNotification = async (req: Request<{}, {}, ChatAction>, res: Response) => {
    const chatAction = req.body;

    const recipient = await getRecipientByExternalId(chatAction.ticket.additional_id);


    if (!recipient) {
        throw new HttpError(404, 'Not found recipient')
    }

    if (recipient.tokens.length <= 0) {
        throw new HttpError(404, 'no tokens found at the recipient')
    }

    const pushService = (new PushService(DictionaryCodes.NEW_MESSAGE_SUPPORT));
    const response = await pushService.send(recipient, chatAction.text);

    if (!response) {
        throw new HttpError(404, 'Not found tokens from recipient')
    }
    return res.send({
        code: 200,
        result: response.map(x => {
            return {
                token: x.getToken(),
                success: x.isSuccess(),
                message: x.message
            }
        })
    });
}

export default sendNotification;
