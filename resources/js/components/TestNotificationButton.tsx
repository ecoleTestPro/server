import { Button } from '@/components/ui/button/button';
import axios from 'axios';
import { Bell, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export function TestNotificationButton() {
    const createTestNotification = async () => {
        try {
            await axios.post(route('test.notification'));
            toast.success('Notification de test créée !');
        } catch (error) {
            toast.error('Erreur lors de la création de la notification');
            console.error(error);
        }
    };

    const createGeneralTestNotification = async () => {
        try {
            await axios.post(route('test.notification.general'));
            toast.success('Notification générale créée !');
        } catch (error) {
            toast.error('Erreur lors de la création de la notification');
            console.error(error);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
            <Button
                onClick={createTestNotification}
                className="flex items-center gap-2 shadow-lg"
                size="sm"
            >
                <Bell className="h-4 w-4" />
                Test Notif Personnelle
            </Button>

            <Button
                onClick={createGeneralTestNotification}
                variant="secondary"
                className="flex items-center gap-2 shadow-lg"
                size="sm"
            >
                <Users className="h-4 w-4" />
                Test Notif Générale
            </Button>
        </div>
    );
}