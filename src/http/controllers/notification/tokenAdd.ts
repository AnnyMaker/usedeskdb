import {Request, Response, NextFunction} from "express";
import {Recipient, Lang, Token, RecipientType, TokenType} from '../../../entity'
import {getConnection} from "../../../connection";
import HttpError from "../../../modules/error/HttpError";

const tokenAdd = async (req: Request, res: Response, next: NextFunction) => {
    const {recipient_id, token, recipient_type, locale, token_type} = req.body;
    const connection = await getConnection();
    const recipientTypeRepository = connection.getRepository<RecipientType>(RecipientType);
    const recipientType = await recipientTypeRepository.findOne({type: recipient_type});
    const langRepository = connection.getRepository<Lang>(Lang);
    const tokenRepository = connection.getRepository<Token>(Token);
    const tokenTypeRepository = connection.getRepository<TokenType>(TokenType);
    const lang = await langRepository.findOne({code: locale});
    if(!lang){
        return next(new HttpError(404, `not found locale: ${locale}`));
    }


    if (await tokenRepository.findOne({token: token})) {
        return next(new HttpError(400, `token exist: ${token}`));
    }

    if (!recipientType) {
        return next(new HttpError(404, `Not found recipient_type: ${recipient_type}`));
    }

    const recipientRepository = connection.getRepository<Recipient>(Recipient);
    let recipient = await recipientRepository.findOne({
        relations: ['recipient_type'],
        where: {
            recipient_type: {
                id: recipientType.id
            },
            external_id: recipient_id
        }
    });


    if(!recipient) {
        recipient = new Recipient();
        recipient.recipient_type = recipientType;
        recipient.external_id = recipient_id;
        await recipientRepository.save(recipient);
    }


    let tokenType = undefined;

    if(token_type) {
        tokenType = await tokenTypeRepository.findOne({type: token_type})
        if(!tokenType) {
            throw new HttpError(404, `Not found token type: "${tokenType}`)
        }
    }

    if(!tokenType) {
        tokenType = await tokenTypeRepository.findOne({type: 'FCM'})
    }



    const newToken = new Token();
    newToken.token = token;
    newToken.recipient = recipient;
    newToken.lang = lang;
    newToken.token_type = tokenType as TokenType;
    await tokenRepository.save(newToken);


    return res.send({
        code: 200,
        result: {
            token_id: newToken.id
        }
    });
};

export default tokenAdd;
