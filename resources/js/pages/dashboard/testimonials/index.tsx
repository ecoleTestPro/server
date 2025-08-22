import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import TestimonialForm from '@/components/testimonials/testimonialForm';
import { MessageSquareQuote, HelpCircle, Info, CirclePlus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Drawer from '@/components/ui/drawer';
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
                {/* En-tête avec description, statistiques et bouton d'ajout */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 mb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageSquareQuote className="h-6 w-6 text-primary flex-shrink-0" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {t('Testimonials Management', 'Gestion des Témoignages')}
                                </h1>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                                            <HelpCircle className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">
                                            Collectez et gérez les retours de vos clients. Les témoignages
                                            renforcent votre crédibilité et aident à convaincre de nouveaux prospects.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                Cette section vous permet de collecter et afficher les avis de vos clients satisfaits. 
                                Les témoignages sont un élément clé pour établir la confiance avec vos prospects. 
                                Ajoutez les retours positifs de vos clients avec leur nom, poste et commentaire 
                                pour les afficher sur votre site web et renforcer votre crédibilité.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Actifs : {testimonials.filter(t => t.is_active).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>Inactifs : {testimonials.filter(t => !t.is_active).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Total : {testimonials.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Info className="h-4 w-4" />
                                <span>{testimonials.length} témoignage{testimonials.length > 1 ? 's' : ''}</span>
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button 
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg transition-colors flex items-center gap-2" 
                                        onClick={() => setOpenForm(true)}
                                        aria-label={t('Add testimonial', "Ajouter un témoignage")}
                                    >
                                        <CirclePlus className="h-5 w-5" />
                                        <span className="hidden sm:inline">Nouveau témoignage</span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ajouter un nouveau témoignage client avec nom, poste et commentaire</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <Drawer 
                    title={t('Testimonial', "Témoignage")} 
                    open={openForm} 
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }} 
                    component={<TestimonialForm closeDrawer={() => setOpenForm(false)} initialData={selected} />} 
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

                <div className="">
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
