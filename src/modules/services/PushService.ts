import {Recipient, Token} from "../../entity";
import Notifier from "../notification/Notifier";
import FirebaseNotifier from "../notification/FirebaseNotifier";
import HuaweiNotifier from "../notification/HuaweiNotifier";
import NotificationToken from "../notification/NotificationToken";
import NotificationResult from "../notification/NotificationResult";
import Payload from "../notification/Payload";
import {LangService} from "../language/types";
import {container, TYPES} from "../../di";
import {NotificationServicesName} from "../../utility/NotificationServicesName";

export default class PushService {

    private langService: LangService;

    constructor(private messageType: string) {
        this.langService = container.get<LangService>(TYPES.LangService);
    }

    public async send(recipient: Recipient, text: string): Promise<NotificationResult[] | null> {
        const tokens = recipient.tokens;
        if (!tokens) {
            return null;
        }

        return await Promise.all(tokens.map(token => this.sendByToken(token, text)));
    }

    private sendByToken = async (token: Token, body: string): Promise<NotificationResult> => {
        const title = this.langService
            .getTranslator(token.lang.code)
            .getMessage(this.messageType);

        const tokenType = token.token_type ? token.token_type.type : '';
        const notifier = PushService.getNotifierByType(tokenType);
        const payload = new Payload({title, body});
        return notifier.send(new NotificationToken(token.token), payload);
    }


    static getNotifierByType(type: string): Notifier {
        switch (type) {
            case NotificationServicesName.FCM:
                return new FirebaseNotifier();
            case NotificationServicesName.HUAWEI:
                return new HuaweiNotifier();
            default:
                return new FirebaseNotifier();
        }
    }
}