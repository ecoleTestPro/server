import { ICourse } from '@/types/course';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import './CourseCard.css'; // Link to CSS file

interface CourseCardProps {
    course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const CourseHeader = () => {
        return (
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-green-500">COURS</span>
            </div>
        );
    };

    const CourseTitle = () => {
        return <h2 className="mb-2 text-lg font-bold">{course.title}</h2>;
    };

    const CourseDescription = () => {
        return <p className="mb-4 text-gray-500">{course.description}</p>;
    };

    const CourseDuration = () => {
        return (
            <div className="mb-2 flex items-center">
                <div className="mr-4 flex items-center">
                    <FaClock className="mr-1 text-green-500" />
                    <span>{course.duration} jours</span>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    {/* <span>{course.locations.join(', ')}</span> */}
                </div>
            </div>
        );
    };

    const CourseFooter = () => {
        return (
            <div className="mb-2 flex items-center">
                <span className="mr-2">{course.price}</span>
                <button className="ml-auto rounded-md bg-green-500 px-4 py-2 text-white">Plus d'informations</button>
            </div>
        );
    };
    return (
        <div className="course-card w-full rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="course-card-header p-4">
                <CourseHeader />
                <CourseTitle />
            </div>
            <div className="course-card-body p-4">
                {/* <img src={course.image} alt={course.title} className="mb-4 h-32 w-full rounded-lg object-cover" /> */}
                <div className="course-card-content">
                    <CourseDescription />
                </div>
            </div>
            <div className="course-card-footer rounded-lg bg-green p-4">
                <CourseDuration />
                <CourseFooter />
            </div>
        </div>
    );
};

export default CourseCard;
