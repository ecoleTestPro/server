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
    description: string;
    duration: string;
    lectures: string | number;
    price: string | number;
    author: string;
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