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

    const handleDownloadCalendar = () => {
        if (!schedules || schedules.length === 0) {
            Logger.warn('No schedules available to download');
            return;
        }
        return axios
            .post(route('course.session.schedules.download', { sessionId: session.id }))
            .then((response) => {
                Logger.log('Calendar downloaded successfully:', response.data);
                // Handle the download logic here, e.g., trigger a file download
            })
            .catch((error) => {
                Logger.error('Error downloading calendar:', error);
            });
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
                    {loading ? (
                        <div>
                            <FaSpinner className="animate-spin text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400"> {t('COURSE.SCHEDULE.LOADING', 'Chargement des horaires...')}</span>
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

                    <DialogFooter>
                        {schedules && schedules.length > 0 && (
                            <button
                                onClick={handleDownloadCalendar}
                                type="button"
                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-300"
                            >
                                Télécharger le calendrier
                            </button>
                        )}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseSessionScheduleDialog;
