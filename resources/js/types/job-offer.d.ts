export interface IJobOffer {
    id?: number;
    title: string;
    company?: string;
    location?: string;
    type?: string;
    salary?: number;
    description?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface IJobApplication {
    job_offer_id: number;
    name: string;
    cv: File | null;
}
