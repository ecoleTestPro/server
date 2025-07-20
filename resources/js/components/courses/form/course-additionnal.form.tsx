import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import { Switch } from '@/components/ui/switch';
import TooltipCustom from '@/components/ui/TooltipCustom';
import { Info } from 'lucide-react';
import { lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select';
import { ICourseForm, PERIODICITY_UNIT } from './course.form.util';
import { ICourseFormErrors } from './edit-course.form';
import { ICourse } from '@/types/course';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

interface CourseAdditionnalFormProps {
    fieldsetClasses?: string;
    data: ICourseForm;
    courseSelected: ICourse | null;
    setData: (data: string, value: string | number) => void;
    processing: boolean;
    errors: ICourseFormErrors;
}

export default function CourseAdditionnalForm({ fieldsetClasses, data, courseSelected, setData, processing, errors }: CourseAdditionnalFormProps) {
    const [displayPrice, setDisplayPrice] = useState<string>(() => (data.price ? Number(data.price).toLocaleString('fr-FR') : ''));

    useEffect(() => {
        setDisplayPrice(data.price ? Number(data.price).toLocaleString('fr-FR') : '');
        if(courseSelected ) {
            courseSelected.price && data.price == '' && setData('price', courseSelected.price.toString()); 
        }
    }, [data.price]);
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
                                checked={data.is_featured}
                                onCheckedChange={(checked) => {
                                    setData('is_featured', checked ? '1' : '0');
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
                        {/*  <span className="text-red-500">*</span> */}
                    </Label>
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
                    <Label htmlFor="periodicity_unit">
                        {t('courses.periodicity_unit', 'Periodicité')} 
                        {/* <span className="text-red-500">*</span> */}
                    </Label>
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
                    <Label htmlFor="reference_tag">Tag de références</Label>
                    <Input
                        id="reference_tag"
                        type="text"
                        value={data.reference_tag ?? ''}
                        onChange={(e) => setData('reference_tag', e.target.value)}
                        disabled={processing}
                        placeholder="Tag de références (ex: audit-conseil)"
                    />
                    <InputError message={errors.reference_tag} />
                </div>
            </div>
        </fieldset>
    );
}
