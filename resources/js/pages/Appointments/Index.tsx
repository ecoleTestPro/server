import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Button } from '@/components/ui/button/button';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Appointment {
    id: number;
    title: string;
    description: string;
    appointment_date: string;
    duration: number;
    status: string;
    status_label: string;
    type: string;
    type_label: string;
    client_email: string;
    client_phone: string;
    admin_user?: {
        name: string;
        email: string;
    };
    created_at: string;
}

interface AppointmentsIndexProps {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
}

const AppointmentsIndex: React.FC<AppointmentsIndexProps> = ({ appointments }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'no_show':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Mes rendez-vous
                    </h2>
                    <Link href="/appointments/create">
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Nouveau rendez-vous
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Mes rendez-vous" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {appointments.data.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Aucun rendez-vous
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Vous n'avez pas encore de rendez-vous programmés.
                                </p>
                                <Link href="/appointments/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Prendre un rendez-vous
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {appointments.data.map((appointment) => (
                                <Card key={appointment.id} className="overflow-hidden">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg mb-1">
                                                    {appointment.title}
                                                </CardTitle>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(appointment.appointment_date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {formatTime(appointment.appointment_date)} ({appointment.duration} min)
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary">
                                                    {appointment.type_label}
                                                </Badge>
                                                <Badge className={getStatusColor(appointment.status)}>
                                                    {appointment.status_label}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {appointment.description && (
                                            <div className="mb-4">
                                                <div className="flex items-start gap-2">
                                                    <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-gray-700 text-sm">
                                                        {appointment.description}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-2">
                                                {appointment.client_email && (
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-gray-500" />
                                                        <span>{appointment.client_email}</span>
                                                    </div>
                                                )}
                                                {appointment.client_phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-gray-500" />
                                                        <span>{appointment.client_phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {appointment.admin_user && (
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-500" />
                                                        <div>
                                                            <span className="font-medium">
                                                                {appointment.admin_user.name}
                                                            </span>
                                                            <br />
                                                            <span className="text-gray-600 text-xs">
                                                                {appointment.admin_user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {(appointment.status === 'pending' || appointment.status === 'confirmed') && 
                                         new Date(appointment.appointment_date) > new Date() && (
                                            <div className="mt-4 pt-4 border-t">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => {
                                                        // TODO: Implémenter l'annulation
                                                        console.log('Annuler RDV', appointment.id);
                                                    }}
                                                >
                                                    Annuler le rendez-vous
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AppointmentsIndex;