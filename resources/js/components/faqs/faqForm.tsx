import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import RichTextQuill from '@/components/ui/form/RichTextQuill';
import { IFaq } from '@/types/faq';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { HelpCircle as QuestionMarkCircle, HelpCircle, MessageCircle, Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { useEffect } from 'react';

interface FaqFormProps {
    closeDrawer?: () => void;
    initialData?: IFaq;
}

const defaultValues: IFaq = {
    id: undefined,
    question: '',
    answer: '',
    is_active: true,
};

export default function FaqForm({ closeDrawer, initialData }: FaqFormProps) { 
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<IFaq>(initialData || defaultValues);

    // Effet pour réinitialiser le formulaire quand initialData change
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        } else {
            setData(defaultValues);
        }
    }, [initialData]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id ? route('dashboard.faqs.update', initialData.id) : route('dashboard.faqs.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                id: initialData?.id,
                question: data.question,
                answer: data.answer,
                is_active: data.is_active ? '1' : '0',
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(initialData?.id ? t('faqs.updated', 'FAQ mise à jour !') : t('faqs.created', 'FAQ créée !'));
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-sm">
            {/* En-tête du formulaire */}
            <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <QuestionMarkCircle className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {initialData?.id ? t('Edit FAQ', 'Éditer la FAQ') : t('Add FAQ', 'Ajouter une FAQ')}
                    </h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <HelpCircle className="h-5 w-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">
                                {initialData?.id ? 'Modifiez les informations de cette FAQ.' : 'Créez une nouvelle question-réponse pour aider vos visiteurs à trouver rapidement les informations.'}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {initialData?.id 
                        ? 'Modifiez la question ou la réponse ci-dessous.' 
                        : 'Les FAQs améliorent l\'expérience utilisateur en répondant aux questions courantes. Soyez clair et concis dans vos réponses.'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={submit}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <QuestionMarkCircle className="h-4 w-4 text-primary" />
                        <Label htmlFor="question" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Question')} *
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    La question que vos visiteurs posent fréquemment. 
                                    Formulez-la de manière claire et naturelle.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input 
                        id="question" 
                        required 
                        value={data.question} 
                        onChange={(e) => setData('question', e.target.value)} 
                        disabled={processing}
                        placeholder="Ex: Comment puis-je m'inscrire à vos formations ?"
                        className="mt-1"
                    />
                    <InputError message={errors.question} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <Label htmlFor="answer" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Answer', 'Réponse')} *
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    La réponse détaillée à la question. Utilisez l'éditeur riche pour 
                                    formater le texte, ajouter des liens et structurer votre contenu.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mt-1">
                        <RichTextQuill
                            label={t('Answer', 'Réponse')}
                            labelId="answer"
                            value={data.answer as string}
                            setData={(value: string) => setData('answer', value)}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Utilisez l'éditeur riche pour formater votre réponse (gras, italique, liens, listes, etc.)
                    </p>
                    <InputError message={errors.answer} />
                </div>
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
                                    Choisissez si cette FAQ doit être visible sur votre site web 
                                    ou resté cachée pour modification ultérieure.
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
                                <span className="text-green-600">Visible sur le site (active)</span>
                            ) : (
                                <span className="text-gray-600">Cachée (inactive)</span>
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
                            initialData?.id ? t('Update FAQ', 'Modifier la FAQ') : t('Create FAQ', 'Créer la FAQ')
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
