import { BlogForm } from '@/components/blogs/BlogForm';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function BlogCreate() {
    const { data: sharedData } = usePage<SharedData>().props;

    const [blog, setBlog] = useState<IBlog | null>(null);
    const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
        {
            title: 'Blogs',
            href: route('dashboard.blogs.index'),
        },
    ]);

    const handleCancelForm = () => {
        // setBlog(null);
    };

    useEffect(() => {
        setBlogCategories(sharedData?.blogs?.categories ?? []);
    }, [sharedData?.blogs?.categories]);

    useEffect(() => {
        setBlog(sharedData?.blogs?.single ?? null);

        return setLoading(false);
    }, [sharedData, blog]);

    useEffect(() => {
        if (blog && blog.id) {
            setBreadcrumbs([
                {
                    title: 'Blogs/Actualités',
                    href: route('dashboard.blogs.index'),
                },
                {
                    title: 'Modifier le blog',
                    href: route('dashboard.blogs.edit', blog.slug),
                },
            ]);
        } else {
            setBreadcrumbs([
                {
                    title: 'Blogs/Actualités',
                    href: route('dashboard.blogs.index'),
                },
                {
                    title: 'Créer un blog',
                    href: route('dashboard.blogs.create'),
                },
            ]);
        }

        return;
    }, [blog, setBreadcrumbs]);

    if (loading) {
        return (
            <>
                <FaSpinner className="animate-spin text-2xl text-gray-500" />
                <div className="flex items-center justify-center h-full">Chargement...</div>
            </>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un blog" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <BlogForm blog={blog} categories={blogCategories} onCancel={handleCancelForm} />
            </div>
        </AppLayout>
    );
}
