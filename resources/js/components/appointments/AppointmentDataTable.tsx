import { DataTable } from '@/components/ui/dataTable';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Appointment } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { AlertCircle, Calendar, CheckCircle, Clock, Eye, HelpCircle, Mail, Phone, Users, XCircle } from 'lucide-react';

interface AppointmentDataTableProps {
    appointments: Appointment[];
    onViewDetails: (appointment: Appointment) => void;
    onStatusChange: (appointmentId: number, newStatus: string) => void;
    onDelete: (appointmentId: number) => void;
}

const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: AlertCircle },
    confirmed: { label: 'Confirmé', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', icon: CheckCircle },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: XCircle },
};

export default function AppointmentDataTable({ appointments, onViewDetails, onStatusChange, onDelete }: AppointmentDataTableProps) {
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

    const columns: ColumnDef<Appointment>[] = [
        {
            accessorKey: 'client_info',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2 cursor-help">
                            <Users className="w-4 h-4" />
                            <span>Client</span>
                            <HelpCircle className="w-3 h-3 text-gray-400" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Informations de contact du client</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const appointment = row.original;
                return (
                    <div className="space-y-1">
                        {appointment.user && (
                            <div className="flex items-center space-x-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                                <Users className="w-3 h-3 text-green-600" />
                                <span className="truncate max-w-32">{appointment.user.name}</span>
                            </div>
                        )}
                        {appointment.client_email && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="w-3 h-3" />
                                <span className="truncate max-w-32">{appointment.client_email}</span>
                            </div>
                        )}
                        {appointment.client_phone && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-3 h-3" />
                                <span>{appointment.client_phone}</span>
                            </div>
                        )}
                    </div>
                );
            },
            size: 200,
        },
        {
            accessorKey: 'title',
            header: 'Titre',
            cell: ({ row }) => {
                const appointment = row.original;
                return (
                    <div className="max-w-[200px]">
                        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">{appointment.title}</div>
                        {appointment.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{appointment.description}</div>
                        )}
                    </div>
                );
            },
            size: 200,
        },
        {
            accessorKey: 'appointment_date',
            header: ({ column }) => (
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date & Heure</span>
                </div>
            ),
            cell: ({ row }) => {
                const appointment = row.original;
                return (
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
                    </div>
                );
            },
            size: 150,
        },
        {
            accessorKey: 'duration',
            header: ({ column }) => (
                <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Durée</span>
                </div>
            ),
            cell: ({ row }) => {
                const appointment = row.original;
                return (
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{formatDuration(appointment.duration)}</span>
                    </div>
                );
            },
            size: 100,
        },
        {
            id: 'actions',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2 cursor-help">
                            <span>Actions</span>
                            <HelpCircle className="w-3 h-3 text-gray-400" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Voir détails, modifier statut ou supprimer</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const appointment = row.original;

                return (
                    <div>
                        <button onClick={() => onViewDetails(appointment)}>
                            <Eye className="w-4 h-4 mr-2 text-gray-600" />
                        </button>
                    </div>
                );
            },
            enableHiding: false,
            size: 80,
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm">
            <DataTable columns={columns} data={appointments} filterColumn="title" searchPlaceholder="Rechercher par titre, email..." />
        </div>
    );
}
