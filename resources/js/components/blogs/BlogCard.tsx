import { IBlog } from '@/types/blogs';
import { ROUTE_MAP } from '@/utils/route.util';
import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface BlogCardProps {
    blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    const { t } = useTranslation();

    if (!blog) {
        return null;
    }

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
            onClick={() => {
                router.visit(ROUTE_MAP.public.blogs.detail(blog.slug).link, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }}
        >
            <img src={'https://placehold.co/600x400'} alt={blog.title} className="h-48 w-full object-cover" />
            <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                        {/* <span className="text-sm text-gray-500">{blog.author}</span> */}
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{blog.created_at}</span>
                    </div>
                </div>
              
            </div>
        </div>
    );
}
