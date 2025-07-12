import EnrollmentDataTable from '@/components/enrollments/EnrollmentDataTable';
import EnrollmentRate from '@/components/charts/EnrollmentRate';
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

    useEffect(() => {
        if (data.enrollments?.data) {
            setEnrollments(data.enrollments.data as unknown as ICourseEnrollment[]);
        }
    }, [data.enrollments]);

    const handleDelete = (row: ICourseEnrollment) => {
        setLoading(true);
        router.delete(route('dashboard.enrollment.delete', row.id), {
            onSuccess: () => {
                toast.success(t('deleted', 'Supprimé'));
                setLoading(false);
            },
            onError: () => {
                toast.error(t('error', 'Erreur'));
                setLoading(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Inscriptions')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <EnrollmentRate />
                <EnrollmentDataTable enrollments={enrollments} onDeleteRow={handleDelete} />
            </div>
        </AppLayout>
    );
}
