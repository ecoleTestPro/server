import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Calendar, Clock, User, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PrivateLayout from '@/components/layouts/Private/PrivateLayout';

interface Props {
    appointments: Appointment[];
    filters: {
        month?: number;
        year?: number;
        type?: string;
        status?: string;
    };
    appointmentTypes: Array<{
        id: number;
        name: string;
        slug: string;
        color: string;
    }>;
}

const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-500' },
    confirmed: { label: 'Confirmé', color: 'bg-blue-500' },
    completed: { label: 'Terminé', color: 'bg-green-500' },
    cancelled: { label: 'Annulé', color: 'bg-red-500' }
};

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function AppointmentsCalendar({ appointments, filters, appointmentTypes }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedType, setSelectedType] = useState(filters.type || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of the month and calculate calendar grid
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const daysInMonth = lastDayOfMonth.getDate();

    // Create calendar grid
    const calendarDays = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayWeekday; i++) {
        calendarDays.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Filter appointments by date and get appointments for each day
    const getAppointmentsForDay = (day: number) => {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        
        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.appointment_date).toISOString().split('T')[0];
            
            let matches = appointmentDate === dateStr;
            
            if (selectedType !== 'all') {
                matches = matches && appointment.type === selectedType;
            }
            
            if (selectedStatus !== 'all') {
                matches = matches && appointment.status === selectedStatus;
            }
            
            return matches;
        });
    };

    const formatTime = (dateTime: string) => {
        return new Date(dateTime).toLocaleTimeString('fr-FR', {
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

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const isToday = (day: number) => {
        return today.getDate() === day && 
               today.getMonth() === month && 
               today.getFullYear() === year;
    };

    const hasAppointments = (day: number) => {
        return getAppointmentsForDay(day).length > 0;
    };

    return (
        <PrivateLayout>
            <Head title="Calendrier des rendez-vous" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Calendrier</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Vue calendrier de tous les rendez-vous
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau RDV
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
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
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{MONTHS[month]} {year}</span>
                                </CardTitle>
                                <CardDescription>
                                    Cliquez sur une date pour voir les détails
                                </CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateMonth('prev')}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentDate(new Date())}
                                >
                                    Aujourd'hui
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateMonth('next')}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-2">
                            {/* Days of week header */}
                            {DAYS.map(day => (
                                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {day}
                                </div>
                            ))}
                            
                            {/* Calendar days */}
                            {calendarDays.map((day, index) => {
                                if (!day) {
                                    return <div key={index} className="p-2 h-24" />;
                                }

                                const dayAppointments = getAppointmentsForDay(day);
                                const hasAppts = dayAppointments.length > 0;

                                return (
                                    <TooltipProvider key={day}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={cn(
                                                        "p-2 h-24 border rounded-lg cursor-pointer transition-all duration-200",
                                                        "hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
                                                        isToday(day) && "bg-indigo-100 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700",
                                                        hasAppts && "ring-2 ring-indigo-200 dark:ring-indigo-800"
                                                    )}
                                                    onClick={() => setSelectedDate(new Date(year, month, day))}
                                                >
                                                    <div className="flex flex-col h-full">
                                                        <div className={cn(
                                                            "text-sm font-medium mb-1",
                                                            isToday(day) ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-white"
                                                        )}>
                                                            {day}
                                                        </div>
                                                        <div className="flex-1 space-y-1 overflow-hidden">
                                                            {dayAppointments.slice(0, 2).map((appointment, idx) => (
                                                                <div
                                                                    key={appointment.id}
                                                                    className={cn(
                                                                        "text-xs px-2 py-1 rounded truncate",
                                                                        statusConfig[appointment.status as keyof typeof statusConfig]?.color,
                                                                        "text-white"
                                                                    )}
                                                                >
                                                                    {formatTime(appointment.appointment_date)}
                                                                </div>
                                                            ))}
                                                            {dayAppointments.length > 2 && (
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 px-1">
                                                                    +{dayAppointments.length - 2} autres
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div>
                                                    <p className="font-medium">{day} {MONTHS[month]} {year}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {dayAppointments.length} rendez-vous
                                                    </p>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Day Details Dialog */}
                <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5" />
                                <span>
                                    {selectedDate && `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
                                </span>
                            </DialogTitle>
                            <DialogDescription>
                                {selectedDate && getAppointmentsForDay(selectedDate.getDate()).length} rendez-vous ce jour
                            </DialogDescription>
                        </DialogHeader>
                        
                        {selectedDate && (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {getAppointmentsForDay(selectedDate.getDate()).map(appointment => (
                                    <motion.div
                                        key={appointment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Badge className={cn("text-xs", statusConfig[appointment.status as keyof typeof statusConfig]?.color, "text-white")}>
                                                        {statusConfig[appointment.status as keyof typeof statusConfig]?.label}
                                                    </Badge>
                                                    <Badge variant="outline" style={{ color: appointment.appointmentType?.color }}>
                                                        {appointment.appointmentType?.name || appointment.type}
                                                    </Badge>
                                                </div>
                                                
                                                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                                    {appointment.title}
                                                </h4>
                                                
                                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center space-x-1">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{formatTime(appointment.appointment_date)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span>{formatDuration(appointment.duration)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <User className="w-4 h-4" />
                                                        <span>{appointment.user?.name || appointment.client_email}</span>
                                                    </div>
                                                </div>
                                                
                                                {appointment.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                        {appointment.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                
                                {getAppointmentsForDay(selectedDate.getDate()).length === 0 && (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        Aucun rendez-vous ce jour
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </PrivateLayout>
    );
}