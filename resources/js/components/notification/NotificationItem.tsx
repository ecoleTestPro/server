import { Button } from '@/components/ui/button/button';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { INotificationInstance } from '@/types';
import { Check, Clock, X } from 'lucide-react';
import { useState } from 'react';

interface NotificationItemProps {
    notification: INotificationInstance;
    onMarkAsRead: (id: number) => void;
    onDelete: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onDelete }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "À l'instant";
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}j`;
    };

    const handleDelete = () => {
        onDelete(notification.id);
        setShowDeleteDialog(false);
    };

    return (
        <div
            className={`group relative px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                !notification.is_read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
            }`}
        >
            {/* Unread indicator */}
            {!notification.is_read && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>}

            <div className="flex items-start gap-3 pl-2">
                {/* Icon */}
                <div className={`flex-shrink-0 mt-0.5 ${!notification.is_read ? 'text-blue-500' : 'text-muted-foreground'}`}>
                    <Clock className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium leading-snug ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.heading}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.content}</div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{notification.created_at}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.is_read && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onMarkAsRead(notification.id)}>
                                    <Check className="h-3 w-3" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Marquer comme lu</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Supprimer</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <ConfirmDialog
                open={showDeleteDialog}
                title="Supprimer la notification"
                description="Êtes-vous sûr de vouloir supprimer cette notification ? Cette action est irréversible."
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteDialog(false)}
            />
        </div>
    );
};

export default NotificationItem;
