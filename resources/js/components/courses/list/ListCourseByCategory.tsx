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
                    <Link href={slug ? ROUTE_MAP.courseCategory(slug).link : '#'} className=" hover:underline">
                        {title}
                    </Link>
                ) : (
                    title || ''
                )}
            </h2>
            {coursesList.map((category) => (
                <CourseTable courses={category.courses || []} />
            ))}
        </div>
    );
};
