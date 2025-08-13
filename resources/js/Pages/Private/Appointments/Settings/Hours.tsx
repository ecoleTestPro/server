import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Clock, Plus, Edit, Trash2, Eye, EyeOff, Coffee, Save, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BusinessHours } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PrivateLayout from '@/components/layouts/Private/PrivateLayout';

interface Props {
    businessHours: BusinessHours[];
    appointmentDurations: Array<{
        id: number;
        duration: number;
        label: string;
    }>;
}

const hoursSchema = z.object({
    day_of_week: z.string(),
    is_open: z.boolean().default(true),
    opening_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format HH:MM requis'),
    closing_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format HH:MM requis'),
    lunch_break_start: z.string().optional(),
    lunch_break_end: z.string().optional(),
    slot_duration: z.number().min(15).max(120)
}).refine(data => {
    if (!data.is_open) return true;
    const opening = new Date(`1970-01-01T${data.opening_time}:00`);
    const closing = new Date(`1970-01-01T${data.closing_time}:00`);
    return closing > opening;
}, {
    message: "L'heure de fermeture doit être après l'ouverture",
    path: ["closing_time"]
});

type HoursFormData = z.infer<typeof hoursSchema>;

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

    const form = useForm<HoursFormData>({
        resolver: zodResolver(hoursSchema),
        defaultValues: {
            is_open: true,
            ...DEFAULT_HOURS
        }
    });

    const openDialog = (dayKey: string) => {
        const dayHours = hours.find(h => h.day_of_week === dayKey);
        if (dayHours) {
            setEditingDay(dayKey);
            form.reset({
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

    const handleSubmit = async (data: HoursFormData) => {
        try {
            setHours(prev => prev.map(hour => 
                hour.day_of_week === editingDay 
                    ? { ...hour, ...data }
                    : hour
            ));
            setHasChanges(true);
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error updating hours:', error);
        }
    };

    const saveAllChanges = async () => {
        try {
            // TODO: Implement API call to save all hours
            console.log('Saving all hours:', hours);
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving hours:', error);
        }
    };

    const resetChanges = () => {
        // Reset to original state
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
            
            // Subtract lunch break if exists
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
        <PrivateLayout>
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
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Enregistrer
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

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="is_open"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between">
                                            <div>
                                                <FormLabel>Ouvert ce jour</FormLabel>
                                                <FormDescription>
                                                    Désactiver si vous ne prenez pas de rendez-vous ce jour
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {form.watch('is_open') && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="opening_time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Heure d'ouverture</FormLabel>
                                                        <FormControl>
                                                            <Input type="time" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="closing_time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Heure de fermeture</FormLabel>
                                                        <FormControl>
                                                            <Input type="time" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="lunch_break_start"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Début pause déjeuner <span className="text-gray-400">(optionnel)</span></FormLabel>
                                                        <FormControl>
                                                            <Input type="time" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="lunch_break_end"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Fin pause déjeuner <span className="text-gray-400">(optionnel)</span></FormLabel>
                                                        <FormControl>
                                                            <Input type="time" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="slot_duration"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Durée des créneaux (minutes)</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="number" 
                                                            min={15} 
                                                            max={120} 
                                                            step={15}
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Durée minimum entre chaque rendez-vous possible
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </PrivateLayout>
    );
}