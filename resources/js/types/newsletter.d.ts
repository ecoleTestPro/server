export interface INewsletter {
    id?: number;
    email: string;
    created_at?: string;
    updated_at?: string;
}

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

export interface INewsletterStats {
    total_sent: number;
    total_failed: number;
    total_pending: number;
    total_subscribers: number;
}

export interface INewsletterAnalytics {
    stats: INewsletterStats;
    recent_logs: INewsletterLog[];
}
