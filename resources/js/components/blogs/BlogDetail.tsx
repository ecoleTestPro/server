import { CLASS_NAME } from '@/data/styles/style.constant';
import { IBlog } from '@/types/blogs';

interface BlogDetailProps {
    blog: IBlog | null;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
    if (!blog) {
        return <div>Aucun blog trouvé.</div>;
    }

    return (
        <article className={`${CLASS_NAME.bgWhite} p-4`}> 
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{blog.title}</h1>
            <img src={'https://placehold.co/600x400'} alt={blog.title} className="w-full h-64 object-cover mb-4" />
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.description.map((d: any) => `<h3>${d.heading}</h3>${d.body}`).join('') }} />
        </article>
    );
}
