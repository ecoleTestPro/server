export interface ITestimonial {
    id?: number;
    name: string;
    designation: string;
    description: string;
    rating: number;
    is_active: boolean;
    media?: IMedia;
    media_id?: number;
    created_at?: string;
    updated_at?: string;
}
