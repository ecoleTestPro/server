import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
// import DashboardCategoryList from '../categories/dashboardCategoryList';

interface ICategoryToolBarProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function CourseToolBar({ FormComponent, open, setOpen }: ICategoryToolBarProps) {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('course.category.dashboard.title', 'Formations')}</h1>
                    <div className="mt-2 flex justify-end space-x-2">
                        <Link className="cursor-pointer rounded  p-2" href={route('dashboard.course.create')}>
                            <CirclePlus className="h-5 w-5" />
                        </Link>

                        {false && (
                            <Button
                                className="cursor-pointer rounded bg-gray-600 p-2"
                                onClick={() => setOpen && setOpen(true)}
                                aria-label={t('course.category.add', 'Ajouter une catégorie')}
                            >
                                <CirclePlus className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Category Drawer */}
            {open && FormComponent && (
                <Drawer
                    title={t('course.course.add', 'Ajouter une formation')}
                    open={open}
                    setOpen={setOpen && setOpen}
                    component={FormComponent}
                    maxWidth="max-w-3/4"
                />
            )}
        </div>
    );
}
