import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import NewsletterForm from '@/components/newsletter/newsletterForm';
import NewsletterToolBar from '@/components/newsletter/newsletterToolBar';
import NewsletterDataTable from '@/components/newsletter/newsletterDataTable';
import { INewsletter } from '@/types/newsletter';
import { ConfirmDialog } from '@/components/ui/confirmDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Newsletters',
        href: '/dashboard/newsletters',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function DashboardNewsletters() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [newsletters, setNewsletters] = useState<INewsletter[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<INewsletter | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && (data.newsletters as any)?.data) {
            setNewsletters((data.newsletters as any).data);
        } else if (data && Array.isArray(data.newsletters)) {
            setNewsletters(data.newsletters as any);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.newsletters.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('newsletter.deleted', 'Newsletter supprimée'));
                setShowConfirm(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <NewsletterToolBar
                    FormComponent={<NewsletterForm closeDrawer={() => setOpenForm(false)} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete newsletter', 'Supprimer la newsletter')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer ?')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {newsletters && (
                        <NewsletterDataTable
                            newsletters={newsletters}
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
