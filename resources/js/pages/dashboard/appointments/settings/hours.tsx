import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/dashboard/app-layout';
import { cn } from '@/lib/utils';
import { BusinessHours } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, Copy, Edit, Eye, HelpCircle, Info, RotateCcw, Save, Settings, Timer } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    businessHours: BusinessHours[];
    appointmentDurations: Array<{
        id: number;
        duration: number;
        label: string;
    }>;
}

const DAYS_OF_WEEK = [
    { key: 'monday', label: 'Lundi', shortLabel: 'Lun' },
    { key: 'tuesday', label: 'Mardi', shortLabel: 'Mar' },
    { key: 'wednesday', label: 'Mercredi', shortLabel: 'Mer' },
    { key: 'thursday', label: 'Jeudi', shortLabel: 'Jeu' },
    { key: 'friday', label: 'Vendredi', shortLabel: 'Ven' },
    { key: 'saturday', label: 'Samedi', shortLabel: 'Sam' },
    { key: 'sunday', label: 'Dimanche', shortLabel: 'Dim' },
];

const DEFAULT_HOURS = {
    opening_time: '09:00',
    closing_time: '18:00',
    lunch_break_start: '12:00',
    lunch_break_end: '13:00',
    slot_duration: 30,
};

export default function BusinessHoursSettings({ businessHours, appointmentDurations }: Props) {
    const [hours, setHours] = useState(() => {
        const hoursMap = businessHours.reduce(
            (acc, hour) => {
                acc[hour.day_of_week] = hour;
                return acc;
            },
            {} as Record<string, BusinessHours>,
        );

        return DAYS_OF_WEEK.map(
            (day) =>
                hoursMap[day.key] || {
                    day_of_week: day.key,
                    is_open: day.key !== 'sunday',
                    ...DEFAULT_HOURS,
                },
        );
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingDay, setEditingDay] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        day_of_week: '',
        is_open: true as boolean,
        opening_time: DEFAULT_HOURS.opening_time,
        closing_time: DEFAULT_HOURS.closing_time,
        lunch_break_start: '',
        lunch_break_end: '',
        slot_duration: DEFAULT_HOURS.slot_duration,
    });

    const openDialog = (dayKey: string) => {
        const dayHours = hours.find((h) => h.day_of_week === dayKey);
        if (dayHours) {
            setEditingDay(dayKey);
            setData('day_of_week', dayHours.day_of_week);
            setData('is_open', dayHours.is_open);
            setData('opening_time', dayHours.opening_time || DEFAULT_HOURS.opening_time);
            setData('closing_time', dayHours.closing_time || DEFAULT_HOURS.closing_time);
            setData('lunch_break_start', dayHours.lunch_break_start || '');
            setData('lunch_break_end', dayHours.lunch_break_end || '');
            setData('slot_duration', dayHours.slot_duration || DEFAULT_HOURS.slot_duration);
            setIsDialogOpen(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Updating day:', editingDay, 'with data:', data);
        
        setHours((prev) => prev.map((hour) => {
            if (hour.day_of_week === editingDay) {
                const updatedHour = { ...hour, ...data };
                console.log('Updated hour:', updatedHour);
                return updatedHour;
            }
            return hour;
        }));
        setHasChanges(true);
        setIsDialogOpen(false);
    };

    const saveAllChanges = () => {
        // Log the data being sent for debugging
        console.log('Sending hours data:', hours);
        
        axios
            .post(route('dashboard.appointments.settings.hours.update'), {
                hours: hours,
            })
            .then((response) => {
                console.log('Response:', response.data);
                setHasChanges(false);
                toast.success('Horaires mis à jour avec succès ! Les créneaux ont été enregistrés.');
                router.reload();
            })
            .catch((error) => {
                toast.error('Erreur lors de la mise à jour des horaires');
                console.error('Erreur:', error);
                if (error.response && error.response.data) {
                    console.error('Détails de l\'erreur:', error.response.data);
                }
            });
    };

    const resetChanges = () => {
        const hoursMap = businessHours.reduce(
            (acc, hour) => {
                acc[hour.day_of_week] = hour;
                return acc;
            },
            {} as Record<string, BusinessHours>,
        );

        setHours(
            DAYS_OF_WEEK.map(
                (day) =>
                    hoursMap[day.key] || {
                        day_of_week: day.key,
                        is_open: day.key !== 'sunday',
                        ...DEFAULT_HOURS,
                    },
            ),
        );
        setHasChanges(false);
    };

    const toggleDay = (dayKey: string) => {
        setHours((prev) => prev.map((hour) => (hour.day_of_week === dayKey ? { ...hour, is_open: !hour.is_open } : hour)));
        setHasChanges(true);
    };

    const copyToAllDays = (sourceDay: string) => {
        const sourceHours = hours.find((h) => h.day_of_week === sourceDay);
        if (sourceHours) {
            setHours((prev) =>
                prev.map((hour) => ({
                    ...hour,
                    opening_time: sourceHours.opening_time,
                    closing_time: sourceHours.closing_time,
                    lunch_break_start: sourceHours.lunch_break_start,
                    lunch_break_end: sourceHours.lunch_break_end,
                    slot_duration: sourceHours.slot_duration,
                })),
            );
            setHasChanges(true);
        }
    };

    const formatTimeRange = (opening?: string, closing?: string) => {
        if (!opening || !closing) return 'Non configuré';
        return `${opening} - ${closing}`;
    };

    const formatLunchBreak = (start?: string, end?: string) => {
        if (!start || !end) return 'Aucune';
        return `${start} - ${end}`;
    };

    const getDayLabel = (dayKey: string) => {
        return DAYS_OF_WEEK.find((d) => d.key === dayKey)?.label || dayKey;
    };

    const getStats = () => {
        const openDays = hours.filter((h) => h.is_open).length;
        const totalHours = hours.reduce((acc, hour) => {
            if (!hour.is_open || !hour.opening_time || !hour.closing_time) return acc;
            const opening = new Date(`1970-01-01T${hour.opening_time}:00`);
            const closing = new Date(`1970-01-01T${hour.closing_time}:00`);
            let diff = (closing.getTime() - opening.getTime()) / (1000 * 60 * 60);

            if (hour.lunch_break_start && hour.lunch_break_end) {
                const lunchStart = new Date(`1970-01-01T${hour.lunch_break_start}:00`);
                const lunchEnd = new Date(`1970-01-01T${hour.lunch_break_end}:00`);
                const lunchDiff = (lunchEnd.getTime() - lunchStart.getTime()) / (1000 * 60 * 60);
                diff -= lunchDiff;
            }

            return acc + diff;
        }, 0);

        const avgSlotDuration =
            hours.filter((h) => h.is_open && h.slot_duration).reduce((acc, hour) => acc + (hour.slot_duration || 0), 0) /
            hours.filter((h) => h.is_open).length;

        return { openDays, totalHours: Math.round(totalHours), avgSlotDuration: Math.round(avgSlotDuration || 0) };
    };

    const stats = getStats();

    return (
        <AppLayout>
            <Head title="Horaires d'ouverture" />

            <div className="space-y-6">
                {/* Guide d'utilisation */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-teal-900 dark:text-teal-100 mb-2">Comment configurer vos horaires ?</h3>
                            <div className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                                <p>• <strong>Activez/désactivez</strong> chaque jour avec l'interrupteur</p>
                                <p>• <strong>Cliquez sur "Modifier"</strong> pour configurer les heures détaillées</p>
                                <p>• <strong>Utilisez "Copier"</strong> pour appliquer les mêmes horaires à tous les jours</p>
                                <p>• <strong>N'oubliez pas</strong> de sauvegarder vos modifications avec le bouton "Enregistrer"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                <Calendar className="w-6 h-6 text-teal-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Horaires d'ouverture</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Configurez vos heures de disponibilité pour les rendez-vous</p>
                            </div>
                        </div>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                                <p>
                                    Définissez vos horaires d'ouverture pour chaque jour de la semaine. Les clients pourront uniquement prendre rendez-vous pendant ces créneaux. Vous pouvez configurer des pauses déjeuner et ajuster la durée minimum entre les rendez-vous.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex space-x-2">
                        {hasChanges && (
                            <>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" onClick={resetChanges}>
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Annuler
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Annuler toutes les modifications non sauvegardées</p>
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={saveAllChanges}
                                            disabled={processing}
                                            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {processing ? 'En cours...' : 'Enregistrer'}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Sauvegarder tous les changements d'horaires</p>
                                    </TooltipContent>
                                </Tooltip>
                            </>
                        )}
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="hover:shadow-md transition-shadow cursor-help">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Jours ouverts</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.openDays}/7</p>
                                        </div>
                                        <Calendar className="w-5 h-5 text-teal-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Nombre de jours où vous acceptez les rendez-vous cette semaine</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="hover:shadow-md transition-shadow cursor-help">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Heures/semaine</p>
                                            <p className="text-2xl font-bold text-blue-600">{stats.totalHours}h</p>
                                        </div>
                                        <Clock className="w-5 h-5 text-blue-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Total d'heures d'ouverture par semaine (pauses déjeuner déduites)</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="hover:shadow-md transition-shadow cursor-help">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Créneaux moyens</p>
                                            <p className="text-2xl font-bold text-green-600">{stats.avgSlotDuration}min</p>
                                        </div>
                                        <Timer className="w-5 h-5 text-green-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Durée moyenne des créneaux de rendez-vous configurés</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="hover:shadow-md transition-shadow cursor-help">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Modifications</p>
                                            <p className={cn('text-2xl font-bold', hasChanges ? 'text-orange-600' : 'text-gray-400')}>
                                                {hasChanges ? 'Oui' : 'Non'}
                                            </p>
                                        </div>
                                        <Save className={cn('w-5 h-5', hasChanges ? 'text-orange-400' : 'text-gray-400')} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Indique s'il y a des modifications non sauvegardées</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Hours Configuration */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <Settings className="w-5 h-5 text-gray-500" />
                            <CardTitle>Configuration hebdomadaire</CardTitle>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm">
                                    <p>
                                        Activez/désactivez chaque jour avec l'interrupteur. Cliquez sur "Modifier" pour configurer les heures détaillées. Utilisez "Copier" pour appliquer les mêmes horaires à tous les jours.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <CardDescription>
                            <div className="flex items-center space-x-2">
                                <Info className="w-4 h-4 text-blue-500" />
                                <span>Cliquez sur un jour pour modifier ses horaires en détail</span>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {hours.map((dayHours) => {
                            const day = DAYS_OF_WEEK.find((d) => d.key === dayHours.day_of_week);
                            if (!day) return null;

                            return (
                                <motion.div
                                    key={dayHours.day_of_week}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        'flex items-center justify-between p-4 border rounded-lg transition-all duration-200',
                                        'hover:border-teal-200 hover:bg-teal-50 dark:hover:bg-teal-950/20',
                                        !dayHours.is_open && 'opacity-60',
                                    )}
                                >
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div className="flex items-center space-x-3">
                                            <Switch checked={dayHours.is_open} onCheckedChange={() => toggleDay(dayHours.day_of_week)} />
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">{day.label}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{day.shortLabel}</p>
                                            </div>
                                        </div>

                                        {dayHours.is_open ? (
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="cursor-help">
                                                            <span className="text-gray-500 dark:text-gray-400">Ouverture: </span>
                                                            <span className="font-medium text-green-600 dark:text-green-400">
                                                                {formatTimeRange(dayHours.opening_time, dayHours.closing_time)}
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Heures pendant lesquelles les rendez-vous sont acceptés</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="cursor-help">
                                                            <span className="text-gray-500 dark:text-gray-400">Pause déjeuner: </span>
                                                            <span className={cn(
                                                                "font-medium",
                                                                dayHours.lunch_break_start && dayHours.lunch_break_end 
                                                                    ? "text-orange-600 dark:text-orange-400" 
                                                                    : "text-gray-400"
                                                            )}>
                                                                {formatLunchBreak(dayHours.lunch_break_start, dayHours.lunch_break_end)}
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Période où aucun rendez-vous n'est disponible</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="cursor-help">
                                                            <span className="text-gray-500 dark:text-gray-400">Créneaux: </span>
                                                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                                                {dayHours.slot_duration || DEFAULT_HOURS.slot_duration}min
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Intervalle entre chaque créneau de rendez-vous</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ) : (
                                            <div className="flex-1">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Badge variant="secondary" className="cursor-help bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                                            <div className="flex items-center space-x-1">
                                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                                <span>Fermé</span>
                                                            </div>
                                                        </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Aucun rendez-vous n'est disponible ce jour</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {dayHours.is_open && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => copyToAllDays(dayHours.day_of_week)}
                                                        className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20"
                                                    >
                                                        <Copy className="w-4 h-4 mr-1" />
                                                        Copier
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Appliquer ces horaires à tous les jours de la semaine</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openDialog(dayHours.day_of_week)}
                                                    disabled={!dayHours.is_open}
                                                    className="hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-teal-950/20"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{dayHours.is_open ? 'Modifier les horaires détaillés' : 'Activez ce jour pour le modifier'}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-teal-600" />
                                <DialogTitle>Horaires du {editingDay && getDayLabel(editingDay)}</DialogTitle>
                            </div>
                            <DialogDescription className="space-y-2">
                                <p>Configurez les horaires d'ouverture et les créneaux disponibles pour ce jour.</p>
                                <div className="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Les clients pourront prendre rendez-vous uniquement pendant ces horaires, en excluant les pauses déjeuner.
                                    </p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="is_open">Ouvert ce jour</Label>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <HelpCircle className="w-4 h-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Si désactivé, aucun rendez-vous ne pourra être pris ce jour</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Désactiver si vous ne prenez pas de rendez-vous ce jour</p>
                                </div>
                                <Switch id="is_open" checked={data.is_open} onCheckedChange={(checked) => setData('is_open', checked as boolean)} />
                            </div>

                            {data.is_open && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="opening_time">Heure d'ouverture</Label>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="w-3 h-3 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Premier créneau disponible pour les rendez-vous</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <Input
                                                id="opening_time"
                                                type="time"
                                                value={data.opening_time}
                                                onChange={(e) => setData('opening_time', e.target.value)}
                                                className={errors.opening_time ? 'border-red-500' : ''}
                                            />
                                            {errors.opening_time && <p className="text-sm text-red-600">{errors.opening_time}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="closing_time">Heure de fermeture</Label>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="w-3 h-3 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Dernier créneau possible pour les rendez-vous</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <Input
                                                id="closing_time"
                                                type="time"
                                                value={data.closing_time}
                                                onChange={(e) => setData('closing_time', e.target.value)}
                                                className={errors.closing_time ? 'border-red-500' : ''}
                                            />
                                            {errors.closing_time && <p className="text-sm text-red-600">{errors.closing_time}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Label className="text-base font-medium">Pause déjeuner</Label>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <HelpCircle className="w-4 h-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p>Période pendant laquelle aucun rendez-vous ne peut être pris. Laissez vide si vous ne souhaitez pas de pause déjeuner.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Badge variant="outline" className="text-xs">Optionnel</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="lunch_break_start" className="text-sm text-gray-600 dark:text-gray-400">
                                                    Début
                                                </Label>
                                                <Input
                                                    id="lunch_break_start"
                                                    type="time"
                                                    value={data.lunch_break_start}
                                                    onChange={(e) => setData('lunch_break_start', e.target.value)}
                                                    placeholder="12:00"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="lunch_break_end" className="text-sm text-gray-600 dark:text-gray-400">
                                                    Fin
                                                </Label>
                                                <Input
                                                    id="lunch_break_end"
                                                    type="time"
                                                    value={data.lunch_break_end}
                                                    onChange={(e) => setData('lunch_break_end', e.target.value)}
                                                    placeholder="13:00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Label htmlFor="slot_duration">Durée des créneaux (minutes)</Label>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <HelpCircle className="w-4 h-4 text-gray-400" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p>Intervalle minimum entre chaque rendez-vous. Par exemple, avec 30 minutes, les créneaux seront : 9h00, 9h30, 10h00, etc.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <Input
                                            id="slot_duration"
                                            type="number"
                                            min={15}
                                            max={120}
                                            step={15}
                                            value={data.slot_duration}
                                            onChange={(e) => setData('slot_duration', parseInt(e.target.value) || 30)}
                                            className="w-32"
                                        />
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Timer className="w-4 h-4" />
                                            <span>Durée minimum entre chaque rendez-vous possible (15-120 min par pas de 15)</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                                    Appliquer
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
