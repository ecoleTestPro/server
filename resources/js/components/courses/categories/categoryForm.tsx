import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { InputFile } from '@/components/ui/inputFile';
import { lazy } from 'react';
import 'react-quill/dist/quill.snow.css';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

type ICategoryForm = {
    title: string;
    is_featured: boolean;
    image: string;
};

const defaultValues: ICategoryForm = {
    title: '',
    is_featured: false,
    image: '',
};

interface CategoryFormProps {
    closeDrawer?: () => void;
    initialData?: ICategoryForm;
}

function CategoryForm({ closeDrawer, initialData }: CategoryFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ICategoryForm>(defaultValues);

    const { t } = useTranslation();

    const submit: FormEventHandler = (e) => {
        console.log('Submitting category form');
        e.preventDefault();
        post(route('category.store'), {
            onSuccess: () => {
                toast.success(t('courses.category.createSuccess', 'Catégorie créée avec succès !'));
                reset();
                console.log('closeDrawer', closeDrawer);
                closeDrawer && closeDrawer();
            },
            onError: (errors) => {
                toast.error(t('courses.category.createError', 'Erreur lors de la création de la catégorie'));
                console.error('Category creation error:', errors);
            },
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
                <Label htmlFor="image">{t('courses.image', 'Image')}</Label>
                <InputFile
                    id="image"
                    onFilesChange={(files) => {
                        if (files && files.length > 0) {
                            const file = files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setData('image', reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    accept="image/*"
                    multiple={false}
                    className="w-full"
                    disabled={processing}
                />
                <InputError message={errors.image} />
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {t('courses.create', 'Créer la formation')}
            </Button>
        </form>
    );
}

export default CategoryForm;
