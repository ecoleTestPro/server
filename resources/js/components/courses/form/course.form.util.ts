import { ICourseDescription } from "@/types/course";
import { Logger } from "@/utils/console.util";

export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

export const PERIODICITY_UNIT = [
    { value: PeriodicityUnitEnum.DAY, label: 'Jour' },
    { value: PeriodicityUnitEnum.WEEK, label: 'Semaine' },
    { value: PeriodicityUnitEnum.MONTH, label: 'Mois' },
    { value: PeriodicityUnitEnum.YEAR, label: 'Année' },
];

export type ICourseRequest = {
    id?: number;

    title: string;
    description: ICourseDescription | string;
    excerpt: string;

    category_id: string;

    duration: string;
    attachment?: string;
    lectures: string | number;

    periodicity_unit: string;
    periodicity_value: string | number;

    price: string | number;
    regular_price: string | number;

    author: string;

    image: string;

    partner_ids?: number[];
    reference_tag?: string;
    location_mode?: string;

    is_published?: boolean; // Indicate if the course is published or a draft
};

export type ICourseForm = {
    id?: number;

    title: string;

    excerpt: string;

    category_id: string;

    duration: string;
    attachment?: string;
    lectures: string | number;

    periodicity_unit: string;
    periodicity_value: string | number;

    price: string | number;
    regular_price: string | number;

    author: string;

    image: string;

    is_featured: boolean;

    partner_ids?: number[];
    reference_tag?: string;
    location_mode: string;

    media?: File | null; // For thumbnail
    logo: File | null; // For course logo
    organization_logo: File | null; // For organization logo
    video: File | null; // For course video

    published?: boolean; // Indicate if the course is published or a draft

    // description: string;
    /**
     * DESCRIPTION PARTS
     */
    /**
     * Detailed course content description
     * This field can contain HTML or markdown formatted text.
     * It should provide a comprehensive overview of the course content, including topics covered, methodologies used
     */
    content: string;

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
    pedagogical_objectives?: string;

    /**
     * Course strengths and unique selling points
     * This field should highlight what makes the course stand out, such as unique teaching methods, expert instructors, or practical applications.
     */
    course_strengths?: string;

    /**
     * Evaluation methods for the course
     * This field should describe how participants will be assessed, such as through quizzes, projects, or exams.
     */
    evaluation?: string;

    /**
     * Target audience for the course
     * This field should specify who the course is intended for, such as beginners, professionals, or specific industries.
     */
    prerequisites?: string;

    /**
     * Frequently asked questions about the course
     * This field should address common queries or concerns that potential participants may have about the course.
     */
    why_choose?: string;

    /**
     * Questions and answers related to the course
     * This field should provide answers to common questions that participants may have about the course content, structure, or requirements.
     */
    exam?: string;
};

export const COURSE_DEFAULT_VALUES: ICourseForm = {
    title: '',
    // description: '',
    excerpt: '',

    category_id: '',

    duration: '',
    lectures: '',
    attachment: '',

    periodicity_unit: '',
    periodicity_value: '',

    price: '',
    regular_price: '',

    author: '',
    image: '',

    content: '',

    is_featured: false,

    partner_ids: [],
    reference_tag: '',
    location_mode: 'En présentiel ou à distance',

    logo: null,
    organization_logo: null,
    media: null,
    video: null,
};



export const createPayload = (data: ICourseForm, draft: boolean): ICourseRequest => {
    try {
        const payload: ICourseRequest = {
            author: data.author || '',
            category_id: data.category_id,
            // description doit être une chaîne JSON valide
            description: JSON.stringify({
                content: data.content,
                target_audience: data.target_audience,
                summary: data.summary,
                pedagogical_objectives: data.pedagogical_objectives,
                course_strengths: data.course_strengths,
                evaluation: data.evaluation,
                prerequisites: data.prerequisites,
                why_choose: data.why_choose,
                exam: data.exam,
            }),
            duration: data.duration || '',
            excerpt: data.excerpt || '',
            id: data?.id,
            image: data.image || '',
            lectures: data.lectures || 0,
            periodicity_unit: data.periodicity_unit || PeriodicityUnitEnum.DAY,
            periodicity_value: data.periodicity_value || 1,
            price: data.price
                ? Number(
                    data.price
                        .toString()
                        .replace(/\s/g, '')
                        .replace(/[^0-9]/g, ''),
                )
                : 0,
            regular_price: data.regular_price
                ? Number(
                    data.regular_price
                        .toString()
                        .replace(/\s/g, '')
                        .replace(/[^0-9]/g, ''),
                )
                : 0,
            title: data.title || '',
            attachment: data.attachment || '',
            is_published: !draft,
            partner_ids: data.partner_ids && data.partner_ids.length > 0 ? data.partner_ids : [],
            reference_tag: data.reference_tag || '',
            location_mode: data.location_mode || 'En présentiel ou à distance',
        };

        Logger.log('[CREATE_PAYLOAD]', payload);

        return payload;
    } catch (error) {
        Logger.error('Error creating course payload:', error);
        throw new Error('Failed to create course payload');
    }
};
