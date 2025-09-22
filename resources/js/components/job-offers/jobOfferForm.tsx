import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IJobOffer } from '@/types';
import { Logger } from '@/utils/console.util';
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Briefcase, Building2, Calendar, DollarSign, FileText, HelpCircle, Info, Loader2, MapPin } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import 'react-quill-new/dist/quill.snow.css';
import RichTextQuill from '../ui/form/RichTextQuill';
import SelectCustom, { ISelectItem } from '../ui/select-custom';

interface Props {
    closeDrawer?: () => void;
    initialData?: IJobOffer;
}

interface JobOfferFormData {
    title: string;
    company?: string;
    location?: string;
    type?: string;
    salary?: number;
    description?: string;
    expires_at?: string;
    is_active?: boolean;
    [key: string]: any;
}

const defaultValues: JobOfferFormData = {
    title: '',
    company: '',
    location: '',
    type: 'CDI',
    salary: 0,
    description: '',
    expires_at: '',
    is_active: true,
};

export default function JobOfferForm({ closeDrawer, initialData }: Props) {
    const { t } = useTranslation();
    const formData = initialData
        ? {
              title: initialData.title || '',
              company: initialData.company || '',
              location: initialData.location || '',
              type: initialData.type || 'CDI',
              salary: initialData.salary || 0,
              description: initialData.description || '',
              expires_at: initialData.expires_at || '',
              is_active: initialData.is_active !== undefined ? initialData.is_active : true,
          }
        : defaultValues;

    const { data, setData, processing, reset } = useForm<JobOfferFormData>(formData);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            expires_at: data.expires_at || null,
            is_active: data.is_active ? '1' : '0',
        };

        const request = initialData?.id
            ? axios.put(route('dashboard.job-offers.update', initialData.id), payload)
            : axios.post(route('dashboard.job-offers.store'), payload);

        request
            .then(() => {
                toast.success(initialData?.id ? 'Offre mise à jour' : 'Offre créée');
                router.reload();
                setErrors({});
                reset();
                closeDrawer?.();
            })
            .catch((error) => {
                Logger.log('Error submitting job offer:', error);

                if (error.response?.data?.errors) {
                    Object.keys(error.response.data.errors).forEach((key) => {
                        toast.error(error.response.data.errors[key]);
                        setErrors((prev) => ({ ...prev, [key]: error.response.data.errors[key] }));
                    });
                } else {
                    toast.error('Une erreur est survenue');
                }
            });
    };

    const typeList = (): ISelectItem[] => [
        { value: 'CDI', title: 'CDI', id: 1 },
        { value: 'CDD', title: 'CDD', id: 2 },
        { value: 'Alternance', title: 'Alternance', id: 3 },
        { value: 'Stage', title: 'Stage', id: 4 },
        { value: 'Freelance', title: 'Freelance', id: 5 },
        { value: 'Consultant', title: 'Consultant', id: 6 },
        { value: 'Autre', title: 'Autre', id: 7 },
        { value: 'Indépendant', title: 'Indépendant', id: 8 },
        { value: 'Volontariat', title: 'Volontariat', id: 9 },
        // { value: 'Bénévolat', title: 'Bénévolat', id: 10 },
        { value: "Stage de fin d'études", title: "Stage de fin d'études", id: 11 },
        { value: 'Stage de découverte', title: 'Stage de découverte', id: 12 },
    ];

    const parseDate = (dateString: string): string => {
        if (!dateString) return '';

        // Si la date est déjà au format Y-m-d, la retourner directement
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateString;
        }

        // Si la date est au format d/m/Y (venant du backend), la convertir
        if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        // Essayer de parser la date comme objet Date
        try {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        } catch (error) {
            console.log('Error parsing date:', error);
        }

        return '';
    };

    return (
        <div className="mx-auto">
            {/* En-tête du formulaire avec description */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-teal-600 mt-0.5" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {initialData?.id ? "Modifier l'offre d'emploi" : "Créer une nouvelle offre d'emploi"}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {initialData?.id
                                ? "Mettez à jour les informations de votre offre d'emploi. Les modifications seront immédiatement visibles sur votre site."
                                : 'Remplissez les informations pour publier une nouvelle opportunité de carrière. Une offre bien détaillée attire les meilleurs candidats.'}
                        </p>
                        <div className="mt-2 flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-500">
                                Les champs marqués d'une astérisque (*) sont obligatoires. Les offres expirées ne seront plus visibles pour les
                                candidats.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <form className="" onSubmit={submit}>
                <div className="flex flex-col gap-6 h-[calc(100vh-500px)] overflow-y-auto">
                    <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="title" className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-500" />
                                Titre du poste <span className="text-red-500">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <HelpCircle className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Le titre du poste tel qu'il apparaîtra dans les offres (ex: "Développeur Full Stack", "Chef de projet")</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input
                            id="title"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                            placeholder="Ex: Développeur Full Stack, Comptable, Chef de projet..."
                            className="transition-all focus:ring-2 focus:ring-teal-500"
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="company" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    Entreprise
                                </Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <HelpCircle className="h-4 w-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Nom de l'entreprise qui recrute (optionnel si c'est votre propre entreprise)</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                disabled={processing}
                                placeholder="Ex: ACME Corporation"
                                className="transition-all focus:ring-2 focus:ring-teal-500"
                            />
                            <InputError message={errors.company} />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="location" className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    Localisation
                                </Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <HelpCircle className="h-4 w-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Lieu de travail (ville, région ou "Télétravail")</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                disabled={processing}
                                placeholder="Ex: Dakar, Télétravail, France..."
                                className="transition-all focus:ring-2 focus:ring-teal-500"
                            />
                            <InputError message={errors.location} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="type">
                                    Type de contrat <span className="text-red-500">*</span>
                                </Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <HelpCircle className="h-4 w-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Type de contrat proposé pour ce poste</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <SelectCustom
                                data={typeList()}
                                selectLabel={'Sélectionnez le type de contrat'}
                                disabled={processing}
                                processing={processing}
                                onValueChange={(value) => setData('type', value)}
                                value={data.type}
                                defaultValue={'CDI'}
                                required
                            />
                            <InputError message={errors.type} />
                            <p className="text-xs text-gray-500">💡 CDI pour les postes permanents, Stage pour les étudiants</p>
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="salary" className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-gray-500" />
                                    Salaire (FCFA)
                                </Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <HelpCircle className="h-4 w-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Salaire mensuel en FCFA. Laissez vide si confidentiel ou à négocier</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="salary"
                                type="number"
                                value={data.salary || ''}
                                onChange={(e) => setData('salary', Number(e.target.value))}
                                disabled={processing}
                                placeholder="Ex: 500000"
                                className="transition-all focus:ring-2 focus:ring-teal-500"
                            />
                            <InputError message={errors.salary} />
                            <p className="text-xs text-gray-500">💡 Optionnel - Indiquez "0" ou laissez vide si confidentiel</p>
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="expires_at" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                Date d'expiration
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <HelpCircle className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Date limite pour postuler. L'offre sera automatiquement retirée après cette date</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Input
                            id="expires_at"
                            type="date"
                            value={parseDate(data.expires_at || '')}
                            onChange={(e) => setData('expires_at', e.target.value)}
                            disabled={processing}
                            min={new Date().toISOString().split('T')[0]}
                            className="transition-all focus:ring-2 focus:ring-teal-500"
                        />
                        <InputError message={errors.expires_at} />
                        <p className="text-xs text-gray-500">💡 Laissez vide pour une offre sans date limite</p>
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="description" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                Description détaillée du poste
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <HelpCircle className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <p>
                                        Décrivez les missions, compétences requises, avantages et processus de candidature. Une description complète
                                        attire plus de candidats qualifiés.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Conseils pour une bonne description :</p>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li>• Missions et responsabilités principales</li>
                                <li>• Compétences et expérience requises</li>
                                <li>• Avantages et bénéfices du poste</li>
                                <li>• Processus de candidature</li>
                            </ul>
                        </div>
                        <RichTextQuill
                            label="Description"
                            labelId="description"
                            value={data.description ?? ''}
                            setData={(value: string) => setData('description', value)}
                        />
                        <InputError message={errors.description} />
                    </div>{' '}
                </div>
                <Button
                    type="submit"
                    className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 shadow-sm hover:shadow-md"
                    disabled={processing}
                >
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {processing
                        ? t('Saving', 'Sauvegarde...')
                        : initialData?.id
                          ? t('Update', "Mettre à jour l'offre")
                          : t('Create', "Publier l'offre")}
                </Button>
            </form>
        </div>
    );
}
