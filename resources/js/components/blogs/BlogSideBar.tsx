import { CLASS_NAME } from '@/data/styles/style.constant';
import { IBlog, IBlogCategory } from '@/types/blogs';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface BlogSidebarProps {
    categories: IBlogCategory[];
    tags: string[];
    recentBlogs: IBlog[];
    selectedCategory?: number | null;
    selectedTags?: string[];
    onCategorySelect: (categoryId: number) => void;
    onTagToggle: (tag: string) => void;
    onBlogClick: (blogId: number) => void;
    onResetFilters: () => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
    categories,
    tags,
    recentBlogs,
    selectedCategory,
    selectedTags = [],
    onCategorySelect,
    onTagToggle,
    // onBlogClick, // Unused
    onResetFilters,
}) => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            {/* Blogs récents */}
            <div className={`${CLASS_NAME.bgWhite} m-4 p-2`}>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Récents</h3>
                <ul className="space-y-3">
                    {recentBlogs.map((blog) => (
                        <li key={blog.id}>
                            <Link
                                href={ROUTE_MAP.public.blogs.detail(blog.slug).link}
                                className="w-full text-left hover:text-primary hover:underline text-gray-700"
                            >
                                <div className="font-medium line-clamp-2">{blog.title}</div>
                                <div className="text-xs text-gray-400">{blog.created_at}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Catégories */}
            <div className={`${CLASS_NAME.bgWhite} m-4 p-2`}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Catégories</h3>
                    <button onClick={onResetFilters} className="text-sm text-primary hover:underline">
                        {t('FILTER.RESET', 'Réinitialiser')}
                    </button>
                </div>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                className={`w-full text-left px-3 py-2 rounded transition border ${
                                    selectedCategory === cat.id
                                        ? 'border-primary bg-blue-100 text-blue-700 font-bold'
                                        : 'border-transparent hover:bg-gray-100 text-gray-700 hover:border-gray-200'
                                }`}
                                onClick={() => onCategorySelect(cat.id)}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags */}
            <div className={`${CLASS_NAME.bgWhite} m-4 p-2`}>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs border transition ${
                                selectedTags.includes(tag)
                                    ? 'border-primary bg-blue-600 text-white'
                                    : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                            }`}
                            onClick={() => onTagToggle(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;
