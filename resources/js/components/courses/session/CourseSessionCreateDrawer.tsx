import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { ICourseSession } from '@/types/course';
import { Logger } from '@/utils/console.util';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CourseSessionCreateDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    courseId?: number;
}

interface SessionForm {
    start_date: string;
    end_date: string;
    location: string;
}

const emptySession: SessionForm = { start_date: '', end_date: '', location: '' };

export default function CourseSessionCreateDrawer({ open, setOpen, courseId }: CourseSessionCreateDrawerProps) {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState<SessionForm[]>([{ ...emptySession }]);
    const [loading, setLoading] = useState(false);
    const [existingSessions, setExistingSessions] = useState<ICourseSession[]>([]);

    useEffect(() => {
        if (!open || !courseId) return;
        axios
            .get(route('courses.calendar.sessions'))
            .then((res) => {
                const all: ICourseSession[] = res.data.sessions ?? [];
                const filtered = all.filter((s) => {
                    if ('course' in s && s.course) {
                        // When course relation is provided
                        return s.course.id === courseId;
                    }
                    // fallback if course_id is provided directly
                    return (s as any).course_id === courseId;
                });
                setExistingSessions(filtered);
            })
            .catch((e) => Logger.error('fetch sessions', e));
    }, [open, courseId]);

    const handleAdd = () => setSessions([...sessions, { ...emptySession }]);
    const handleRemove = (idx: number) => {
        const copy = [...sessions];
        copy.splice(idx, 1);
        setSessions(copy.length ? copy : [{ ...emptySession }]);
    };
    const handleChange = (idx: number, field: keyof SessionForm, value: string) => {
        const copy = [...sessions];
        copy[idx][field] = value;
        setSessions(copy);
    };

    const handleSubmit = () => {
        setLoading(true);
        axios
            .post(route('dashboard.course.session.store', { course: courseId }), {
                course_id: courseId,
                sessions: { ...sessions, course_id: courseId },
            })
            .then(() => {
                setOpen(false);
                setSessions([{ ...emptySession }]);
            })
            .catch((e) => Logger.error('create sessions', e))
            .finally(() => setLoading(false));
    };

    return (
        <Drawer
            title={t('course.session.create', 'Créer des sessions')}
            open={open}
            setOpen={setOpen}
            component={
                <div className="space-y-4">
                    {existingSessions.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">{t('course.session.existing', 'Sessions enregistrées')}</h3>
                            <ul className="space-y-1 max-h-40 overflow-y-auto">
                                {existingSessions.map((s) => {
                                    const isPast = new Date(s.end_date) < new Date();
                                    return (
                                        <li key={s.id} className="flex justify-between text-sm border rounded p-2">
                                            <span>
                                                {new Date(s.start_date).toLocaleDateString()} - {new Date(s.end_date).toLocaleDateString()} -{' '}
                                                {s.location}
                                            </span>
                                            <span className={isPast ? 'text-red-500' : 'text-green-600'}>
                                                {isPast ? t('past', 'Passée') : t('upcoming', 'À venir')}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {sessions.map((session, index) => (
                        <div key={index} className="space-y-2 border-b pb-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t('start_date', 'Date de début')}</label>
                                    <Input
                                        type="datetime-local"
                                        value={session.start_date}
                                        onChange={(e) => handleChange(index, 'start_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">{t('end_date', 'Date de fin')}</label>
                                    <Input
                                        type="datetime-local"
                                        value={session.end_date}
                                        onChange={(e) => handleChange(index, 'end_date', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium mb-1">{t('location', 'Lieu')}</label>
                                    <Input type="text" value={session.location} onChange={(e) => handleChange(index, 'location', e.target.value)} />
                                </div>
                            </div>
                            {sessions.length > 1 && (
                                <Button variant="outline" type="button" className="text-red-500" onClick={() => handleRemove(index)}>
                                    {t('remove', 'Retirer')}
                                </Button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <Button variant="outline" type="button" onClick={handleAdd}>
                            {t('course.session.add', 'Ajouter une session')}
                        </Button>
                        <Button type="button" onClick={handleSubmit} disabled={loading}>
                            {loading ? t('creating', 'Création...') : t('course.session.save', 'Enregistrer')}
                        </Button>
                    </div>
                </div>
            }
        />
    );
}
