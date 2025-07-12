import BlogGridList from '@/components/blogs/BlogGridList';
import BlogSidebar from '@/components/blogs/BlogSideBar';
import Pagination from '@/components/courses/card/coursePagination';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { ROUTE_MAP } from '@/utils/route.util';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Blogs() {
    const { t } = useTranslation();
    const pageTitle = t('PAGES.BLOGS', 'Blogs/Actualités');
    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: pageTitle, href: '#' },
    ];

    const { data } = usePage<SharedData>().props;

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    const tags = (): string[] => {
        const allTags: string[] = [];
        blogs.forEach((blog) => {
            if (blog.tags) {
                blog.tagArray = blog.tags.split(';').map((tag) => tag.trim());
            }

            blog.tagArray?.forEach((tag) => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            });
        });
        return allTags;
    };

    useEffect(() => {
        if (data.blogs && data.blogs.list) {
            console.log('Fetched blogs:', data.blogs.list);
            setBlogs(data.blogs.list);
        }
    }, [data.blogs]);

    useEffect(() => {
        if (data.blogs && data.blogs.categories) {
            setBlogCategories(data.blogs.categories);
        }
    }, [data.blogs]);

    const filteredBlogs = blogs.filter((blog) => {
        const matchCategory = selectedCategory ? blog.category?.id === selectedCategory : true;
        const matchTags = selectedTags.length ? selectedTags.every((tag) => blog.tags?.includes(tag)) : true;
        return matchCategory && matchTags;
    });

    const indexOfLast = currentPage * blogsPerPage;
    const indexOfFirst = indexOfLast - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.max(Math.ceil(filteredBlogs.length / blogsPerPage), 1);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <DefaultLayout title={pageTitle} description={pageTitle}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero breadcrumbItems={breadcrumbItems} title={pageTitle} />

                <div className={CLASS_NAME.section}>
                    <div className="container mx-auto">
                        <div className="grid grid-col-1 md:grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-4">
                                <BlogSidebar
                                    categories={blogCategories}
                                    tags={tags()}
                                    recentBlogs={blogs}
                                    onBlogClick={(id) => {
                                        const blog = blogs.find((b) => b.id === id);
                                        if (blog) {
                                            router.visit(ROUTE_MAP.public.blogs.detail(blog.slug).link);
                                        }
                                    }}
                                    onCategorySelect={(category) => {
                                        setSelectedCategory(category === selectedCategory ? null : category);
                                        setCurrentPage(1);
                                    }}
                                    onTagToggle={(tag) => {
                                        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <div className="py-[12px] md:py-[24px]">
                                    <BlogGridList blogs={currentBlogs} />
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
