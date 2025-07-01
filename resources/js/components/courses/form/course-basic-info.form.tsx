import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { PeriodicityUnitEnum } from '@/types/course';
import SelectCustom, { ISelectItem } from '@/components/ui/select-custom';
import { ICourseCategory } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { Textarea } from '../../ui/text-area';
import { ICourseForm } from './course.form.util';

// const ReactQuill = lazy(() => import('react-quill'));
const ReactQuill = lazy(() => import('react-quill-new'));

interface CourseBasicInfoFormProps {
    fieldsetClasses?: string;
    data: ICourseForm;
    setData: (data: string, value: string | number) => void;
    processing: boolean;
    errors: Record<string, string>;
    categories: ICourseCategory[];
}

export default function CourseBasicInfoForm({ fieldsetClasses, data, setData, processing, errors, categories }: CourseBasicInfoFormProps) {
    const { t } = useTranslation();

    const category_list = (): ISelectItem[] => {
        return categories.map((category) => ({
            id: category.id!,
            title: category.title,
            value: category.id!.toString(),
            subItem:
                category.children?.map((subCategory) => ({
                    id: subCategory.id!,
                    title: subCategory.title,
                    value: subCategory.id!.toString(),
                })) || [],
        }));
    };

    useEffect(() => {
        Logger.log('CourseBasicInfoForm mounted', {
            fieldsetClasses,
            data,
            processing,
            errors,
            categories,
        });
    }, [fieldsetClasses, data, processing, errors, categories]);

    return (
        <>
            {/* BAsic info */}
            <fieldset className={fieldsetClasses}>
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
                            autoComplete="on"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="excerpt">{t('courses.excerpt', 'Extrait')}</Label>
                        <Textarea
                            id="excerpt"
                            required
                            rows={3}
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.excerpt', 'Aperçu')}
                        />
                        <InputError message={errors.excerpt} />
                    </div>
                </div>
            </fieldset>

            {/* Catégorie */}
            <fieldset className={fieldsetClasses}>
                <legend className="px-2 text-base font-semibold">{t('courses.category', 'Catégorie')}</legend>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        {/* <Label htmlFor="title">{t('courses.category', 'Catégorie')}</Label> */}

                        {categories && categories.length > 0 && (
                            <SelectCustom
                                data={category_list()}
                                selectLabel={t('courses.category', 'Catégorie')}
                                processing={processing}
                                onValueChange={(value) => setData('category_id', value)}
                                required
                            />
                        )}

                        <InputError message={errors.category_id} />
                    </div>
                </div>
            </fieldset>
        </>
    );
}
