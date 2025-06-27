import { ICourse } from '@/types/course';
import { useTranslation } from 'react-i18next';
import CourseCard from './courseCard';

interface CourseListProps {
    courses: ICourse[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const { t, i18n } = useTranslation();

    if (!courses || courses.length === 0) {
        return (
            <div className="col-span-3 flex h-[60vh] items-center justify-center text-center">
                <p className="text-gray-500">{t('courses.no_courses', 'Aucun cours disponible')}</p>
            </div>
        );
    }

    return (
        <>
            {courses.length === 0 ? (
                <div className="col-span-3 flex h-full items-center justify-center text-center">
                    <p className="text-gray-500">{t('courses.no_courses', 'Aucun cours disponible')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </>
    );
};

export default CourseList;
