import { IDataWithPagination } from ".";
import { IBlog, IBlogCategory } from "./blogs";
import { ITestimonial } from "./testimonial";
import { IFaq } from "./faq";
import { IPartner } from "./partner";

export interface IChartData {
    series: { name: string; data: number[] }[];
    categories: string[];
}


export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

export type mediaType = 'image' | 'video' | 'audio' | 'document' | 'other';

export interface IMedia {
    id: number,
    src: string,
    path: string,
    extension: string,
    type: mediaType,
    created_at: string,
    updated_at: string
}

export type ICoursePeriodicity = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface ICourseDescription {
    /**
     * Detailed course content description
     * This field can contain HTML or markdown formatted text.
     * It should provide a comprehensive overview of the course content, including topics covered, methodologies used
     */
    content: string

    /**
     * Short description of the course
     * This field should be a brief summary of the course, highlighting its main features and benefits.
     * It can be used in course listings or previews.
     */
    target_audience?: string;

    /**
     * Overview details of the course
     * This field should provide a high-level overview of the course, including its objectives, structure, and key takeaways.
     * It can be used in course listings or previews.
     */
    summary?: string;

    /**
     * Pedagogical objectives of the course
     * This field should outline the learning outcomes and skills that participants are expected to achieve upon completion of the course.
     */
    pedagogical_objectives?: string

    /**
     * Course strengths and unique selling points
     * This field should highlight what makes the course stand out, such as unique teaching methods, expert instructors, or practical applications.
     */
    course_strengths?: string

    /**
     * Evaluation methods for the course
     * This field should describe how participants will be assessed, such as through quizzes, projects, or exams.
     */
    evaluation?: string

    /**
     * Target audience for the course
     * This field should specify who the course is intended for, such as beginners, professionals, or specific industries.
     */
    prerequisites?: string

    /**
     * Frequently asked questions about the course
     * This field should address common queries or concerns that potential participants may have about the course.
     */
    why_choose?: string

    /**
     * Questions and answers related to the course
     * This field should provide answers to common questions that participants may have about the course content, structure, or requirements.
     */
    exam?: string
}

export interface ICourse {
    id: number;
    image: string;
    title: string;
    slug: string;
    excerpt: string;
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
    periodicity_unit: ICoursePeriodicity;
    periodicity_value: number;
    category?: ICourseCategory;
    created_at?: string;
    updated_at?: string;
    nextSession?: string; // Optional next session date
    description: ICourseDescription;
    categories?: ICourseCategory[];
    media?: IMedia[];
    logo?: IMedia;
    organization_logo?: IMedia;
    gallery?: IMedia[];
    course_sessions?: ICourseSession[];
    partners?: IPartner[];

}


export interface ICourseCategory {
    id?: number;
    title: string;
    slug: string;
    description?: string;
    is_featured: boolean;
    parent_id?: number | string; // Optional parent category ID
    parent?: ICourseCategory; // Optional parent category for nested categories
    children?: ICourseCategory[]; // Optional children categories for nested categories
    media?: string;
    color?: string;
    image?: IMedia;
    courses?: ICourse[],
}

export const createCourseCategory = (): ICourseCategory => {
    return {
        title: '',
        slug: '',
        description: '',
        is_featured: false,
        parent_id: undefined,
        media: '',
        color: '',
        image: undefined,
        courses: [],
    };
}

export interface ICourseEnrollment {
    user_id: number,
    course_id: number,
    user: User,
    course: ICourse,
    mode: string,
    progress: number,
    course_price: number,
    discount_amount: number,
    last_activity: string,
    is_certificate_downloaded: boolean,
}

export interface ICourseSession {
    id: number,
    location: string,
    country: string,
    city: string,
    longitude: number,
    latitude: number,
    timezone: string,
    language: string,
    start_date: string,
    end_date: string,
    price: number,
    price_discount: number,
    tva: number,
    course : ICourse,
    schedules: ICourseSessionSchedule[],
}

export interface ICourseSessionSchedule {
    id: number
    course_session_id: number
    start_time: string
    end_time: string
    date: string
    title?: string
    description?: string
}


export interface ICustomSharedData {
    /**
     * Paginated list of courses
     */
    courses?: {
        total?: number;
        list?: ICourse[];
        list_with_pagination?: IDataWithPagination<ICourse>;
    }

    /**
     * Single course
     */
    course?: ICourse;

    /**
     * List of popular courses
     */
    popular_courses?: ICourse[];

    /**
     * List of featured courses
     */
    featured_courses?: ICourse[];

    /**
     * Paginated list of course categories
     */
    categories: ICourseCategory[]; 

    /**
     * List of course categories with their courses
     */
    categories_with_courses: ICourseCategory[];

    /**
     * Current selected course category
     */
    category: ICourseCategory;

    search: {
        courses: ICourse[];
        categories: ICourseCategory[];
        blogs: any[]; // Assuming blogs is an array of objects, adjust type as needed
    }

    users?: {
        total?: number;
        last_30_days?: number;
        list?: User[]
    }

    admin_users?: {
        total?: number;
        last_30_days?: number;
        list?: User[]
    }

    enrollments?: {
        total?: number;
        last_30_days?: number;
        list?: IDataWithPagination<ICourseEnrollment>
    }

    notifications?: {
        unread_count?: number;
    }

    blogs?: {
        total?: number;
        list?: IBlog[];
        categories?: IBlogCategory[];
        single: IBlog
    }

    testimonials?: IDataWithPagination<ITestimonial>
    faqs?: IFaq[]

    chart_data?: {
        enrollment_area: IChartData;
        course_area: IChartData;
    }
}
