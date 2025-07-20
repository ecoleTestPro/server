import { SharedData } from "@/types";
import { ICourse, ICourseCategory, ICoursePeriodicity, ICustomSharedData, IMedia } from "@/types/course";
import { Logger } from "./console.util";

export const getMediaUrl = (media: IMedia | string | undefined): string => {
    const src = typeof media === 'string' ? media : media?.url || media?.src;
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) {
        return src;
    }
    return `/storage/${src.replace(/^\/+/, '')}`;
};

const callBackCreateCoursesFromCategory = (category: ICourseCategory): ICourse[] => {
    let courses: ICourse[] = [];

    // Ajouter les cours directs
    if (category.courses) {
        courses.push(...category.courses);
    }

    // Ajouter les cours des enfants (récursivement)
    if (category.children && category.children.length > 0) {
        category.children.forEach((child) => {
            courses.push(...callBackCreateCoursesFromCategory(child));
        });
    }

    return courses;
};

/**
 * Takes a ICustomSharedData object and returns a list of ICourseCategory
 * with their courses populated.
 *
 * @param data - The ICustomSharedData object.
 * @returns A list of ICourseCategory with their courses populated.
 */
export const createCoursesFromCategory = (data?: ICourseCategory[], limit?: number): ICourseCategory[] => {
    try {
        if (data && data.length > 0) {
            Logger.log('[OurCurrentCourses] categories_with_courses', data);

            const list: ICourseCategory[] = data.map((category) => {
                let allCourses = callBackCreateCoursesFromCategory(category);
                if (limit && allCourses.length > limit) {
                    allCourses = allCourses.slice(0, limit);
                }

                return {
                    ...category,
                    courses: allCourses,
                };
            });

            Logger.log('[OurCurrentCourses] updatedCategories', list);
            return list;
        }
        return [];
    } catch (error) {
        Logger.error('[createCoursesFromCategory] Error while creating courses from category:', error);
        return [];
    }
}


/**
 * Takes a price in cents and returns a string representing the price in dollars.
 * The price is formatted with two decimal places and the currency symbol is appended.
 *
 * @param price - The price in cents.
 * @returns A string representing the price in dollars.
 * @example
 * formatPrice(100) // returns "1.00 FCFA"
 */
export const formatPrice = (price: number): string => {
    const CURRENCY: string = "FCFA";
    // Formatte le prix avec des espaces comme séparateurs de milliers
    const formattedPrice = price.toLocaleString('fr-FR', { minimumFractionDigits: 0 });
    return `${formattedPrice} ${CURRENCY}`;
};

/**
* Formats the price of the course as a string, taking into account regular price (if any).
* @param course The course object
* @returns Formatted price string
*/
export const getPrice = (price: number, regular_price?: number): string => {
    let priceOutput: string = `<span>${formatPrice(price)}</span>`;
    if (regular_price) {
        priceOutput = `${formatPrice(price)} - <span class="line-through text-gray-400">${formatPrice(regular_price)}</span>`;
    }

    return priceOutput;
};


/**
 * Returns a string representing the periodicity of a course.
 *
 * @param {string} periodicityUnit - The unit of the periodicity. Can be 'DAY', 'WEEK', 'MONTH', or 'YEAR'.
 * @param {number} periodicityValue - The value of the periodicity.
 * @returns {string} A string representing the periodicity, for example '3 mois'.
 */
export const getPeriodicity = (periodicityUnit: ICoursePeriodicity, periodicityValue: number): string => {
    const periodicityMap: Record<string, string> = {
        DAY: 'jour',
        WEEK: 'semaine',
        MONTH: 'mois',
        YEAR: 'an',
    };

    const unit = periodicityMap[periodicityUnit] || 'inconnu';
    return `${periodicityValue} ${unit}${periodicityValue > 1 ? 's' : ''}`;
}



export const handleErrorsRequest = (error: any, setLoading: (loading: boolean) => void, toastError: (t: string) => void, setErrors: (errors: any) => void): void => {
    try {
        setLoading(false);
        Logger.error('[handleErrorsRequest] errors :', error);
        if (error) {
            if (error?.status == 500) {
                toastError("Une erreur est survenue");
            }

            if (error?.status == 422 && error.response?.data?.errors) {
                if (error.response.data.message && typeof error.response.data.message === 'string') {
                    toastError(error.response.data.message);
                }

                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    } catch (error) {
        Logger.error('[handleErrorsRequest] (catch) :', error);
    }
}