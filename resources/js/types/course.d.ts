import { IDataWithPagination } from ".";


export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
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
    media?: string;
    color?: string;
    image?: {
        id: number;
        src: string;
        path: string;
        extension: string;
        type: string;
        created_at: string;
        updated_at: string;
    };
}


export interface ICourseSharedData {
    courses?: IDataWithPagination<ICourse>;
    categories?: IDataWithPagination<ICourseCategory>;
}