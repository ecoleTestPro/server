import { Button } from '@/components/ui/button/button';
import { ICourseSession } from '@/types/course';
import { CheckCircle, Copy, Edit2, Trash2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Props du composant SessionCard
 */
interface SessionCardProps {
    /** Session à afficher */
    session: ICourseSession;
    /** Indique si la session est sélectionnée */
    isSelected: boolean;
    /** Callback pour sélectionner/désélectionner la session */
    onToggleSelection: (sessionId: number) => void;
    /** Callback pour dupliquer la session */
    onDuplicate: (session: ICourseSession) => void;
    /** Callback pour éditer la session */
    onEdit: (session: ICourseSession) => void;
    /** Callback pour supprimer la session */
    onDelete: (sessionId: number) => void;
    /** Callback pour changer le statut de confirmation */
    onToggleConfirmed: (sessionId: number) => void;
}

/**
 * Composant pour afficher une carte de session individuelle
 *
 * @component
 * @description Affiche les informations d'une session avec ses actions possibles
 * (édition, suppression, duplication, confirmation)
 */
export default function SessionCard({ session, isSelected, onToggleSelection, onDuplicate, onEdit, onDelete, onToggleConfirmed }: SessionCardProps) {
    const { t } = useTranslation();

    /** Vérifie si la session est passée */
    const isPast = new Date(session.end_date) < new Date();

    /** Vérifie si la session est aujourd'hui */
    const isToday = new Date(session.start_date).toDateString() === new Date().toDateString();

    /** Statut de confirmation de la session */
    const isConfirmed = (session as any).is_confirmed;

    /**
     * Formate une date pour l'affichage
     * @param dateString - Chaîne de date à formater
     * @returns Date formatée en français
     */
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <li
            className={`group hover:shadow-md transition-all text-sm border rounded p-2 ${
                isPast ? 'bg-gray-50' : 'bg-white'
            } ${isToday ? 'border-blue-400' : ''} ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}
        >
            <div className="flex justify-between items-start">
                {/* Section gauche: checkbox et informations */}
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(session.id)}
                        className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        aria-label={t('course.session.select', 'Sélectionner cette session')}
                    />
                    <div className="flex-1">
                        {/* Dates de la session */}
                        <div className="font-medium">
                            {formatDate(session.start_date)}
                            {' - '}
                            {formatDate(session.end_date)}
                        </div>

                        {/* Lieu de la session */}
                        <div className="text-gray-600">📍 {session.location || t('course.session.no_location', 'Lieu non défini')}</div>

                        {/* Statut de confirmation */}
                        {isConfirmed !== undefined && (
                            <div className="flex items-center gap-1 mt-1">
                                {isConfirmed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                                <span className="text-xs text-gray-600">
                                    {isConfirmed
                                        ? t('course.session.confirmed', 'Session confirmée')
                                        : t('course.session.not_confirmed', 'En attente de confirmation')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section droite: actions */}
                <div className="flex items-start gap-2">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Bouton confirmation */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleConfirmed(session.id)}
                            title={
                                isConfirmed
                                    ? t('course.session.unconfirm', 'Retirer la confirmation')
                                    : t('course.session.confirm', 'Confirmer la session')
                            }
                            className="p-1 h-7 w-7"
                        >
                            {isConfirmed ? <XCircle className="w-3 h-3 text-orange-600" /> : <CheckCircle className="w-3 h-3 text-green-600" />}
                        </Button>

                        {/* Bouton duplication */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDuplicate(session)}
                            title={t('course.session.duplicate', 'Dupliquer cette session')}
                            className="p-1 h-7 w-7"
                        >
                            <Copy className="w-3 h-3" />
                        </Button>

                        {/* Bouton édition */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(session)}
                            title={t('course.session.edit', 'Modifier cette session')}
                            className="p-1 h-7 w-7"
                        >
                            <Edit2 className="w-3 h-3" />
                        </Button>

                        {/* Bouton suppression */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(session.id)}
                            title={t('course.session.delete', 'Supprimer cette session')}
                            className="p-1 h-7 w-7 hover:bg-red-50"
                        >
                            <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    );
}
