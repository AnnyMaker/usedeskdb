import Notifier from "./Notifier";
import NotificationToken from "./NotificationToken";
import firebaseAdmin from "../api/firebaseAdmin";
import NotificationResult from "./NotificationResult";
import Payload from "./Payload";

export default class FirebaseNotifier implements Notifier {
    async send(token: NotificationToken, payload: Payload<FirebasePayload>): Promise<NotificationResult> {
        const result = new NotificationResult(token.getToken());
        const {title, body} = payload.getPayload();
        try {
            await firebaseAdmin.messaging().send({
                token: token.getToken(),
                notification: {title, body}
            });
        } catch (e) {
            result.setError(e as Error);
        }
        return  result;
    }

}


export type FirebasePayload = {
    title: string,
    body: string
}