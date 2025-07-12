import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import SelectCustom, { ISelectItem } from '@/components/ui/select-custom';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { router, useForm } from '@inertiajs/react';
import { PlusCircleIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';
import RichTextLexical from '../ui/form/TextLexical/RichTextLexical';
import TagInput from '../ui/tag-input';
import { BlogCategoryDialogEdit } from './BlogCategoryDialogEdit';

export interface BlogForm {
    title: string;
    slug: string;
    excerpt: string;
    description: string;
    tags?: string;
    tagArray?: string[];
    status: boolean;
    category_id?: number;
    [key: string]: any; // Allow additional properties
}

const createDefaultValues = (blog: IBlog | null): BlogForm => {
    if (blog) {
        return {
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            description: blog.description,
            tags: blog.tags,
            status: blog.status,
            // category_id: blog.category_id,
        };
    }
    return {
        title: '',
        slug: '',
        excerpt: '',
        description: '',
        tags: '',
        status: false,
    };
};

interface BlogFormProps {
    blog: IBlog | null;
    categories?: IBlogCategory[];
    onCancel: () => void;
}

export const BlogForm = ({ blog = null, categories = [], onCancel }: BlogFormProps) => {
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset } = useForm<BlogForm>(createDefaultValues(blog));
    const [tags, setTags] = useState<string[]>([]); // createDefaultValues(blog).tags ||

    const [openCategoryEdit, setOpenCategoryEdit] = useState(false);

    useEffect(() => {
        setData('tags', tags.join(';'));
    }, [tags]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const routeUrl = blog ? route('dashboard.blogs.update') : route('dashboard.blogs.store');

        router.visit(routeUrl, {
            method: 'post',
            data: {
                ...(blog && { blog: blog.id }),
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                description: data.description,
                category_id: data.category_id,
                status: data.status ? '1' : '0',
                // tags: JSON.stringify(tags),
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const category_list = (): ISelectItem[] => {
        return categories.map((category) => ({
            id: category.id,
            title: category.name,
            value: category.id,
        }));
    };

    const handleOpenCategoryEdit = () => {
        setOpenCategoryEdit(true);
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-white dark:bg-gray-800">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">{t('Title')}</label>
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        required
                    />
                    <InputError message={errors.title} />
                </div>

                <div>
                    <label className="block text-sm font-medium">{t('Category')}</label>
                    <div className="grid grid-cols-12">
                        <div className="col-span-11">
                            <SelectCustom
                                data={category_list()}
                                selectLabel={t('courses.category', 'Catégorie')}
                                processing={processing}
                                onValueChange={(value) => setData('category_id', parseInt(value) ?? 0)}
                                required
                            />
                        </div>
                        <Button type="button" onClick={handleOpenCategoryEdit} className="bg-gray-400 hover:bg-gray-500 ">
                            <PlusCircleIcon className="h-5 w-5" />
                        </Button>
                    </div>

                    <BlogCategoryDialogEdit
                        category={null}
                        categories={categories}
                        open={openCategoryEdit}
                        onCancel={() => setOpenCategoryEdit(false)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">{t('Tags')}</label>
                    <TagInput tags={tags} onChange={setTags} placeholder="e.g., tech, news" />
                </div>

                <div>
                    <label className="block text-sm font-medium">{t('Content')}</label>

                    <RichTextLexical
                        label={t('Description')}
                        labelId="description"
                        value={data.description as string}
                        setData={(value: string) => setData('description', value)}
                    />

                    {/* <RichTextQuill
                        label={t('Description')}
                        labelId="description"
                        value={data.description as string}
                        setData={(value: string) => setData('description', value)}
                    /> */}

                    <InputError message={errors.description} />
                </div>

                <div className="flex justify-between gap-2">
                    <div>
                        <Button
                            type="button"
                            onClick={() => router.visit(route('dashboard.blogs.index'))}
                            className="mt-2  bg-red-400 hover:bg-red-500 "
                        >
                            {t('Cancel', 'Annuler')}
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button type="button" className="bg-gray-300 hover:bg-gray-600 dark:bg-gray-600 rounded-md" onClick={onCancel}>
                            Brouillon
                        </Button>

                        <Button type="submit">{blog ? t('Update', 'Modifier') : t('Create', 'Sauvegarder')}</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
