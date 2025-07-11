import { ICourseCategory } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import CourseTable from './CourseTable';

interface ListCourseByCategoryProps {
    title?: string;
    slug?: string;
    coursesList: ICourseCategory[];
}

export const ListCourseByCategory = ({ title, slug, coursesList }: ListCourseByCategoryProps) => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">
                {slug ? (
                    <Link href={slug ? ROUTE_MAP.public.courses.byCategory(slug).link : '#'} className=" hover:underline">
                        {title}
                    </Link>
                ) : (
                    title || ''
                )}
            </h2>
            {coursesList.map((category) => (
                <CourseTable key={category.id} courses={category.courses || []} />
            ))}
        </div>
    );
};
