import type { INotificationInstance } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface NotificationData {
    notifications: INotificationInstance[];
    unread_count: number;
    has_new: boolean;
    last_check: string;
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<INotificationInstance[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const lastCheckRef = useRef<string>(new Date().toISOString());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch initial notifications
    const fetchNotifications = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route('dashboard.notifications.index'));
            setNotifications(response.data.notifications ?? []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Erreur lors du chargement des notifications');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Check for new notifications
    const checkNewNotifications = useCallback(async () => {
        try {
            const response = await axios.get(route('dashboard.notifications.check-new'), {
                params: {
                    last_check: lastCheckRef.current,
                },
            });

            const data: NotificationData = response.data;

            if (data.has_new && data.notifications.length > 0) {
                // Add new notifications to the beginning of the list
                setNotifications((prev) => {
                    const newNotifications = data.notifications.filter((newNotif) => !prev.some((existingNotif) => existingNotif.id === newNotif.id));
                    return [...newNotifications, ...prev];
                });

                // Show toast for new notifications
                // if (data.notifications.length === 1) {
                //     toast.success(`Nouvelle notification: ${data.notifications[0].heading}`, {
                //         duration: 4000,
                //     });
                // } else {
                //     toast.success(`${data.notifications.length} nouvelles notifications`, {
                //         duration: 4000,
                //     });
                // }
            }

            setUnreadCount(data.unread_count);
            lastCheckRef.current = data.last_check;
        } catch (error) {
            console.error('Error checking for new notifications:', error);
        }
    }, []);

    // Start real-time polling
    const startPolling = useCallback(() => {
        if (intervalRef.current) return;

        // Check every 10 seconds
        intervalRef.current = setInterval(checkNewNotifications, 10000);
    }, [checkNewNotifications]);

    // Stop real-time polling
    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Mark notification as read
    const markAsRead = useCallback(async (notificationId: number) => {
        try {
            await axios.put(route('dashboard.notifications.mark-as-read', notificationId));

            setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, is_read: true } : notif)));

            setUnreadCount((prev) => Math.max(0, prev - 1));
            toast.success('Notification marquée comme lue');
        } catch (error) {
            console.error('Error marking notification as read:', error);
            toast.error('Erreur lors de la mise à jour');
        }
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        const unreadNotifications = notifications.filter((n) => !n.is_read);
        if (unreadNotifications.length === 0) {
            toast('Toutes les notifications sont déjà lues', { icon: 'ℹ️' });
            return;
        }

        try {
            await axios.put(route('dashboard.notifications.mark-all-as-read'));

            setNotifications((prev) => prev.map((notif) => ({ ...notif, is_read: true })));
            setUnreadCount(0);
            toast.success(`${unreadNotifications.length} notification(s) marquée(s) comme lues`);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            toast.error('Erreur lors de la mise à jour');
        }
    }, [notifications]);

    // Delete notification
    const deleteNotification = useCallback(async (notificationId: number) => {
        try {
            await axios.delete(route('dashboard.notifications.delete', notificationId));

            setNotifications((prev) => {
                const notification = prev.find((n) => n.id === notificationId);
                if (notification && !notification.is_read) {
                    setUnreadCount((currentCount) => Math.max(0, currentCount - 1));
                }
                return prev.filter((n) => n.id !== notificationId);
            });

            toast.success('Notification supprimée');
        } catch (error) {
            console.error('Error deleting notification:', error);
            toast.error('Erreur lors de la suppression');
        }
    }, []);

    // Clear all notifications
    const clearAllNotifications = useCallback(async () => {
        if (notifications.length === 0) {
            toast('Aucune notification à supprimer', { icon: 'ℹ️' });
            return;
        }

        try {
            await axios.delete(route('dashboard.notifications.clear-all'));

            setNotifications([]);
            setUnreadCount(0);
            toast.success('Toutes les notifications ont été supprimées');
        } catch (error) {
            console.error('Error clearing notifications:', error);
            toast.error('Erreur lors de la suppression');
        }
    }, [notifications]);

    // Initialize hook
    useEffect(() => {
        fetchNotifications();
        startPolling();

        // Handle page visibility change to pause/resume polling
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopPolling();
            } else {
                startPolling();
                // Check for new notifications when page becomes visible
                checkNewNotifications();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup on unmount
        return () => {
            stopPolling();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchNotifications, startPolling, stopPolling, checkNewNotifications]);

    return {
        notifications,
        unreadCount,
        isLoading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        startPolling,
        stopPolling,
    };
}
