import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Clock, Edit, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BusinessHours } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/dashboard/app-layout';

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
    { key: 'sunday', label: 'Dimanche', shortLabel: 'Dim' }
];

const DEFAULT_HOURS = {
    opening_time: '09:00',
    closing_time: '18:00',
    lunch_break_start: '12:00',
    lunch_break_end: '13:00',
    slot_duration: 30
};

export default function BusinessHoursSettings({ businessHours, appointmentDurations }: Props) {
    const [hours, setHours] = useState(() => {
        const hoursMap = businessHours.reduce((acc, hour) => {
            acc[hour.day_of_week] = hour;
            return acc;
        }, {} as Record<string, BusinessHours>);

        return DAYS_OF_WEEK.map(day => 
            hoursMap[day.key] || {
                day_of_week: day.key,
                is_open: day.key !== 'sunday',
                ...DEFAULT_HOURS
            }
        );
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingDay, setEditingDay] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        day_of_week: '',
        is_open: true,
        opening_time: DEFAULT_HOURS.opening_time,
        closing_time: DEFAULT_HOURS.closing_time,
        lunch_break_start: '',
        lunch_break_end: '',
        slot_duration: DEFAULT_HOURS.slot_duration
    });

    const openDialog = (dayKey: string) => {
        const dayHours = hours.find(h => h.day_of_week === dayKey);
        if (dayHours) {
            setEditingDay(dayKey);
            setData({
                day_of_week: dayHours.day_of_week,
                is_open: dayHours.is_open,
                opening_time: dayHours.opening_time || DEFAULT_HOURS.opening_time,
                closing_time: dayHours.closing_time || DEFAULT_HOURS.closing_time,
                lunch_break_start: dayHours.lunch_break_start || '',
                lunch_break_end: dayHours.lunch_break_end || '',
                slot_duration: dayHours.slot_duration || DEFAULT_HOURS.slot_duration
            });
            setIsDialogOpen(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        setHours(prev => prev.map(hour => 
            hour.day_of_week === editingDay 
                ? { ...hour, ...data }
                : hour
        ));
        setHasChanges(true);
        setIsDialogOpen(false);
    };

    const saveAllChanges = () => {
        post(route('dashboard.appointments.settings.hours.update'), {
            hours: hours,
            onSuccess: () => {
                setHasChanges(false);
            }
        });
    };

    const resetChanges = () => {
        const hoursMap = businessHours.reduce((acc, hour) => {
            acc[hour.day_of_week] = hour;
            return acc;
        }, {} as Record<string, BusinessHours>);

        setHours(DAYS_OF_WEEK.map(day => 
            hoursMap[day.key] || {
                day_of_week: day.key,
                is_open: day.key !== 'sunday',
                ...DEFAULT_HOURS
            }
        ));
        setHasChanges(false);
    };

    const toggleDay = (dayKey: string) => {
        setHours(prev => prev.map(hour => 
            hour.day_of_week === dayKey 
                ? { ...hour, is_open: !hour.is_open }
                : hour
        ));
        setHasChanges(true);
    };

    const copyToAllDays = (sourceDay: string) => {
        const sourceHours = hours.find(h => h.day_of_week === sourceDay);
        if (sourceHours) {
            setHours(prev => prev.map(hour => ({
                ...hour,
                opening_time: sourceHours.opening_time,
                closing_time: sourceHours.closing_time,
                lunch_break_start: sourceHours.lunch_break_start,
                lunch_break_end: sourceHours.lunch_break_end,
                slot_duration: sourceHours.slot_duration
            })));
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
        return DAYS_OF_WEEK.find(d => d.key === dayKey)?.label || dayKey;
    };

    const getStats = () => {
        const openDays = hours.filter(h => h.is_open).length;
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
        
        const avgSlotDuration = hours.filter(h => h.is_open && h.slot_duration).reduce((acc, hour) => acc + (hour.slot_duration || 0), 0) / hours.filter(h => h.is_open).length;
        
        return { openDays, totalHours: Math.round(totalHours), avgSlotDuration: Math.round(avgSlotDuration || 0) };
    };

    const stats = getStats();

    return (
        <AppLayout>
            <Head title="Horaires d'ouverture" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Horaires d'ouverture</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Configurez vos heures de disponibilité pour les rendez-vous
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {hasChanges && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={resetChanges}
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Annuler
                                </Button>
                                <Button 
                                    onClick={saveAllChanges}
                                    disabled={processing}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'En cours...' : 'Enregistrer'}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Jours ouverts</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.openDays}/7</p>
                                </div>
                                <Eye className="w-5 h-5 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
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

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Créneaux moyens</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.avgSlotDuration}min</p>
                                </div>
                                <Clock className="w-5 h-5 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Modifications</p>
                                    <p className={cn("text-2xl font-bold", hasChanges ? "text-orange-600" : "text-gray-400")}>
                                        {hasChanges ? 'Oui' : 'Non'}
                                    </p>
                                </div>
                                <Save className={cn("w-5 h-5", hasChanges ? "text-orange-400" : "text-gray-400")} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Hours Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration hebdomadaire</CardTitle>
                        <CardDescription>
                            Cliquez sur un jour pour modifier ses horaires en détail
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {hours.map((dayHours) => {
                            const day = DAYS_OF_WEEK.find(d => d.key === dayHours.day_of_week);
                            if (!day) return null;

                            return (
                                <motion.div
                                    key={dayHours.day_of_week}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex items-center justify-between p-4 border rounded-lg transition-all duration-200",
                                        "hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/20",
                                        !dayHours.is_open && "opacity-60"
                                    )}
                                >
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div className="flex items-center space-x-3">
                                            <Switch
                                                checked={dayHours.is_open}
                                                onCheckedChange={() => toggleDay(dayHours.day_of_week)}
                                            />
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {day.label}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {day.shortLabel}
                                                </p>
                                            </div>
                                        </div>

                                        {dayHours.is_open ? (
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Ouverture: </span>
                                                    <span className="font-medium">
                                                        {formatTimeRange(dayHours.opening_time, dayHours.closing_time)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Pause déjeuner: </span>
                                                    <span className="font-medium">
                                                        {formatLunchBreak(dayHours.lunch_break_start, dayHours.lunch_break_end)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Créneaux: </span>
                                                    <span className="font-medium">{dayHours.slot_duration || DEFAULT_HOURS.slot_duration}min</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex-1">
                                                <Badge variant="secondary">Fermé</Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {dayHours.is_open && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToAllDays(dayHours.day_of_week)}
                                                title="Copier vers tous les jours"
                                            >
                                                Copier
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openDialog(dayHours.day_of_week)}
                                            disabled={!dayHours.is_open}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
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
                            <DialogTitle>
                                Horaires du {editingDay && getDayLabel(editingDay)}
                            </DialogTitle>
                            <DialogDescription>
                                Configurez les horaires d'ouverture et les créneaux disponibles
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="is_open">Ouvert ce jour</Label>
                                    <p className="text-sm text-gray-600">
                                        Désactiver si vous ne prenez pas de rendez-vous ce jour
                                    </p>
                                </div>
                                <Switch
                                    id="is_open"
                                    checked={data.is_open}
                                    onCheckedChange={(checked) => setData('is_open', checked)}
                                />
                            </div>

                            {data.is_open && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="opening_time">Heure d'ouverture</Label>
                                            <Input
                                                id="opening_time"
                                                type="time"
                                                value={data.opening_time}
                                                onChange={(e) => setData('opening_time', e.target.value)}
                                                className={errors.opening_time ? 'border-red-500' : ''}
                                            />
                                            {errors.opening_time && (
                                                <p className="text-sm text-red-600">{errors.opening_time}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="closing_time">Heure de fermeture</Label>
                                            <Input
                                                id="closing_time"
                                                type="time"
                                                value={data.closing_time}
                                                onChange={(e) => setData('closing_time', e.target.value)}
                                                className={errors.closing_time ? 'border-red-500' : ''}
                                            />
                                            {errors.closing_time && (
                                                <p className="text-sm text-red-600">{errors.closing_time}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="lunch_break_start">Début pause déjeuner <span className="text-gray-400">(optionnel)</span></Label>
                                            <Input
                                                id="lunch_break_start"
                                                type="time"
                                                value={data.lunch_break_start}
                                                onChange={(e) => setData('lunch_break_start', e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="lunch_break_end">Fin pause déjeuner <span className="text-gray-400">(optionnel)</span></Label>
                                            <Input
                                                id="lunch_break_end"
                                                type="time"
                                                value={data.lunch_break_end}
                                                onChange={(e) => setData('lunch_break_end', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slot_duration">Durée des créneaux (minutes)</Label>
                                        <Input
                                            id="slot_duration"
                                            type="number"
                                            min={15}
                                            max={120}
                                            step={15}
                                            value={data.slot_duration}
                                            onChange={(e) => setData('slot_duration', parseInt(e.target.value) || 30)}
                                        />
                                        <p className="text-sm text-gray-600">
                                            Durée minimum entre chaque rendez-vous possible
                                        </p>
                                    </div>
                                </>
                            )}

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                >
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