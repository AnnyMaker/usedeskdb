export interface ApnsConfig {
    headers?: {[key: string]: string};
    payload: ApnsPayload;
    hms_options: ApnsOptions;
}

export interface ApnsOptions {
    target_user_type: number;
}

export interface ApnsPayload {
    aps: Aps;
    acme_account: string;
    acme_message: string;
}

export interface Aps {
    alert?: string | AlertDictionary;
    badge?: number;
    sound?: string;
    content_available?: boolean;
    category?: string;
    thread_id?: string;
}

export interface AlertDictionary {
    title?: string;
    body?: string;
    title_loc_key?: string;
    title_loc_args?: string[];
    action_loc_key?: string;
    loc_key?: string;
    loc_args?: string[];
    launch_image?: string;
}