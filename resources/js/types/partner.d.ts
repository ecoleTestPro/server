import { IMedia } from "./course";

export interface IPartner {
    id?: number;
    name: string;
    link?: string;
    tag?: string;
    is_reference?: boolean;
    is_active: boolean;
    media?: IMedia;
    media_id?: number;
    created_at?: string;
    updated_at?: string;
}
