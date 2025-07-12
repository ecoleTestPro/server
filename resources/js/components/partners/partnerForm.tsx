import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IPartner } from '@/types/partner';

interface PartnerFormProps {
    closeDrawer?: () => void;
    initialData?: IPartner;
}

const defaultValues: IPartner = {
    name: '',
    link: '',
    is_active: true,
};

export default function PartnerForm({ closeDrawer, initialData }: PartnerFormProps) {
    const { t } = useTranslation();
    const { data, setData, processing, errors, reset } = useForm<IPartner>(initialData || defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id ? route('dashboard.partners.update', initialData.id) : route('dashboard.partners.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                name: data.name,
                link: data.link,
                media_id: data.media_id,
                is_active: data.is_active ? '1' : '0',
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(initialData?.id ? t('partners.updated', 'Partenaire mis à jour !') : t('partners.created', 'Partenaire créé !'));
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">{t('Name', 'Nom')}</Label>
                <Input id="name" required value={data.name ?? ''} onChange={(e) => setData('name', e.target.value)} disabled={processing} />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="link">{t('Link', 'Lien')}</Label>
                <Input id="link" value={data.link ?? ''} onChange={(e) => setData('link', e.target.value)} disabled={processing} />
                <InputError message={errors.link} />
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
