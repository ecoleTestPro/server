import { ICourse, ICoursePeriodicity, ICourseSession } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { ArrowRight, Calendar, CheckCircle, MapPin } from 'lucide-react';
import { RefObject, useEffect, useState } from 'react'; // Add necessary imports
import { useTranslation } from 'react-i18next';
import CourseInscriptionDialog from './CourseInscriptionDialog';

interface CourseDetailChooseSectionProps {
    course: ICourse;
    registrationRef?: RefObject<HTMLDivElement | null>; // Add ref prop
}

export default function CourseDetailChooseSection({ course, registrationRef }: CourseDetailChooseSectionProps) {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true); // State to control visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
    const [selectedSession, setSelectedSession] = useState<ICourseSession | undefined>(undefined);

    useEffect(() => {
        // Create Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the registration section is in view, hide the fixed section
                setIsVisible(!entry.isIntersecting);
            },
            {
                root: null, // Use viewport as root
                threshold: 0.1, // Trigger when 10% of the target is visible
            },
        );

        // Observe the registration section
        if (registrationRef?.current) {
            observer.observe(registrationRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (registrationRef?.current) {
                observer.unobserve(registrationRef.current);
            }
        };
    }, [registrationRef]);

    // Conditionally render the fixed section
    // if (!isVisible) return null;

    // Handle form submission (placeholder)
    const handleSubmit = (formData: { name: string; email: string; phone?: string; company?: string }) => {
        Logger.log('Form submitted:', { courseId: course.id, ...formData }); // Replace with API call
    };

    return (
        <>
            <style>
                {`
                    strong {
                        color: #1f2937; 
                    }
                `}
            </style>
            {/* fixed bottom-0 left-0 w-full z-50  */}
            {/*  ${isVisible ? 'translate-y-0' : 'relative -translate-y-full'} */}
            <div className={`transition-transform duration-300 ease-in-out`}>
                {course.course_sessions && course.course_sessions.length > 0 ? (
                    <div className="space-y-4">
                        {/* Liste des sessions - Design épuré */}
                        <div className="space-y-3">
                            {course.course_sessions
                                .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
                                .map((session, index) => (
                                    <CourseSessionCard
                                        key={index}
                                        session={session}
                                        courseTitle={course.title}
                                        handleClickRegister={() => {
                                            setSelectedSession(session);
                                            setIsDialogOpen(true);
                                        }}
                                        periodicity_unit={course.periodicity_unit}
                                        periodicity_value={course.periodicity_value}
                                        price={course.price}
                                        regular_price={course.regular_price}
                                    />
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">{t('COURSE.DETAIL.NO_SESSIONS', 'Aucune session programmée')}</p>
                    </div>
                )}
            </div>

            <CourseInscriptionDialog course={course} session={selectedSession} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
}

interface CourseSessionCardProps {
    session: ICourseSession;
    price: number;
    courseTitle?: string;
    regular_price: number;
    periodicity_unit: ICoursePeriodicity;
    periodicity_value: number;
    handleClickRegister: () => void;
}

export const CourseSessionCard = ({
    session,
    courseTitle,
    price,
    regular_price,
    periodicity_unit,
    periodicity_value,
    handleClickRegister,
}: CourseSessionCardProps) => {
    const { t } = useTranslation();

    if (!session) {
        return null;
    }

    // Helpers de formatage
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatDay = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric' });
    const formatMonth = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase();
    const formatYear = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric' });

    const formatPrice = (value?: number) => {
        if (typeof value !== 'number') return '';
        try {
            return new Intl.NumberFormat('fr-FR').format(value);
        } catch {
            return `${value}`;
        }
    };

    // Obtenir le statut de la session
    const getSessionStatus = () => {
        const now = new Date();
        const startDate = new Date(session.start_date);
        const endDate = new Date(session.end_date || session.start_date);

        if (now < startDate) {
            return 'upcoming'; // À venir
        } else if (now >= startDate && now <= endDate) {
            return 'ongoing'; // En cours
        } else {
            return 'ended'; // Terminée
        }
    };

    // Vérifier si la session est disponible pour inscription
    const isAvailable = () => {
        const status = getSessionStatus();
        // On peut s'inscrire si la session est à venir ou en cours
        return status === 'upcoming' || status === 'ongoing';
    };

    const [showSchedules, setShowSchedules] = useState(false);
    const [mode, setMode] = useState<'onsite' | 'online'>('onsite');

    // Prix: on privilégie celui de la session si disponible
    const effectivePrice = typeof session.price === 'number' && session.price > 0 ? session.price : price;

    return (
        <div
            className={`group rounded-xl transition-all duration-200 hover:shadow-md ${
                isAvailable()
                    ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'
            }`}
        >
            {/* Ligne principale */}
            <div className="flex flex-col gap-4 p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                    {/* Colonne date (badge vert) */}
                    <div className="md:col-span-3">
                        <div className="flex items-center gap-2">
                            {session.start_date && (
                                <div className="w-16 h-16 rounded-md bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center mx-auto md:mx-0">
                                    <div className="text-xl font-bold leading-5">{formatDay(session.start_date)}</div>
                                    <div className="text-[10px] font-semibold tracking-wide">{formatMonth(session.start_date)}</div>
                                    <div className="text-[10px] text-emerald-700">{formatYear(session.start_date)}</div>
                                </div>
                            )}
                            {session.start_date && session.end_date && (
                                <div className="w-16 flex items-center justify-center">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            )}
                            {session.start_date && session.end_date && (
                                <div className="w-16 h-16 rounded-md bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center mx-auto md:mx-0">
                                    <div className="text-xl font-bold leading-5">{formatDay(session.end_date)}</div>
                                    <div className="text-[10px] font-semibold tracking-wide">{formatMonth(session.end_date)}</div>
                                    <div className="text-[10px] text-emerald-700">{formatYear(session.end_date)}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Colonne infos (ville, langue, horaires) */}
                    <div className="md:col-span-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-3 text-gray-900 dark:text-white">
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium">{session.city || session.location}</span>
                                </span>
                                {session.language && (
                                    <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm6.728 9.75a7.478 7.478 0 01-.501 2.25h-3.42a13.07 13.07 0 000-4.5h3.42c.33.711.512 1.5.501 2.25zM12 4.5c1.392 0 2.68.402 3.767 1.092a11.56 11.56 0 00-1.19 2.658h-5.15A11.56 11.56 0 008.233 5.592 7.47 7.47 0 0112 4.5zm-4.727 3.75a11.56 11.56 0 00-1.19 2.658h-2.86a7.507 7.507 0 014.05-2.658zm-4.05 5.25h2.86a11.56 11.56 0 001.19 2.658 7.507 7.507 0 01-4.05-2.658zM12 19.5a7.47 7.47 0 01-3.767-1.092 11.56 11.56 0 001.19-2.658h5.15c.269.963.66 1.87 1.19 2.658A7.47 7.47 0 0112 19.5zm4.727-3.75a11.56 11.56 0 001.19-2.658h2.86a7.507 7.507 0 01-4.05 2.658zm-1.658-4.908a11.56 11.56 0 010 4.5H8.931a11.56 11.56 0 010-4.5h6.138z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="font-medium">{session.language}</span>
                                    </span>
                                )}
                            </div>

                            {showSchedules && session.schedules && session.schedules.length > 0 && (
                                <div className="mt-2 rounded-md bg-emerald-50 dark:bg-emerald-900/20 p-2 text-sm text-gray-700 dark:text-gray-200">
                                    <ul className="list-disc pl-4 space-y-1">
                                        {session.schedules.map((sc) => (
                                            <li key={sc.id}>
                                                {new Date(sc.date).toLocaleDateString('fr-FR')} • {sc.start_time} - {sc.end_time}
                                                {sc.title ? ` • ${sc.title}` : ''}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {(session as any).is_confirmed && (
                                <div className="flex items-center gap-2 mt-1">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {t('COURSE.SESSION.CONFIRMED', 'Session confirmée')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Séparateur vertical */}
                    <div className="hidden md:block md:col-span-1 h-full">
                        <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 mx-auto" />
                    </div>

                    {/* Colonne prix + action */}
                    <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col items-center md:items-end gap-2 md:gap-3">
                        <div className="text-right w-full sm:w-auto">
                            {typeof effectivePrice === 'number' && effectivePrice > 0 && (
                                <>
                                    <div className="text-gray-900 dark:text-white font-semibold text-lg">{formatPrice(effectivePrice)} FCFA</div>
                                    {regular_price && regular_price > (effectivePrice || 0) && (
                                        <div className="text-xs text-gray-500 line-through">{formatPrice(regular_price)} FCFA</div>
                                    )}
                                    {typeof (session as any).tva === 'number' && (
                                        <div className="text-[11px] text-gray-500">excl. {(session as any).tva}% TVA</div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="w-full sm:w-auto mt-1">
                            {isAvailable() ? (
                                <button
                                    onClick={handleClickRegister}
                                    className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    {t('COURSE.DETAIL.REGISTER', 'Inscription')}
                                </button>
                            ) : (
                                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center md:text-right">
                                    {t('COURSE.DETAIL.SESSION_ENDED', 'Session terminée')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
