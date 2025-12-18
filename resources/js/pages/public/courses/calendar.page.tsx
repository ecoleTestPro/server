import CourseDetailOverview from '@/components/courses/detail/partial/CourseDetailOverview';
import CourseInscriptionDialog from '@/components/courses/detail/partial/CourseInscriptionDialog';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import Drawer from '@/components/ui/drawer';
import DefaultLayout from '@/layouts/public/front.layout';
import { ICourse, ICourseSession } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

// Enregistrer la locale française
registerLocale('fr', fr);

interface SessionWithCourse extends ICourseSession {
    course: ICourse;
}

export default function TrainingCalendarPage() {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState<SessionWithCourse[]>([]);
    const [selectedSessions, setSelectedSessions] = useState<SessionWithCourse[]>([]);
    const [selectedSession, setSelectedSession] = useState<SessionWithCourse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [openCourseDrawer, setOpenCourseDrawer] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

    useEffect(() => {
        axios
            .get(route('courses.calendar.sessions'))
            .then((res) => setSessions(res.data.sessions))
            .catch(() => {});
    }, []);

    const onDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            const daySessions = sessions.filter((s) => new Date(s.start_date).toDateString() === date.toDateString());
            setSelectedSessions(daySessions);
        }
    };

    const dayClassName = (date: Date) => {
        const daySessions = sessions.filter((s) => new Date(s.start_date).toDateString() === date.toDateString());
        if (daySessions.length > 0) {
            return 'has-sessions';
        }
        return '';
    };

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('CALENDAR.TITLE', 'Calendrier des formations'), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('CALENDAR.TITLE', 'Calendrier des formations')}
            description={t('CALENDAR.DESCRIPTION', 'Consultez nos sessions et inscrivez-vous.')}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('CALENDAR.TITLE', 'Calendrier des formations')}
                    description={t('CALENDAR.DESCRIPTION', 'Consultez nos sessions et inscrivez-vous.')}
                    breadcrumbItems={breadcrumbItems}
                />
                <div className="container mx-auto my-8 p-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">{t('CALENDAR.SESSIONS', 'Sessions disponibles')}</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('CALENDAR.SESSIONS_DESCRIPTION', 'Sélectionnez une date pour voir les sessions disponibles.')}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                            <style>{`
                                .has-sessions {
                                    background-color: #10B981 !important;
                                    color: white !important;
                                    border-radius: 50% !important;
                                }
                            `}</style>
                            <DatePicker
                                selected={selectedDate}
                                onChange={onDateChange}
                                locale="fr"
                                inline
                                dayClassName={dayClassName}
                                className="w-full"
                                calendarStartDay={1}
                            />
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-semibold mb-4">{t('CALENDAR.SESSIONS_LIST', 'Liste des sessions')}</h3>
                            <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
                                {selectedSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="border rounded-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                                    >
                                        <div className="grid grid-cols-1 gap-y-4 ">
                                            <div>
                                                <h3 className="font-semibold text-lg text-black dark:text-white">{session.course?.title}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {session.start_date} - {session.end_date} - {session.location}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 mt-2 md:mt-0">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 text-sm cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedSession(session);
                                                        setOpenDialog(true);
                                                    }}
                                                >
                                                    {t('COURSE.DETAIL.REGISTER', 'Inscription')}
                                                </button>{' '}
                                                {false && (
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 text-sm"
                                                        onClick={() => {
                                                            setSelectedCourse(session.course);
                                                            setOpenCourseDrawer(true);
                                                        }}
                                                    >
                                                        {t('CALENDAR.VIEW_COURSE', 'Voir la formation')}
                                                    </button>
                                                )}
                                                {false && (
                                                    <Link
                                                        href={`${ROUTE_MAP.public.contact.link}?subject=Formation ${session.course?.title}`}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 text-sm"
                                                    >
                                                        {t('CALENDAR.CONTACT_US', 'Demander une autre date')}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {selectedDate && selectedSessions.length === 0 && (
                                    <p className="text-gray-500 dark:text-gray-400 text-center">
                                        {t('CALENDAR.NO_SESSIONS', 'Aucune session prévue pour cette date.')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedSession && (
                <CourseInscriptionDialog course={selectedSession.course} session={selectedSession} isOpen={openDialog} onOpenChange={setOpenDialog} />
            )}
            {selectedCourse && (
                <Drawer
                    title={t('CALENDAR.COURSE_DETAIL', 'Détails de la formation')}
                    open={openCourseDrawer}
                    setOpen={setOpenCourseDrawer}
                    component={<CourseDetailOverview course={selectedCourse} />}
                    maxWidth="max-w-3/4"
                />
            )}
        </DefaultLayout>
    );
}
