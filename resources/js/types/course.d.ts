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
    id: number | string;
    title: string;
    is_featured: boolean;
    color: string;
}
