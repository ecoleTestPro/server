export interface INewsletterLog {
    id?: number;
    email: string;
    subject: string;
    content: string;
    is_sent?: boolean;
    sent_at?: string | null;
    error?: string | null;
    created_at?: string;
    updated_at?: string;
}
