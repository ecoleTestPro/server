export interface IJobOfferBase {
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
}

export interface IJobOffer extends IJobOfferBase {
    [key: string]: any;
}

export interface IJobApplication {
    job_offer_id: number;
    name: string;
    email: string;
    phone: string;
    cv: File | null;
    [key: string]: string | number | File | null;
}
