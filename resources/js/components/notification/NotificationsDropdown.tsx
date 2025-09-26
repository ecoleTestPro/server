import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell } from 'lucide-react';
import NotificationHeader from './NotificationHeader';
import NotificationsList from './NotificationsList';

export function NotificationsDropdown() {
    const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications();

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
