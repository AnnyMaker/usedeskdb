import {getConnection} from "../../../connection";
import {Recipient} from "../../../entity";


const getRecipientByExternalId = async (id: number|string, type: string = 'USEDESK_CHAT'): Promise<Recipient|null> => {
    const connection = await getConnection();
    const recipient = await connection.getRepository<Recipient>(Recipient).findOne({
        relations: ['recipient_type', 'tokens', 'tokens.lang', 'tokens.token_type'],
        where: {
            recipient_type: {
                type: 'USEDESK_CHAT'
            },
            external_id: id
        }
    });
    return recipient ? recipient : null;
}

export {
    getRecipientByExternalId
}