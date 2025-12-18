import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { CalendarPlus, Edit2, Plus, Save, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Structure d'une session de formation
 */
export interface SessionFormData {
    /** Date de début de la session */
    start_date: string;
    /** Date de fin de la session */
    end_date: string;
    /** Lieu de la formation */
    location: string;
}

/**
 * Props du composant SessionForm
 */
interface SessionFormProps {
    /** Liste des sessions à créer ou éditer */
    sessions: SessionFormData[];
    /** Indique si on est en mode édition */
    isEditing: boolean;
    /** Indique si le formulaire est en cours de soumission */
    loading: boolean;
    /** Callback pour mettre à jour une session */
    onSessionChange: (index: number, field: keyof SessionFormData, value: string) => void;
    /** Callback pour ajouter une nouvelle session */
    onAddSession: () => void;
    /** Callback pour supprimer une session */
    onRemoveSession: (index: number) => void;
    /** Callback pour soumettre le formulaire */
    onSubmit: () => void;
    /** Callback pour annuler */
    onCancel: () => void;
}

/**
 * Composant de formulaire pour créer ou éditer des sessions de formation
 *
 * @component
 * @description Ce composant gère l'interface de création et d'édition des sessions,
 * permettant d'ajouter plusieurs sessions à la fois avec leurs dates et lieux
 */
export default function SessionForm({
    sessions,
    isEditing,
    loading,
    onSessionChange,
    onAddSession,
    onRemoveSession,
    onSubmit,
    onCancel,
}: SessionFormProps) {
    const { t } = useTranslation();

    /**
     * Vérifie si le formulaire est valide pour la soumission
     */
    const isFormValid = sessions.some((s) => s.start_date);

    return (
        <div className={`${isEditing ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
            {/* En-tête du formulaire */}
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                {isEditing ? <Edit2 className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4" />}
                {isEditing ? t('course.session.edit_session', 'Modifier la session') : t('course.session.new_sessions', 'Nouvelles sessions à créer')}
            </h3>

            {/* Liste des sessions */}
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
                                onClick={() => onRemoveSession(index)}
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                {t('remove', 'Retirer')}
                            </Button>
                        )}
                    </div>

                    {/* Champs du formulaire */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">{t('start_date', 'Date de début')}</label>
                            <Input
                                type="datetime-local"
                                value={session.start_date}
                                onChange={(e) => onSessionChange(index, 'start_date', e.target.value)}
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">{t('end_date', 'Date de fin')}</label>
                            <Input
                                type="datetime-local"
                                value={session.end_date}
                                onChange={(e) => onSessionChange(index, 'end_date', e.target.value)}
                                className="text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('location', 'Lieu')}</label>
                        <Input
                            type="text"
                            value={session.location}
                            onChange={(e) => onSessionChange(index, 'location', e.target.value)}
                            placeholder={t('course.session.location_placeholder', 'Ex: Paris, Lyon, En ligne...')}
                            className="text-sm"
                        />
                    </div>
                </div>
            ))}

            {/* Bouton pour ajouter une session */}
            {!isEditing && (
                <Button variant="outline" type="button" className="w-full mb-3 border-dashed" onClick={onAddSession}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('course.session.add_another', 'Ajouter une autre session')}
                </Button>
            )}

            {/* Pied de page avec les actions */}
            <div className="border-t pt-3 mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    {isEditing
                        ? t('course.session.editing_mode', 'Modification en cours')
                        : sessions.length === 1
                          ? t('course.session.single_session_ready', '1 session prête à être enregistrée')
                          : t('course.session.multiple_sessions_ready', `${sessions.length} sessions prêtes à être enregistrées`)}
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" type="button" onClick={onCancel} disabled={loading}>
                        {t('cancel', 'Annuler')}
                    </Button>
                    <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading || !isFormValid}
                        className={isEditing ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                {isEditing ? t('updating', 'Modification...') : t('creating', 'Enregistrement...')}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEditing
                                    ? t('course.session.save_changes', 'Enregistrer les modifications')
                                    : t('course.session.save_all', 'Enregistrer toutes les sessions')}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
