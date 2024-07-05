import { WebPushConfig } from "./messageWebPush";
import { ApnsConfig } from "./messageApns";


export type MsgRequest = {
    validate_only: boolean;
    message: Message;
}

type CoverageConfig = {token: [string, ...string[]]} | {topic: string} | {condition: string};

type DataMessage = {data: string};
type AndroidMessage = {android: AndroidConfig}
type AndroidMessageOptionalTitleAndBody = {android: AndroidConfig<Partial<NotificationBody>>}
type WebMessage = {webpush: WebPushConfig};
type ApplePushMessage = {apns: ApnsConfig};
type BasicNotificationMessage = {notification: Notification};



type NotificationGeneral = DataMessage | WebMessage | AndroidMessage | ApplePushMessage;
type NotificationWithNotificationField = BasicNotificationMessage & AndroidMessageOptionalTitleAndBody;


export type Message = (NotificationGeneral | NotificationWithNotificationField) & CoverageConfig;


type NotificationBody = {
    title: string,
    body: string
}

type Notification = { image?:string; } & NotificationBody;


export type AndroidConfig<MessageCore  = NotificationBody>  = {
    collapse_key?: number;
    urgency?: string;
    ttl?: string;
    bi_tag?: string;
    fast_app_target?: number;
    data?: string;
    notification: AndroidNotification & MessageCore;
}

type AndroidNotification  = {
    icon?: string;
    color?: string;
    sound?: string;
    default_sound?:boolean;
    tag?: string;
    click_action: ClickAction;
    body_loc_key?: string;
    body_loc_args?: Array<string>;
    title_loc_key?: string;
    title_loc_args?: Array<string>;
    multi_lang_key?: MultiLanguageKey;
    channel_id?: string;
    notify_summary?: string;
    image?: string;
    style?: number;
    big_title?: string;
    big_body?: string;
    big_picture?: string;
    auto_clear?: number;
    notify_id?: number;
    group?: string;
    badge?: BadgeNotification;
    ticker?:string;
    auto_cancel?:boolean;
    when?:string;
    importance?:string;
    use_default_vibrate?:boolean;
    use_default_light?:boolean;
    vibrate_config?:Array<string>;
    visibility?:string;
    light_settings?:LightSettings;
    foreground_show?:boolean;
}

export interface MultiLanguageKey {
    title_key?: MultiLanguageSelect;
    body_key?: MultiLanguageSelect;
}

export interface MultiLanguageSelect {
    en?: string;
    zh?: string;
    ru?: string;
}

export type ClickAction = ClickActionTypeOne | ClickActionTypeTwo | {type: 3};
type ClickActionTypeOne = { type: 1 } & ({intent: string} | {action: string})
type ClickActionTypeTwo = {type: 2, url: string}


export interface BadgeNotification {
    add_num?: number;
    class?: string;
    set_num?:number;
}

export interface LightSettings {
    color?: Color;
    light_on_duration?: string;
    light_off_duration?:string;
}

export interface Color {
    alpha?: number;
    red?: number;
    green?:number;
    blue?:number;
}


export interface MsgResponse {
    code: string;
    msg: string;
    requestId: string;
}

export interface ErrIndex {
    index?: number;
    reason?: string;
}