import CourseCardWrapper from '@/components/courses/card/courseCardWrapper';
import CourseForm, { ICourseForm } from '@/components/courses/courseForm';
import CourseToolBar from '@/components/courses/dashboard/courseToolBar';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
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

export default function Dashboard() {
    const { t } = useTranslation();

    const { data } = usePage<SharedData>().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [open, setOpen] = useState(false);
    const [selected, setCategory] = useState<ICourseForm | undefined>(undefined);

    const handleClose = () => {
        setCategory(undefined);
        setOpen(false);
    };

    const handleDelete = () => {
        // Call the delete function here
        console.log('Deleting course with ID:', selected?.id);
        router.delete(route('course.delete', selected?.id), {
            onSuccess: () => {
                setShowConfirm(false);
                setIsDeleting(false);
                toast.success(t('courses.course.deleteSuccess', 'Formation supprimée avec succès !'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    {/* <CourseTable /> */}
                    <CourseToolBar
                        FormComponent={<CourseForm closeDrawer={handleClose} initialData={selected} />}
                        open={open}
                        setOpen={(open: boolean) => {
                            setOpen(open);
                            if (!open) {
                                handleClose();
                            }
                        }}
                    />

                    <ConfirmDialog
                        open={showConfirm}
                        title="Supprimer la formation"
                        description="Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible."
                        confirmLabel="Supprimer"
                        cancelLabel="Annuler"
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirm(false)}
                        loading={isDeleting}
                    />

                    <div className="container mx-auto flex h-full items-center justify-center">
                        <CourseCardWrapper />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
