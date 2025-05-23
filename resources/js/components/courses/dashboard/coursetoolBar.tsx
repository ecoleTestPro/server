import Drawer from '@/components/ui/drawer';
import { LayoutList } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import DashboardCategoryList from '../categories/dashboardCategoryList';

export default function CourseToolBar() {
    const [openCategory, setOpenCategory] = useState(false);

    const { t, i18n } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <h1 className="text-xl font-bold">{t('course.category.dashboard.title', 'Liste des catégories')}</h1>
                <div className="mt-2 flex justify-end space-x-2">
                    {/* Add Category */}
                    <button
                        className="cursor-pointer rounded bg-gray-200 p-2"
                        onClick={() => setOpenCategory(true)}
                        aria-label="Ajouter une formation"
                    >
                        <LayoutList className="h-5 w-5" />
                    </button>
                </div>
            </header>

            {/* Category Drawer */}
            {/* {openCategory && (
                <Drawer title="Ajouter une catégorie" open={openCategory} setOpen={setOpenCategory} component={<DashboardCategoryList />} />
            )} */}
        </div>
    );
}
