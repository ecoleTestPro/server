export interface IPartner {
    id?: number;
    name: string;
    link?: string;
    is_active: boolean;
    media?: IMedia;
    media_id?: number;
    created_at?: string;
    updated_at?: string;
}
