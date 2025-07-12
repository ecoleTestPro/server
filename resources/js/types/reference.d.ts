export interface IReference {
    id?: number;
    text?: string;
    tag?: string;
    is_active: boolean;
    media?: IMedia;
    media_id?: number;
    created_at?: string;
    updated_at?: string;
}
