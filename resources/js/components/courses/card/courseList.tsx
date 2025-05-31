import { ICourse } from '@/types/course';
import { useTranslation } from 'react-i18next';
import CourseCard from './courseCard';

interface CourseListProps {
    courses: ICourse[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            {courses.length === 0 ? (
                <div className="col-span-3 flex h-full items-center justify-center text-center">
                    <p className="text-gray-500">{t('courses.no_courses', 'Aucun cours disponible')}</p>
                </div>
            ) : (
                <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </>
    );
};

export default CourseList;
