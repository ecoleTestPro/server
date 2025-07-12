export interface IReference {
    id?: number;
    text?: string;
    is_active: boolean;
    media?: IMedia;
    media_id?: number;
    created_at?: string;
    updated_at?: string;
}
