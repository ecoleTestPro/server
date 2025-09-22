import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import SelectCustom from '@/components/ui/select-custom';
import { Switch } from '@/components/ui/switch';
import TooltipCustom from '@/components/ui/TooltipCustom';
import { ICourse } from '@/types/course';
import { Info } from 'lucide-react';
import { lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill-new/dist/quill.snow.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
import { ICourseForm, PERIODICITY_UNIT } from './course.form.util';
import { ICourseFormErrors } from './edit-course.form';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

interface CourseAdditionnalFormProps {
    fieldsetClasses?: string;
    data: ICourseForm;
    courseSelected: ICourse | null;
    setData: (data: string, value: string | number | boolean) => void;
    processing: boolean;
    errors: ICourseFormErrors & { location_mode?: string };
    partnerTags?: string[];
}

export default function CourseAdditionnalForm({
    fieldsetClasses,
    data,
    courseSelected,
    setData,
    processing,
    errors,
    partnerTags = [],
}: CourseAdditionnalFormProps) {
    const [displayPrice, setDisplayPrice] = useState<string>(() => (data.price ? Number(data.price).toLocaleString('fr-FR') : ''));

    useEffect(() => {
        setDisplayPrice(data.price ? Number(data.price).toLocaleString('fr-FR') : '');
    }, [data.price]);

    // Effet séparé pour l'initialisation des champs depuis le cours sélectionné
    useEffect(() => {
        if (courseSelected && !data.id) {
            // Initialisation du prix si vide
            if (courseSelected.price && (!data.price || data.price === '')) {
                setData('price', courseSelected.price.toString());
            }

            // Initialisation de la périodicité si vide ou non définie
            if (courseSelected.periodicity_unit && (!data.periodicity_unit || data.periodicity_unit === '')) {
                setData('periodicity_unit', courseSelected.periodicity_unit);
            } else if (!data.periodicity_unit) {
                setData('periodicity_unit', PERIODICITY_UNIT[0].value);
            }

            // Initialisation de la durée si vide ou non définie
            if (courseSelected.duration && (!data.duration || data.duration === '')) {
                setData('duration', courseSelected.duration.toString());
                setData('periodicity_value', courseSelected.duration.toString());
            } else if (courseSelected.periodicity_value && (!data.periodicity_value || data.periodicity_value === '' || Number(data.periodicity_value) === 0)) {
                // Si pas de durée mais une periodicity_value, utiliser cette valeur pour les deux
                setData('duration', courseSelected.periodicity_value.toString());
                setData('periodicity_value', courseSelected.periodicity_value.toString());
            } else if (!data.duration || data.duration === '') {
                setData('duration', '1');
                setData('periodicity_value', '1');
            }

            // Initialisation du mode de formation si vide ou non défini
            if ((courseSelected as any).location_mode && (!data.location_mode || data.location_mode === '')) {
                setData('location_mode', (courseSelected as any).location_mode);
            }
        }
    }, [courseSelected]);
    const { t } = useTranslation();

    return (
        <fieldset className={fieldsetClasses}>
            <legend className="px-2 text-base font-semibold">{t('courses.details', 'Détails')}</legend>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="col-span-2 gap-2">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="airplane-mode"
                                checked={!!data.is_featured}
                                onCheckedChange={(checked) => {
                                    setData('is_featured', checked);
                                }}
                            />
                            <Label htmlFor="airplane-mode">Mise en avant</Label>
                        </div>

                        <TooltipCustom tootipText="Permet de mettre en avant la formation">
                            <Info className="inline-block h-4 w-4 text-secondary" />
                        </TooltipCustom>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="price">
                        {t('courses.price', 'Prix')} (FCFA) <span className="text-red-500">*</span>
                    </Label>
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

                <div className="grid gap-2">
                    <Label htmlFor="duration">
                        {t('courses.duration', 'Durée')}
                        <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="duration"
                        type="number"
                        value={data.duration}
                        onChange={(e) => {
                            // Synchronize both duration and periodicity_value
                            const value = e.target.value;
                            setData('duration', value);
                            setData('periodicity_value', value);
                        }}
                        disabled={processing}
                        placeholder={t('courses.duration', 'Durée (ex: 10)')}
                        required
                        min="1"
                    />
                    <InputError message={errors.duration} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="periodicity_unit">
                        {t('courses.periodicity_unit', 'Unité de periodicité')}
                        {/* <span className="text-red-500">*</span> */}
                    </Label>
                    <SelectCustom
                        data={PERIODICITY_UNIT.map((unit) => ({ id: unit.value, title: unit.label, value: unit.value }))}
                        selectLabel={t('courses.periodicity', 'Choisir une unité')}
                        processing={processing}
                        onValueChange={(value) => setData('periodicity_unit', value)}
                        defaultValue={data.periodicity_unit ? String(data.periodicity_unit) : PERIODICITY_UNIT[0].value}
                        required
                    />
                    <InputError message={errors.periodicity_unit} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="location_mode">{t('courses.location_mode', 'Mode de formation')}</Label>
                    <Select
                        disabled={processing}
                        value={data.location_mode}
                        defaultValue={data.location_mode}
                        onValueChange={(value) => setData('location_mode', value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner le mode de formation" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{t('courses.location_mode', 'Mode de formation')}</SelectLabel>
                                <SelectItem value="En présentiel">En présentiel</SelectItem>
                                <SelectItem value="À distance">À distance</SelectItem>
                                <SelectItem value="En présentiel ou à distance">En présentiel ou à distance</SelectItem>
                                <SelectItem value="Hybride">Hybride</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.location_mode} />
                </div>
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
                {false && (
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
                )}

                {/* ! not used */}
                {false && (
                    <div className="grid gap-2">
                        <Label htmlFor="reference_tag">Tag de référence</Label>
                        <Input
                            list="partner-tags"
                            id="reference_tag"
                            type="text"
                            value={data.reference_tag ?? ''}
                            onChange={(e) => setData('reference_tag', e.target.value)}
                            disabled={processing}
                            placeholder="Tag de référence (ex: audit-conseil)"
                        />
                        <datalist id="partner-tags">
                            {partnerTags.map((tag) => (
                                <option key={tag} value={tag} />
                            ))}
                        </datalist>
                        <InputError message={errors.reference_tag} />
                    </div>
                )}
            </div>
        </fieldset>
    );
}
