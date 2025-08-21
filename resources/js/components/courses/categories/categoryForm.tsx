import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { InputFile } from '@/components/ui/inputFile';
import SelectCustom from '@/components/ui/select-custom';
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { lazy } from 'react';
import 'react-quill/dist/quill.snow.css';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

// export type ICategoryForm = {
export type ICategoryForm = {
    id?: number;
    title: string;
    is_featured: boolean;
    media: string;
    parent_id?: number | string; // Optional parent category ID
};

export const categoryFormToICourseCategory = (category: ICategoryForm): ICourseCategory => {
    return {
        id: category.id,
        title: category.title,
        slug: '', // Le slug sera généré côté serveur
        is_featured: category.is_featured,
        media: category.media,
        parent_id: category.parent_id ? Number(category.parent_id) : undefined,
    };
};

export const courseCategoryToCategoryForm = (category: ICourseCategory): ICategoryForm => {
    return {
        id: category.id,
        title: category.title,
        is_featured: category.is_featured,
        media: category.media || '',
        parent_id: category.parent_id || undefined, // Ensure parent_id is optional
    };
};

const defaultValues: ICategoryForm = {
    title: '',
    is_featured: false,
    media: '',
};

interface CategoryFormProps {
    closeDrawer?: () => void;
    initialData?: ICategoryForm;
}

function CategoryForm({ closeDrawer, initialData }: CategoryFormProps) {
    const { data: catData } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const [file, setFile] = React.useState<File | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<ICategoryForm>(initialData || defaultValues);

    /**
     * Soumet le formulaire pour créer ou mettre à jour une catégorie
     *
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire
     *
     * @remarks
     * Si {@link initialData} est défini, la route `category.update` sera utilisée.
     * Sinon, la route `category.store` sera utilisée.
     *
     * @throws {Error} Si l'image n'est pas définie et que {@link initialData} n'a pas de champ `media`
     */
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!file && !initialData?.media) {
            toast.error(t('courses.category.mediaRequired', 'Veuillez sélectionner une image.'));
            return;
        }

        const routeName = initialData?.id ? 'category.update' : 'category.store';
        const routeUrl = initialData?.id ? 'categories/update' : 'categories/store';

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('is_featured', data.is_featured ? '1' : '0');
        if (data.parent_id) {
            formData.append('parent_id', data.parent_id.toString());
        }
        if (file) {
            formData.append('media', file);
        }

        router.visit(routeUrl, {
            method: 'post',
            data: {
                title: data.title,
                is_featured: data.is_featured ? '1' : '0',
                parent_id: data.parent_id,
                ...(file && { media: file }),
            },
            forceFormData: true, // Important pour envoyer des fichiers
            onSuccess: () => {
                toast.success(t('courses.category.updateSuccess', 'Catégorie mise à jour avec succès !'));
                reset();
                closeDrawer?.();
            },
            onError: (errors) => {
                toast.error(t('courses.category.updateError', 'Erreur lors de la mise à jour de la catégorie'));
            },
            preserveScroll: true,
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-8" onSubmit={submit}>
            <legend className="px-2 text-base font-semibold">{t('courses.mainInfo', 'Informations principales')}</legend>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">{t('courses.title', 'Titre')}</Label>
                    <Input
                        id="title"
                        type="text"
                        required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        disabled={processing}
                        placeholder={t('courses.title', 'Titre')}
                        autoComplete="onn"
                    />
                    <InputError message={errors.title} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="parent_id">{t('courses.parentCategory', 'Catégorie parente')}</Label>
                <SelectCustom
                    data={
                        catData.categories_with_courses &&
                        catData.categories_with_courses.map((category) => ({
                            id: category.id!,
                            title: category.title,
                            value: category.id!.toString(),
                        }))
                    }
                    selectLabel={t('courses.category', 'Catégorie')}
                    processing={processing}
                    onValueChange={(value) => setData('parent_id', value)}
                    value={data.parent_id?.toString()}
                    required
                />
                <InputError message={errors.parent_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">{t('courses.image', 'Image')}</Label>
                <InputFile
                    id="image"
                    onFilesChange={(files) => {
                        if (files && files.length > 0) {
                            const selectedFile = files[0];
                            // Validation locale basique
                            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                            if (!validTypes.includes(selectedFile.type)) {
                                toast.error(t('courses.category.invalidImageType', 'Le fichier doit être une image (jpg, jpeg ou png).'));
                                setFile(null);
                                return;
                            }
                            if (selectedFile.size > 2048 * 1024) {
                                // 2MB
                                toast.error(t('courses.category.imageTooBig', "L'image ne doit pas dépasser 2 Mo."));
                                setFile(null);
                                return;
                            }
                            setFile(selectedFile);
                        } else {
                            setFile(null);
                        }
                    }}
                    accept="image/*"
                    multiple={false}
                    disabled={processing}
                />
                <InputError message={errors.media} />
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {initialData?.id ? t('courses.update', 'Mettre à jour la catégorie') : t('courses.create', 'Créer la catégorie')}
            </Button>
        </form>
    );
}

export default CategoryForm;
