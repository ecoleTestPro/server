import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Head, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogForm } from './BlogForm';

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
    const [showForm, setShowForm] = useState(false);

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

    const handleCreate = () => {
        setSelectedBlog(null);
        setShowForm(true);
    };

    const handleEdit = (blog: IBlog) => {
        setSelectedBlog(blog);
        setShowForm(true);
    };

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this blog?'))) {
            router.delete(`/dashboard/blogs/${id}`, {
                onSuccess: () => Logger.log('Blog deleted'),
                onError: (errors) => Logger.error('Delete error:', errors),
            });
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedBlog(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Blogs')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <h1>{t('Blogs')}</h1>
                    <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {t('Create Blog')}
                    </button>
                </div>
                {showForm ? (
                    <>
                        <BlogForm blog={selectedBlog} categories={categories} onCancel={handleCancel} />
                    </>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {t('Title')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {t('Category')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {t('Published')}
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {t('Actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {blogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* {categories.find((cat) => cat.id === blog.category_id)?.name || '-'} */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{/* {blog.published ? t('Yes') : t('No')} */}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-800 mr-4">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-800">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
