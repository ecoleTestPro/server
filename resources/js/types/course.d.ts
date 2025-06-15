import { IDataWithPagination } from ".";


export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

export interface IMedia {
    id: number,
    src: string,
    path: string,
    extension: string,
    type: string,
    created_at: string,
    updated_at: string
}

export interface ICourse {
    id: number | string;
    image: string;
    title: string;
    excerpt: string;
    description: string;
    duration: string;
    lectures: string | number;
    price: number;
    regular_price: number;
    author: string;
    is_featured: boolean;
    is_published: boolean;
    price_includes_tax: boolean;
    location_mode: string;
    attachment?: string;
    attachment_media?: IMedia;
    periodicity?: {
        value: number;
        unit: PeriodicityUnitEnum;
    };
    categories?: ICourseCategory[];
    media?: IMedia[];
    created_at?: string;
    updated_at?: string;
    slug?: string; // Optional slug for SEO-friendly URLs
    // [key: string]: any; // Allows for additional properties
    nextSession?: string; // Optional next session date
}


export interface ICourseCategory {
    id?: number;
    title: string;
    is_featured: boolean;
    parent_id?: number | string; // Optional parent category ID
    parent?: ICourseCategory; // Optional parent category for nested categories
    children?: ICourseCategory[]; // Optional children categories for nested categories
    media?: string;
    color?: string;
    image?: IMedia;
    courses?: ICourse[],
}


export interface ICustomSharedData {
    courses?: IDataWithPagination<ICourse>;

    categories?: IDataWithPagination<ICourseCategory>;
    categoriesTree: ICourseCategory[];
    categoriesWithCourses: ICourseCategory[];
}