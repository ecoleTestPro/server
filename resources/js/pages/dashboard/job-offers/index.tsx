import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, IJobOffer, BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import JobOfferForm from '@/components/job-offers/jobOfferForm';
import JobOfferToolBar from '@/components/job-offers/jobOfferToolBar';
import JobOfferDataTable from '@/components/job-offers/jobOfferDataTable';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Info, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Offres d'emploi",
        href: '/dashboard/job-offers',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function DashboardJobOffers() {
    const { t } = useTranslation();
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Offres d'emploi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* En-tête avec description et aide */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 mb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Briefcase className="h-6 w-6 text-teal-600" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {t('Job Offers Management', "Gestion des Offres d'Emploi")}
                                </h1>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <HelpCircle className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">
                                            Gérez vos offres d'emploi et opportunités de carrière. Publiez des postes, 
                                            définissez les critères et gérez les dates d'expiration.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-3xl">
                                Cette section vous permet de publier et gérer les offres d'emploi de votre entreprise. 
                                Vous pouvez créer des annonces détaillées avec les informations sur le poste, le salaire, 
                                la localisation et les dates de candidature. Les offres actives seront visibles sur votre 
                                site public et permettront aux candidats de postuler directement.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Offres actives : {offers.filter(o => o.is_active).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>Expire bientôt : {offers.filter(o => {
                                        if (!o.expires_at) return false;
                                        const daysUntilExpiry = Math.floor((new Date(o.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                                        return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
                                    }).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>Total : {offers.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Info className="h-4 w-4" />
                            <span>{offers.length} offre{offers.length > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>
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
                    title={t('Delete offer', "Supprimer l'offre d'emploi")}
                    description={t('Are you sure?', "Êtes-vous sûr de vouloir supprimer cette offre d'emploi ? Cette action est irréversible et l'offre ne sera plus visible pour les candidats.")}
                    confirmLabel={t('Delete', 'Supprimer')}
                    cancelLabel={t('Cancel', 'Annuler')}
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
