import CourseTable from '@/components/courses/list/CourseTable';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';

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
    const [searchText, setSearchText] = useState<string>(searchTerm);
    const [loading, setLoading] = useState<boolean>(false);

    const breadcrumb: IHeroBreadcrumbItems[] = [
        { label: 'Home', href: ROUTE_MAP.public.home.link },
        { label: t('HEADER.SEARCH_RESULTS', 'Résultats de recherche'), href: '#' },
    ];

    useEffect(() => {
        if (data && data.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchText.trim() === '') {
            setCourses([]);
            return;
        }
        setLoading(true);
        axios
            .post(route('search'), { search: searchText })
            .then((response: { data: { search_result: { courses?: ICourse[] } } }) => {
                setCourses(response.data.search_result.courses || []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <DefaultLayout title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}
                    description={searchText}
                    breadcrumbItems={breadcrumb}
                />
                <div className="container mx-auto p-4">
                    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                        <Input
                            type="text"
                            placeholder={t('HEADER.SEARCH_PLACEHOLDER', 'Rechercher...')}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button type="submit" disabled={loading}>
                            {t('HEADER.SEARCH', 'Rechercher')}
                        </Button>
                    </form>
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span>{t('LOADING', 'Chargement...')}</span>
                        </div>
                    ) : (
                        <CourseTable courses={courses} />
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}
