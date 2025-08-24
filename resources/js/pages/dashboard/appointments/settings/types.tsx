import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/dashboard/app-layout';
import { cn } from '@/lib/utils';
import { AppointmentType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Reorder } from 'framer-motion';
import { Edit, GripVertical, Plus, Trash2, Type } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    appointmentTypes: AppointmentType[];
    appointmentDurations: Array<{
        id: number;
        duration: number;
        label: string;
    }>;
}

const PREDEFINED_COLORS = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6b7280', // gray
];

export default function AppointmentTypesSettings({ appointmentDurations }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<AppointmentType | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        icon: '',
        color: PREDEFINED_COLORS[0],
        description: '',
        default_duration: 30,
        is_active: true,
    });

    const openDialog = (type?: AppointmentType) => {
        if (type) {
            setEditingType(type);
            setData({
                name: type.name,
                icon: type.icon || '',
                color: type.color,
                description: type.description || '',
                default_duration: type.default_duration,
                is_active: type.is_active,
            });
        } else {
            setEditingType(null);
            reset();
            setData((prev) => ({
                ...prev,
                color: PREDEFINED_COLORS[0],
                default_duration: 30,
                is_active: true,
            }));
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingType) {
            put(route('dashboard.appointments.settings.types.update', editingType.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('dashboard.appointments.settings.types.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleToggleStatus = (typeId: number) => {
        put(route('dashboard.appointments.settings.types.toggle', typeId));
    };

    const handleDelete = (typeId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce type de rendez-vous ?')) {
            destroy(route('dashboard.appointments.settings.types.destroy', typeId));
        }
    };

    const getDurationLabel = (duration: number) => {
        const found = appointmentDurations.find((d) => d.duration === duration);
        return found?.label || `${duration}min`;
    };

    return (
        <AppLayout>
            <Head title="Types de rendez-vous" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Types de rendez-vous</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Gérez les différents types de rendez-vous proposés</p>
                    </div>
                    <Button onClick={() => openDialog()} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau type
                    </Button>
                </div> 

                {/* Create/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingType ? 'Modifier le type' : 'Nouveau type de rendez-vous'}</DialogTitle>
                            <DialogDescription>Configurez les détails du type de rendez-vous</DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom du type</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Consultation..."
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="is_active">Statut</Label>
                                    <p className="text-sm text-gray-600">Les types inactifs ne sont pas proposés lors de la prise de rendez-vous</p>
                                </div>
                                <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                                >
                                    {processing ? 'En cours...' : editingType ? 'Modifier' : 'Créer'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
