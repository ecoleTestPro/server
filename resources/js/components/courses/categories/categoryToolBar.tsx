import { Button } from '@/components/ui/button';
import Drawer from '@/components/ui/drawer';
import { CirclePlus } from 'lucide-react';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface ICategoryToolBarProps {
    openCategory?: boolean;
    setOpenCategory?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function CategoryToolBar({ FormComponent, openCategory, setOpenCategory }: ICategoryToolBarProps) {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('course.category.dashboard.title', 'Liste des catégories')}</h1>
                    <div className="mt-2 flex justify-end space-x-2">
                        {/* Add Category */}
                        <Button
                            className="cursor-pointer rounded bg-gray-600 p-2"
                            onClick={() => setOpenCategory && setOpenCategory(true)}
                            aria-label={t('course.category.add', 'Ajouter une catégorie')}
                        >
                            <CirclePlus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Category Drawer */}
            {openCategory && FormComponent && (
                <Drawer
                    title={t('course.category.add', 'Ajouter une catégorie')}
                    open={openCategory}
                    setOpen={setOpenCategory && setOpenCategory}
                    component={FormComponent}
                />
            )}
        </div>
    );
}
