import CategoryDataTable from '@/components/categories/categoryDataTable';
import CategoryForm, { courseCategoryToCategoryForm, ICategoryForm } from '@/components/courses/categories/categoryForm';
import CategoryToolBar from '@/components/courses/categories/categoryToolBar';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourseCategory } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardCategory() {
    const { t } = useTranslation();

    const { data } = usePage<SharedData>().props;
    Logger.log('Categories Data:', data.categories);

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [categories, setCategories] = useState<ICourseCategory[]>([]);

    const [openCategory, setOpenCategory] = useState(false);
    const [categorySelected, setCategorySelected] = useState<ICategoryForm | undefined>(undefined);
    const [isSubcategoryMode, setIsSubcategoryMode] = useState(false);
    const [parentCategoryId, setParentCategoryId] = useState<number | undefined>(undefined);
    const [parentCategoryName, setParentCategoryName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (data && data.categories) {
            setCategories(data.categories);
        }
    }, [data]);

    const handleOpenCategory = () => {
        setOpenCategory(true);
    };

    const flatCategories = (categories: ICourseCategory[]): ICourseCategory[] => {
        if (data && data.categories) {
            const parent = categories.map((category) => category);
            const children = categories.flatMap((category) => {
                let list = category.children || [];

                list = list.map((child) => ({
                    ...child,
                    title: `${category.title} > ${child.title}`,
                }));

                return list;
            });
            return [...parent, ...children];
        } else {
            return [];
        }
    };

    /**
     * Opens the category form drawer to edit the given category.
     *
     * @param {ICourseCategory} row The category to edit
     *
     * @return {void}
     */
    const handleOpenEditCategory = (row: ICourseCategory) => {
        // Convert ICourseCategory to ICategoryForm
        setCategorySelected({
            ...row,
            id: typeof row.id == 'number' ? row.id : undefined,
            media: '', // or provide a default/convert as needed
        });
        setOpenCategory(true);
    };

    /**
     * Opens the category form drawer to add a subcategory for the given parent category.
     *
     * @param {ICourseCategory} parentCategory The parent category
     *
     * @return {void}
     */
    const handleOpenAddSubcategory = (parentCategory: ICourseCategory) => {
        setIsSubcategoryMode(true);
        setParentCategoryId(parentCategory.id);
        setParentCategoryName(parentCategory.title);
        setCategorySelected(undefined); // Nouvelle sous-catégorie
        setOpenCategory(true);
    };

    /**
     * Closes the category form drawer.
     *
     * @return {void}
     */
    const handleCloseCategory = () => {
        setCategorySelected(undefined);
        setIsSubcategoryMode(false);
        setParentCategoryId(undefined);
        setParentCategoryName(undefined);
        setOpenCategory(false);
    };

    /**
     * Deletes a category with the given ID
     *
     * @param {ICategoryForm | undefined} categorySelected The category to delete
     *
     * @return {void}
     */
    const handleDelete = () => {
        if (!categorySelected?.id) {
            toast.error('ID de catégorie manquant');
            return;
        }

        setIsDeleting(true);
        Logger.log('Deleting category with ID:', categorySelected.id);

        router.delete(route('dashboard.category.delete', categorySelected.id), {
            onSuccess: () => {
                setShowConfirm(false);
                setIsDeleting(false);
                toast.success(t('courses.category.deleteSuccess', 'Catégorie supprimée avec succès !'));
            },
            onError: (errors) => {
                setIsDeleting(false);
                console.error('Erreur lors de la suppression:', errors);
                toast.error('Erreur lors de la suppression de la catégorie');
            },
        });
    };

    /**
     * Opens the confirmation dialog for deleting a category
     *
     * @param {ICourseCategory} row The category to delete
     *
     * @return {void}
     */
    const handleOnDeleteRow = (row: ICourseCategory) => {
        setCategorySelected(courseCategoryToCategoryForm(row));
        setShowConfirm(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    {/* <CourseTable /> */}
                    <CategoryToolBar
                        FormComponent={
                            <CategoryForm
                                closeDrawer={handleCloseCategory}
                                initialData={categorySelected}
                                isSubcategoryMode={isSubcategoryMode}
                                parentCategoryId={parentCategoryId}
                                parentCategoryName={parentCategoryName}
                            />
                        }
                        openCategory={openCategory}
                        setOpenCategory={(open: boolean) => {
                            setOpenCategory(open);
                            if (!open) {
                                handleCloseCategory();
                            }
                        }}
                    />

                    <ConfirmDialog
                        open={showConfirm}
                        title="Supprimer la catégorie"
                        description="Voulez-vous vraiment supprimer cette catégorie ? Cette action est irréversible."
                        confirmLabel="Supprimer"
                        cancelLabel="Annuler"
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirm(false)}
                        loading={isDeleting}
                    />

                    <div className="container mx-auto flex h-full items-center justify-center">
                        {data?.categories && (
                            <CategoryDataTable
                                categories={data.categories}
                                onEditRow={handleOpenEditCategory}
                                onDeleteRow={handleOnDeleteRow}
                                onAddSubcategoryRow={handleOpenAddSubcategory}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
