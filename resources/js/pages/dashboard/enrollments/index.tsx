import EnrollmentRate from '@/components/charts/EnrollmentRate';
import EnrollmentDataTable from '@/components/enrollments/EnrollmentDataTable';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourseEnrollment } from '@/types/course';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Inscriptions',
        href: route('dashboard.enrollment.index'),
    },
];

export default function EnrollmentDashboard() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;
    const [enrollments, setEnrollments] = useState<ICourseEnrollment[]>([]);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState<ICourseEnrollment | null>(null);

    useEffect(() => {
        if (data.enrollments?.data) {
            setEnrollments(data.enrollments.data as unknown as ICourseEnrollment[]);
        }
    }, [data.enrollments]);

    const handleDelete = (): void => {
        setLoading(true);
        if (selectedToDelete) {
            router.delete(route('dashboard.enrollment.delete', selectedToDelete.id), {
                onSuccess: () => {
                    toast.success(t('deleted', 'Suppression effectuée avec succès'));
                },
                onError: () => {
                    toast.error(t('error', 'Echec de suppression'));
                },
                onFinish: () => {
                    setLoading(false);
                    setShowConfirm(false);
                },
            });
        } else {
            toast.error("Une erreur s'est produite");
        }
    };

    const handleOpenConfirmDelete = (row: ICourseEnrollment) => {
        setShowConfirm(true);
        setSelectedToDelete(row);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Inscriptions')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <EnrollmentRate />
                <EnrollmentDataTable enrollments={enrollments} onDeleteRow={handleOpenConfirmDelete} />
            </div>

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
        </AppLayout>
    );
}
