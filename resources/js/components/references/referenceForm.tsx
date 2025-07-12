import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IReference } from '@/types/reference';

interface ReferenceFormProps {
    closeDrawer?: () => void;
    initialData?: IReference;
}

const defaultValues: IReference = {
    text: '',
    is_active: true,
};

export default function ReferenceForm({ closeDrawer, initialData }: ReferenceFormProps) {
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<IReference>(initialData || defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id ? route('dashboard.references.update', initialData.id) : route('dashboard.references.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                text: data.text,
                media_id: data.media_id,
                is_active: data.is_active ? '1' : '0',
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(initialData?.id ? t('references.updated', 'Référence mise à jour !') : t('references.created', 'Référence créée !'));
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="text">{t('Text')}</Label>
                <Input id="text" value={data.text ?? ''} onChange={(e) => setData('text', e.target.value)} disabled={processing} />
                <InputError message={errors.text} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="media_id">{t('Media ID')}</Label>
                <Input id="media_id" type="number" required value={data.media_id ?? ''} onChange={(e) => setData('media_id', Number(e.target.value))} disabled={processing} />
                <InputError message={errors.media_id} />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {initialData?.id ? t('Update', 'Mettre à jour') : t('Create', 'Créer')}
            </Button>
        </form>
    );
}
