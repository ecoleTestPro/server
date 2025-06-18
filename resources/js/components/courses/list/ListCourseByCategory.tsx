import { ICourseCategory } from '@/types/course';
import CourseTable from './CourseTable';

interface ListCourseByCategoryProps {
    title?: string;
    coursesList: ICourseCategory[];
}

export const ListCourseByCategory = ({ title, coursesList }: ListCourseByCategoryProps) => {
    return (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            {coursesList.map((category) => (
                <CourseTable courses={category.courses?.slice(0, 5) || []} />
            ))}
        </div>
    );
};
