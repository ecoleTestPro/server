import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import SelectCustom, { ISelectItem } from '@/components/ui/select-custom';
import { SharedData } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PlusCircleIcon, HelpCircle, BookOpen, Tag as TagIcon, FileText, Eye, Globe } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/button/button';
import RichTextQuill from '../ui/form/RichTextQuill';
import TagInput from '../ui/tag-input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Switch } from '../ui/switch';
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
        <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 shadow-sm">
            {/* En-tête du formulaire */}
            <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {blog ? t('Edit Article', 'Éditer l\'article') : t('Create Article', 'Créer un article')}
                    </h2>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <HelpCircle className="h-5 w-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">
                                {blog ? 'Modifiez les informations de votre article et sauvegardez les changements.' : 'Créez un nouvel article avec titre, contenu riche, catégorie et tags pour engager votre audience.'}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {blog 
                        ? 'Modifiez votre article ci-dessous. N\'oubliez pas de sauvegarder vos changements.' 
                        : 'Remplissez les informations ci-dessous pour créer un nouvel article. Tous les champs marqués d\'un astérisque (*) sont obligatoires.'}
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Title', 'Titre')} *
                        </label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Le titre de votre article. Il apparaîtra comme titre principal sur votre site web. 
                                    Soyez descriptif et engageant pour attirer les lecteurs.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        placeholder="Ex: Les nouveautés de notre plateforme e-learning"
                        required
                    />
                    <InputError message={errors.title} />
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Category', 'Catégorie')} *
                        </label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    La catégorie aide à organiser vos articles et permet aux visiteurs 
                                    de naviguer plus facilement dans votre contenu. Choisissez la catégorie 
                                    la plus appropriée ou créez-en une nouvelle.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <SelectCustom
                                data={category_list()}
                                selectLabel={t('courses.category', 'Choisir une catégorie')}
                                processing={processing}
                                onValueChange={(value) => setData('blog_category_id', parseInt(value) ?? 0)}
                                defaultValue={data.blog_category_id ? String(data.blog_category_id) : undefined}
                                required
                            />
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" onClick={handleOpenCategoryEdit} className="bg-blue-600 hover:bg-blue-700 px-3">
                                    <PlusCircleIcon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Créer une nouvelle catégorie</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <BlogCategoryDialogEdit
                        category={null}
                        categories={categories}
                        open={openCategoryEdit}
                        onCancel={() => setOpenCategoryEdit(false)}
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <TagIcon className="h-4 w-4 text-blue-600" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Tags', 'Tags')}
                        </label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Les tags sont des mots-clés qui aident à catégoriser et retrouver vos articles. 
                                    Utilisez des termes pertinents comme "technologie", "formation", "actualités".
                                    Tapez et appuyez sur Entrée pour ajouter un tag.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <TagInput 
                        tags={tags} 
                        onChange={setTags} 
                        placeholder="Ex: formation, e-learning, nouveautés" 
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Les tags améliorent la recherche et l'organisation de vos articles
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Content', 'Contenu')} *
                        </label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Le contenu principal de votre article. Utilisez l'éditeur riche pour 
                                    formater le texte, ajouter des liens, des images et structurer votre contenu 
                                    de manière attrayante.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <RichTextQuill
                            label={t('Description')}
                            labelId="description"
                            value={data.description as string}
                            setData={(value: string) => setData('description', value)}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Utilisez la barre d'outils pour formater votre contenu (gras, italique, liens, listes, etc.)
                    </p>
                    <InputError message={errors.description} />
                </div>

                {/* Statut de publication */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('Publication Status', 'Statut de publication')}
                        </label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Choisissez si cet article doit être immédiatement visible sur votre site 
                                    (Publié) ou resté en mode brouillon pour modifications ultérieures.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Switch 
                            checked={data.status}
                            onCheckedChange={(checked) => setData('status', checked)}
                            id="publication-status"
                        />
                        <label htmlFor="publication-status" className="text-sm font-medium cursor-pointer">
                            {data.status ? (
                                <span className="text-green-600">Article publié (visible sur le site)</span>
                            ) : (
                                <span className="text-yellow-600">Brouillon (non visible)</span>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        onClick={() => router.visit(route('dashboard.blogs.index'))}
                        variant="outline"
                        className="px-6"
                    >
                        {t('Cancel', 'Annuler')}
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 px-8"
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {blog ? t('Updating...', 'Modification...') : t('Creating...', 'Création...')}
                            </span>
                        ) : (
                            blog ? t('Update Article', 'Modifier l\'article') : t('Create Article', 'Créer l\'article')
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
