import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

type ICourseForm = {
    title: string;
    description: string;
    duration: string;
    lectures: string | number;
    price: string | number;
    author: string;
    image: string;
};

const defaultValues: ICourseForm = {
    title: '',
    description: '',
    duration: '',
    lectures: '',
    price: '',
    author: '',
    image: '',
};

function CourseForm() {
    const { data, setData, post, processing, errors, reset } = useForm<ICourseForm>(defaultValues);

    const { t } = useTranslation();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('courses.store'), {
            onSuccess: () => {
                toast.success(t('courses.createSuccess', 'Formation créée avec succès !'));
                reset();
            },
            onError: (errors) => {
                toast.error(t('courses.createError', 'Erreur lors de la création de la formation'));
                console.error('Course creation error:', errors);
            },
        });
    };

    return (
        <form className="mx-auto flex max-w-xl flex-col gap-8" onSubmit={submit}>
            {/* Bloc Informations principales */}
            <fieldset className="mb-2 rounded-lg border p-4">
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
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="author">{t('courses.author', 'Auteur')}</Label>
                        <Input
                            id="author"
                            type="text"
                            required
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.author', 'Auteur')}
                        />
                        <InputError message={errors.author} />
                    </div>
                </div>
            </fieldset>

            {/* Bloc Description */}
            <fieldset className="mb-2 rounded-lg border p-4">
                <legend className="px-2 text-base font-semibold">{t('courses.descriptionBlock', 'Description détaillée')}</legend>
                <div className="grid gap-2">
                    <Label htmlFor="description">{t('courses.description', 'Description')}</Label>
                    <Suspense fallback={<div>Loading editor...</div>}>
                        <ReactQuill id="description" value={data.description} onChange={(value) => setData('description', value)} />
                    </Suspense>
                    <InputError message={errors.description} />
                </div>
            </fieldset>

            {/* Bloc Détails */}
            <fieldset className="mb-2 rounded-lg border p-4">
                <legend className="px-2 text-base font-semibold">{t('courses.details', 'Détails')}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="duration">{t('courses.duration', 'Durée')}</Label>
                        <Input
                            id="duration"
                            type="text"
                            required
                            value={data.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.duration', 'Durée (ex: 10h)')}
                        />
                        <InputError message={errors.duration} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lectures">{t('courses.lectures', 'Nombre de leçons')}</Label>
                        <Input
                            id="lectures"
                            type="number"
                            required
                            value={data.lectures}
                            onChange={(e) => setData('lectures', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.lectures', 'Nombre de leçons')}
                        />
                        <InputError message={errors.lectures} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">{t('courses.price', 'Prix')}</Label>
                        <Input
                            id="price"
                            type="text"
                            required
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.price', 'Prix')}
                        />
                        <InputError message={errors.price} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">{t('courses.image', 'Image (URL)')}</Label>
                        <Input
                            id="image"
                            type="text"
                            required
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.image', "URL de l'image")}
                        />
                        <InputError message={errors.image} />
                    </div>
                </div>
            </fieldset>

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {t('courses.create', 'Créer la formation')}
            </Button>
        </form>
    );
}

export default CourseForm;
