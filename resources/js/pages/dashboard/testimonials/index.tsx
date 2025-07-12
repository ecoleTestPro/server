import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import TestimonialForm from '@/components/testimonials/testimonialForm';
import TestimonialToolBar from '@/components/testimonials/testimonialToolBar';
import TestimonialDataTable from '@/components/testimonials/testimonialDataTable';
import { ITestimonial } from '@/types/testimonial';
import { ConfirmDialog } from '@/components/ui/confirmDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Témoignages',
        href: '/dashboard/testimonials',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function DashboardTestimonial() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<ITestimonial | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && data.testimonials?.data) {
            setTestimonials(data.testimonials.data);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.testimonial.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('testimonials.deleted', 'Témoignage supprimé'));
                setShowConfirm(false);
            },
        });
    };

    const handleOpenEdit = (row: ITestimonial) => {
        setSelected(row);
        setOpenForm(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TestimonialToolBar
                    FormComponent={<TestimonialForm closeDrawer={() => setOpenForm(false)} initialData={selected} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete testimonial', 'Supprimer le témoignage')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer ce témoignage ?')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {testimonials && (
                        <TestimonialDataTable
                            testimonials={testimonials}
                            onEditRow={handleOpenEdit}
                            onDeleteRow={(row) => {
                                setSelected(row);
                                setShowConfirm(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
