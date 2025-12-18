import TemplateDataTable from '@/components/newsletter/templateDataTable';
import TemplateForm from '@/components/newsletter/templateForm';
import TemplateToolBar from '@/components/newsletter/templateToolBar';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { INewsletterTemplate } from '@/types/newsletterTemplate';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/dashboard/newsletter-templates',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function NewsletterTemplates() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [templates, setTemplates] = useState<INewsletterTemplate[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<INewsletterTemplate | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && Array.isArray(data.templates)) {
            setTemplates(data.templates as any);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.newsletter-templates.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('template.deleted', 'Template supprimé'));
                setShowConfirm(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter Templates" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <TemplateToolBar
                    FormComponent={<TemplateForm closeDrawer={() => setOpenForm(false)} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete template', 'Supprimer le template')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer ?')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {templates && (
                        <TemplateDataTable
                            templates={templates}
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
