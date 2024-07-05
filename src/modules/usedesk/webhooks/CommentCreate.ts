export default interface CommentCreate {
    secret: string;
    comment: Comment;
    custom_fields: CustomField[];
    custom_blocks: CustomBlock[];
    client: Client;
}

export interface Client {
    id: number;
    name: string;
    avatar: string;
    note: string;
    emails: Email[];
    phones: Phone[];
    additional_ids: AdditionalID[];
}

export interface AdditionalID {
    value: string;
    client_id: number;
}

export interface Email {
    email: string;
    client_id: number;
}

export interface Phone {
    phone: string;
    type: string;
    client_id: number;
}

export interface Comment {
    id: number;
    message: string;
    type: 'private' | 'public';
    from: 'user' | 'client';
    user_id: number|null;
    client_id: number|null;
    ticket_id: number;
    is_first: 0|1;
    delivered?: number;
    readed?: number;
    published_at: Date;
}

export interface CustomBlock {
    name: string;
    url: string;
    secret_key: string;
}

export interface CustomField {
    id: number;
    name: string;
    value: null;
}
