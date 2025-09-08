import { Input } from '@/components/ui/input';
import { ICourseSession } from '@/types/course';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { FilterIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SessionActions from './SessionActions';
import SessionCard from './SessionCard';

/**
 * Props du composant SessionList
 */
interface SessionListProps {
    /** Liste des sessions existantes */
    sessions: ICourseSession[];
    /** IDs des sessions sélectionnées */
    selectedSessions: number[];
    /** Date de recherche pour filtrer les sessions */
    searchDate: string;
    /** Indique si une suppression est en cours */
    isDeleting: boolean;
    /** Callback pour changer la date de recherche */
    onSearchDateChange: (date: string) => void;
    /** Callback pour basculer la sélection d'une session */
    onToggleSelection: (sessionId: number) => void;
    /** Callback pour sélectionner/désélectionner toutes les sessions */
    onToggleSelectAll: () => void;
    /** Callback pour dupliquer une session */
    onDuplicateSession: (session: ICourseSession) => void;
    /** Callback pour éditer une session */
    onEditSession: (session: ICourseSession) => void;
    /** Callback pour supprimer une session */
    onDeleteSession: (sessionId: number) => void;
    /** Callback pour changer le statut de confirmation d'une session */
    onToggleConfirmed: (sessionId: number) => void;
    /** Callback pour confirmer les sessions sélectionnées */
    onConfirmSelected: () => void;
    /** Callback pour retirer la confirmation des sessions sélectionnées */
    onUnconfirmSelected: () => void;
    /** Callback pour supprimer les sessions sélectionnées */
    onDeleteSelected: () => void;
}

/**
 * Composant pour afficher et gérer la liste des sessions existantes
 *
 * @component
 * @description Affiche une liste filtrable de sessions avec des actions individuelles
 * et groupées (sélection multiple, confirmation, suppression)
 */
export default function SessionList({
    sessions,
    selectedSessions,
    searchDate,
    isDeleting,
    onSearchDateChange,
    onToggleSelection,
    onToggleSelectAll,
    onDuplicateSession,
    onEditSession,
    onDeleteSession,
    onToggleConfirmed,
    onConfirmSelected,
    onUnconfirmSelected,
    onDeleteSelected,
}: SessionListProps) {
    const { t } = useTranslation();

    /**
     * Filtre et trie les sessions selon la date de recherche
     * @returns Liste des sessions filtrées et triées
     */
    const getSortedAndFilteredSessions = (): ICourseSession[] => {
        const now = new Date();
        let filtered = sessions;

        // Filtrer par date de recherche si une recherche est active
        if (searchDate) {
            const searchDateObj = new Date(searchDate);
            filtered = sessions.filter((s) => {
                const startDate = new Date(s.start_date);
                const endDate = new Date(s.end_date);
                return (
                    startDate.toDateString() === searchDateObj.toDateString() ||
                    endDate.toDateString() === searchDateObj.toDateString() ||
                    (startDate <= searchDateObj && endDate >= searchDateObj)
                );
            });
        }

        // Séparer les sessions passées et futures
        const upcomingSessions = filtered.filter((s) => new Date(s.end_date) >= now);
        const pastSessions = filtered.filter((s) => new Date(s.end_date) < now);

        // Trier chaque groupe par date de début
        upcomingSessions.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
        pastSessions.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

        // Retourner les sessions futures d'abord, puis les passées
        return [...upcomingSessions, ...pastSessions];
    };

    const sortedSessions = getSortedAndFilteredSessions();
    const allSelected = selectedSessions.length === sortedSessions.length && sortedSessions.length > 0;

    if (sessions.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2">
            {/* En-tête avec titre et filtre */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold">{t('course.session.existing', 'Sessions enregistrées')}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <FilterIcon className="w-4 h-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('course.session.filter_by_date', 'Filtrer les sessions par date')}</p>
                        </TooltipContent>
                    </Tooltip>
                    <Input
                        type="date"
                        value={searchDate}
                        onChange={(e) => onSearchDateChange(e.target.value)}
                        placeholder={t('course.session.search_date', 'Rechercher par date')}
                        className="w-48"
                        aria-label={t('course.session.search_date', 'Rechercher par date')}
                    />
                </div>
            </div>

            {/* Barre d'actions groupées */}
            <SessionActions
                selectedCount={selectedSessions.length}
                totalCount={sortedSessions.length}
                isDeleting={isDeleting}
                onConfirmSelected={onConfirmSelected}
                onUnconfirmSelected={onUnconfirmSelected}
                onDeleteSelected={onDeleteSelected}
                onToggleSelectAll={onToggleSelectAll}
                allSelected={allSelected}
            />

            {/* Liste des sessions */}
            <ul className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2">
                {sortedSessions.length === 0 ? (
                    <li className="text-sm text-gray-500 text-center py-2">
                        {t('course.session.no_results', 'Aucune session trouvée pour cette date')}
                    </li>
                ) : (
                    sortedSessions.map((session) => (
                        <SessionCard
                            key={session.id}
                            session={session}
                            isSelected={selectedSessions.includes(session.id)}
                            onToggleSelection={onToggleSelection}
                            onDuplicate={onDuplicateSession}
                            onEdit={onEditSession}
                            onDelete={onDeleteSession}
                            onToggleConfirmed={onToggleConfirmed}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}
