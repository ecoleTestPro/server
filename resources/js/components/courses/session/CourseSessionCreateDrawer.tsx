import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Drawer from '@/components/ui/drawer';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Logger } from '@/utils/console.util';

interface CourseSessionCreateDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    courseId?: number;
}

interface SessionForm {
    start_date: string;
    end_date: string;
}

const emptySession: SessionForm = { start_date: '', end_date: '' };

export default function CourseSessionCreateDrawer({ open, setOpen, courseId }: CourseSessionCreateDrawerProps) {
    const { t } = useTranslation();
    const [sessions, setSessions] = useState<SessionForm[]>([{ ...emptySession }]);
    const [loading, setLoading] = useState(false);

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
            .post(route('dashboard.course.session.store'), { course_id: courseId, sessions })
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
                    {sessions.map((session, index) => (
                        <div key={index} className="space-y-2 border-b pb-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {t('start_date', 'Date de début')}
                                    </label>
                                    <Input
                                        type="datetime-local"
                                        value={session.start_date}
                                        onChange={(e) => handleChange(index, 'start_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {t('end_date', 'Date de fin')}
                                    </label>
                                    <Input
                                        type="datetime-local"
                                        value={session.end_date}
                                        onChange={(e) => handleChange(index, 'end_date', e.target.value)}
                                    />
                                </div>
                            </div>
                            {sessions.length > 1 && (
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="text-red-500"
                                    onClick={() => handleRemove(index)}
                                >
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
