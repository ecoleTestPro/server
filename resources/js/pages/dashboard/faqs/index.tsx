import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import FaqForm from '@/components/faqs/faqForm';
import FaqToolBar from '@/components/faqs/faqToolBar';
import FaqDataTable from '@/components/faqs/faqDataTable';
import { IFaq } from '@/types/faq';
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

export default function DashboardFaqs() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [faqs, setFaqs] = useState<IFaq[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<IFaq | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && (data.faqs as any)?.data) {
            setFaqs((data.faqs as any).data);
        } else if (data && Array.isArray(data.faqs)) {
            setFaqs(data.faqs as any);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.faqs.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('faqs.deleted', 'FAQ supprimée'));
                setShowConfirm(false);
            },
        });
    };

    const handleOpenEdit = (row: IFaq) => {
        setSelected(row);
        setOpenForm(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <FaqToolBar
                    FormComponent={<FaqForm closeDrawer={() => setOpenForm(false)} initialData={selected} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete faq', 'Supprimer la FAQ')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer cette FAQ ?')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {faqs && (
                        <FaqDataTable
                            faqs={faqs}
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
