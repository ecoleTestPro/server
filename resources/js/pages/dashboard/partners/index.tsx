import PartnerDataTable from '@/components/partners/partnerDataTable';
import PartnerForm from '@/components/partners/partnerForm';
import PartnerToolBar from '@/components/partners/partnerToolBar';
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
        title: 'Partenaires',
        href: '/dashboard/partners',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function DashboardPartners() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [partners, setPartners] = useState<IPartner[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<IPartner | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && (data.partners as any)?.data) {
            setPartners((data.partners as any).data);
        } else if (data && Array.isArray(data.partners)) {
            setPartners(data.partners as any);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.partners.delete', selected.id), {
            onSuccess: () => {
                toast.success(t('partners.deleted', 'Partenaire supprimé'));
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
                <PartnerToolBar
                    FormComponent={<PartnerForm closeDrawer={() => setOpenForm(false)} initialData={selected} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={t('Delete partner', 'Supprimer le partenaire')}
                    description={t('Are you sure?', 'Voulez-vous vraiment supprimer ce partenaire ?')}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {partners && (
                        <PartnerDataTable
                            partners={partners}
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
