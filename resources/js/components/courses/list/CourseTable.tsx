import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { getPeriodicity } from '@/utils/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CourseDurationBlock from '../CourseDurationBlock';

interface ICourseTableProps {
    courses: ICourse[];
}

export default function CourseTable({ courses }: ICourseTableProps) {
    const { t } = useTranslation();

    if (!courses || courses.length === 0) {
        return <div className="text-center text-2xl font-medium text-gray-600">Aucun cours disponible</div>;
    }

    return (
        <div className="mb-6 overflow-hidden rounded-md bg-white shadow-md dark:bg-[#1a1f33]">
            <div className="table-responsive overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="text-black dark:text-white">
                        <tr>
                            <th className="w-2/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap first:rounded-tl-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                {t('COURSE.TABLE.TITLE', 'Titre')}
                            </th>
                            <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                {t('COURSE.TABLE.NEXT_SESSION', 'Prochaine session')}
                            </th>
                            <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                {t('COURSE.TABLE.LANG', 'Langue')}
                            </th>
                            <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                {t('COURSE.TABLE.PRICE', 'Prix')}
                            </th>
                            <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                {t('COURSE.TABLE.REGISTER_COURSER', 'Inscrivez-vous')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-black dark:text-white">
                        {courses.map((item, index) => (
                            <tr key={index}>
                                <td className="w-2/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                    <div className="text-pretty">
                                        <Link
                                            className="underline hover:text-primary hover:shadow-2xl transition-all duration-300"
                                            href={ROUTE_MAP.courseDetail(item.category?.slug ?? '', item.slug).link}
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                </td>
                                <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                    <CourseDurationBlock location={item.location_mode} />
                                </td>
                                <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                    <CourseDurationBlock duration={getPeriodicity(item.periodicity_unit, item.periodicity_value)} />
                                </td>
                                <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                    <span className="block font-medium">FCFA {item.price / 100}</span>
                                </td>
                                <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                    <a
                                        href="#"
                                        className="inline-block animate-pulse text-green-400 underline hover:text-green-500 dark:text-green-400"
                                    >
                                        {t('COURSE.TABLE.REGISTER', "S'inscrire")}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
