import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { getPeriodicity, getPrice } from '@/utils/utils';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseDurationBlock from '../CourseDurationBlock';
import CourseInscriptionDialog from '../detail/partial/CourseInscriptionDialog';

interface ICourseTableProps {
    courses: ICourse[];
    onDelete?: (course: ICourse) => void;
}

export default function CourseTable({ courses }: ICourseTableProps) {
    const { t } = useTranslation();
    const [courseSelected, setCourseSelected] = useState<ICourse | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClickRegisterCourse = (course: ICourse) => {
        router.visit(ROUTE_MAP.public.courses.detail(course.category?.slug ?? '', course.slug).link, {
            preserveScroll: true,
            preserveState: true,
        });
        // setCourseSelected(course);
        // setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setCourseSelected(null);
        setIsDialogOpen(false);
    };

    const getNextSession = (course: ICourse): string => {
        if (!course.course_sessions || course.course_sessions.length === 0) {
            return t('COURSE.TABLE.NO_UPCOMING_SESSION', 'N/A');
        }

        const now = new Date();
        const upcomingSessions = course.course_sessions
            .filter((session) => new Date(session.start_date) > now)
            .sort(
                (a, b) =>
                    new Date(a.start_date).getTime() -
                    new Date(b.start_date).getTime(),
            );

        const next = upcomingSessions[0];
        if (!next) {
            return t('COURSE.TABLE.NO_UPCOMING_SESSION', 'N/A');
        }

        if (next.end_date) {
            return `${next.start_date} - ${next.end_date}`;
        }

        return next.start_date;
    };

    if (!courses || courses.length === 0) {
        return <div className="text-center text-2xl font-medium text-gray-600">Aucun cours disponible</div>;
    }

    return (
        <>
            <div className="mb-6 overflow-hidden rounded-md bg-white shadow-md dark:bg-[#1a1f33]">
                <div className="table-responsive overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead className="text-black dark:text-white">
                            <tr>
                                <th className="w-4/12 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap first:rounded-tl-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.TITLE', 'Titre')}
                                </th>
                                <th className=" bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.NEXT_SESSION', 'Prochaine session')}
                                </th>
                                <th className=" bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.DURATION', 'Durée')}
                                </th>
                                <th className="bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.PRICE', 'Prix')}
                                </th>
                                <th className="bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.REGISTER_COURSER', 'Inscrivez-vous')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-black dark:text-white">
                            {courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="w-4/12 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <div className="text-pretty">
                                            <Link
                                                className="underline hover:text-primary hover:shadow-2xl transition-all duration-300"
                                                href={ROUTE_MAP.public.courses.detail(item.category?.slug ?? '', item.slug).link}
                                            >
                                                {item.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className=" border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {/* <CourseDurationBlock location={item.location_mode} /> */}
                                        <div className="text-pretty">{getNextSession(item)}</div>
                                    </td>
                                    <td className="border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <CourseDurationBlock duration={getPeriodicity(item.periodicity_unit, item.periodicity_value)} />
                                    </td>
                                    <td className="border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <span className="block font-medium text-pretty" dangerouslySetInnerHTML={{ __html: getPrice(item.price) }} />
                                    </td>
                                    <td className="border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <button
                                            className="inline-block animate-pulse text-green-400 underline hover:text-green-500 dark:text-green-400"
                                            onClick={() => handleClickRegisterCourse(item)}
                                        >
                                            {t('COURSE.TABLE.REGISTER', 'Toute les date')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {courseSelected && <CourseInscriptionDialog course={courseSelected} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />}
        </>
    );
}
