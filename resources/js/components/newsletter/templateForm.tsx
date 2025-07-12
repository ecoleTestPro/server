import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import { INewsletterTemplate } from '@/types/newsletterTemplate';
import { useTranslation } from 'react-i18next';

interface Props {
    closeDrawer?: () => void;
}

const defaultValues: INewsletterTemplate = {
    name: '',
    subject: '',
    content: '',
};

export default function TemplateForm({ closeDrawer }: Props) {
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<INewsletterTemplate>(defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('dashboard.newsletter-templates.store'), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Input id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} disabled={processing} placeholder="Name" />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Input id="subject" required value={data.subject} onChange={(e) => setData('subject', e.target.value)} disabled={processing} placeholder="Subject" />
                <InputError message={errors.subject} />
            </div>
            <div className="grid gap-2">
                <Textarea id="content" required value={data.content} onChange={(e) => setData('content', e.target.value)} disabled={processing} placeholder="Content" />
                <InputError message={errors.content} />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {t('Create', 'Créer')}
            </Button>
        </form>
    );
}
