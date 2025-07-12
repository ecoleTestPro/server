import BlogsDataTable from '@/components/blogs/BlogsDataTable';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import { CLASS_NAME } from '@/data/styles/style.constant';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusSquare } from 'lucide-react';
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
    const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
    // const [showForm, setShowForm] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selected, setSelected] = useState<IBlog | null>(null);

    useEffect(() => {
        if (data.blogs?.list) {
            Logger.log('Blogs data:', data.blogs.list);
            setBlogs(data.blogs.list);
        }
        if (data.blogs?.categories) {
            Logger.log('Blog categories:', data.blogs.categories);
            setCategories(data.blogs.categories);
        }
    }, [data.blogs]);

    const handleEdit = (blog: IBlog) => {
        setSelectedBlog(blog);
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
                <div className="flex justify-between items-center">
                    <h1>{t('Blogs')}</h1>

                    <Link className={`${CLASS_NAME.btn.primary}`} href={route('dashboard.blogs.create')}>
                        <span className="flex items-center">
                            <PlusSquare className="h-5 w-5" />
                            <span className="ml-2">{t('course.create', 'Créer un blog')}</span>
                        </span>
                    </Link>
                </div>

                <BlogsDataTable blogs={blogs} onEditRow={handleEdit} onDeleteRow={onDelete} />
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
