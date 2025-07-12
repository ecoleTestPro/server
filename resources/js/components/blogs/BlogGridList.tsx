import { IBlog } from '@/types/blogs';
import MotionSection from '../motion/MotionSection';
import BlogCard from './BlogCard';

interface BlogGridListProps {
    blogs?: IBlog[];
}

export default function BlogGridList({ blogs }: BlogGridListProps) {
    if (!blogs || !blogs.length) {
        return (
            <div>
                <p className="text-center text-gray-500">Aucun blog trouvé.</p>
            </div>
        );
    }

    return (
        <MotionSection>
            <div>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4  gap-6">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="col-span-1">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionSection>
    );
}
