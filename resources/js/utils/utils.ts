import { SharedData } from "@/types";
import { ICourse, ICourseCategory, ICustomSharedData } from "@/types/course";
import { Logger } from "./console.util";

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
export const createCoursesFromCategory = (data: ICourseCategory[]) => {
    try {
        if (data && data.length > 0) {
            Logger.log('[OurCurrentCourses] categories_with_courses', data);

            const list: ICourseCategory[] = data.map((category) => {
                const allCourses = callBackCreateCoursesFromCategory(category);

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

