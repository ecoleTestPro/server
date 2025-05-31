import { router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, Suspense, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import { SharedData } from '@/types';
import { lazy } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from '../ui/skeleton';
import CourseAdditionnalForm from './form/course-additionnal.form';
import CourseBasicInfoForm from './form/course-basic-info.form';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

export enum PeriodicityUnitEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR',
}

export const PERIODICITY_UNIT = [
    { value: PeriodicityUnitEnum.DAY, label: 'Jour' },
    { value: PeriodicityUnitEnum.WEEK, label: 'Semaine' },
    { value: PeriodicityUnitEnum.MONTH, label: 'Mois' },
    { value: PeriodicityUnitEnum.YEAR, label: 'Année' },
];

export type ICourseRequest = {
    id?: number;

    title: string;
    description: string;
    excerpt: string;

    category_id: string;

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

export type ICourseForm = {
    id?: number;

    title: string;
    description: string;
    excerpt: string;

    category_id: string;

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

    category_id: '',

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

    const fieldsetClasses = 'bg-white dark:bg-gray-800 mb-2 rounded-lg border p-4';

    const createPayload = (): ICourseRequest => {
        const payload: ICourseRequest = {
            author: data.author || '',
            category_id: data.category_id,
            // description doit être une chaîne JSON valide
            description: JSON.stringify({ content: data.description || '' }),
            duration: data.duration || '',
            excerpt: data.excerpt || '',
            id: initialData?.id,
            image: data.image || '',
            lectures: data.lectures || 0,
            periodicity_unit: data.periodicity_unit || PeriodicityUnitEnum.DAY,
            periodicity_value: data.periodicity_value || 1,
            price: data.price
                ? Number(
                      data.price
                          .toString()
                          .replace(/\s/g, '')
                          .replace(/[^0-9]/g, ''),
                  )
                : 0,
            regular_price: data.regular_price
                ? Number(
                      data.regular_price
                          .toString()
                          .replace(/\s/g, '')
                          .replace(/[^0-9]/g, ''),
                  )
                : 0,
            title: data.title || '',
            attachment: data.attachment || '',
        };

        console.log('[CREATE_PAYLOAD]', payload);

        return payload;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('data', data);

        const routeName = initialData?.id ? 'course.update' : 'course.store';
        const routeUrl = initialData?.id ? 'courses/update' : 'courses/store';

        router.visit(route(routeName, initialData?.id), {
            method: 'post',
            data: createPayload(),
            onSuccess: (response) => {
                console.log('response', response);
                toast.success(t('courses.createSuccess', 'Formation créée avec succès !'));
                reset();
                closeDrawer?.();
            },
            onError: (e) => {
                toast.error(t('courses.createError', 'Erreur lors de la création de la formation'));
                console.error('Course creation error:', e);
                console.error('Course creation error:', errors);
            },
            preserveScroll: true,
            preserveState: true,
        });
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
        <form className="container mx-auto flex flex-col gap-8" onSubmit={submit}>
            {/* mx-auto  */}

            <div className="grid grid-cols-6 grid-rows-1 gap-4">
                <div className="col-span-4">
                    {/* Bloc Informations principales  && Catégory*/}
                    <CourseBasicInfoForm
                        fieldsetClasses={fieldsetClasses}
                        data={data}
                        categories={sharedData.categories.data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                    />

                    {/* Bloc Description */}
                    <fieldset className={fieldsetClasses}>
                        <legend className="px-2 text-base font-semibold">{t('courses.descriptionBlock', 'Description détaillée')}</legend>
                        <div className="grid gap-2">
                            <div className="min-h-[200px]">
                                <Label htmlFor="description">{t('courses.description', 'Description')}</Label>
                                <Suspense fallback={<div>Loading editor...</div>}>
                                    <ReactQuill id="description" value={data.description} onChange={(value) => setData('description', value)} />
                                </Suspense>
                                <InputError message={errors.description} />
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="col-span-2 col-start-5">
                    {/* Bloc Détails */}
                    <CourseAdditionnalForm
                        fieldsetClasses={fieldsetClasses}
                        data={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>

            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {t('courses.create', 'Créer la formation')}
            </Button>
        </form>
    );
}

export default CourseForm;
