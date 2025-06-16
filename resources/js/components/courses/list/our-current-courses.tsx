import TitleBadgeOne from '@/components/ui/badge-one';
import { Skeleton } from '@/components/ui/skeleton';
import { SharedData } from '@/types';
import { ICourse, ICourseCategory } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const staticcategories_with_courses: ICourseCategory[] = [
    {
        id: 2,
        title: 'Digital Marketing',
        is_featured: true,
        courses: [
            {
                title: 'Social Media Marketing Starter Kit (sSOMEkL)',
                nextSession: '23.06.25 - 25.06.25',
                price: 180000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Rédaction pour Réseaux Sociaux (sFSM)',
                nextSession: '25.06.25',
                price: 85000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Facebook Advertising (fABOOK)',
                nextSession: '30.06.25',
                price: 85000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 3,
        title: 'IT Architecture & Software Engineering Modelling',
        is_featured: false,
        courses: [
            {
                title: 'Ansible - Fondamenteaux (aANSFo)',
                nextSession: '23.06.25 - 24.06.25',
                price: 160000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 4,
        title: 'Java, Python & Web',
        is_featured: false,
        courses: [
            {
                title: 'Introduction à CSS3 (iC3)',
                nextSession: '27.06.25',
                price: 65000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Python - Data Scientist (pYDATa)',
                nextSession: '03.07.25 - 04.07.25',
                price: 160000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 5,
        title: 'Programmer',
        is_featured: false,
        courses: [
            {
                title: 'Introduction à C# (CSe)',
                nextSession: '03.07.25 - 04.07.25',
                price: 160000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 6,
        title: 'SAP',
        is_featured: false,
        courses: [
            {
                title: 'SAP / Hana CP - Fondamenteaux (sSAPg)',
                nextSession: '23.06.25',
                price: 90000,
                id: 1,
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
];

const OurCurrentCourses = () => {
    const { t } = useTranslation();

    const { auth, data } = usePage<SharedData>().props;

    const [courses, setCourses] = useState<ICourseCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAllCoursesFromCategory = (category: ICourseCategory): ICourse[] => {
        let courses: ICourse[] = [];

        // Ajouter les cours directs
        if (category.courses) {
            courses.push(...category.courses);
        }

        // Ajouter les cours des enfants (récursivement)
        if (category.children && category.children.length > 0) {
            category.children.forEach((child) => {
                courses.push(...getAllCoursesFromCategory(child));
            });
        }

        return courses;
    };

    useEffect(() => {
        setLoading(true);
        setCourses([]);
        setError(null);

        if (data && data.categories_with_courses && data.categories_with_courses.length > 0) {
            console.log('[OurCurrentCourses] categories_with_courses', data.categories_with_courses);

            const updatedCategories: ICourseCategory[] = data.categories_with_courses.map((category) => {
                const allCourses = getAllCoursesFromCategory(category);

                return {
                    ...category,
                    courses: allCourses,
                };
            });

            console.log('[OurCurrentCourses] updatedCategories', updatedCategories);
            setCourses(updatedCategories);
        }

        setLoading(false);
    }, [data]);

    const renderCourseTable = (courses: ICourse[]) => {
        return (
            <div className="mb-6 overflow-hidden rounded-md bg-white shadow-md dark:bg-[#1a1f33]">
                <div className="table-responsive overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead className="text-black dark:text-white">
                            <tr>
                                <th className="w-2/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap first:rounded-tl-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.TITLE', 'Titre')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.NEXT_SESSION', 'Prochaine session')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.LANG', 'Langue')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.PRICE', 'Prix')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.REGISTER_COURSER', 'Inscrivez-vous')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-black dark:text-white">
                            {courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="w-2/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {item.title}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {item.nextSession ?? '23.06.25 - 25.06.25'}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {'FR'}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <span className="block font-medium">FCFA {item.price / 100}</span>
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <a
                                            href="#"
                                            className="inline-block animate-pulse text-green-400 underline hover:text-green-500 dark:text-green-400"
                                        >
                                            {t('COURSE.TABLE.REGISTER', "S'inscrire")}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderCourseSection = (title: string, coursesList: ICourseCategory[]) => (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            {coursesList.map((category) => renderCourseTable(category.courses?.slice(0, 5) || []))}
        </div>
    );

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
            {courses.map((category) => renderCourseSection(category.title, [category]))}

            <div className="mt-6 flex justify-center">
                <Link
                    href={ROUTE_MAP.courses.link}
                    className="rounded-2xl border border-gray-300 bg-gray-100 px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-[#1a1f33] dark:text-white dark:hover:bg-[#252b3f]"
                >
                    {t('COURSE.TABLE.VIEW_ALL', 'Voir tous les cours')}
                </Link>
            </div>
        </div>
    );
};

export default OurCurrentCourses;
