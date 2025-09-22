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
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { lazy } from 'react';
import 'react-quill-new/dist/quill.snow.css';

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
    isSubcategoryMode?: boolean;
    parentCategoryId?: number;
    parentCategoryName?: string;
}

function CategoryForm({ closeDrawer, initialData, isSubcategoryMode = false, parentCategoryId, parentCategoryName }: CategoryFormProps) {
    const { data: catData } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const [file, setFile] = React.useState<File | null>(null);

    // Initialisation des données en fonction du mode
    const getInitialFormData = (): ICategoryForm => {
        if (initialData) {
            return initialData;
        }
        
        const baseData = { ...defaultValues };
        
        // Si on est en mode sous-catégorie, pré-sélectionner la catégorie parent
        if (isSubcategoryMode && parentCategoryId) {
            baseData.parent_id = parentCategoryId;
        }
        
        return baseData;
    };

    const { data, setData, post, processing, errors, reset } = useForm<ICategoryForm>(getInitialFormData());

    /**
     * Soumet le formulaire pour créer ou mettre à jour une catégorie
     *
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire
     *
     * @remarks
     * Si {@link initialData} est défini, la route `category.update` sera utilisée.
     * Sinon, la route `category.store` sera utilisée.
     * L'image et la catégorie parent sont optionnelles.
     */
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // L'image n'est plus obligatoire
        // if (!file && !initialData?.media) {
        //     toast.error(t('courses.category.mediaRequired', 'Veuillez sélectionner une image.'));
        //     return;
        // }

        const routeUrl = initialData?.id ? 'categories/update' : 'categories/store';

        // Préparer les données à envoyer
        const requestData: { [key: string]: any } = {
            title: data.title,
            is_featured: data.is_featured ? '1' : '0',
        };

        // Ajouter l'ID pour la mise à jour
        if (initialData?.id) {
            requestData.id = initialData.id;
        }

        // Ajouter parent_id s'il existe (soit depuis le formulaire, soit depuis le mode sous-catégorie)
        const effectiveParentId = data.parent_id || (isSubcategoryMode ? parentCategoryId : null);
        if (effectiveParentId) {
            requestData.parent_id = effectiveParentId.toString();
        }

        // Ajouter le fichier s'il existe
        if (file) {
            requestData.media = file;
        }

        router.visit(routeUrl, {
            method: 'post',
            data: requestData,
            forceFormData: true, // Important pour envoyer des fichiers
            onSuccess: () => {
                toast.success(
                    initialData?.id 
                        ? t('courses.category.updateSuccess', 'Catégorie mise à jour avec succès !') 
                        : t('courses.category.createSuccess', 'Catégorie créée avec succès !')
                );
                reset();
                closeDrawer?.();
            },
            onError: (errors) => {
                console.error('Erreurs de validation:', errors);
                toast.error(
                    initialData?.id 
                        ? t('courses.category.updateError', 'Erreur lors de la mise à jour de la catégorie') 
                        : t('courses.category.createError', 'Erreur lors de la création de la catégorie')
                );
            },
            preserveScroll: true,
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-8" onSubmit={submit}>
            <legend className="px-2 text-base font-semibold">
                {isSubcategoryMode 
                    ? t('courses.subcategoryInfo', 'Informations de la sous-catégorie')
                    : t('courses.mainInfo', 'Informations principales')
                }
            </legend>
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

            {/* Afficher la catégorie parente si nous sommes en mode sous-catégorie */}
            {isSubcategoryMode && parentCategoryName && (
                <div className="grid gap-2">
                    <Label htmlFor="parent_id">
                        {t('courses.parentCategory', 'Catégorie parente')}
                    </Label>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {parentCategoryName}
                        </span>
                    </div>
                    <InputError message={errors.parent_id} />
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="image">{t('courses.image', 'Image')} <span className="text-sm text-gray-500">(optionnel)</span></Label>
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

            <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="is_featured"
                        checked={data.is_featured}
                        onChange={(e) => setData('is_featured', e.target.checked)}
                        disabled={processing}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="is_featured">{t('courses.featured', 'Catégorie mise en avant')}</Label>
                </div>
                <InputError message={errors.is_featured} />
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {initialData?.id 
                    ? t('courses.update', 'Mettre à jour la catégorie') 
                    : isSubcategoryMode 
                        ? t('courses.createSubcategory', 'Créer la sous-catégorie')
                        : t('courses.create', 'Créer la catégorie')
                }
            </Button>
        </form>
    );
}

export default CategoryForm;
