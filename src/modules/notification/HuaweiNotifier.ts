import Notifier from "./Notifier";
import NotificationToken from "./NotificationToken";
import NotificationResult from "./NotificationResult";
import Payload from "./Payload";
import {container} from "../../di";
import {HuaweiPush} from "../api/huawei/push/huaweiPush";

export default class HuaweiNotifier implements Notifier{
    async send(token: NotificationToken, payload: Payload): Promise<NotificationResult> {
        const result = new NotificationResult(token.getToken());
        const {title, body} = payload.getPayload() as {title: string, body: string};

        if(!container.isBound(HuaweiPush)) {
            throw new Error('HUAWEI_APP_ID and HUAWEI_SECRET not installed in .env')
        }

        const huaweiPush = container.get<HuaweiPush>(HuaweiPush);
        const response = await huaweiPush.send({
            android: {
                notification: {
                    title,
                    body,
                    click_action: {
                        type: 3
                    }
                }
            },
             token: [token.getToken()]
        })

        if(response.code !== '200') {
            result.setError(new Error(response.msg))
        }
        return result;
    }

}