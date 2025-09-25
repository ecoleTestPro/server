import BlogDetail from '@/components/blogs/BlogDetail';
import BlogSidebar from '@/components/blogs/BlogSideBar';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { ROUTE_MAP } from '@/utils/route.util';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Page de détail d'un article de blog
 * Affiche l'article complet avec sidebar, navigation et métadonnées
 */
export default function BlogDetailPage() {
    const { t } = useTranslation();
    const [pageTitle, setPageTitle] = useState(t('PAGES.BLOG_DETAIL', 'Blog Detail'));
    const [breadcrumbItems, setBreadcrumbItems] = useState<IHeroBreadcrumbItems[]>([
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.BLOG', 'Blog'), href: ROUTE_MAP.public.blogs.list.link },
        { label: pageTitle, href: '#' },
    ]);

    const { data } = usePage<SharedData>().props;

    const [blog, setBlog] = useState<IBlog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<IBlog[]>([]);
    const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);

    const tags = (): string[] => {
        const allTags: string[] = [];
        recentBlogs.forEach((b) => {
            if (b.tags) {
                b.tagArray = b.tags.split(',');
            }
        });
        return allTags;
    };

    useEffect(() => {
        if (data.blogs) {
            setBlog(data.blogs.single);
            setRecentBlogs(data.blogs.list ?? []);
            setBlogCategories(data.blogs.categories ?? []);

            // if (data.blogs.single?.title) {
            //     const title = data.blogs.single.title;
            //     setPageTitle(title);
            //     setBreadcrumbItems([
            //         { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
            //         { label: t('PAGES.BLOG', 'Blog'), href: ROUTE_MAP.public.blogs.list.link },
            //         { label: title, href: '#' },
            //     ]);
            // }
        }
    }, [data.blogs, t]);

    return (
        <DefaultLayout title={pageTitle} description={blog?.excerpt || pageTitle}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero section plus compact */}
                <Hero title={blog?.title || pageTitle} description={blog?.excerpt || pageTitle} breadcrumbItems={breadcrumbItems} />

                {/* Contenu principal */}
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Article principal */}
                        <main className="lg:col-span-3 order-2 lg:order-1">
                            <BlogDetail blog={blog} />
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 order-1 lg:order-2">
                            <div className="sticky top-8 space-y-8">
                                <BlogSidebar
                                    categories={blogCategories}
                                    tags={tags()}
                                    recentBlogs={recentBlogs}
                                    onBlogClick={(id) => {
                                        const blog = recentBlogs.find((b) => b.id === id);
                                        if (blog) {
                                            router.visit(ROUTE_MAP.public.blogs.detail(blog.slug).link);
                                        }
                                    }}
                                    onCategorySelect={() => {}}
                                    onTagToggle={() => {}}
                                    onResetFilters={() => {}}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
