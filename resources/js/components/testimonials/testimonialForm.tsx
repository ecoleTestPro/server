import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { InputFile } from '@/components/ui/inputFile';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { ITestimonial } from '@/types/testimonial';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
    const { data, setData, processing, errors, reset } = useForm<ITestimonial>(initialData || defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const routeUrl = initialData?.id ? route('dashboard.testimonial.update', initialData.id) : route('dashboard.testimonial.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                name: data.name,
                designation: data.designation,
                description: data.description,
                rating: data.rating,
                is_active: data.is_active ? '1' : '0',
                ...(file && { picture: file }),
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    initialData?.id ? t('testimonials.updated', 'Témoignage mis à jour !') : t('testimonials.created', 'Témoignage créé !'),
                );
                reset();
                closeDrawer?.();
            },
        });
    };

    return (
        <form className="mx-auto flex flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">{t('Name', 'Nom')}</Label>
                <Input id="name" required value={data.name} onChange={(e) => setData('name', e.target.value)} disabled={processing} />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="designation">{t('Designation', 'Poste')}</Label>
                <Input
                    id="designation"
                    required
                    value={data.designation}
                    onChange={(e) => setData('designation', e.target.value)}
                    disabled={processing}
                />
                <InputError message={errors.designation} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">{t('Description')}</Label>
                <Textarea
                    id="description"
                    required
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                />
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
            <div className="flex items-center gap-2">
                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(value) => setData('is_active', !!value)} />
                <Label htmlFor="is_active">{t('Active', 'Actif')}</Label>
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {initialData?.id ? t('Update', 'Mettre à jour') : t('Create', 'Créer')}
            </Button>
        </form>
    );
}
