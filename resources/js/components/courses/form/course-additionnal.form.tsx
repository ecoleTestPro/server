import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
import { ICourseForm, PERIODICITY_UNIT } from '../courseForm';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

interface CourseAdditionnalFormProps {
    fieldsetClasses?: string;
    data: ICourseForm;
    setData: (data: string, value: string | number) => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function CourseAdditionnalForm({ fieldsetClasses, data, setData, processing, errors }: CourseAdditionnalFormProps) {
    const [displayPrice, setDisplayPrice] = useState<string>(() => (data.price ? Number(data.price).toLocaleString('fr-FR') : ''));
    const { t } = useTranslation();

    return (
        <fieldset className={fieldsetClasses}>
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

                                {PERIODICITY_UNIT.map((unit) => (
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
    );
}
