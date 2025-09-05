import { ConfirmDialog } from '@/components/ui/confirmDialog';
import Drawer from '@/components/ui/drawer';
import { ICourseSession } from '@/types/course';
import { Logger } from '@/utils/console.util';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import SessionForm, { SessionFormData } from './SessionForm';
import SessionList from './SessionList';

/**
 * Props du composant CourseSessionCreateDrawer
 */
interface CourseSessionCreateDrawerProps {
    /** État d'ouverture du drawer */
    open: boolean;
    /** Fonction pour changer l'état d'ouverture */
    setOpen: (open: boolean) => void;
    /** ID du cours pour lequel créer des sessions */
    courseId?: number;
    /** Titre du cours */
    courseTitle?: string;
}

/** Structure d'une session vide */
const emptySession: SessionFormData = { start_date: '', end_date: '', location: '' };

/**
 * Composant principal pour gérer les sessions de cours
 *
 * @component
 * @description Drawer permettant de créer, éditer, confirmer et supprimer des sessions de formation.
 * Utilise plusieurs sous-composants spécialisés pour une meilleure séparation des responsabilités.
 */
export default function CourseSessionCreateDrawer({ open, setOpen, courseId, courseTitle }: CourseSessionCreateDrawerProps) {
    const { t } = useTranslation();

    // États pour la gestion du formulaire
    /** Liste des sessions en cours de création/édition */
    const [sessions, setSessions] = useState<SessionFormData[]>([{ ...emptySession }]);
    /** Indique si une requête est en cours */
    const [loading, setLoading] = useState(false);
    /** ID de la session en cours d'édition */
    const [editingSessionId, setEditingSessionId] = useState<number | null>(null);

    // États pour la liste des sessions existantes
    /** Sessions existantes du cours */
    const [existingSessions, setExistingSessions] = useState<ICourseSession[]>([]);
    /** Date de recherche pour filtrer les sessions */
    const [searchDate, setSearchDate] = useState<string>('');
    /** IDs des sessions sélectionnées */
    const [selectedSessions, setSelectedSessions] = useState<number[]>([]);

    // États pour les dialogs de confirmation
    /** Indique si une suppression est en cours */
    const [isDeleting, setIsDeleting] = useState(false);
    /** Dialog de confirmation pour suppression individuelle */
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    /** Dialog de confirmation pour suppression groupée */
    const [showBatchConfirmDialog, setShowBatchConfirmDialog] = useState(false);
    /** Dialog de confirmation pour confirmation/retrait groupé */
    const [showBatchConfirmConfirmDialog, setShowBatchConfirmConfirmDialog] = useState(false);
    /** Action de confirmation groupée (confirm/unconfirm) */
    const [batchConfirmAction, setBatchConfirmAction] = useState<'confirm' | 'unconfirm'>('confirm');
    /** ID de la session à supprimer */
    const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

    /**
     * Charge les sessions existantes du cours à l'ouverture du drawer
     */
    useEffect(() => {
        if (!open || !courseId) return;
        axios
            .get(route('courses.calendar.sessions'))
            .then((res) => {
                const all: ICourseSession[] = res.data.sessions ?? [];
                const filtered = all.filter((s) => {
                    if ('course' in s && s.course) {
                        return s.course.id === courseId;
                    }
                    return (s as any).course_id === courseId;
                });
                setExistingSessions(filtered);
            })
            .catch((e) => Logger.error('fetch sessions', e));
    }, [open, courseId]);

    /**
     * Recharge les sessions depuis le serveur
     */
    const refreshSessions = async () => {
        try {
            const res = await axios.get(route('courses.calendar.sessions'));
            const all: ICourseSession[] = res.data.sessions ?? [];
            const filtered = all.filter((s) => {
                if ('course' in s && s.course) {
                    return s.course.id === courseId;
                }
                return (s as any).course_id === courseId;
            });
            setExistingSessions(filtered);
        } catch (error) {
            Logger.error('refresh sessions', error);
        }
    };

    // ========== Gestion du formulaire ==========

    /**
     * Ajoute une nouvelle session vide au formulaire
     */
    const handleAdd = () => setSessions([...sessions, { ...emptySession }]);

    /**
     * Supprime une session du formulaire
     * @param idx - Index de la session à supprimer
     */
    const handleRemove = (idx: number) => {
        const copy = [...sessions];
        copy.splice(idx, 1);
        setSessions(copy.length ? copy : [{ ...emptySession }]);
    };

    /**
     * Met à jour un champ d'une session
     * @param idx - Index de la session
     * @param field - Champ à modifier
     * @param value - Nouvelle valeur
     */
    const handleChange = (idx: number, field: keyof SessionFormData, value: string) => {
        const copy = [...sessions];
        copy[idx][field] = value;
        setSessions(copy);
    };

    /**
     * Soumet le formulaire pour créer ou modifier des sessions
     */
    const handleSubmit = () => {
        setLoading(true);

        if (editingSessionId) {
            // Mode édition
            axios
                .put(route('dashboard.course.session.update', { session: editingSessionId }), {
                    ...sessions[0],
                    course_id: courseId,
                })
                .then(() => {
                    toast.success(t('course.session.update.success', 'Session modifiée avec succès'));
                    setSessions([{ ...emptySession }]);
                    setEditingSessionId(null);
                    refreshSessions();
                })
                .catch(() => {
                    toast.error(t('course.session.update.error', 'Erreur lors de la modification'));
                })
                .finally(() => setLoading(false));
        } else {
            // Mode création
            axios
                .post(route('dashboard.course.session.store', { course: courseId }), {
                    sessions: sessions.map((s) => ({
                        ...s,
                        course_id: courseId,
                    })),
                })
                .then(() => {
                    toast.success(t('course.session.create.success', 'Sessions créées avec succès'));
                    setSessions([{ ...emptySession }]);
                    refreshSessions();
                })
                .catch(() => {
                    toast.error(t('course.session.create.error', 'Erreur lors de la création des sessions'));
                })
                .finally(() => setLoading(false));
        }
    };

    /**
     * Annule l'édition en cours
     */
    const handleCancel = () => {
        setSessions([{ ...emptySession }]);
        setEditingSessionId(null);
        setSelectedSessions([]);
        setOpen(false);
    };

    // ========== Gestion des actions sur les sessions existantes ==========

    /**
     * Formate une date pour un input datetime-local
     * @param dateString - Date à formater
     * @returns Date formatée pour l'input
     */
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    /**
     * Duplique une session existante
     * @param session - Session à dupliquer
     */
    const handleDuplicate = (session: ICourseSession) => {
        const newSession: SessionFormData = {
            start_date: formatDateForInput(session.start_date),
            end_date: formatDateForInput(session.end_date),
            location: session.location || '',
        };
        setSessions([...sessions, newSession]);
        toast.success(t('course.session.duplicated', 'Session dupliquée'));
    };

    /**
     * Active le mode édition pour une session
     * @param session - Session à éditer
     */
    const handleEdit = (session: ICourseSession) => {
        const sessionToEdit: SessionFormData = {
            start_date: formatDateForInput(session.start_date),
            end_date: formatDateForInput(session.end_date),
            location: session.location || '',
        };
        setSessions([sessionToEdit]);
        setEditingSessionId(session.id);
        toast(t('course.session.editing', 'Mode édition activé'));
    };

    /**
     * Ouvre le dialog de confirmation pour supprimer une session
     * @param sessionId - ID de la session à supprimer
     */
    const handleDeleteSingle = (sessionId: number) => {
        setSessionToDelete(sessionId);
        setShowConfirmDialog(true);
    };

    /**
     * Confirme et exécute la suppression d'une session
     */
    const confirmDeleteSingle = async () => {
        if (!sessionToDelete) return;
        setIsDeleting(true);
        try {
            await axios.delete(route('dashboard.course.session.delete', { session: sessionToDelete }));
            toast.success(t('course.session.delete.success', 'Session supprimée avec succès'));
            await refreshSessions();
        } catch (error) {
            toast.error(t('course.session.delete.error', 'Erreur lors de la suppression'));
        } finally {
            setIsDeleting(false);
            setShowConfirmDialog(false);
            setSessionToDelete(null);
        }
    };

    /**
     * Change le statut de confirmation d'une session
     * @param sessionId - ID de la session
     */
    const handleToggleConfirmed = async (sessionId: number) => {
        try {
            const response = await axios.patch(route('dashboard.course.session.toggle-confirmed', { session: sessionId }));
            if (response.data.session) {
                toast.success(
                    response.data.session.is_confirmed
                        ? t('course.session.confirmed_success', 'Session confirmée avec succès')
                        : t('course.session.unconfirmed_success', 'Confirmation retirée avec succès'),
                );
                refreshSessions();
            }
        } catch (error) {
            toast.error(t('course.session.toggle_confirmed_error', 'Erreur lors de la modification du statut de confirmation'));
            Logger.error('toggle confirmed', error);
        }
    };

    // ========== Gestion de la sélection multiple ==========

    /**
     * Bascule la sélection d'une session
     * @param sessionId - ID de la session
     */
    const toggleSessionSelection = (sessionId: number) => {
        setSelectedSessions((prev) => (prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId]));
    };

    /**
     * Sélectionne ou désélectionne toutes les sessions visibles
     */
    const selectAllSessions = () => {
        const visibleSessionIds = existingSessions.map((s) => s.id);
        setSelectedSessions((prev) => (prev.length === visibleSessionIds.length ? [] : visibleSessionIds));
    };

    /**
     * Ouvre le dialog de suppression groupée
     */
    const handleDeleteMultiple = () => {
        if (selectedSessions.length === 0) {
            toast.error(t('course.session.delete.no_selection', 'Aucune session sélectionnée'));
            return;
        }
        setShowBatchConfirmDialog(true);
    };

    /**
     * Confirme et exécute la suppression groupée
     */
    const confirmDeleteMultiple = async () => {
        if (selectedSessions.length === 0) return;
        setIsDeleting(true);
        try {
            await axios.delete(route('dashboard.course.session.delete.batch'), {
                data: { session_ids: selectedSessions },
            });
            toast.success(t('course.session.delete.multiple_success', `${selectedSessions.length} session(s) supprimée(s) avec succès`));
            await refreshSessions();
            setSelectedSessions([]);
        } catch (error: any) {
            Logger.error('delete multiple sessions', error);
            if (error?.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error(t('course.session.delete.multiple_error', 'Erreur lors de la suppression groupée'));
            }
        } finally {
            setIsDeleting(false);
            setShowBatchConfirmDialog(false);
        }
    };

    /**
     * Ouvre le dialog de confirmation/retrait de confirmation groupée
     * @param action - Action à effectuer (confirm/unconfirm)
     */
    const handleConfirmMultiple = (action: 'confirm' | 'unconfirm') => {
        if (selectedSessions.length === 0) {
            toast.error(t('course.session.confirm.no_selection', 'Aucune session sélectionnée'));
            return;
        }
        setBatchConfirmAction(action);
        setShowBatchConfirmConfirmDialog(true);
    };

    /**
     * Confirme et exécute la confirmation/retrait groupé
     */
    const confirmConfirmMultiple = async () => {
        if (selectedSessions.length === 0) return;
        try {
            await axios.patch(route('dashboard.course.session.confirm.batch'), {
                session_ids: selectedSessions,
                is_confirmed: batchConfirmAction === 'confirm',
            });
            toast.success(
                batchConfirmAction === 'confirm'
                    ? t('course.session.confirm.multiple_success', `${selectedSessions.length} session(s) confirmée(s) avec succès`)
                    : t('course.session.unconfirm.multiple_success', `Confirmation retirée pour ${selectedSessions.length} session(s)`),
            );
            await refreshSessions();
            setSelectedSessions([]);
        } catch (error: any) {
            Logger.error('confirm multiple sessions', error);
            toast.error(t('course.session.confirm.multiple_error', 'Erreur lors de la modification du statut de confirmation'));
        } finally {
            setShowBatchConfirmConfirmDialog(false);
        }
    };

    return (
        <>
            <Drawer
                maxWidth="w-[80%] lg:max-w-3xl"
                title={
                    editingSessionId
                        ? t('course.session.edit_title', 'Modifier la session')
                        : t('course.session.create', 'Créer des sessions pour la formation "' + courseTitle + '"')
                }
                open={open}
                setOpen={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        setEditingSessionId(null);
                        setSessions([{ ...emptySession }]);
                        setSelectedSessions([]);
                    }
                }}
                component={
                    <div className="space-y-4">
                        {/* Liste des sessions existantes */}
                        {existingSessions.length > 0 && (
                            <SessionList
                                sessions={existingSessions}
                                selectedSessions={selectedSessions}
                                searchDate={searchDate}
                                isDeleting={isDeleting}
                                onSearchDateChange={setSearchDate}
                                onToggleSelection={toggleSessionSelection}
                                onToggleSelectAll={selectAllSessions}
                                onDuplicateSession={handleDuplicate}
                                onEditSession={handleEdit}
                                onDeleteSession={handleDeleteSingle}
                                onToggleConfirmed={handleToggleConfirmed}
                                onConfirmSelected={() => handleConfirmMultiple('confirm')}
                                onUnconfirmSelected={() => handleConfirmMultiple('unconfirm')}
                                onDeleteSelected={handleDeleteMultiple}
                            />
                        )}

                        {/* Formulaire de création/édition */}
                        <SessionForm
                            sessions={sessions}
                            isEditing={!!editingSessionId}
                            loading={loading}
                            onSessionChange={handleChange}
                            onAddSession={handleAdd}
                            onRemoveSession={handleRemove}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </div>
                }
            />

            {/* Dialog de confirmation pour suppression individuelle */}
            <ConfirmDialog
                open={showConfirmDialog}
                title={t('course.session.delete.confirm_title', 'Supprimer la session')}
                description={t(
                    'course.session.delete.confirm_description',
                    'Êtes-vous sûr de vouloir supprimer cette session ? Cette action est irréversible.',
                )}
                confirmLabel={t('course.session.delete.confirm_button', 'Supprimer')}
                cancelLabel={t('cancel', 'Annuler')}
                onConfirm={confirmDeleteSingle}
                onCancel={() => {
                    setShowConfirmDialog(false);
                    setSessionToDelete(null);
                }}
                loading={isDeleting}
            />

            {/* Dialog de confirmation pour suppression groupée */}
            <ConfirmDialog
                open={showBatchConfirmDialog}
                title={t('course.session.delete.confirm_multiple_title', 'Supprimer les sessions')}
                description={t(
                    'course.session.delete.confirm_multiple_description',
                    `Êtes-vous sûr de vouloir supprimer ${selectedSessions.length} session(s) ? Cette action est irréversible.`,
                )}
                confirmLabel={t('course.session.delete.confirm_button', 'Supprimer')}
                cancelLabel={t('cancel', 'Annuler')}
                onConfirm={confirmDeleteMultiple}
                onCancel={() => setShowBatchConfirmDialog(false)}
                loading={isDeleting}
            />

            {/* Dialog de confirmation pour confirmation/retrait groupé */}
            <ConfirmDialog
                open={showBatchConfirmConfirmDialog}
                title={
                    batchConfirmAction === 'confirm'
                        ? t('course.session.confirm.confirm_multiple_title', 'Confirmer les sessions')
                        : t('course.session.unconfirm.confirm_multiple_title', 'Retirer la confirmation des sessions')
                }
                description={
                    batchConfirmAction === 'confirm'
                        ? t('course.session.confirm.confirm_multiple_description', `Voulez-vous confirmer ${selectedSessions.length} session(s) ?`)
                        : t(
                              'course.session.unconfirm.confirm_multiple_description',
                              `Voulez-vous retirer la confirmation de ${selectedSessions.length} session(s) ?`,
                          )
                }
                confirmLabel={
                    batchConfirmAction === 'confirm'
                        ? t('course.session.confirm.confirm_button', 'Confirmer')
                        : t('course.session.unconfirm.confirm_button', 'Retirer la confirmation')
                }
                cancelLabel={t('cancel', 'Annuler')}
                onConfirm={confirmConfirmMultiple}
                onCancel={() => setShowBatchConfirmConfirmDialog(false)}
                loading={false}
            />
        </>
    );
}
