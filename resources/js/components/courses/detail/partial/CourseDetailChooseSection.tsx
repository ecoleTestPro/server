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
                        {/* Header minimaliste */}
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t('COURSE.DETAIL.CHOOSE_SESSION', 'Choisir une session')}
                        </h2>

                        {/* Liste des sessions - Design épuré */}
                        <div className="space-y-3">
                            {course.course_sessions.map((session, index) => (
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

    // Formater les dates pour affichage simple
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
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

    return (
        <div
            className={`group border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                isAvailable()
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-600'
                    : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'
            }`}
        >
            {/* Layout responsive simple */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Informations session */}
                <div className="flex-1 space-y-2 sm:space-y-1">
                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(session.start_date)}</span>
                        {session.end_date && session.end_date !== session.start_date && (
                            <>
                                <ArrowRight className="w-3 h-3" />
                                <span>{formatDate(session.end_date)}</span>
                            </>
                        )}
                    </div>

                    {/* Lieu */}
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{session.location}</span>
                    </div>

                    {/* Statut de confirmation */}
                    {(session as any).is_confirmed && (
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                {t('COURSE.SESSION.CONFIRMED', 'Session confirmée')}
                            </span>
                        </div>
                    )}

                    {/* Prix */}
                    {price && price > 0 ? (
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">{price} FCFA</span>
                            {regular_price && regular_price > price && (
                                <span className="text-sm text-gray-500 line-through">{regular_price} FCFA</span>
                            )}
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                    {isAvailable() ? (
                        <button
                            onClick={handleClickRegister}
                            className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            {getSessionStatus() === 'ongoing'
                                ? t('COURSE.DETAIL.JOIN', "Rejoindre")
                                : t('COURSE.DETAIL.REGISTER', "S'inscrire")
                            }
                        </button>
                    ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {t('COURSE.DETAIL.SESSION_ENDED', 'Session terminée')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
