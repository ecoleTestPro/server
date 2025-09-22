import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types';
import { Head, router } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Mail, MessageSquare, Phone, Tag, User, XCircle } from 'lucide-react';

interface Props {
    appointment: Appointment;
}

const statusConfig = {
    pending: {
        label: 'En attente',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        icon: AlertCircle,
        description: 'Le rendez-vous est en attente de confirmation',
    },
    confirmed: {
        label: 'Confirmé',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: CheckCircle,
        description: 'Le rendez-vous a été confirmé',
    },
    completed: {
        label: 'Terminé',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: CheckCircle,
        description: "Le rendez-vous s'est déroulé avec succès",
    },
    cancelled: {
        label: 'Annulé',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: XCircle,
        description: 'Le rendez-vous a été annulé',
    },
};

const typeLabels = {
    consultation: 'Consultation',
    information: "Demande d'information",
    support: 'Support technique',
    enrollment: 'Inscription formation',
    other: 'Autre',
};

export default function AppointmentShow({ appointment }: Props) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    const handleStatusChange = (newStatus: string) => {
        router.put(
            `/admin/appointments/${appointment.id}/status`,
            {
                status: newStatus,
            },
            {
                preserveState: true,
                onSuccess: () => {
                    // Success message will be handled by flash message
                },
            },
        );
    };

    const statusInfo = statusConfig[appointment.status as keyof typeof statusConfig];
    const StatusIcon = statusInfo?.icon || AlertCircle;

    return (
        <AppLayout>
            <Head title={`Rendez-vous - ${appointment.title}`} />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" onClick={() => router.visit('/admin/appointments')} className="flex items-center space-x-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour à la liste</span>
                        </Button>
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Détails du rendez-vous</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">ID: #{appointment.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {appointment.status === 'pending' && (
                            <Button onClick={() => handleStatusChange('confirmed')} className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirmer
                            </Button>
                        )}
                        {appointment.status === 'confirmed' && (
                            <Button onClick={() => handleStatusChange('completed')} className="bg-blue-600 hover:bg-blue-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Marquer terminé
                            </Button>
                        )}
                        {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                            <Button onClick={() => handleStatusChange('cancelled')} variant="destructive">
                                <XCircle className="w-4 h-4 mr-2" />
                                Annuler
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* General Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>Informations générales</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Titre</label>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">{appointment.title}</p>
                                </div>

                                {appointment.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                                        <p className="text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">{appointment.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date et heure</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-white">{formatDate(appointment.appointment_date)}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-white">{formatDuration(appointment.duration)}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Tag className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900 dark:text-white">
                                                {typeLabels[appointment.type as keyof typeof typeLabels] || appointment.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge className={cn('flex items-center space-x-1', statusInfo?.color)}>
                                                <StatusIcon className="w-3 h-3" />
                                                <span>{statusInfo?.label}</span>
                                            </Badge>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                        <span className="text-xs">?</span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{statusInfo?.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Client Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span>Informations client</span>
                                </CardTitle>
                                <CardDescription>Coordonnées et informations de contact</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {appointment.user ? (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Utilisateur enregistré</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <User className="w-4 h-4 text-green-600" />
                                            <span className="text-gray-900 dark:text-white font-medium">{appointment.user.name}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{appointment.user.email}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Client invité</label>
                                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">Non enregistré sur la plateforme</p>
                                    </div>
                                )}

                                {appointment.client_email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <a
                                                href={`mailto:${appointment.client_email}`}
                                                className="text-teal-600 hover:text-teal-700 dark:text-teal-400"
                                            >
                                                {appointment.client_email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {appointment.client_phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <a
                                                href={`tel:${appointment.client_phone}`}
                                                className="text-teal-600 hover:text-teal-700 dark:text-teal-400"
                                            >
                                                {appointment.client_phone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <MessageSquare className="w-5 h-5" />
                                    <span>Informations système</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <label className="text-gray-500 dark:text-gray-400">Créé le</label>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(appointment.created_at).toLocaleDateString('fr-FR', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>

                                {appointment.updated_at !== appointment.created_at && (
                                    <div>
                                        <label className="text-gray-500 dark:text-gray-400">Dernière modification</label>
                                        <p className="text-gray-900 dark:text-white">
                                            {new Date(appointment.updated_at).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                )}

                                {appointment.admin_notes && (
                                    <div>
                                        <label className="text-gray-500 dark:text-gray-400">Notes administrateur</label>
                                        <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-md mt-1">
                                            {appointment.admin_notes}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
