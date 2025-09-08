import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { getPeriodicity, getPrice } from '@/utils/utils';
import { Link, router } from '@inertiajs/react';
import { Calendar, ChevronRight, Clock, Euro } from 'lucide-react';
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

    const durationValue = (item: ICourse): boolean | string => {
        return getPeriodicity(item.periodicity_unit, item.periodicity_value);
    };

    const handleClickRegisterCourse = (course: ICourse) => {
        router.visit(ROUTE_MAP.public.courses.detail(course.category?.slug ?? '', course.slug).link + '#course-dates', {
            preserveScroll: false,
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
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

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
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun cours disponible</h3>
                <p className="text-gray-500 dark:text-gray-400">Consultez notre catalogue plus tard pour de nouvelles formations</p>
            </div>
        );
    }

    return (
        <>
            {/* Vue mobile - Cards */}
            <div className="block lg:hidden space-y-4 mb-6">
                {courses.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1"
                    >
                        <div className="p-4 sm:p-6">
                            {/* Header de la card */}
                            <div className="mb-4">
                                <Link href={ROUTE_MAP.public.courses.detail(item.category?.slug ?? '', item.slug).link} className="block">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-tight">
                                        {item.title}
                                    </h3>
                                </Link>

                                {item.category && (
                                    <div className="mt-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                            {item.category.title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Informations du cours */}
                            <div className="space-y-3 mb-4">
                                {/* Prochaine session */}
                                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Prochaine session</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{getNextSession(item)}</p>
                                    </div>
                                </div>

                                {/* Durée et Prix */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Durée</p>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                <CourseDurationBlock duration={durationValue(item)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Euro className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Prix</p>
                                            <div
                                                className="text-sm font-semibold text-gray-900 dark:text-white"
                                                dangerouslySetInnerHTML={{ __html: getPrice(item.price) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bouton d'action */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => handleClickRegisterCourse(item)}
                                    className="w-full group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>{t('COURSE.TABLE.REGISTER', 'Voir toutes les dates')}</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vue desktop - Tableau amélioré */}
            <div className="hidden lg:block mb-6 overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="table-responsive overflow-x-auto">
                    <table className="w-full">
                        <thead className="text-gray-700 dark:text-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                            <tr>
                                <th className="w-4/12 px-6 py-4 font-semibold text-left">{t('COURSE.TABLE.TITLE', 'Formation')}</th>
                                <th className="px-6 py-4 font-semibold text-left">{t('COURSE.TABLE.NEXT_SESSION', 'Prochaine session')}</th>
                                <th className="px-6 py-4 font-semibold text-left">{t('COURSE.TABLE.DURATION', 'Durée')}</th>
                                <th className="px-6 py-4 font-semibold text-left">{t('COURSE.TABLE.PRICE', 'Prix')}</th>
                                <th className="px-6 py-4 font-semibold text-center">{t('COURSE.TABLE.REGISTER_COURSER', 'Action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {courses.map((item, index) => (
                                <tr key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <Link
                                                className="font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                                                href={ROUTE_MAP.public.courses.detail(item.category?.slug ?? '', item.slug).link}
                                            >
                                                {item.title}
                                            </Link>
                                            {item.category && (
                                                <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category.title}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="text-gray-700 dark:text-gray-300">{getNextSession(item)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* <Clock className="w-4 h-4 text-orange-500" /> */}
                                            <CourseDurationBlock duration={durationValue(item)} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* <Euro className="w-4 h-4 text-green-500" /> */}
                                            <span
                                                className="font-semibold text-gray-900 dark:text-white"
                                                dangerouslySetInnerHTML={{ __html: getPrice(item.price) }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {/* Bouton complet pour écrans >= 1278px */}
                                        <button
                                            className="cursor-pointer hidden xl-custom:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                                            onClick={() => handleClickRegisterCourse(item)}
                                        >
                                            {t('COURSE.TABLE.REGISTER', 'Voir les dates')}
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                        {/* Icône avec tooltip pour écrans < 1278px */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className="cursor-pointer xl-custom:hidden inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                                                    onClick={() => handleClickRegisterCourse(item)}
                                                >
                                                    <Calendar className="w-5 h-5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('COURSE.TABLE.REGISTER', 'Voir les dates')}</p>
                                            </TooltipContent>
                                        </Tooltip>
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
