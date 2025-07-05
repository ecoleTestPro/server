import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { IBlogCategory } from '@/types/blogs';
import { Logger } from '@/utils/console.util';
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';

export interface BlogCategoryForm {
    name: string;
    [key: string]: any; // Allow additional properties
}

const createDefaultValues = (category: IBlogCategory | null): BlogCategoryForm => {
    if (category) {
        return {
            name: category.name,
        };
    }
    return {
        name: '',
    };
};

interface BlogCategoryFormProps {
    category: IBlogCategory | null;
    categories?: IBlogCategory[];
    onCancel: () => void;
}

export const BlogCategoryForm = ({ category = null, onCancel, categories = [] }: BlogCategoryFormProps) => {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm<BlogCategoryForm>(createDefaultValues(category));
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        axios
            .post(route('dashboard.blogs.category.store'), data)
            .then((response) => {
                Logger.log('Category saved successfully:', response.data);
                toast.success(t('Category saved successfully', 'Catégorie enregistrée avec succès'));
                reset();
                onCancel();
            })
            .catch((error) => {
                Logger.error('Error saving category:', error);
                toast.error(t('Error saving category', "Erreur lors de l'enregistrement de la catégorie"));
            });
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-white dark:bg-gray-800">
            {/* <h2>{blog ? t('Edit Blog') : t('Create Blog')}</h2> */}
            {/* onSubmit={handleSubmit} */}
            <h2 className="text-lg font-semibold">
                {category ? t('Edit Category', 'Modifier la catégorie') : t('Create Category', 'Créer une catégorie')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {category
                    ? t('Edit the category details below.', 'Modifier les détails de la catégorie ci-dessous.')
                    : t('Fill in the details to create a new category.', 'Remplissez les détails pour créer une nouvelle catégorie.')}
            </p>

            {categories && categories.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">{t('Existing Categories', 'Catégories existantes')}</label>
                    <ul className="list-disc pl-5">
                        {categories.map((cat) => (
                            <li key={cat.id} className="text-sm text-gray-700 dark:text-gray-300">
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">{t('Title')}</label>
                    <Input
                        type="name"
                        name="title"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="flex justify-between gap-2">
                    <Button type="button" onClick={() => router.visit(route('dashboard.blogs.index'))} className="mt-2  bg-red-400 hover:bg-red-500 ">
                        {t('Cancel', 'Annuler')}
                    </Button>

                    <Button type="button">{category ? t('Update', 'Modifier') : t('Create', 'Sauvegarder')}</Button>
                </div>
            </form>
        </div>
    );
};
