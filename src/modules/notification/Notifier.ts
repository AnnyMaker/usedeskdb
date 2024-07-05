import NotificationToken from "./NotificationToken";
import NotificationResult from "./NotificationResult";
import Payload from "./Payload";

export default interface Notifier {
    send(token: NotificationToken, payload: Payload): NotificationResult | Promise<NotificationResult>;
}