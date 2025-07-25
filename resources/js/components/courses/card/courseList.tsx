import { ICourse } from '@/types/course';
import { useTranslation } from 'react-i18next';
import CourseCard from './courseCard';
import CourseSessionCreateDrawer from '../session/CourseSessionCreateDrawer';
import { useState } from 'react';

interface CourseListProps {
    courses: ICourse[];
    onDelete: (course: ICourse) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onDelete }) => {
    const { t, i18n } = useTranslation();
    const [openSessionDrawer, setOpenSessionDrawer] = useState(false);
    const [selectedCourseSession, setSelectedCourseSessionSession] = useState<ICourse | null>(null);

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
                <>
                    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} onDelete={onDelete} setOpenSessionDrawer={setOpenSessionDrawer} setSelectedCourseSessionSession={setSelectedCourseSessionSession} />
                        ))}
                    </div>

                    <div>
                        <CourseSessionCreateDrawer open={openSessionDrawer} setOpen={setOpenSessionDrawer} courseId={selectedCourseSession?.id} />
                    </div>
                </>
            )}
        </>
    );
};

export default CourseList;
