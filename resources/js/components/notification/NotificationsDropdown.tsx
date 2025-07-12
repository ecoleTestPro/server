import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { INotificationInstance } from '@/types';
import { Button } from '../ui/button/button';

export function NotificationsDropdown() {
    const [notifications, setNotifications] = useState<INotificationInstance[]>([]);

    const fetchNotifications = () => {
        axios
            .get(route('dashboard.notifications.index'))
            .then((res) => {
                setNotifications(res.data.notifications ?? []);
            })
            .catch(() => {
                setNotifications([]);
            });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                            {notifications.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <DropdownMenuItem className="flex-col items-start">
                        <div className="text-sm">Aucune notification</div>
                    </DropdownMenuItem>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex-col items-start gap-1">
                            <div className="text-sm font-medium">{notification.heading}</div>
                            <div className="text-sm text-muted-foreground">{notification.content}</div>
                            <div className="text-xs text-muted-foreground">{notification.created_at}</div>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
