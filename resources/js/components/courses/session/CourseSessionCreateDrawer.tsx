import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { ICourseSession } from '@/types/course';
import { Logger } from '@/utils/console.util';
import axios from 'axios';
import { Plus, Save, Trash2, CalendarPlus, Copy, Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
    const [searchDate, setSearchDate] = useState<string>('');
    const [editingSessionId, setEditingSessionId] = useState<number | null>(null);

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
        
        // Si on est en mode édition, on met à jour la session
        if (editingSessionId) {
            axios
                .put(route('dashboard.course.session.update', { session: editingSessionId }), {
                    ...sessions[0],
                    course_id: courseId,
                })
                .then(() => {
                    toast.success(t('course.session.update.success', 'Session modifiée avec succès'));
                    setOpen(false);
                    setSessions([{ ...emptySession }]);
                    setEditingSessionId(null);
                    // Recharger les sessions
                    window.location.reload();
                })
                .catch(() => {
                    toast.error(t('course.session.update.error', 'Erreur lors de la modification'));
                })
                .finally(() => setLoading(false));
        } else {
            // Mode création normale
            axios
                .post(route('dashboard.course.session.store', { course: courseId }), {
                    sessions: sessions.map((s) => ({
                        ...s,
                        course_id: courseId,
                    })),
                })
                .then((response) => {
                    toast.success(t('course.session.create.success', 'Sessions créées avec succès'));
                    setOpen(false);
                    setSessions([{ ...emptySession }]);
                })
                .catch((e) => {
                    toast.error(t('course.session.create.error', 'Erreur lors de la création des sessions'));
                })
                .finally(() => setLoading(false));
        }
    };

    // Fonction pour formater une date pour un input datetime-local
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return '';
        
        // Si la date est déjà au format ISO, on la convertit
        const date = new Date(dateString);
        
        // Formater en YYYY-MM-DDTHH:MM pour datetime-local
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Fonction pour dupliquer une session existante
    const handleDuplicate = (session: ICourseSession) => {
        const newSession: SessionForm = {
            start_date: formatDateForInput(session.start_date),
            end_date: formatDateForInput(session.end_date),
            location: session.location || '',
        };
        setSessions([...sessions, newSession]);
        toast.success(t('course.session.duplicated', 'Session dupliquée'));
    };

    // Fonction pour éditer une session existante
    const handleEdit = (session: ICourseSession) => {
        const sessionToEdit: SessionForm = {
            start_date: formatDateForInput(session.start_date),
            end_date: formatDateForInput(session.end_date),
            location: session.location || '',
        };
        setSessions([sessionToEdit]);
        setEditingSessionId(session.id);
        toast(t('course.session.editing', 'Mode édition activé'));
    };

    // Fonction pour trier et filtrer les sessions
    const getSortedAndFilteredSessions = () => {
        const now = new Date();
        
        // Filtrer par date de recherche si une recherche est active
        let filtered = existingSessions;
        if (searchDate) {
            const searchDateObj = new Date(searchDate);
            filtered = existingSessions.filter(s => {
                const startDate = new Date(s.start_date);
                const endDate = new Date(s.end_date);
                return startDate.toDateString() === searchDateObj.toDateString() || 
                       endDate.toDateString() === searchDateObj.toDateString() ||
                       (startDate <= searchDateObj && endDate >= searchDateObj);
            });
        }
        
        // Séparer les sessions passées et futures
        const upcomingSessions = filtered.filter(s => new Date(s.end_date) >= now);
        const pastSessions = filtered.filter(s => new Date(s.end_date) < now);
        
        // Trier chaque groupe par date de début
        upcomingSessions.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        pastSessions.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
        
        // Retourner les sessions futures d'abord, puis les passées
        return [...upcomingSessions, ...pastSessions];
    };

    const sortedSessions = getSortedAndFilteredSessions();

    return (
        <Drawer
            title={editingSessionId ? t('course.session.edit_title', 'Modifier la session') : t('course.session.create', 'Créer des sessions')}
            open={open}
            setOpen={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setEditingSessionId(null);
                    setSessions([{ ...emptySession }]);
                }
            }}
            component={
                <div className="space-y-4">
                    {existingSessions.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-semibold">{t('course.session.existing', 'Sessions enregistrées')}</h3>
                                <Input
                                    type="date"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                    placeholder={t('course.session.search_date', 'Rechercher par date')}
                                    className="w-48"
                                />
                            </div>
                            <ul className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2">
                                {sortedSessions.length === 0 ? (
                                    <li className="text-sm text-gray-500 text-center py-2">
                                        {t('course.session.no_results', 'Aucune session trouvée pour cette date')}
                                    </li>
                                ) : (
                                    sortedSessions.map((s) => {
                                        const isPast = new Date(s.end_date) < new Date();
                                        const isToday = new Date(s.start_date).toDateString() === new Date().toDateString();
                                        return (
                                            <li key={s.id} className={`group hover:shadow-md transition-shadow text-sm border rounded p-2 ${isPast ? 'bg-gray-50' : 'bg-white'} ${isToday ? 'border-blue-400' : ''}`}>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="font-medium">
                                                            {new Date(s.start_date).toLocaleDateString('fr-FR', { 
                                                                weekday: 'short', 
                                                                year: 'numeric', 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                            {' - '}
                                                            {new Date(s.end_date).toLocaleDateString('fr-FR', { 
                                                                weekday: 'short', 
                                                                year: 'numeric', 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </div>
                                                        <div className="text-gray-600">
                                                            📍 {s.location || t('course.session.no_location', 'Lieu non défini')}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDuplicate(s)}
                                                                title={t('course.session.duplicate', 'Dupliquer cette session')}
                                                                className="p-1 h-7 w-7"
                                                            >
                                                                <Copy className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleEdit(s)}
                                                                title={t('course.session.edit', 'Modifier cette session')}
                                                                className="p-1 h-7 w-7"
                                                                disabled={isPast}
                                                            >
                                                                <Edit2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                            isPast ? 'bg-red-100 text-red-700' : 
                                                            isToday ? 'bg-blue-100 text-blue-700' : 
                                                            'bg-green-100 text-green-700'
                                                        }`}>
                                                            {isPast ? t('past', 'Passée') : 
                                                             isToday ? t('today', "Aujourd'hui") :
                                                             t('upcoming', 'À venir')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                            {searchDate && (
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setSearchDate('')}
                                    className="text-sm"
                                >
                                    {t('course.session.clear_search', 'Effacer la recherche')}
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Section pour les nouvelles sessions à créer */}
                    <div className={`${editingSessionId ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            {editingSessionId ? <Edit2 className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4" />}
                            {editingSessionId ? t('course.session.edit_session', 'Modifier la session') : t('course.session.new_sessions', 'Nouvelles sessions à créer')}
                        </h3>
                        
                        {sessions.map((session, index) => (
                            <div key={index} className="space-y-2 bg-white rounded-lg p-3 mb-3 border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        {t('course.session.session_number', 'Session')} {index + 1}
                                    </span>
                                    {sessions.length > 1 && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            type="button" 
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                                            onClick={() => handleRemove(index)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {t('remove', 'Retirer')}
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">{t('start_date', 'Date de début')}</label>
                                        <Input
                                            type="datetime-local"
                                            value={session.start_date}
                                            onChange={(e) => handleChange(index, 'start_date', e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">{t('end_date', 'Date de fin')}</label>
                                        <Input
                                            type="datetime-local"
                                            value={session.end_date}
                                            onChange={(e) => handleChange(index, 'end_date', e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">{t('location', 'Lieu')}</label>
                                        <Input 
                                            type="text" 
                                            value={session.location} 
                                            onChange={(e) => handleChange(index, 'location', e.target.value)}
                                            placeholder={t('course.session.location_placeholder', 'Ex: Paris, Salle A')}
                                            className="text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Bouton pour ajouter une nouvelle ligne de session - masqué en mode édition */}
                        {!editingSessionId && (
                            <Button 
                                variant="outline" 
                                type="button" 
                                onClick={handleAdd}
                                className="w-full border-dashed border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                {t('course.session.add_another', 'Ajouter une autre session')}
                            </Button>
                        )}
                    </div>
                    
                    {/* Zone des boutons d'action avec séparation claire */}
                    <div className="bg-gray-50 border-t-2 border-gray-200 -mx-4 px-4 py-4 -mb-4">
                        <div className="flex justify-between items-center gap-4">
                            <div className="text-sm text-gray-600">
                                {editingSessionId 
                                    ? t('course.session.edit_ready', 'Modifications prêtes à être enregistrées')
                                    : sessions.length === 1 
                                        ? t('course.session.one_session_ready', '1 session prête à être enregistrée')
                                        : t('course.session.multiple_sessions_ready', `${sessions.length} sessions prêtes à être enregistrées`)
                                }
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    type="button" 
                                    onClick={() => {
                                        setSessions([{ ...emptySession }]);
                                        setEditingSessionId(null);
                                        setOpen(false);
                                    }}
                                    disabled={loading}
                                >
                                    {t('cancel', 'Annuler')}
                                </Button>
                                <Button 
                                    type="button" 
                                    onClick={handleSubmit} 
                                    disabled={loading || sessions.every(s => !s.start_date)}
                                    className={editingSessionId ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin mr-2">⏳</span>
                                            {editingSessionId ? t('updating', 'Modification...') : t('creating', 'Enregistrement...')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {editingSessionId 
                                                ? t('course.session.save_changes', 'Enregistrer les modifications')
                                                : t('course.session.save_all', 'Enregistrer toutes les sessions')
                                            }
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
