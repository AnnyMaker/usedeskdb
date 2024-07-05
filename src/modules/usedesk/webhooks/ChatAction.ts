export default interface ChatAction {
    chat_id:   number;
    text:      string;
    client_id: number;
    client:    Client;
    from:      'user'|'client';
    platform:  'usedesk_tg';
    secret:    string;
    ticket:    Ticket;
    state:     null;
}

export interface Client {
    id:             number;
    name:           string;
    avatar:         string;
    note:           string;
    emails:         Email[];
    phones:         Phone[];
    additional_ids: AdditionalID[];
}

export interface AdditionalID {
    value:     string;
    client_id: number;
}

export interface Email {
    email:     string;
    client_id: number;
}

export interface Phone {
    phone:     string;
    type:      string;
    client_id: number;
}

export interface Ticket {
    id:              number;
    status_id:       1|2|3|4|5|6|7|8|9;
    subject:         string;
    client_id:       number|null;
    assignee_id:     number|null;
    group:           number|null;
    last_updated_at: Date;
    channel_id:      number;
    email:           string|null;
    published_at:    Date;
    company_id:      number;
    additional_id:   number;
    message:         string;
}
