import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ICourseSession, ICourseSessionSchedule } from '@/types/course';
import { Logger } from '@/utils/console.util';
import axios from 'axios';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSpinner } from 'react-icons/fa';

interface CourseSessionScheduleDialogProps {
    session: ICourseSession;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const CourseSessionScheduleDialog: React.FC<CourseSessionScheduleDialogProps> = ({ session, isOpen, onOpenChange }) => {
    const { t } = useTranslation();

    const [schedules, setSchedules] = React.useState<ICourseSessionSchedule[] | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(false);

    /**
     * Fetches the schedules for the given session ID.
     * If the session ID is not available, it will log a warning and return.
     * If the schedules are fetched successfully, it will set the schedules to the component state.
     * If there's an error, it will log the error and set the loading state to false.
     * Finally, it will set the loading state to false.
     */
    const getSchedule = () => {
        if (!session || !session.id) {
            Logger.warn('Session ID is not available');
            return;
        }
        setLoading(true);

        // Assuming you want to fetch schedules from an API
        return axios
            .get(route('course.session.schedules', { sessionId: session.id }))
            .then((response) => {
                Logger.log('Fetched schedules:', response.data);
                if (response.data && response.data && response.data.schedules) {
                    setSchedules(response.data.schedules);
                }
            })
            .catch((error) => {
                Logger.error('Error fetching schedules:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Generates a link to download the schedules as an .ics file.
     * If there's an error, it will log the error and return an empty string.
     * @returns {string} The link to download the schedules.
     */
    const handleDownloadCalendarLink = (): string => {
        try {
            return route('course.session.schedules.download', { sessionId: session.id });
        } catch (error) {
            Logger.error('Error in handleDownloadCalendarLink:', error);
            return '';
        }
    };

    React.useEffect(() => {
        if (isOpen && session && !schedules) {
            getSchedule();
        }
    }, [isOpen, session, schedules, getSchedule]);

    if (!session) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md" aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>
                        <span className="text-black dark:text-white mt-2">Horaire :</span>
                    </DialogTitle>
                    <DialogDescription id="dialog-description">
                        Vous pouvez télécharger le calendrier de la session pour avoir tous les horaires des formations.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className=" max-h-[200px] overflow-y-auto">
                        {loading ? (
                            <div>
                                <FaSpinner className="animate-spin text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-500 dark:text-gray-400">
                                    {' '}
                                    {t('COURSE.SCHEDULE.LOADING', 'Chargement des horaires...')}
                                </span>
                            </div>
                        ) : (
                            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                                {schedules &&
                                    schedules.map((schedule) => (
                                        <li className="mb-10 ms-4">
                                            <div className="absolute w-5 h-5 bg-gray-200 rounded-full mt-2.5 -start-2.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                                                {/* {schedule.date} */}
                                            </div>
                                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                {session.location}
                                            </time>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {schedule.start_time} - {schedule.end_time}
                                            </h3>
                                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                                {schedule.title}
                                                <br />
                                                {schedule.date}
                                            </p>
                                        </li>
                                    ))}

                                {schedules && schedules.length === 0 && (
                                    <li className="mb-10 ms-4">
                                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                            Aucun horaire disponible
                                        </time>
                                    </li>
                                )}
                            </ol>
                        )}
                    </div>

                    <DialogFooter>
                        {schedules && schedules.length > 0 && (
                            <a
                                href={handleDownloadCalendarLink()}
                                download={`calendrier_session_${session.id}.ics`}
                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-300"
                            >
                                Télécharger le calendrier
                            </a>
                        )}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseSessionScheduleDialog;
