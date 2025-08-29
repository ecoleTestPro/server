import ReferenceDataTable from '@/components/references/referenceDataTable';
import ReferenceForm from '@/components/references/referenceForm';
import ReferenceToolBar from '@/components/references/referenceToolBar';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IPartner } from '@/types/partner';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Références',
        href: '/dashboard/references',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function DashboardReferences() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [references, setReferences] = useState<IPartner[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<IPartner | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && (data.references as any)?.data) {
            setReferences((data.references as any).data);
        } else if (data && Array.isArray(data.references)) {
            setReferences(data.references as any);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.references.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('references.deleted', 'Référence supprimée'));
                setShowConfirm(false);
            },
        });
    };

    const handleOpenEdit = (row: IPartner) => {
        setSelected(row);
        setOpenForm(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* En-tête avec description et aide */}
                <ReferenceToolBar
                    FormComponent={
                        <ReferenceForm
                            closeDrawer={() => setOpenForm(false)}
                            initialData={selected}
                            onSuccess={() => {
                                router.reload();
                            }}
                        />
                    }
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete reference', 'Supprimer la référence')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer cette référence ? Cette action est irréversible.')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {references && (
                        <ReferenceDataTable
                            references={references}
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
