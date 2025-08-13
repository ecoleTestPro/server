import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, User, Phone, Mail, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Filter, Search, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/dashboard/app-layout';

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
    appointmentTypes: Array<{
        id: number;
        name: string;
        slug: string;
        color: string;
    }>;
}

const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: AlertCircle },
    confirmed: { label: 'Confirmé', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', icon: CheckCircle },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: XCircle }
};

export default function AppointmentsIndex({ appointments, filters, stats, appointmentTypes }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [selectedType, setSelectedType] = useState(filters.type || 'all');

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
        // TODO: Implement status change via API
        console.log('Changing status', appointmentId, newStatus);
    };

    return (
        <AppLayout>
            <Head title="Gestion des rendez-vous" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Rendez-vous</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gérez tous les rendez-vous et leurs paramètres
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                                </div>
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En attente</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <AlertCircle className="w-5 h-5 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmés</p>
                                    <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terminés</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                </div>
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Annulés</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                                </div>
                                <XCircle className="w-5 h-5 text-red-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aujourd'hui</p>
                                    <p className="text-2xl font-bold text-indigo-600">{stats.today}</p>
                                </div>
                                <Clock className="w-5 h-5 text-indigo-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Rechercher par nom, email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="pending">En attente</SelectItem>
                                    <SelectItem value="confirmed">Confirmé</SelectItem>
                                    <SelectItem value="completed">Terminé</SelectItem>
                                    <SelectItem value="cancelled">Annulé</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les types</SelectItem>
                                    {appointmentTypes.map(type => (
                                        <SelectItem key={type.id} value={type.slug}>{type.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Appointments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des rendez-vous</CardTitle>
                        <CardDescription>
                            {appointments.meta.total} rendez-vous trouvés
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Date & Heure</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Durée</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.data.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={appointment.user?.avatar} />
                                                        <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                                                            {appointment.client_email?.charAt(0).toUpperCase() || 'A'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.user?.name || appointment.client_email}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {appointment.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" style={{ color: appointment.appointmentType?.color }}>
                                                    {appointment.appointmentType?.name || appointment.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm">{formatDuration(appointment.duration)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn("text-xs", statusConfig[appointment.status as keyof typeof statusConfig]?.color)}>
                                                    <span className="flex items-center space-x-1">
                                                        {getStatusIcon(appointment.status)}
                                                        <span>{statusConfig[appointment.status as keyof typeof statusConfig]?.label || appointment.status}</span>
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
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
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Voir détails
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Modifier
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {appointment.status === 'pending' && (
                                                            <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'confirmed')}>
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Confirmer
                                                            </DropdownMenuItem>
                                                        )}
                                                        {appointment.status === 'confirmed' && (
                                                            <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'completed')}>
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Marquer terminé
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem 
                                                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                                            className="text-red-600"
                                                        >
                                                            <XCircle className="w-4 h-4 mr-2" />
                                                            Annuler
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Supprimer
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}