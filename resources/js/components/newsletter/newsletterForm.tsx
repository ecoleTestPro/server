import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { INewsletter } from '@/types/newsletter';

interface NewsletterFormProps {
    closeDrawer?: () => void;
}

const defaultValues: INewsletter = {
    email: '',
};

export default function NewsletterForm({ closeDrawer }: NewsletterFormProps) {
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<INewsletter>(defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('dashboard.newsletters.store'), {
            email: data.email,
        }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('newsletter.created', 'Newsletter ajoutée'));
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Input id="email" required value={data.email} onChange={(e) => setData('email', e.target.value)} disabled={processing} placeholder="Email" />
                <InputError message={errors.email} />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {t('Create', 'Créer')}
            </Button>
        </form>
    );
}
