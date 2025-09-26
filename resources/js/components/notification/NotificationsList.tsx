import type { INotificationInstance } from '@/types';
import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
    notifications: INotificationInstance[];
    isLoading: boolean;
    onMarkAsRead: (id: number) => void;
    onDelete: (id: number) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, isLoading, onMarkAsRead, onDelete }) => {
    if (isLoading) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin inline-block">
                    <Bell className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm">Chargement...</p>
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">Aucune notification</p>
            </div>
        );
    }

    return (
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default NotificationsList;
