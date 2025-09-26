import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface NotificationHeaderProps {
    unreadCount: number;
    totalCount: number;
    onMarkAllAsRead: () => void;
    onClearAll: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ unreadCount, totalCount, onMarkAllAsRead, onClearAll }) => {
    const [showClearAllDialog, setShowClearAllDialog] = useState(false);

    const handleClearAll = () => {
        onClearAll();
        setShowClearAllDialog(false);
    };

    return (
        <div className="flex items-center justify-between p-3 pb-2">
            <DropdownMenuLabel className="text-lg font-semibold">
                Notifications
                {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs text-white">
                        {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                    </Badge>
                )}
            </DropdownMenuLabel>

            {/* Action Buttons */}
            {totalCount > 0 && (
                <div className="flex gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onMarkAllAsRead} disabled={unreadCount === 0}>
                                <CheckCheck className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Tout marquer comme lu</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => setShowClearAllDialog(true)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Vider toutes les notifications</p>
                        </TooltipContent>
                    </Tooltip> */}
                </div>
            )}

            <ConfirmDialog
                open={showClearAllDialog}
                title="Vider toutes les notifications"
                description={`Êtes-vous sûr de vouloir supprimer toutes les ${totalCount} notification${totalCount > 1 ? 's' : ''} ? Cette action est irréversible.`}
                confirmLabel="Vider tout"
                cancelLabel="Annuler"
                onConfirm={handleClearAll}
                onCancel={() => setShowClearAllDialog(false)}
            />
        </div>
    );
};

export default NotificationHeader;
