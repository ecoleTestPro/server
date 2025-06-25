import { Input } from '@/components/ui/input';
import { CLASS_NAME } from '@/data/styles/style.constant';
import { DashbordCourseView } from '@/pages/dashboard/courses';
import { ICourse } from '@/types/course';
import { Link } from '@inertiajs/react';
import { LayoutGrid, PlusSquare, TableOfContents } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import DashboardCategoryList from '../categories/dashboardCategoryList';

interface ICategoryToolBarProps {
    setSearchTerm: (term: string) => void;
    searchTerm: string;

    viewMode: DashbordCourseView;
    handleChangeViewMode: (mode: DashbordCourseView) => void;
}

export default function CourseToolBarTwo({ setSearchTerm, searchTerm, viewMode, handleChangeViewMode }: ICategoryToolBarProps) {
    const { t, i18n } = useTranslation();

    const filters: { label: string; labelColor: string; condition: () => ICourse[] }[] = [
        {
            label: t('course.category.dashboard.filters.all', 'Tous'),
            labelColor: 'text-gray-600',
            condition: () => [],
        },
        {
            label: t('course.category.dashboard.filters.published', 'Publié'),
            labelColor: 'text-green-600',
            condition: () => [],
        },
        {
            label: t('course.category.dashboard.filters.archived', 'Mise en avant'),
            labelColor: 'text-blue-600',
            condition: () => [],
        },
    ];

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="">
                        {/* <h1 className="text-xl font-bold">{t('course.category.dashboard.title', 'Formations')}</h1> */}
                        <div>
                            <div className={`mb-4 w-full mx-auto`}>
                                <div className="flex">
                                    <div className={`${CLASS_NAME.bgWhite} lg:min-w-[300px]`}>
                                        <Input
                                            type="text"
                                            placeholder="Rechercher par titre..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {filters.map((filter) => (
                                            <button className={`text-sm font-medium ${filter.labelColor} bg-gray-50 p-2 hover:text-gray-800`} key={filter.label}>
                                                {filter.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button onClick={() => handleChangeViewMode(viewMode === 'card' ? 'list' : 'card')}>
                            {viewMode === 'card' ? <TableOfContents className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
                        </button>
                        <Link className={`${CLASS_NAME.btn.primary}`} href={route('dashboard.course.create')}>
                            <span className="flex items-center">
                                <PlusSquare className="h-5 w-5" />
                                <span className="ml-2">{t('course.create', 'Créer une formation')}</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}
