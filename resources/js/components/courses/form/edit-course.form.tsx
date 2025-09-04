import { handleErrorsRequest } from '@/utils/utils';
import { router, useForm, usePage } from '@inertiajs/react';
import { InfoIcon, LoaderCircle, LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';

import { SharedData } from '@/types';
import { ICourse, ICourseCategory } from '@/types/course';
import { IPartner } from '@/types/partner';
import 'react-quill/dist/quill.snow.css';
import AdvancedRichTextEditor from '../../ui/form/AdvancedRichTextEditor';
import { Skeleton } from '../../ui/skeleton';
import CourseAdditionnalForm from './course-additionnal.form';
import CourseBasicInfoForm from './course-basic-info.form';

import RichTextCKEditor from '@/components/ui/form/RichTextCKEditor';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import axios from 'axios';
import { COURSE_DEFAULT_VALUES, createPayload, ICourseForm, PeriodicityUnitEnum } from './course.form.util';

export type ICourseFormErrors = { [key in keyof ICourseForm]?: string[] };

interface ICourseFormProps {
    course: ICourse | null;
    // initialData?: ICourseForm;
}

function CourseForm({ course }: ICourseFormProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const { data: sharedData } = usePage<SharedData>().props;
    const { data, setData, post, processing, reset } = useForm<ICourseForm>(COURSE_DEFAULT_VALUES);

    const [formHasBeenInitialized, setFormHasBeenInitialized] = useState(false);

    const [errors, setErrors] = useState<ICourseFormErrors>({});

    const descptionFormPart: { key: keyof ICourseForm; label: string; description?: string }[] = [
        {
            key: 'content',
            label: t('COURSE.FORM.CONTEN', 'Contenu'),
            description: t('COURSE.FORM.CONTENT_DESCRIPTION', 'Description détaillée du contenu du cours'),
        },
        { key: 'target_audience', label: t('COURSE.FORM.TARGET_AUDIENCE', 'Public cible') },
        // { key: 'summary', label: t('COURSE.FORM.SUMMARY', 'Résumé') },
        { key: 'pedagogical_objectives', label: t('COURSE.FORM.PEDAGOGICAL_OBJECTIVES', 'Objectifs pédagogiques') },
        { key: 'course_strengths', label: t('COURSE.FORM.COURSE_STRENGTHS', 'Points forts du cours') },
        { key: 'evaluation', label: t('COURSE.FORM.EVALUATION', 'Évaluation') },
        { key: 'prerequisites', label: t('COURSE.FORM.PREREQUISITES', 'Prérequis') },
        { key: 'why_choose', label: t('COURSE.FORM.WHY_CHOOSE', 'Pourquoi choisir ce cours ?') },
        { key: 'exam', label: t('COURSE.FORM.EXAM', 'Examen') },
    ];

    const [displayPrice, setDisplayPrice] = useState<string>(() => (data.price ? Number(data.price).toLocaleString('fr-FR') : ''));

    const fieldsetClasses = 'bg-white dark:bg-gray-800 mb-2 rounded-lg border p-4';

    const [openIndex, setOpenIndex] = useState<number | null>(2);
    const [categories, setCategories] = useState<ICourseCategory[]>([]);
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [selectedPartners, setSelectedPartners] = useState<number[]>([]);
    const [openPartnerDrawer, setOpenPartnerDrawer] = useState(false);
    const [partnerFilter, setPartnerFilter] = useState('');
    const partnerTags = Array.from(
        new Set(
            partners
                .map((p) => p.tag)
                .filter(Boolean)
                .flatMap((t) => t!.split(';').filter(Boolean)),
        ),
    );
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [orgLogoFile, setOrgLogoFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

    /**
     * Validates the course form data before submitting.
     *
     * This function checks for required fields and validates the price format.
     * If any required fields are missing or the price is invalid, it sets the
     * corresponding error messages. The errors are stored in the `errors` state.
     *
     * Returns `true` if the form data is valid and contains no errors, otherwise returns `false`.
     */
    const validationBeformSubmitForm = () => {
        const errors: { [key in keyof ICourseForm]?: string[] } = {};
        if (!data.title) {
            errors.title = [t('COURSE.FORM.TITLE_REQUIRED', 'Le titre est requis')];
        }
        if (!data.category_id) {
            errors.category_id = [t('COURSE.FORM.CATEGORY_REQUIRED', 'La catégorie est requise')];
        }
        // if (!data.duration) {
        //     errors.duration = [t('COURSE.FORM.DURATION_REQUIRED', 'La durée est requise')];
        // }
        // if (!data.periodicity_unit) {
        //     errors.periodicity_unit = [t('COURSE.FORM.PERIODICITY_UNIT_REQUIRED', "L'unité de périodicité est requise")];
        // }
        // if (!data.periodicity_value) {
        //     errors.periodicity_value = [t('COURSE.FORM.PERIODICITY_VALUE_REQUIRED', 'La valeur de périodicité est requise')];
        // }
        if (!data.price) {
            errors.price = [t('COURSE.FORM.PRICE_REQUIRED', 'Le prix est requis')];
        } else {
            const priceValue = parseFloat(data.price.toString().replace(/,/g, '.'));
            if (isNaN(priceValue) || priceValue < 0) {
                errors.price = [t('COURSE.FORM.PRICE_INVALID', 'Le prix doit être un nombre valide')];
            } else {
                setDisplayPrice(priceValue.toLocaleString('fr-FR'));
            }
        }
        if (!data.excerpt) {
            errors.excerpt = [t('COURSE.FORM.EXCERPT_REQUIRED', "L'extrait est requis")];
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const accordionIndex = {
        basicInfo: 1,
        description: 2,
        additionnal: 3,
    };

    /**
     * Initializes the form with a given course
     * @param course The course to initialize the form with
     */
    const handleInitializeForm = (course: ICourse) => {
        reset();
        setDisplayPrice('');

        setData('id', course.id);
        setData('excerpt', course.excerpt || '');
        setData('category_id', course?.category?.id?.toString() || '');
        setData('attachment', course.attachment || '');
        setData('lectures', course.lectures || 0);

        setData('duration', course.duration || '3');
        setData('periodicity_unit', course.periodicity_unit || PeriodicityUnitEnum.DAY);
        setData('periodicity_value', course.periodicity_value || 3); // <->duration
        
        setData('price', course.price ? course.price : '');
        setData('regular_price', course.regular_price ? Number(course.regular_price).toLocaleString('fr-FR') : '');
        setData('author', course.author || '');
        setData('image', course.image || '');
        setData('title', course.title || '');
        setData('partner_ids', course.partners ? course.partners.map((p) => p.id!) : []);
        setData('reference_tag', (course as any).reference_tag || '');
        setSelectedPartners(course.partners ? course.partners.map((p) => p.id!) : []);

        // setData('description', course.description || '');
        if (course.description) {
            course.description.content && setData('content', course.description.content);
            course.description.target_audience && setData('target_audience', course.description.target_audience);
            course.description.summary && setData('summary', course.description.summary);
            course.description.pedagogical_objectives && setData('pedagogical_objectives', course.description.pedagogical_objectives);
            course.description.course_strengths && setData('course_strengths', course.description.course_strengths);
            course.description.evaluation && setData('evaluation', course.description.evaluation);
            course.description.prerequisites && setData('prerequisites', course.description.prerequisites);
            course.description.why_choose && setData('why_choose', course.description.why_choose);
            course.description.exam && setData('exam', course.description.exam);
        }

        Logger.log('[handleInitializeForm] course:', course);
        Logger.log('[handleInitializeForm] data:', data);

        setFormHasBeenInitialized(true);
    };

    /**
     * @description
     * Submits the course form data to the server to create or update a course.
     * If the course is created, redirects to the course list page.
     * @param {ICourseForm} data Course form data
     * @param {boolean} draft If true, sets the course is_published field to false
     * @returns {Promise<void>}
     */
    const submit = async (data: ICourseForm, draft: boolean = false): Promise<void> => {
        setLoading(true);
        try {
            const isValid = validationBeformSubmitForm();
            if (!isValid) {
                Logger.log('[submit] Validation failed', errors);
                setLoading(false);
                return;
            }
            Logger.log('[submit] Preparing form data', { data, draft, thumbnail, logoFile, orgLogoFile, videoFile, galleryFiles });
            const routeName = data?.id ? 'dashboard.course.update' : 'dashboard.course.store';
            const formData = new FormData();
            const payload = createPayload(data, draft);

            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value as any);
                }
            });

            if (thumbnail) formData.append('media', thumbnail);
            if (logoFile) formData.append('logo', logoFile);
            if (orgLogoFile) formData.append('organization_logo', orgLogoFile);
            if (videoFile) formData.append('video', videoFile);
            if (galleryFiles) Array.from(galleryFiles).forEach((file) => formData.append('gallery[]', file));
            if (data?.id) formData.append('_method', 'PUT');
            Logger.log(' data.partner_ids', data.partner_ids);
            // if(!data?.partner_ids || data?.partner_ids?.length <= 0) {
            //     formData.append('partner_ids', JSON.stringify([]));
            // }

            Logger.log('[submit] formData:', formData);

            const response = await axios.post(data?.id ? route(routeName, course?.slug) : route(routeName), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Handle the response
            setLoading(false);
            if (response.status === 200 || response.status === 201) {
                Logger.log('[submit] Course submitted successfully', response.data);
                toast.success(t('COURSE.FORM.SUBMIT_SUCCESS', 'Formation soumise avec succès !'));
                router.visit(ROUTE_MAP.dashboard.course.list.link, { preserveScroll: true, preserveState: true });
            } else {
                Logger.error('[submit] Error submitting course', response);
                toast.error(t('COURSE.FORM.SUBMIT_ERROR', 'Erreur lors de la soumission de la formation'));
            }
            Logger.log('Course creation response:', response);

            // toast.success(t('courses.createSuccess', 'Formation créée avec succès !'));
            // return router.visit(ROUTE_MAP.dashboard.course.list.link);
        } catch (error: any) {
            handleErrorsRequest(error, setLoading, (message) => toast.error(message), setErrors);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        if (course) {
            handleInitializeForm(course);
        } else {
            setFormHasBeenInitialized(false);
            reset();
        }
        setLoading(false);
    }, [course]);

    useEffect(() => {
        Logger.log('{{ sharedData }}', sharedData);

        if (sharedData && sharedData.categories_with_courses) {
            setCategories(sharedData.categories_with_courses);
        } else {
            setCategories([]);
        }
        if (sharedData && (sharedData as any).partners) {
            setPartners((sharedData as any).partners);
        }
    }, [sharedData]);

    if (!sharedData || sharedData.categories_with_courses === undefined) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500">{t('courses.loading', 'Chargement des données...')}</div>
                <div className="flex h-full items-center justify-center">
                    <Skeleton className="h-12 w-1/2" />
                </div>
            </div>
        );
    }

    if (loading && !formHasBeenInitialized) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <div className="text-center text-gray-500">{t('courses.loading', 'Chargement des données...')}</div>
                <div>
                    <LoaderIcon className="h-12 w-12 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <>
            <form className="container mx-auto flex flex-col gap-8">
                {/* mx-auto  */}
                <h2 className="text-2xl font-bold">{data?.title ? data.title : 'Créer une formation'}</h2>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="col-span-1 md:col-span-5">
                        <div className="overflow-y-auto max-h-[75vh]">
                            <div className="toc-accordion mx-auto" id="tablesOfContentAccordion">
                                <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
                                    <div className="col-span-1 xl:col-span-4">
                                        {/* Bloc Informations principales  && Catégory*/}
                                        <div className="col-span-1 xl:col-span-3">
                                            <CourseBasicInfoForm
                                                fieldsetClasses={fieldsetClasses}
                                                data={data}
                                                courseSelected={course}
                                                categories={categories}
                                                setData={setData}
                                                processing={processing}
                                                errors={errors}
                                                onThumbnailChange={setThumbnail}
                                                onLogoChange={setLogoFile}
                                                onOrgLogoChange={setOrgLogoFile}
                                                onVideoChange={setVideoFile}
                                                onGalleryChange={setGalleryFiles}
                                            />
                                        </div>

                                        {/* Bloc Détails */}
                                        <div className="col-span-1 xl:col-span-1">
                                            <CourseAdditionnalForm
                                                fieldsetClasses={fieldsetClasses}
                                                data={data}
                                                courseSelected={course}
                                                setData={setData}
                                                processing={processing}
                                                errors={errors}
                                                partnerTags={partnerTags}
                                            />
                                        </div>

                                        {/* Bloc Description */}
                                        <section>
                                            <div className="flex items-center justify-between">
                                                <div className="toc-accordion-item mb-[15px] rounded-md w-full bg-white dark:bg-gray-800 ">
                                                    <button
                                                        className={`toc-accordion-button open lg:text-md relative block w-full cursor-pointertext-base font-medium ltr:text-left rtl:text-right ${
                                                            openIndex === accordionIndex.description ? 'open' : ''
                                                        }`}
                                                        type="button"
                                                        onClick={() => toggleAccordion(accordionIndex.description)}
                                                    >
                                                        <div className="p-[12px]">
                                                            <h3 className="text-lg font-semibold">{t('COURSE.FORM.DESCRIPTION', 'Description')}</h3>
                                                            <br />
                                                            <span className="text-sm text-gray-600 dark:text-white">
                                                                Decrivez le contenu de votre formation, les objectifs pédagogiques, le public cible,
                                                                etc. <br /> Vous pouvez deplier ou replier cette section. pour faciliter la lecture.
                                                            </span>
                                                        </div>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="absolute top-1/2 size-5 -translate-y-1/2 transform transition-transform duration-300 ease-in-out ltr:right-[20px] md:ltr:right-[25px] rtl:left-[20px] md:rtl:left-[25px]"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </button>

                                                    <div
                                                        className={`toc-accordion-collapse bg-gray-200 p-[12px] ${openIndex === accordionIndex.description ? 'open' : 'hidden'}`}
                                                    >
                                                        {descptionFormPart.map((item) => (
                                                            <fieldset key={item.key} className={fieldsetClasses}>
                                                                <legend className="px-2 text-base font-semibold">{item.label}</legend>
                                                                {item.description && (
                                                                    <div>
                                                                        <span>
                                                                            <InfoIcon className="inline-block mr-2 h-4 w-4 text-secondary" />
                                                                        </span>
                                                                        <span className="text-sm text-gray-600 dark:text-white">
                                                                            {item.description}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="grid gap-2">
                                                                    {item.key && (
                                                                        <div>
                                                                            {true && (
                                                                                <AdvancedRichTextEditor
                                                                                    label={item.label}
                                                                                    labelId={item.key}
                                                                                    value={data[item.key] as string}
                                                                                    onChange={(value: string) => setData(item.key, value)}
                                                                                    placeholder={`Saisissez ${item.label.toLowerCase()}...`}
                                                                                    height="250px"
                                                                                />
                                                                            )}
                                                                            {false && (
                                                                                <RichTextCKEditor
                                                                                    label={item.label}
                                                                                    labelId={item.key}
                                                                                    value={data[item.key] as string}
                                                                                    setData={(value: string) => setData(item.key, value)}
                                                                                />
                                                                            )}
                                                                            <InputError message={errors[item.key]} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </fieldset>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="col-span-1 md:col-span-1">
                                <div className="grid grid-cols-1 gap-4">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            submit(data, false);
                                        }}
                                        className="mt-2 "
                                        disabled={processing}
                                    >
                                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                        {course && course.id ? t('courses.update', 'Mettre à jour') : t('courses.create', 'Créer une formation')}
                                    </Button>
                                    {false && (
                                        <Button
                                            type="button"
                                            onClick={() => setOpenPartnerDrawer(true)}
                                            className="mt-2 bg-blue-400 hover:bg-blue-500"
                                            disabled={processing}
                                        >
                                            {t('courses.partners', 'Associer des partenaires')}
                                        </Button>
                                    )}
                                    {false && (
                                        <Button
                                            type="button"
                                            onClick={() => submit(data, true)}
                                            className="mt-2  bg-gray-400 hover:bg-gray-500 "
                                            disabled={processing}
                                        >
                                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                            {t('courses.create', 'Sauvegarder comme brouillon')}
                                        </Button>
                                    )}

                                    <div className="mt-[30vh] w-full">
                                        <Button
                                            type="button"
                                            onClick={() => router.visit(route('dashboard.course.index'))}
                                            className="mt-2  bg-red-400 hover:bg-red-500 w-full "
                                            disabled={processing}
                                        >
                                            {t('courses.cancel', 'Annuler')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires.
                </p>
            </form>
        </>
    );
}

export default CourseForm;
