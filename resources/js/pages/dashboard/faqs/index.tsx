import FaqDataTable from '@/components/faqs/faqDataTable';
import FaqForm from '@/components/faqs/faqForm';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import Drawer from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IFaq } from '@/types/faq';
import { Head, router, usePage } from '@inertiajs/react';
import { CirclePlus, HelpCircle, HelpCircle as QuestionMarkCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'FAQs',
        href: '/dashboard/faqs',
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
                {/* En-tête avec description, statistiques et bouton d'ajout */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 mb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <QuestionMarkCircle className="h-6 w-6 text-primary flex-shrink-0" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('FAQ Management', 'Gestion des FAQs')}</h1>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                                            <HelpCircle className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">
                                            Créez et gérez vos questions fréquemment posées. Les FAQs aident vos visiteurs à trouver rapidement des
                                            réponses à leurs questions.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                Cette section vous permet de créer et organiser vos questions fréquemment posées (FAQs). Les FAQs améliorent
                                l'expérience utilisateur en fournissant des réponses immédiates aux questions courantes, réduisent la charge de
                                support et augmentent la satisfaction client. Organisez vos réponses de manière claire et accessible.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Actives : {faqs.filter((f) => f.is_active).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>Inactives : {faqs.filter((f) => !f.is_active).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Total : {faqs.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className=" bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg transition-colors flex items-center gap-2"
                                        onClick={() => setOpenForm(true)}
                                        aria-label={t('Add FAQ', 'Ajouter une FAQ')}
                                    >
                                        <CirclePlus className="h-5 w-5" />
                                        <span className="hidden sm:inline">Nouvelle FAQ</span>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Créer une nouvelle question-réponse pour aider vos visiteurs</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <Drawer
                    title={t('FAQ', 'FAQ')}
                    open={openForm}
                    setOpen={(o) => {
                        setOpenForm(o);
                        if (!o) setSelected(undefined);
                    }}
                    component={<FaqForm closeDrawer={() => setOpenForm(false)} initialData={selected} />}
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

                <div className="container mx-auto flex justify-center">
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
