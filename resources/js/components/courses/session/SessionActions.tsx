import { Button } from '@/components/ui/button/button';
import { CheckCircle, Trash2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Props du composant SessionActions
 */
interface SessionActionsProps {
    /** Nombre de sessions sélectionnées */
    selectedCount: number;
    /** Nombre total de sessions */
    totalCount: number;
    /** Indique si une suppression est en cours */
    isDeleting: boolean;
    /** Callback pour confirmer les sessions sélectionnées */
    onConfirmSelected: () => void;
    /** Callback pour retirer la confirmation des sessions sélectionnées */
    onUnconfirmSelected: () => void;
    /** Callback pour supprimer les sessions sélectionnées */
    onDeleteSelected: () => void;
    /** Callback pour sélectionner/désélectionner toutes les sessions */
    onToggleSelectAll: () => void;
    /** Indique si toutes les sessions sont sélectionnées */
    allSelected: boolean;
}

/**
 * Composant pour gérer les actions groupées sur les sessions
 *
 * @component
 * @description Affiche les boutons d'actions groupées (confirmation, suppression)
 * et le bouton de sélection/désélection de toutes les sessions
 */
export default function SessionActions({
    selectedCount,
    totalCount,
    isDeleting,
    onConfirmSelected,
    onUnconfirmSelected,
    onDeleteSelected,
    onToggleSelectAll,
    allSelected,
}: SessionActionsProps) {
    const { t } = useTranslation();

    return (
        <div className="flex justify-between items-center">
            {/* Actions groupées - visibles uniquement si des sessions sont sélectionnées */}
            {selectedCount > 0 && (
                <div className="flex gap-2">
                    {/* Bouton de confirmation groupée */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onConfirmSelected}
                        className="h-7 text-green-600 hover:text-green-700"
                        title={t('course.session.confirm_selected_tooltip', 'Confirmer les sessions sélectionnées')}
                    >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t('course.session.confirm_selected', `Confirmer (${selectedCount})`)}
                    </Button>

                    {/* Bouton pour retirer la confirmation groupée */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onUnconfirmSelected}
                        className="h-7 text-orange-600 hover:text-orange-700"
                        title={t('course.session.unconfirm_selected_tooltip', 'Retirer la confirmation des sessions sélectionnées')}
                    >
                        <XCircle className="w-3 h-3 mr-1" />
                        {t('course.session.unconfirm_selected', `Retirer confirmation (${selectedCount})`)}
                    </Button>

                    {/* Bouton de suppression groupée */}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={onDeleteSelected}
                        disabled={isDeleting}
                        className="h-7"
                        title={t('course.session.delete_selected_tooltip', 'Supprimer les sessions sélectionnées')}
                    >
                        {isDeleting ? <span className="animate-spin mr-1">⏳</span> : <Trash2 className="w-3 h-3 mr-1" />}
                        {t('course.session.delete_selected', `Supprimer (${selectedCount})`)}
                    </Button>
                </div>
            )}

            {/* Bouton de sélection/désélection de toutes les sessions */}
            {totalCount > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleSelectAll}
                    className="text-xs h-7"
                    title={
                        allSelected
                            ? t('course.session.deselect_all_tooltip', 'Désélectionner toutes les sessions')
                            : t('course.session.select_all_tooltip', 'Sélectionner toutes les sessions')
                    }
                >
                    {allSelected ? t('course.session.deselect_all', 'Tout désélectionner') : t('course.session.select_all', 'Tout sélectionner')}
                </Button>
            )}
        </div>
    );
}
