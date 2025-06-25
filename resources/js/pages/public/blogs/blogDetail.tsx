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

export default function BlogDetail() {
    const { t } = useTranslation();
    const [pageTitle, setPageTitle] = useState(t('PAGES.BLOG_DETAIL', 'Blog Detail'));
    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: pageTitle, href: '#' },
    ];

    const { auth, data } = usePage<SharedData>().props;

    const [blog, setBlog] = useState<IBlog | null>(null);
    // const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);

    const tags = (): string[] => {
        const allTags: string[] = [];
        return allTags;
    };

    useEffect(() => {
        if (data.blogs && data.blogs.list) {
            Logger.log('Blogs data:', data.blogs.list);
            setBlog(data.blogs.single);
        }
    }, [data.blogs]);

    return (
        <DefaultLayout title={pageTitle} description={pageTitle}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero breadcrumbItems={breadcrumbItems} title={pageTitle} />

                <div className={CLASS_NAME.section}>
                    <div className="container">
                        <div className="grid grid-col-1 md:grid-cols-12">
                            <div className="col-span-12 md:col-span-3">
                                {/* <BlogSidebar
                                    categories={blogCategories}d
                                    tags={tags()}
                                    recentBlogs={blogs}
                                    onBlogClick={(blog) => {}}
                                    onCategorySelect={(category) => {}}
                                    onTagToggle={(tag) => {}}
                                /> */}
                            </div>
                            <div className="col-span-12 md:col-span-9">
                                <div className="py-[12px] md:py-[24px]">
                                    <BlogDetail blog={blog} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
