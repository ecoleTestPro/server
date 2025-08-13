export interface IJobOffer {
    id?: number;
    title: string;
    company?: string;
    location?: string;
    type?: string;
    salary?: number;
    description?: string;
    expires_at?: string | null;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface IJobApplication {
    job_offer_id: number;
    name: string;
    email: string;
    phone: string;
    cv: File | null;
}
