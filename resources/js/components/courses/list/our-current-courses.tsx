import TitleBadgeOne from '@/components/ui/badge-one';
import BtnSecondary from '@/components/ui/button/btn-secondary';
import { Skeleton } from '@/components/ui/skeleton';
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { createCoursesFromCategory } from '@/utils/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListCourseByCategory } from './ListCourseByCategory';

interface IOurCurrentCoursesProps {
    coursesData?: ICourseCategory[];
}

const OurCurrentCourses = ({ coursesData }: IOurCurrentCoursesProps) => {
    const { t } = useTranslation();

    const { auth, data } = usePage<SharedData>().props;

    const [courses, setCourses] = useState<ICourseCategory[]>(coursesData ?? []);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Effect to handle the loading state and populate courses
     * when the component mounts or when coursesData changes.
     * It checks if coursesData is provided; if not, it creates courses
     * from the data prop. It also sets the loading state accordingly.
     */
    useEffect(() => {
        if (!coursesData) {
            // initialize loading state, courses, and error
            setLoading(true);
            setCourses([]);
            setError(null);

            // If coursesData is not provided, create courses from the data prop
            if (data && data.categories_with_courses && data.categories_with_courses.length > 0) {
                setCourses(createCoursesFromCategory(data));
            }
        }

        setLoading(false);
    }, [coursesData, data, createCoursesFromCategory]);

    if (loading) {
        return (
            <>
                <div className="p-4 text-center text-3xl text-gray-500 dark:text-gray-400">
                    {t('COURSE.TABLE.LOADING', 'Chargement des cours...')}
                </div>

                <Skeleton className="mb-4" />
            </>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="p-4 text-center text-3xl text-gray-500 dark:text-gray-400">
                {t('COURSE.TABLE.NO_COURSES', 'Aucun cours disponible pour le moment.')}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <TitleBadgeOne title="Nos cours du moment" />
            <h1 className="mb-6 text-3xl font-bold">Formations</h1>
            {courses.map((category) => (
                <ListCourseByCategory title={category.title} coursesList={[category]} />
            ))}

            <div className="mt-6 flex justify-center">
                <BtnSecondary label="Voir toutes les formations" href={ROUTE_MAP.courses.link} />
            </div>
        </div>
    );
};

export default OurCurrentCourses;
