import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputFile } from '@/components/ui/inputFile';
import TagInput from '@/components/ui/tag-input';
import { IPartner } from '@/types/partner';

interface ReferenceFormProps {
    closeDrawer?: () => void;
    initialData?: IPartner;
}

const defaultValues: IPartner = {
    name: '',
    link: '',
    tag: '',
    is_active: true,
    is_reference: true,
};

export default function ReferenceForm({ closeDrawer, initialData }: ReferenceFormProps) {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const { data, setData, processing, errors, reset } = useForm<IPartner>(initialData || defaultValues);
    const [tags, setTags] = useState<string[]>(initialData?.tag ? initialData.tag.split(';').filter(Boolean) : []);

    useEffect(() => {
        setData('tag', tags.join(';'));
    }, [tags]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id ? route('dashboard.references.update', initialData.id) : route('dashboard.references.store');

        if (!file && !initialData?.media) {
            toast.error(t('partners.imageRequired', 'Veuillez sélectionner une image.'));
            return;
        }

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                name: data.name,
                link: data.link,
                tag: data.tag,
                ...(file && { picture: file }),
                is_reference: '1',
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
        <form className="mx-auto flex flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">{t('Name', 'Nom')}</Label>
                <Input id="name" required value={data.name ?? ''} onChange={(e) => setData('name', e.target.value)} disabled={processing} />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="tag">Tag</Label>
                <TagInput tags={tags} onChange={setTags} placeholder="tag1;tag2" />
                <InputError message={errors.tag} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="picture">{t('Image')}</Label>
                <InputFile
                    id="picture"
                    onFilesChange={(files) => {
                        if (files && files.length > 0) {
                            setFile(files[0]);
                        } else {
                            setFile(null);
                        }
                    }}
                    accept="image/*"
                    multiple={false}
                    disabled={processing}
                />
                <InputError message={errors.picture} />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {initialData?.id ? t('Update', 'Mettre à jour') : t('Create', 'Créer')}
            </Button>
        </form>
    );
}
