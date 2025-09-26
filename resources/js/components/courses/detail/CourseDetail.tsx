import { ICourse } from '@/types/course';
import ChooseSection from './ChooseSection';
import CoursePartners from './CoursePartners';
import DescriptionCourse from './DescriptionCourse';
import QuestionCourse from './QuestionCourse';

interface CourseDetailProps {
    course: ICourse;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {

    return (
        <>
            <DescriptionCourse course={course} />
            <QuestionCourse course={course} />
            <ChooseSection course={course} />
            <div className="col-span-1 md:col-span-3">
                <CoursePartners partners={course.partners} />
            </div>
        </>
    );
};

export default CourseDetail;
