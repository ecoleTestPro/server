import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { ICustomSharedData } from './course';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    data: ICustomSharedData;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_admin: boolean;
    // [key: string]: unknown; // This allows for additional properties...
}

export interface IDataWithPagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export * from './job-offer';
export * from './newsletterLog';
export * from './newsletterTemplate';
export * from './notification';
export * from './partner';

// Appointment types
export interface Appointment {
    id: number;
    title: string;
    description?: string;
    appointment_date: string;
    duration: number;
    type: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    client_email?: string;
    client_phone?: string;
    metadata?: Record<string, any>;
    user_id?: number;
    admin_user_id?: number;
    user?: User;
    adminUser?: User;
    appointmentType?: AppointmentType;
    created_at: string;
    updated_at: string;
}

export interface AppointmentType {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    color: string;
    description?: string;
    default_duration: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface AppointmentDuration {
    id: number;
    duration: number;
    label: string;
    description?: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface BusinessHours {
    id: number;
    day_of_week: string;
    is_open: boolean;
    opening_time?: string;
    closing_time?: string;
    lunch_break_start?: string;
    lunch_break_end?: string;
    slot_duration?: number;
    created_at: string;
    updated_at: string;
}
