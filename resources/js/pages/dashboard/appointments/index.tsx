import AppointmentDataTable from '@/components/appointments/AppointmentDataTable';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { Appointment } from '@/types';
import { Logger } from '@/utils/console.util';
import { Head, router } from '@inertiajs/react';
import { AlertCircle, Calendar, CheckCircle, Clock, HelpCircle, Mail, MessageSquare, Phone, User, Users, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
    appointments: {
        data: Appointment[];
        links: any;
        meta: any;
    };
    filters: {
        search?: string;
        status?: string;
        type?: string;
        date_from?: string;
        date_to?: string;
    };
    stats: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
        today: number;
    };
}

const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: AlertCircle },
    confirmed: { label: 'Confirmé', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', icon: CheckCircle },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: XCircle },
};

const typeLabels = {
    consultation: 'Consultation',
    information: "Demande d'information",
    support: 'Support technique',
    enrollment: 'Inscription formation',
    other: 'Autre',
};

export default function AppointmentsIndex({ appointments, filters }: Props) {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes}min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`;
    };

    const getStatusIcon = (status: string) => {
        const config = statusConfig[status as keyof typeof statusConfig];
        if (!config) return null;
        const Icon = config.icon;
        return <Icon className="w-4 h-4" />;
    };

    const handleStatusChange = (appointmentId: number, newStatus: string) => {
        router.put(
            `/admin/appointments/${appointmentId}/status`,
            {
                status: newStatus,
            },
            {
                onSuccess: () => {
                    Logger.log('Status changed successfully');
                },
                onError: (errors) => {
                    Logger.error('Error changing status:', errors);
                },
            },
        );
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

    const handleExport = () => {
        window.location.href = `/admin/appointments/export`;
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
                    onStatusChange={handleStatusChange}
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
                                <div className="flex flex-wrap items-center gap-2">
                                    {selectedAppointment?.status === 'pending' && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleStatusChange(selectedAppointment.id, 'confirmed');
                                                setIsModalOpen(false);
                                            }}
                                            className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                                        >
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            <span className="hidden sm:inline">Confirmer</span>
                                            <span className="sm:hidden">✓</span>
                                        </Button>
                                    )}
                                    {selectedAppointment?.status === 'confirmed' && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleStatusChange(selectedAppointment.id, 'completed');
                                                setIsModalOpen(false);
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                                        >
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            <span className="hidden sm:inline">Terminé</span>
                                            <span className="sm:hidden">✓</span>
                                        </Button>
                                    )}
                                    {(selectedAppointment?.status === 'pending' || selectedAppointment?.status === 'confirmed') && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleStatusChange(selectedAppointment.id, 'cancelled');
                                                setIsModalOpen(false);
                                            }}
                                            variant="destructive"
                                            className="text-xs sm:text-sm"
                                        >
                                            <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            <span className="hidden sm:inline">Annuler</span>
                                            <span className="sm:hidden">✕</span>
                                        </Button>
                                    )}
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
                                                {selectedAppointment.user ? (
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Utilisateur enregistré 
                                                        </label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <User className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                                                            <span className="text-xs lg:text-sm text-gray-900 dark:text-white font-medium">
                                                                {selectedAppointment.user.name}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">{selectedAppointment.user.email}</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            Client invité
                                                        </label>
                                                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                                            Non enregistré sur la plateforme
                                                        </p>
                                                    </div>
                                                )}

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
