import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import { SharedData } from '@/types';
import { SelectLabel } from '@radix-ui/react-select';
import { lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/text-area';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

const periodicityUnit = [
    { value: PeriodicityUnitEnum.DAY, label: 'Jour' },
    { value: PeriodicityUnitEnum.WEEK, label: 'Semaine' },
    { value: PeriodicityUnitEnum.MONTH, label: 'Mois' },
    { value: PeriodicityUnitEnum.YEAR, label: 'Année' },
];

export type ICourseForm = {
    id?: number;

    title: string;
    description: string;
    excerpt: string;

    duration: string;
    attachment?: string;
    lectures: string | number;

    periodicity_unit: string;
    periodicity_value: string | number;

    price: string | number;
    regular_price: string | number;

    author: string;

    image: string;
};

const defaultValues: ICourseForm = {
    title: '',
    description: '',
    excerpt: '',

    duration: '',
    lectures: '',
    attachment: '',

    periodicity_unit: '',
    periodicity_value: '',

    price: '',
    regular_price: '',

    author: '',
    image: '',
};

interface ICourseFormProps {
    closeDrawer?: () => void;
    initialData?: ICourseForm;
}

function CourseForm({ closeDrawer, initialData }: ICourseFormProps) {
    const { data: sharedData } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<ICourseForm>(initialData || defaultValues);

    const { t } = useTranslation();

    const [displayPrice, setDisplayPrice] = useState<string>(() => (data.price ? Number(data.price).toLocaleString('fr-FR') : ''));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('data', data);

        const routeName = initialData?.id ? 'course.update' : 'course.store';
        const routeUrl = initialData?.id ? 'courses/update' : 'courses/store';

        router.visit(route(routeName, initialData?.id), {
            method: 'post',
            data: {
                ...data,
            },
            onSuccess: (response) => {
                console.log('response', response);
                toast.success(t('courses.createSuccess', 'Formation créée avec succès !'));
                reset();
                closeDrawer?.();
            },
            onError: (errors) => {
                toast.error(t('courses.createError', 'Erreur lors de la création de la formation'));
                console.error('Course creation error:', errors);
            },
            preserveScroll: true,
            preserveState: true,
        });

        // post(route(routeName, initialData?.id), {
        //     onSuccess: () => {
        //         toast.success(t('courses.createSuccess', 'Formation créée avec succès !'));
        //         reset();
        //         console.log('closeDrawer', closeDrawer);
        //     },
        //     onError: (errors) => {
        //         toast.error(t('courses.createError', 'Erreur lors de la création de la formation'));
        //         console.error('Course creation error:', errors);
        //     },
        // });
    };

    if (!sharedData || sharedData.categories === undefined) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500">{t('courses.loading', 'Chargement des données...')}</div>
                <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-12 w-1/2" />
                </div>
            </div>
        );
    }

    return (
        <form className="mx-auto flex flex-col gap-8" onSubmit={submit}>
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
                        <Label htmlFor="excerpt">{t('courses.excerpt', 'Extrait')}</Label>
                        <Textarea
                            id="excerpt"
                            required
                            rows={4}
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.excerpt', 'Aperçu')}
                        />
                        <InputError message={errors.excerpt} />
                    </div>
                </div>
            </fieldset>

            {/* Catégory */}
            <fieldset className="mb-2 rounded-lg border p-4">
                <legend className="px-2 text-base font-semibold">{t('courses.mainInfo', 'Informations principales')}</legend>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('courses.title', 'Titre')}</Label>
                        {sharedData.categories && (
                            <Select disabled={processing} value={data.periodicity_unit} onValueChange={(value) => setData('periodicity_unit', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('courses.periodicity_unit', 'Periodicité')}</SelectLabel>

                                        {sharedData.categories.data &&
                                            sharedData.categories.data.map((cat) => (
                                                <SelectItem key={cat.id} value={cat?.id?.toString() ?? ''}>
                                                    {cat.title}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                        <InputError message={errors.title} />
                    </div>
                </div>
            </fieldset>

            {/* Bloc Détails */}
            <fieldset className="mb-2 rounded-lg border p-4">
                <legend className="px-2 text-base font-semibold">{t('courses.details', 'Détails')}</legend>
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="duration">{t('courses.duration', 'Durée')}</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={data.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.duration', 'Durée (ex: 10h)')}
                        />
                        <InputError message={errors.duration} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="periodicity_unit">{t('courses.periodicity_unit', 'Periodicité')}</Label>
                        <Select disabled={processing} value={data.periodicity_unit} onValueChange={(value) => setData('periodicity_unit', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{t('courses.periodicity_unit', 'Periodicité')}</SelectLabel>

                                    {periodicityUnit.map((unit) => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.periodicity_unit} />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        {/* ATTACHMENT */}
                        <Label htmlFor="attachment">{t('courses.attachment', 'Documents')}</Label>
                        <Input
                            id="attachment"
                            type="text"
                            value={data.attachment}
                            onChange={(e) => setData('attachment', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.attachment', 'Documents (ex: Livre de référence)')}
                        />
                        <InputError message={errors.attachment} />
                    </div>
                    <div className="grid gap-2">
                        {/* LECTURES */}
                        <Label htmlFor="lectures">{t('courses.lectures', 'Nombre de leçons')}</Label>
                        <Input
                            id="lectures"
                            type="number"
                            value={data.lectures}
                            onChange={(e) => setData('lectures', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.lectures', 'Nombre de leçons')}
                        />
                        <InputError message={errors.lectures} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">{t('courses.price', 'Prix')} (FCFA) </Label>
                        <Input
                            id="price"
                            type="text"
                            required
                            value={displayPrice}
                            onChange={(e) => {
                                // On enlève les espaces pour la valeur réelle
                                const raw = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                                setData('price', raw);
                                // On formate pour l'affichage
                                setDisplayPrice(raw ? Number(raw).toLocaleString('fr-FR') : '');
                            }}
                            disabled={processing}
                            placeholder={t('courses.price', 'Prix')}
                        />
                        <InputError message={errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="regular_price">{t('courses.regular_price', 'Prix normal')}</Label>
                        <Input
                            id="regular_price"
                            type="text"
                            value={data.regular_price}
                            onChange={(e) => setData('regular_price', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.regular_price', 'Prix normal')}
                        />
                        <InputError message={errors.regular_price} />
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

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {t('courses.create', 'Créer la formation')}
            </Button>
        </form>
    );
}

export default CourseForm;
