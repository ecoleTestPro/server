import TitleBadgeOne from '@/components/ui/badge-one';
import BtnSecondary from '@/components/ui/button/btn-secondary';
import { Skeleton } from '@/components/ui/skeleton';
import { SharedData } from '@/types';
import { ICourse, ICourseCategory } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { createCoursesFromCategory } from '@/utils/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListCourseByCategory } from './ListCourseByCategory';
import SidebarFilter from './SidebarFilter';
import { Logger } from '@/utils/console.util';

interface IOurCurrentCoursesProps {
    coursesData?: ICourseCategory[];
    coursesDataSlice?: number;
    showSidebar?: boolean;
    showViewAllButton?: boolean;
}

const OurCurrentCourses = ({ coursesData, showSidebar = false, coursesDataSlice, showViewAllButton }: IOurCurrentCoursesProps) => {
    const { t } = useTranslation();
    const { auth, url } = usePage<SharedData>().props;
    
    // Déterminer si on est sur la page d'accueil
    const isHomePage = url === '/' || url === '/home';
    const shouldShowButton = showViewAllButton !== undefined ? showViewAllButton : isHomePage;

    // Calculer les cours avec useMemo pour éviter les recalculs inutiles
    const courses = useMemo(() => {
        if (coursesData && coursesData.length > 0) {
            return createCoursesFromCategory(coursesData, coursesDataSlice);
        }
        return undefined;
    }, [coursesData, coursesDataSlice]);
    
    const [filteredCourses, setFilteredCourses] = useState<ICourseCategory[] | undefined>(courses);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    
    // Mettre à jour filteredCourses quand courses change
    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    // Extraire tous les cours pour le filtre
    const allCourses: ICourse[] = courses?.flatMap((category) => category.courses || []) ?? [];

    // Gérer les filtres
    const handleFilterChange = (filtered: ICourse[]) => {
        const filteredIds = new Set(filtered.map((course) => course.id));
        if (courses) {
            const newFilteredCourses = courses
                ?.map((category) => ({
                    ...category,
                    courses: (category.courses || []).filter((course) => filteredIds.has(course.id)),
                }))
                ?.filter((category) => (category.courses || []).length > 0);
            setFilteredCourses(newFilteredCourses);
        }
    };


    // Basculer l'affichage de la barre latérale
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!coursesData) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center text-3xl text-gray-500 dark:text-gray-400">{t('COURSE.TABLE.LOADING', 'Chargement des cours...')}</div>
                <Skeleton className="mb-4" />
            </div>
        );
    }

    if (!courses || courses.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center text-3xl text-gray-500 dark:text-gray-400">
                    {t('COURSE.TABLE.NO_COURSES', 'Aucun cours disponible pour le moment.')}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <TitleBadgeOne title="Nos cours du moment" />
            <h1 className="mb-6 text-3xl font-bold">Formations</h1>

            {/* Bouton pour afficher/masquer la barre latérale sur mobile */}
            <div className="mb-4 md:hidden">
                <BtnSecondary label={isSidebarOpen ? 'Masquer les filtres' : 'Afficher les filtres'} onClick={toggleSidebar} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Barre latérale de filtres */}
                {showSidebar && (
                    <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
                        <SidebarFilter courses={allCourses} onFilterChange={handleFilterChange} />
                    </div>
                )}

                {/* Liste des cours */}
                <div className="flex-1">
                    {filteredCourses &&
                        filteredCourses.map((category) => (
                            <ListCourseByCategory key={category.id} title={category.title} slug={category.slug} coursesList={[category]} />
                        ))}
                    {filteredCourses && filteredCourses.length === 0 && (
                        <div className="text-center text-2xl text-gray-500 dark:text-gray-400">
                            {t('COURSE.TABLE.NO_COURSES', 'Aucun cours ne correspond aux filtres.')}
                        </div>
                    )}
                </div>
            </div>

            {allCourses && allCourses.length > 0 && shouldShowButton && (
                <div className="mt-6 flex justify-center">
                    <BtnSecondary label="Voir toutes les formations" href={ROUTE_MAP.public.courses.list.link} />
                </div>
            )}
        </div>
    );
};

export default OurCurrentCourses;
