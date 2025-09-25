import { IBlog, IBlogCategory } from '@/types/blogs';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, Folder, Hash } from 'lucide-react';
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

/**
 * Formate une date en format lisible français
 */
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Estime le temps de lecture basé sur le contenu
 */
const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({
    categories,
    tags,
    recentBlogs,
    selectedCategory,
    selectedTags = [],
    onCategorySelect,
    onTagToggle,
    onResetFilters,
}) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            {/* Articles récents */}
            {recentBlogs.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Articles récents
                    </h3>
                    <div className="space-y-4">
                        {recentBlogs.slice(0, 5).map((blog) => (
                            <article key={blog.id} className="group">
                                <Link href={ROUTE_MAP.public.blogs.detail(blog.slug).link} className="block hover:no-underline">
                                    <div className="flex gap-3">
                                        {/* Image thumbnail */}
                                        <div className="flex-shrink-0">
                                            {blog.image ? (
                                                <img
                                                    src={blog.image || 'https://placehold.co/60x60/f3f4f6/6b7280'}
                                                    alt={blog.title}
                                                    className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"></div>
                                            )}
                                        </div>

                                        {/* Contenu */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-1">
                                                {blog.title}
                                            </h4>

                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {blog.created_at}
                                                </div>
                                                {/* <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{estimateReadingTime(blog.description)} min</span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {/* Catégories */}
            {categories.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Folder className="w-5 h-5 text-primary" />
                            Catégories
                        </h3>
                        {selectedCategory && (
                            <button onClick={onResetFilters} className="text-sm text-primary hover:text-primary/80 transition-colors">
                                Réinitialiser
                            </button>
                        )}
                    </div>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                                onClick={() => onCategorySelect(cat.id)}
                            >
                                <span>{cat.name}</span>
                                {/* Vous pouvez ajouter un compteur d'articles ici si disponible */}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Hash className="w-5 h-5 text-primary" />
                        Tags populaires
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 10).map((tag) => (
                            <button
                                key={tag}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                                    selectedTags.includes(tag)
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary/30'
                                }`}
                                onClick={() => onTagToggle(tag)}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Widget d'information supplémentaire */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Restez informé</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Découvrez nos derniers articles et insights sur les technologies et formations.
                </p>
                <Link
                    href={ROUTE_MAP.public.blogs.list.link}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                    Voir tous les articles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default BlogSidebar;
