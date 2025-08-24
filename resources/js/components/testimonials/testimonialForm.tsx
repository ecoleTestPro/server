import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { InputFile } from '@/components/ui/inputFile';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { ITestimonial } from '@/types/testimonial';
import { Logger } from '@/utils/console.util';
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { FormEventHandler, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { MessageSquareQuote, HelpCircle, User, Briefcase, FileText, Eye, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';

interface TestimonialFormProps {
    closeDrawer?: () => void;
    initialData?: ITestimonial;
}

const defaultValues: ITestimonial = {
    name: '',
    designation: '',
    description: '',
    rating: 1,
    is_active: false,
};

export default function TestimonialForm({ closeDrawer, initialData }: TestimonialFormProps) {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const { data, setData, processing, errors, reset } = useForm(initialData || defaultValues);

    // Effet pour réinitialiser le formulaire quand initialData change
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        } else {
            setData(defaultValues);
        }
        setFile(null);
    }, [initialData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const routeUrl = initialData?.id ? route('dashboard.testimonial.update', initialData.id) : route('dashboard.testimonial.store');

        // Préparer les données avec FormData pour gérer les fichiers
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('designation', data.designation);
        formData.append('description', data.description);
        formData.append('rating', data.rating.toString());
        formData.append('is_active', data.is_active ? '1' : '0');
        
        if (file) {
            formData.append('picture', file);
        }

        // Configuration Axios avec headers appropriés
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': initialData?.id ? 'PUT' : 'POST'
            }
        };

        const axiosMethod = initialData?.id ? axios.post : axios.post; // Utiliser POST avec method override pour les fichiers
        
        axiosMethod(routeUrl, formData, config)
            .then(() => {
                toast.success(
                    initialData?.id ? t('testimonials.updated', 'Témoignage mis à jour !') : t('testimonials.created', 'Témoignage créé !'),
                );
                reset();
                setFile(null); // Reset le fichier
                closeDrawer?.();
                router.reload();
            })
            .catch((error) => {
                Logger.error('Erreur lors de la soumission:', error);
                
                if (error.response?.data?.errors) {
                    // Gestion des erreurs de validation Laravel
                    Object.keys(error.response.data.errors).forEach((key) => {
                        const errorMessage = error.response.data.errors[key][0];
                        toast.error(`${key}: ${errorMessage}`);
                    });
                } else if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(t('testimonials.error', 'Une erreur est survenue lors de la création du témoignage.'));
                }
            });
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-sm">
            {/* En-tête du formulaire */}
            <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <MessageSquareQuote className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {initialData?.id ? t('Edit Testimonial', 'Éditer le témoignage') : t('Add Testimonial', 'Ajouter un témoignage')}
                    </h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <HelpCircle className="h-5 w-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">
                                {initialData?.id ? 'Modifiez les informations de ce témoignage client.' : 'Ajoutez un nouveau témoignage pour renforcer votre crédibilité auprès de vos prospects.'}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {initialData?.id 
                        ? 'Modifiez les informations du témoignage ci-dessous.' 
                        : 'Les témoignages clients renforcent votre crédibilité. Remplissez les informations ci-dessous pour ajouter un nouveau témoignage.'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={submit}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-primary" />
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Name', 'Nom du client')} *
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Le nom complet du client qui a laissé ce témoignage. 
                                    Utilisez le vrai nom pour plus d'authenticité.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input 
                        id="name" 
                        required 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)} 
                        disabled={processing}
                        placeholder="Ex: Jean Dupont"
                        className="mt-1"
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <Label htmlFor="designation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Designation', 'Poste')} *
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Le poste ou la fonction du client dans son entreprise. 
                                    Cela ajoute de la crédibilité au témoignage.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="designation"
                        required
                        value={data.designation}
                        onChange={(e) => setData('designation', e.target.value)}
                        disabled={processing}
                        placeholder="Ex: Directeur Général, Chef de projet"
                        className="mt-1"
                    />
                    <InputError message={errors.designation} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Description', 'Témoignage')} *
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Le commentaire positif du client sur votre service ou produit. 
                                    Plus il est spécifique et détaillé, plus il sera convaincant.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Textarea
                        id="description"
                        required
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                        placeholder="Ex: Excellent service, équipe très professionnelle. Je recommande vivement leurs formations..."
                        className="mt-1 min-h-[100px]"
                        rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Rédigez un témoignage authentique et spécifique pour plus d'impact
                    </p>
                    <InputError message={errors.description} />
                </div>
            {false && (
                <div className="grid gap-2">
                    <Label htmlFor="rating">{t('Rating', 'Note')}</Label>
                    <Input
                        id="rating"
                        type="number"
                        min={1}
                        max={5}
                        required
                        value={data.rating}
                        onChange={(e) => setData('rating', Number(e.target.value))}
                        disabled={processing}
                    />
                    <InputError message={errors.rating} />
                </div>
            )}
            {false && (
                <div className="grid gap-2">
                    <Label htmlFor="picture">{t('Image')}</Label>
                    <InputFile
                        id="picture"
                        onFilesChange={(files) => {
                            if (files && files.length > 0) {
                                setFile(files[0]);
                                setData('media_id', undefined as any);
                            } else {
                                setFile(null);
                            }
                        }}
                        accept="image/*"
                        multiple={false}
                        disabled={processing}
                    />
                    <InputError message={errors.media_id} />
                </div>
            )}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-primary" />
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Visibility', 'Visibilité')}
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Choisissez si ce témoignage doit être visible sur votre site web 
                                    ou resté caché pour modification ultérieure.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Switch 
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', checked)}
                            id="visibility-status"
                        />
                        <label htmlFor="visibility-status" className="text-sm font-medium cursor-pointer">
                            {data.is_active ? (
                                <span className="text-green-600">Visible sur le site (actif)</span>
                            ) : (
                                <span className="text-gray-600">Caché (inactif)</span>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        onClick={() => closeDrawer?.()}
                        variant="outline"
                        className="px-6"
                    >
                        {t('Cancel', 'Annuler')}
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="bg-primary hover:bg-primary/90 px-8"
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {initialData?.id ? t('Updating...', 'Modification...') : t('Creating...', 'Création...')}
                            </span>
                        ) : (
                            initialData?.id ? t('Update Testimonial', 'Modifier le témoignage') : t('Add Testimonial', 'Ajouter le témoignage')
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
