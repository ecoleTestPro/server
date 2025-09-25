import { Badge } from '@/components/ui/badge';
import { IBlog } from '@/types/blogs';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogDetailProps {
    blog: IBlog | null;
}

/**
 * Formate une date en format lisible français
 */
const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Estime le temps de lecture basé sur le contenu
 */
const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Supprimer les balises HTML
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

export default function BlogDetail({ blog }: BlogDetailProps) {
    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Article introuvable</h3>
                    <p className="text-gray-500 dark:text-gray-400">Désolé, nous n'avons pas pu trouver cet article.</p>
                </div>
            </div>
        );
    }

    const readingTime = estimateReadingTime(blog.description);
    const tags = blog.tags ? blog.tags.split(',').map((tag) => tag.trim()) : [];

    return (
        <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
            {/* Image principale avec overlay */}
            {blog.image ? (
                <div className={`relative h-64 sm:h-80 lg:h-96 overflow-hidden`}>
                    {blog.image ? (
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    ) : (
                        ''
                    )}
                    {blog.image && <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />}

                    {/* Badge de catégorie si disponible */}
                    {blog.category && (
                        <div className="absolute top-6 left-6">
                            <Badge className="bg-primary/90 text-white border-0 font-medium px-3 py-1 text-sm">{blog.category.name}</Badge>
                        </div>
                    )}
                </div>
            ) : (
                ''
            )}

            {/* Contenu principal */}
            <div className="p-6 sm:p-8 lg:p-10">
                {/* En-tête de l'article */}
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{blog.title}</h1>

                    {/* Métadonnées */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        {blog.author && (
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium">{blog?.author?.name}</span>
                            </div>
                        )}

                        {blog.created_at && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {blog.created_at}
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min de lecture</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs font-normal text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </header>

                {/* Contenu de l'article */}
                <div
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-primary/20 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:px-1 prose-img:rounded-xl prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
            </div>

            {/* Footer avec actions */}
            <footer className="border-t border-gray-100 dark:border-gray-800 px-6 sm:px-8 lg:px-10 py-6">
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            Partager
                        </button>
                    </div> */}

                    {blog.updated_at && blog.updated_at !== blog.created_at && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Mis à jour le {formatDate(blog.updated_at)}</div>
                    )}
                </div>
            </footer>
        </article>
    );
}
