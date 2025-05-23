import CategoryDataTable from '@/components/categories/categoryDataTable';
import CategoryForm, { courseCategoryToCategoryForm, ICategoryForm } from '@/components/courses/categories/categoryForm';
import CategoryToolBar from '@/components/courses/categories/categoryToolBar';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourseCategory } from '@/types/course';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
    console.log('Categories Data:', data.categories);

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [openCategory, setOpenCategory] = useState(false);
    const [categorySelected, setCategorySelected] = useState<ICategoryForm | undefined>(undefined);

    const handleOpenCategory = () => {
        setOpenCategory(true);
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
            image: '', // or provide a default/convert as needed
        });
        setOpenCategory(true);
    };

    /**
     * Closes the category form drawer.
     *
     * @return {void}
     */
    const handleCloseCategory = () => {
        setCategorySelected(undefined);
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
        // Call the delete function here
        console.log('Deleting category with ID:', categorySelected?.id);
        router.delete(route('category.delete', categorySelected?.id), {
            onSuccess: () => {
                setShowConfirm(false);
                setIsDeleting(false);
                toast.success(t('courses.category.deleteSuccess', 'Catégorie supprimée avec succès !'));
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
                        FormComponent={<CategoryForm closeDrawer={handleCloseCategory} initialData={categorySelected} />}
                        openCategory={openCategory}
                        setOpenCategory={(open: boolean) => {
                            setOpenCategory(open);
                            if (!open) {
                                setCategorySelected(undefined);
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
                        <CategoryDataTable categories={data.categories} onEditRow={handleOpenEditCategory} onDeleteRow={handleOnDeleteRow} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
