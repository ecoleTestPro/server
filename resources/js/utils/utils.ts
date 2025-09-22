import { ICourse, ICourseCategory, ICoursePeriodicity, IMedia } from '@/types/course';
import { Logger } from './console.util';

export const getMediaUrl = (media: IMedia | string | undefined): string => {
    const src = typeof media === 'string' ? media : media?.url || media?.src;
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) {
        return src;
    }
    return `/storage/${src.replace(/^\/+/, '')}`;
};

const callBackCreateCoursesFromCategory = (category: ICourseCategory): ICourse[] => {
    const courses: ICourse[] = [];

    // Ajouter les cours directs qui ont des sessions valides
    if (category.courses) {
        const coursesWithSessions = category.courses.filter((course) => {
            // Vérifier que le cours a des sessions
            if (!course.course_sessions || course.course_sessions.length === 0) {
                return false;
            }

            // Vérifier qu'au moins une session a une date valide
            const hasValidSession = course.course_sessions.some(
                (session) => session.start_date && session.start_date !== '' && session.start_date !== 'N/A' && session.start_date !== '-',
            );

            return hasValidSession;
        });
        courses.push(...coursesWithSessions);
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
 * Obtient la date de session la plus proche pour un cours
 * @param course - Le cours à analyser
 * @returns La date de la session la plus proche ou null
 */
const getNextSessionDate = (course: ICourse): Date | null => {
    if (!course.course_sessions || course.course_sessions.length === 0) {
        return null;
    }

    const now = new Date();
    const futureSessions = course.course_sessions
        .filter((session) => session.start_date && session.start_date !== '' && session.start_date !== 'N/A')
        .map((session) => new Date(session.start_date))
        .filter((date) => !isNaN(date.getTime()) && date >= now)
        .sort((a, b) => a.getTime() - b.getTime());

    // Si pas de sessions futures, prendre la session la plus récente
    if (futureSessions.length === 0) {
        const allSessions = course.course_sessions
            .filter((session) => session.start_date && session.start_date !== '' && session.start_date !== 'N/A')
            .map((session) => new Date(session.start_date))
            .filter((date) => !isNaN(date.getTime()))
            .sort((a, b) => b.getTime() - a.getTime());
        return allSessions[0] || null;
    }

    return futureSessions[0];
};

/**
 * Takes a ICustomSharedData object and returns a list of ICourseCategory
 * with their courses populated, filtered and sorted by session date.
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

                // Trier les cours par date de session la plus proche
                allCourses.sort((a, b) => {
                    const dateA = getNextSessionDate(a);
                    const dateB = getNextSessionDate(b);

                    // Si aucune date, mettre à la fin
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;

                    // Trier par date croissante (plus proche en premier)
                    return dateA.getTime() - dateB.getTime();
                });

                if (limit && allCourses.length > limit) {
                    allCourses = allCourses.slice(0, limit);
                }

                return {
                    ...category,
                    courses: allCourses,
                };
            });

            // Filtrer les catégories sans cours
            const filteredList = list.filter((category) => category.courses && category.courses.length > 0);

            Logger.log('[OurCurrentCourses] updatedCategories', filteredList);
            return filteredList;
        }
        return [];
    } catch (error) {
        Logger.error('[createCoursesFromCategory] Error while creating courses from category:', error);
        return [];
    }
};

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
    const CURRENCY: string = 'FCFA';
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
export const getPeriodicity = (periodicityUnit: ICoursePeriodicity, periodicityValue: number): string | boolean => {
    const PERIODICITY_MAP: Record<string, string> = {
        DAY: 'jour',
        WEEK: 'semaine',
        MONTH: 'mois',
        YEAR: 'an',
    };

    const unit = PERIODICITY_MAP[periodicityUnit] || '';
    if (periodicityValue) {
        return `${periodicityValue} ${unit}${periodicityValue > 1 ? 's' : ''}`;
    }
    return false;
};

export const handleErrorsRequest = (
    error: any,
    setLoading: (loading: boolean) => void,
    toastError: (t: string) => void,
    setErrors: (errors: any) => void,
): void => {
    try {
        setLoading(false);
        Logger.error('[handleErrorsRequest] errors :', error);
        if (error) {
            if (error?.status == 500) {
                toastError('Une erreur est survenue');
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
};
