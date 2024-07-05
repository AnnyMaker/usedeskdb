export interface WebPushConfig {
    headers?: WebPushHeaders;
    notification?: WebPushNotification;
    hmsOptions?: WebPushOptions;
}


export interface WebPushHeaders {
    ttl?: string;
    topic?: string;
    urgency?: string;
}

export interface WebPushNotification {
    title?: string;
    body?: string;
    icon?: string;
    image?: string;
    lang?: string;
    tag?: string;
    badge?: string;
    dir?: string;
    vibrate?: Array<string>;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    timestamp?: number;
    actions?: Array<WebPushAction>;
}

export interface WebPushAction {
    action?: string;
    icon?: string;
    title?: string;
}

export interface WebPushOptions {
    link?: string;
}