import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button/button';

const notifications = [
    {
        id: 1,
        title: 'Nouveau message',
        description: 'Vous avez reçu un message de John Doe',
        time: 'Il y a 5 minutes',
    },
    {
        id: 2,
        title: 'Mise à jour système',
        description: 'Une nouvelle version est disponible',
        time: 'Il y a 1 heure',
    },
    {
        id: 3,
        title: 'Rappel réunion',
        description: "Réunion d'équipe à 14h",
        time: 'Il y a 2 heures',
    },
];

export function NotificationsDropdown() {
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
                            <div className="text-sm font-medium">{notification.title}</div>
                            <div className="text-sm text-muted-foreground">{notification.description}</div>
                            <div className="text-xs text-muted-foreground">{notification.time}</div>
                        </DropdownMenuItem>
                    ))
                )}
                {notifications.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-center justify-center">Voir toutes les notifications</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
