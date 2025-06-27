import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import './CourseCard.css'; // Link to CSS file

interface CourseCardProps {
    course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const CourseHeader = () => {
        return (
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-green-500">Formation</span>
                {course.is_featured && <span className="text-sm text-yellow-500">FEATURED</span>}
            </div>
        );
    };

    const CourseTitle = () => {
        return <h2 className="mb-2 text-lg font-bold">{course.title}</h2>;
    };

    const CourseDescription = () => {
        return <p className="mb-4 text-gray-500">{course.excerpt}</p>;
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
                    <span>{course.location_mode}</span>
                </div>
            </div>
        );
    };

    const CourseFooter = () => {
        const formatPrice = (price: number, includesTax: boolean) => {
            const currency = 'XOF';
            return includesTax ? `${price.toLocaleString()} ${currency} (Tax Incl.)` : `${price.toLocaleString()} ${currency} (Excl. Tax)`;
        };

        return (
            <div>
                <div className="mb-2 flex items-center">
                    <div className="mr-2">
                        {course.regular_price > course.price && (
                            <span className="mr-2 text-gray-500 line-through">{course.regular_price.toLocaleString()} XOF</span>
                        )}
                        <span className="text-lg font-semibold">{formatPrice(course.price, course.price_includes_tax)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        {course && (
                            <Link
                                href={ROUTE_MAP.public.courses.detail(course?.category?.slug ?? '#', course.slug).link}
                                className="rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-primary hover:text-white  hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Voir plus
                            </Link>
                        )}
                    </div>

                    <div className="flex gap-x-2">
                        <Link
                            href={ROUTE_MAP.dashboard.course.edit(course.slug).link}
                            className="text-green-400 p-4 rounded-full hover:bg-green-400 hover:text-white"
                            type="button"
                        >
                            <Edit2Icon className="w-4 h-4  " />
                        </Link>
                        <button className="text-red-500 p-4 rounded-full hover:bg-red-400 hover:text-white" type="button">
                            <Trash2Icon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const CourseAttachment = () => {
        return course.attachment ? (
            <div className="mb-2 flex items-center">
                <span className="text-sm text-gray-600">Attachment: {course.attachment}</span>
            </div>
        ) : null;
    };

    const CourseStatus = () => {
        return (
            <div className="mb-2 flex items-center">
                <span className="text-sm text-gray-600">Status: {course.is_published ? 'Published' : 'Draft'}</span>
                {course.is_published && <span className="ml-2 text-sm text-green-500">Active</span>}
            </div>
        );
    };

    return (
        <div className="course-card w-full rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="course-card-header px-4 pt-2">
                <CourseHeader />
                <CourseTitle />
            </div>
            <div className="course-card-body p-4">
                <div className="course-card-content">
                    <CourseDescription />
                    <CourseAttachment />
                    <CourseStatus />
                </div>
            </div>
            <div className="course-card-footer bg-green rounded-lg p-4">
                <CourseDuration />
                <CourseFooter />
            </div>
        </div>
    );
};

export default CourseCard;
