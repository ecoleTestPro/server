import BlogsDataTable from '@/components/blogs/BlogsDataTable';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookOpen, CirclePlus, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: '/dashboard/blogs',
    },
    {
        title: 'Dashboard',
        href: ROUTE_MAP.dashboard.dashboard.link,
    },
];

export default function BlogDashboard() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [categories, setCategories] = useState<IBlogCategory[]>([]);
    const [isLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selected, setSelected] = useState<IBlog | null>(null);

    useEffect(() => {
        if (data.blogs?.list) {
            Logger.log('Blogs data:', data.blogs.list);
            const blogsWithTags = data.blogs.list.map((blog: IBlog) => {
                if (blog.tags) {
                    blog.tagArray = blog.tags.split(';').map((tag) => tag.trim());
                }
                return blog;
            });
            setBlogs(blogsWithTags);
        }
        if (data.blogs?.categories) {
            Logger.log('Blog categories:', data.blogs.categories);
            setCategories(data.blogs.categories);
        }
    }, [data.blogs]);

    const handleEdit = (blog: IBlog) => {
        router.visit(route('dashboard.blogs.edit', blog.slug), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const onDelete = (blog: IBlog) => {
        setSelected(blog);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        if (selected) {
            router.delete(route('dashboard.blogs.delete', selected.id), {
                onSuccess: () => {
                    toast.success(t('Blog supprimé avec succès !'));
                    setShowConfirm(false);
                    setSelected(null);
                },
                onError: (errors) => {
                    Logger.error('Delete error:', errors);
                    toast.error(t('Erreur lors de la suppression du blog.'));
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Blogs')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* En-tête avec description, statistiques et bouton d'ajout */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 mb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('Blog Management', 'Gestion des Blogs')}</h1>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                                            <HelpCircle className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">
                                            Créez et gérez vos articles de blog. Organisez le contenu par catégories, ajoutez des tags et publiez des
                                            articles pour engager votre audience.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                Cette section vous permet de créer, modifier et organiser vos articles de blog. Vous pouvez rédiger du contenu riche
                                avec l'éditeur intégré, organiser vos articles par catégories, ajouter des tags pour améliorer la recherche et gérer
                                la publication. Les articles publiés apparaîtront automatiquement sur votre site web.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Publiés : {blogs.filter((b) => b.status).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>Brouillons : {blogs.filter((b) => !b.status).length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Catégories : {categories.length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span>Total : {blogs.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="bg-gray-200 text-black hover:text-white hover:bg-primary p-3 rounded-lg transition-colors flex items-center gap-2"
                                        href={route('dashboard.blogs.create')}
                                    >
                                        <CirclePlus className="h-5 w-5" />
                                        <span className="hidden sm:inline">Nouvel article</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Créer un nouvel article de blog avec éditeur riche, catégories et tags</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto flex h-full items-center justify-center">
                    {blogs && <BlogsDataTable blogs={blogs} onEditRow={handleEdit} onDeleteRow={onDelete} />}
                </div>
            </div>

            <ConfirmDialog
                open={showConfirm}
                title="Supprimer ce blog"
                description="Voulez-vous vraiment supprimer ce blog ? Cette action est irréversible."
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
                loading={isLoading}
            />
        </AppLayout>
    );
}
