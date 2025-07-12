import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, IJobOffer } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import JobOfferForm from '@/components/job-offers/jobOfferForm';
import JobOfferToolBar from '@/components/job-offers/jobOfferToolBar';
import JobOfferDataTable from '@/components/job-offers/jobOfferDataTable';
import { ConfirmDialog } from '@/components/ui/confirmDialog';

export default function DashboardJobOffers() {
    const { data } = usePage<SharedData>().props;

    const [offers, setOffers] = useState<IJobOffer[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<IJobOffer | undefined>(undefined);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data && Array.isArray((data as any).offers)) {
            setOffers((data as any).offers);
        }
    }, [data]);

    const handleDelete = () => {
        if (!selected) return;
        router.delete(route('dashboard.job-offers.delete', selected.id), {
            onSuccess: () => {
                toast.success('Offre supprimée');
                setShowConfirm(false);
            },
        });
    };

    const handleToggle = (row: IJobOffer) => {
        router.post(route('dashboard.job-offers.toggle', row.id), {}, { preserveScroll: true });
    };

    const handleOpenEdit = (row: IJobOffer) => {
        setSelected(row);
        setOpenForm(true);
    };

    return (
        <AppLayout>
            <Head title="Job Offers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <JobOfferToolBar
                    FormComponent={<JobOfferForm closeDrawer={() => setOpenForm(false)} initialData={selected} />}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                />

                <ConfirmDialog
                    open={showConfirm}
                    title={'Supprimer'}
                    description={'Confirmer la suppression ?'}
                    confirmLabel={'Supprimer'}
                    cancelLabel={'Annuler'}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />

                <div className="container mx-auto flex h-full items-center justify-center">
                    {offers && (
                        <JobOfferDataTable
                            offers={offers}
                            onEditRow={handleOpenEdit}
                            onDeleteRow={(row) => {
                                setSelected(row);
                                setShowConfirm(true);
                            }}
                            onToggleRow={handleToggle}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
