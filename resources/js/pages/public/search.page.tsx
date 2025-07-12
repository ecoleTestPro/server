import CourseTable from '@/components/courses/list/CourseTable';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PageProps extends SharedData {
    data: {
        courses: ICourse[];
    };
    searchTerm: string;
}

export default function SearchPage() {
    const { t } = useTranslation();
    const { data, searchTerm } = usePage<PageProps>().props;
    const [courses, setCourses] = useState<ICourse[]>([]);

    const breadcrumb: IHeroBreadcrumbItems[] = [
        { label: 'Home', href: ROUTE_MAP.public.home.link },
        { label: t('HEADER.SEARCH_RESULTS', 'Résultats de recherche'), href: '#' },
    ];

    useEffect(() => {
        if (data && data.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    return (
        <DefaultLayout title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}
                    description={searchTerm}
                    breadcrumbItems={breadcrumb}
                />
                <div className="container mx-auto p-4">
                    <CourseTable courses={courses} />
                </div>
            </div>
        </DefaultLayout>
    );
}
