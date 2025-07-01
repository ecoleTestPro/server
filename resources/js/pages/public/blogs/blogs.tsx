import BlogGridList from '@/components/blogs/BlogGridList';
import BlogSidebar from '@/components/blogs/BlogSideBar';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Blogs() {
    const { t } = useTranslation();
    const pageTitle = t('PAGES.BLOGS', 'Blogs/Actualités');
    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: pageTitle, href: '#' },
    ];

    const { auth, data } = usePage<SharedData>().props;

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);

    const tags = (): string[] => {
        const allTags: string[] = [];
        return allTags;
        if (blogs && blogs.length > 0) {
            blogs.forEach((blog: IBlog) => {
                if (blog.tags && blog.tags.length > 0) {
                    blog.tags.forEach((tag: string) => {
                        if (!allTags.includes(tag)) {
                            allTags.push(tag);
                        }
                    });
                }
            });
        }
        return allTags;
    };

    useEffect(() => {
        if (data.blogs && data.blogs.list) {
            Logger.log('Blogs data:', data.blogs.list);
            setBlogs(data.blogs.list);
        }
    }, [data.blogs]);

    useEffect(() => {
        if (data.blogs && data.blogs.categories) {
            Logger.log('Blog categories:', data.blogs.categories);
            setBlogCategories(data.blogs.categories);
        }
    }, [data.blogs]);

    return (
        <DefaultLayout title={pageTitle} description={pageTitle}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero breadcrumbItems={breadcrumbItems} title={pageTitle} />

                <div className={CLASS_NAME.section}>
                    <div className="container">
                        <div className="grid grid-col-1 md:grid-cols-12">
                            <div className="col-span-12 md:col-span-4">
                                <BlogSidebar
                                    categories={blogCategories}
                                    tags={tags()}
                                    recentBlogs={blogs}
                                    onBlogClick={(blog) => {}}
                                    onCategorySelect={(category) => {}}
                                    onTagToggle={(tag) => {}}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <div className="py-[12px] md:py-[24px]">
                                    <BlogGridList blogs={blogs} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
