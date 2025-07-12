import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { IFaq } from '@/types/faq';

interface FaqFormProps {
    closeDrawer?: () => void;
    initialData?: IFaq;
}

const defaultValues: IFaq = {
    question: '',
    answer: '',
    is_active: true,
};

export default function FaqForm({ closeDrawer, initialData }: FaqFormProps) {
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<IFaq>(initialData || defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id
            ? route('dashboard.faqs.update', initialData.id)
            : route('dashboard.faqs.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                question: data.question,
                answer: data.answer,
                is_active: data.is_active ? '1' : '0',
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    initialData?.id ? t('faqs.updated', 'FAQ mise à jour !') : t('faqs.created', 'FAQ créée !')
                );
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="question">{t('Question')}</Label>
                <Input id="question" required value={data.question} onChange={(e) => setData('question', e.target.value)} disabled={processing} />
                <InputError message={errors.question} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="answer">{t('Answer')}</Label>
                <Textarea id="answer" required value={data.answer} onChange={(e) => setData('answer', e.target.value)} disabled={processing} />
                <InputError message={errors.answer} />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {initialData?.id ? t('Update', 'Mettre à jour') : t('Create', 'Créer')}
            </Button>
        </form>
    );
}
