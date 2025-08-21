import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import SelectCustom, { ISelectItem } from '@/components/ui/select-custom';
import { SharedData } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PlusCircleIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/button/button';
import RichTextQuill from '../ui/form/RichTextQuill';
import TagInput from '../ui/tag-input';
import { BlogCategoryDialogEdit } from './BlogCategoryDialogEdit';

export interface IBlogForm {
    title: string;
    slug: string;
    excerpt: string;
    description: string;
    tags?: string;
    tagArray?: string[];
    status: boolean;
    blog_category_id?: number;
    [key: string]: any; // Allow additional properties
}

const createDefaultValues = (blog: IBlog | null): IBlogForm => {
    if (blog) {
        return {
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            description: blog.description,
            tags: blog.tags,
            status: blog.status,
            blog_category_id: blog.blog_category_id,
        };
    }
    return {
        title: '',
        slug: '',
        excerpt: '',
        description: '',
        tags: '',
        status: true,
        blog_category_id: undefined,
    };
};

interface BlogFormProps {
    blog: IBlog | null;
    categories?: IBlogCategory[];
    onCancel: () => void;
}

export const BlogForm = ({ blog = null, categories = [], onCancel }: BlogFormProps) => {
    const { t } = useTranslation();
    const { auth } = usePage<SharedData>().props;

    const { data, setData, processing, errors, reset } = useForm<IBlogForm>(createDefaultValues(blog));
    const [tags, setTags] = useState<string[]>([]); // createDefaultValues(blog).tags ||

    const [openCategoryEdit, setOpenCategoryEdit] = useState(false);

    useEffect(() => {
        setData('tags', tags.join(';'));
    }, [tags]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const routeUrl = blog ? route('dashboard.blogs.update') : route('dashboard.blogs.store');

        let payload = {
            ...(blog && { blog: blog.id }),
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            description: data.description,
            category_id: data.blog_category_id,
            user_id: auth.user.id,
            status: data.status,
            tags: data.tags
                    ?.split(';')
                    ?.filter((t: string) => t != '')
                    ?.map((tag: string) => tag.trim()) ?? null, 
        };

        axios
            .post(routeUrl, payload)
            .then((response) => {
                toast.success(t('Blog saved successfully', 'Blog enregistré avec succès'));
                reset();
                onCancel();
                router.visit(route('dashboard.blogs.index'));
            })
            .catch((error) => {
                toast.error(t('Error saving blog', "Erreur lors de l'enregistrement du blog"));
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
                    <label className="block text-sm font-medium">{t('Title', 'Titre')}</label>
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
                    <label className="block text-sm font-medium">{t('Category', 'Catégorie')}</label>
                    <div className="grid grid-cols-12">
                        <div className="col-span-11">
                            <SelectCustom
                                data={category_list()}
                                selectLabel={t('courses.category', 'Catégorie')}
                                processing={processing}
                                onValueChange={(value) => setData('blog_category_id', parseInt(value) ?? 0)}
                                defaultValue={data.blog_category_id ? String(data.blog_category_id) : undefined}
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
                    <label className="block text-sm font-medium">{t('Tags', 'Tags')}</label>
                    <TagInput tags={tags} onChange={setTags} placeholder="e.g., tech, news" />
                </div>

                <div>
                    <label className="block text-sm font-medium">{t('Content', 'Contenu')}</label>

                    <RichTextQuill
                        label={t('Description')}
                        labelId="description"
                        value={data.description as string}
                        setData={(value: string) => setData('description', value)}
                    />

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
                        <Button type="submit">{blog ? t('Update', 'Modifier') : t('Create', 'Sauvegarder')}</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
