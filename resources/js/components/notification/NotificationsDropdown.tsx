import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { INotificationInstance } from '@/types';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NotificationHeader from './NotificationHeader';
import NotificationsList from './NotificationsList';

export function NotificationsDropdown() {
    const [notifications, setNotifications] = useState<INotificationInstance[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = () => {
        setIsLoading(true);
        axios
            .get(route('dashboard.notifications.index'))
            .then((res) => {
                setNotifications(res.data.notifications ?? []);
            })
            .catch(() => {
                setNotifications([]);
                toast.error('Erreur lors du chargement des notifications');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const markAsRead = (notificationId: number) => {
        axios
            .put(route('dashboard.notifications.mark-as-read', notificationId))
            .then(() => {
                setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, is_read: true } : notif)));
                toast.success('Notification marquée comme lue');
            })
            .catch(() => {
                toast.error('Erreur lors de la mise à jour');
            });
    };

    const markAllAsRead = () => {
        const unreadNotifications = notifications.filter((n) => !n.is_read);
        if (unreadNotifications.length === 0) {
            toast('Toutes les notifications sont déjà lues', { icon: 'ℹ️' });
            return;
        }

        axios
            .put(route('dashboard.notifications.mark-all-as-read'))
            .then(() => {
                setNotifications((prev) => prev.map((notif) => ({ ...notif, is_read: true })));
                toast.success(`${unreadNotifications.length} notification(s) marquée(s) comme lues`);
            })
            .catch(() => {
                toast.error('Erreur lors de la mise à jour');
            });
    };

    const clearAllNotifications = () => {
        if (notifications.length === 0) {
            toast('Aucune notification à supprimer', { icon: 'ℹ️' });
            return;
        }

        axios
            .delete(route('dashboard.notifications.clear-all'))
            .then(() => {
                setNotifications([]);
                toast.success('Toutes les notifications ont été supprimées');
            })
            .catch(() => {
                toast.error('Erreur lors de la suppression');
            });
    };

    const deleteNotification = (notificationId: number) => {
        axios
            .delete(route('dashboard.notifications.delete', notificationId))
            .then(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
                toast.success('Notification supprimée');
            })
            .catch(() => {
                toast.error('Erreur lors de la suppression');
            });
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96" align="end">
                <NotificationHeader
                    unreadCount={unreadCount}
                    totalCount={notifications.length}
                    onMarkAllAsRead={markAllAsRead}
                    onClearAll={clearAllNotifications}
                />

                <DropdownMenuSeparator />

                <NotificationsList notifications={notifications} isLoading={isLoading} onMarkAsRead={markAsRead} onDelete={deleteNotification} />

                {/* Footer - Voir toutes les notifications */}
                {false && notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-center text-sm"
                                onClick={() => {
                                    // Navigate to notifications page
                                    window.location.href = route('dashboard.notifications.all');
                                }}
                            >
                                Voir toutes les notifications
                            </Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
