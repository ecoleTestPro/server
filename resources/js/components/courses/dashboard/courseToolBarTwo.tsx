import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SelectCustom, { ISelectItem } from '@/components/ui/select-custom';
import { CLASS_NAME } from '@/data/styles/style.constant';
import { DashbordCourseView } from '@/pages/dashboard/courses';
import { ICourse } from '@/types/course';
import { Link } from '@inertiajs/react';
import { Filter, LayoutGrid, PlusSquare, TableOfContents } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import DashboardCategoryList from '../categories/dashboardCategoryList';

interface ICategoryToolBarProps {
    setSearchTerm: (term: string) => void;
    searchTerm: string;

    viewMode: DashbordCourseView;
    handleChangeViewMode: (mode: DashbordCourseView) => void;

    courses: ICourse[];
    setCourses?: (courses: ICourse[]) => void;
}

export default function CourseToolBarTwo({ setSearchTerm, searchTerm, viewMode, handleChangeViewMode, courses, setCourses }: ICategoryToolBarProps) {
    const { t, i18n } = useTranslation();

    const filters: {
        id: 'all' | 'published' | 'featured' | 'no-published';
        label: string;
        labelColor: string;
        onClick: () => void;
        isSelected: boolean;
    }[] = [
        {
            id: 'all',
            label: t('course.category.dashboard.filters.all', `Tous (${courses.length})`),
            labelColor: 'text-gray-600',
            onClick: () => {
                setCourses && setCourses(courses ?? []);
                filters.forEach((filter) => {
                    filter.isSelected = filter.id === 'all';
                });
            },
            isSelected: true,
        },
        {
            id: 'published',
            label: t('course.category.dashboard.filters.published', `Publié (${courses.filter((course) => course.is_published).length})`),
            labelColor: 'text-green-600',
            onClick: () => {
                setCourses && setCourses(courses ? courses.filter((course) => course.is_published) : []);
                filters.forEach((filter) => {
                    filter.isSelected = filter.id === 'published';
                });
            },
            isSelected: false,
        },

        {
            id: 'no-published',
            label: t('course.category.dashboard.filters.no-published', `Non publié (${courses.filter((course) => !course.is_published).length})`),
            labelColor: 'text-red-600',
            onClick: () => {
                setCourses && setCourses(courses ? courses.filter((course) => !course.is_published) : []);
                filters.forEach((filter) => {
                    filter.isSelected = filter.id === 'no-published';
                });
            },
            isSelected: false,
        },
        {
            id: 'featured',
            label: t('course.category.dashboard.filters.featured', `Mise en avant (${courses.filter((course) => course.is_featured).length})`),
            labelColor: 'text-blue-600',
            onClick: () => {
                setCourses && setCourses(courses ? courses.filter((course) => course.is_featured) : []);
                filters.forEach((filter) => {
                    filter.isSelected = filter.id === 'featured';
                });
            },
            isSelected: false,
        },
    ];

    const filterSelectList: ISelectItem[] = filters.map((filter) => ({
        id: filter.id.toString(),
        title: filter.label,
        value: filter.id.toString(),
    }));

    const handleOnChangeValueFilter = (value: string) => {
        const selectedFilter = filters.find((filter) => filter.id === value);
        if (selectedFilter) {
            selectedFilter.onClick();
        }
    };

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="lex items-center justify-start">
                        <div className={`w-full mx-auto`}>
                            <div className="flex items-center justify-between space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="space-x-2 flex items-center ml-3">
                                        <Label>
                                            <Filter className="h-5 w-5" />
                                        </Label>
                                        <SelectCustom
                                            selectLabel="Filtrer par"
                                            data={filterSelectList}
                                            processing={false}
                                            onValueChange={handleOnChangeValueFilter}
                                        />
                                    </div>
                                </div>
                                <div className={`${CLASS_NAME.bgWhite} lg:min-w-[300px]`}>
                                    <Input
                                        type="text"
                                        placeholder="Rechercher par titre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2">
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
