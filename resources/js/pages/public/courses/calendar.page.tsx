import CourseInscriptionDialog from '@/components/courses/detail/partial/CourseInscriptionDialog';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { ICourse, ICourseSession } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';

interface SessionWithCourse extends ICourseSession {
    course: ICourse;
}

export default function TrainingCalendarPage() {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState<SessionWithCourse[]>([]);
    const [selectedSessions, setSelectedSessions] = useState<SessionWithCourse[]>([]);
    const [selectedSession, setSelectedSession] = useState<SessionWithCourse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        axios
            .get(route('courses.calendar.sessions'))
            .then((res) => setSessions(res.data.sessions))
            .catch(() => {});
    }, []);

    const onDayClick = (value: Date) => {
        const daySessions = sessions.filter((s) => new Date(s.start_date).toDateString() === value.toDateString());
        setSelectedSessions(daySessions);
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const daySessions = sessions.filter((s) => new Date(s.start_date).toDateString() === date.toDateString());
            if (daySessions.length > 0) {
                return <span className="block w-2 h-2 rounded-full bg-green-500 mx-auto mt-1" />;
            }
        }
        return null;
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
                            <Calendar onClickDay={onDayClick} tileContent={tileContent} />
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-xl font-semibold mb-4">{t('CALENDAR.SESSIONS_LIST', 'Liste des sessions')}</h3>

                            <div className="mt-6 space-y-4">
                                {selectedSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="border rounded-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-lg text-black dark:text-white">{session.course?.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {session.start_date} - {session.end_date} - {session.location}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mt-2 md:mt-0">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 text-sm"
                                                onClick={() => {
                                                    setSelectedSession(session);
                                                    setOpenDialog(true);
                                                }}
                                            >
                                                {t('COURSE.DETAIL.REGISTER', 'Inscription')}
                                            </button>
                                            <a
                                                href={`${ROUTE_MAP.public.contact.link}?subject=Formation ${session.course?.title}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 text-sm"
                                            >
                                                {t('CALENDAR.CONTACT_US', 'Demander une autre date')}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedSession && (
                <CourseInscriptionDialog course={selectedSession.course} session={selectedSession} isOpen={openDialog} onOpenChange={setOpenDialog} />
            )}
        </DefaultLayout>
    );
}
