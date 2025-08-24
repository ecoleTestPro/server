import AppointmentDataTable from '@/components/appointments/AppointmentDataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { Appointment } from '@/types';
import { Logger } from '@/utils/console.util';
import { Head, router } from '@inertiajs/react';
import { Calendar, Clock, HelpCircle, Mail, Phone, User, Users } from 'lucide-react';
import { useState } from 'react';

interface Props {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
    filters: {
        search?: string;
        date_from?: string;
        date_to?: string;
    };
}


export default function AppointmentsIndex({ appointments, filters }: Props) {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes}min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`;
    };


    const handleViewDetails = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleDelete = (appointmentId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
            router.delete(`/admin/appointments/${appointmentId}`, {
                onSuccess: () => {
                    Logger.log('Appointment deleted successfully');
                },
                onError: (errors) => {
                    Logger.error('Error deleting appointment:', errors);
                },
            });
        }
    };


    return (
        <AppLayout>
            <Head title="Gestion des rendez-vous" />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                <Users className="w-6 h-6 text-teal-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Rendez-vous</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Gérez tous les rendez-vous et leurs paramètres</p>
                            </div>
                        </div>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Cette page vous permet de visualiser, gérer et exporter tous les rendez-vous pris par vos clients. Utilisez les
                                    filtres pour affiner votre recherche et les actions pour modifier le statut ou voir les détails.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* Appointments DataTable */}
                <AppointmentDataTable
                    appointments={appointments.data}
                    onViewDetails={handleViewDetails}
                    onDelete={handleDelete}
                />

                {/* Modal de détails */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="w-[50vw] h-[90vh] max-h-[90vh] overflow-hidden flex flex-col p-0">
                        <DialogHeader className="p-6 pb-4 border-b">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <DialogTitle className="text-lg sm:text-xl">Détails du rendez-vous</DialogTitle>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="overflow-y-auto max-h-[70vh] px-2">
                            {selectedAppointment && (
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Main Info */}
                                    <div className="">
                                        {/* General Information */}
                                        <Card className="shadow-sm">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                                                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                                                    <span>Informations générales</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div>
                                                    <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">Titre</label>
                                                    <p className="text-sm lg:text-lg font-medium text-gray-900 dark:text-white mt-1">
                                                        {selectedAppointment.title}
                                                    </p>
                                                </div>

                                                {selectedAppointment.description && (
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Description
                                                        </label>
                                                        <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                                                            {selectedAppointment.description}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Date et heure
                                                        </label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 flex-shrink-0" />
                                                            <span className="text-xs lg:text-sm text-gray-900 dark:text-white">
                                                                {new Date(selectedAppointment.appointment_date).toLocaleDateString('fr-FR', {
                                                                    weekday: 'long',
                                                                    day: '2-digit',
                                                                    month: 'long',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Durée
                                                        </label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                                                            <span className="text-xs lg:text-sm text-gray-900 dark:text-white">
                                                                {formatDuration(selectedAppointment.duration)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="">
                                        {/* Client Information */}
                                        <Card className="shadow-sm">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                                                    <User className="w-4 h-4 lg:w-5 lg:h-5" />
                                                    <span>Informations client</span>
                                                </CardTitle>
                                                <CardDescription className="text-xs lg:text-sm">
                                                    Coordonnées et informations de contact
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-3 lg:space-y-4">

                                                {selectedAppointment.client_email && (
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Email
                                                        </label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                                                            <a
                                                                href={`mailto:${selectedAppointment.client_email}`}
                                                                className="text-xs lg:text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 break-all"
                                                            >
                                                                {selectedAppointment.client_email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedAppointment.client_phone && (
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Téléphone
                                                        </label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                                                            <a
                                                                href={`tel:${selectedAppointment.client_phone}`}
                                                                className="text-xs lg:text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400"
                                                            >
                                                                {selectedAppointment.client_phone}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
