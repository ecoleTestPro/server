export interface INotificationInstance {
    id: number;
    course_id: number | null;
    heading: string;
    title: string | null;
    content: string;
    is_read: boolean;
    created_at: string;
    date_format: string;
    raw_time: string;
}
