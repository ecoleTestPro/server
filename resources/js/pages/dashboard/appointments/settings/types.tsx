import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Type, Clock } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppointmentType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/dashboard/app-layout';

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
    '#6b7280'  // gray
];

const PREDEFINED_ICONS = [
    '💡', '📋', '🛠️', '📚', '❓', '📞', '💼', '🎯', '📅', '⚡', '🔧', '📝', '👥', '🎓', '💬'
];

export default function AppointmentTypesSettings({ appointmentTypes, appointmentDurations }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingType, setEditingType] = useState<AppointmentType | null>(null);
    const [types, setTypes] = useState(appointmentTypes);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        icon: '',
        color: PREDEFINED_COLORS[0],
        description: '',
        default_duration: 30,
        is_active: true
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
                is_active: type.is_active
            });
        } else {
            setEditingType(null);
            reset();
            setData(prev => ({
                ...prev,
                color: PREDEFINED_COLORS[0],
                default_duration: 30,
                is_active: true
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
                }
            });
        } else {
            post(route('dashboard.appointments.settings.types.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                }
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

    const handleReorder = (newOrder: AppointmentType[]) => {
        setTypes(newOrder);
        // TODO: Update sort_order via API
        post(route('dashboard.appointments.settings.types.reorder'), {
            types: newOrder.map((type, index) => ({ id: type.id, sort_order: index + 1 }))
        });
    };

    const getDurationLabel = (duration: number) => {
        const found = appointmentDurations.find(d => d.duration === duration);
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gérez les différents types de rendez-vous proposés
                        </p>
                    </div>
                    <Button 
                        onClick={() => openDialog()}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau type
                    </Button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{types.length}</p>
                                </div>
                                <Type className="w-5 h-5 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actifs</p>
                                    <p className="text-2xl font-bold text-green-600">{types.filter(t => t.is_active).length}</p>
                                </div>
                                <Eye className="w-5 h-5 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactifs</p>
                                    <p className="text-2xl font-bold text-red-600">{types.filter(t => !t.is_active).length}</p>
                                </div>
                                <EyeOff className="w-5 h-5 text-red-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Durée moyenne</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {Math.round(types.reduce((acc, type) => acc + type.default_duration, 0) / types.length || 0)}min
                                    </p>
                                </div>
                                <Clock className="w-5 h-5 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Types List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des types</CardTitle>
                        <CardDescription>
                            Glissez-déposez pour réorganiser l'ordre d'affichage
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Reorder.Group 
                                values={types} 
                                onReorder={handleReorder}
                                as="div"
                                className="space-y-2"
                            >
                                {types.map((type) => (
                                    <Reorder.Item
                                        key={type.id}
                                        value={type}
                                        as="div"
                                        className={cn(
                                            "flex items-center justify-between p-4 border rounded-lg transition-all duration-200",
                                            "hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/20",
                                            "cursor-grab active:cursor-grabbing"
                                        )}
                                    >
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <GripVertical className="w-4 h-4 text-gray-400" />
                                                <div className="flex items-center space-x-2">
                                                    {type.icon && (
                                                        <span className="text-lg">{type.icon}</span>
                                                    )}
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: type.color }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                                        {type.name}
                                                    </h3>
                                                    <Badge variant={type.is_active ? "default" : "secondary"}>
                                                        {type.is_active ? 'Actif' : 'Inactif'}
                                                    </Badge>
                                                </div>
                                                {type.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {type.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                    <span>Durée par défaut: {getDurationLabel(type.default_duration)}</span>
                                                    <span>Position: {type.sort_order}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                checked={type.is_active}
                                                onCheckedChange={() => handleToggleStatus(type.id)}
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openDialog(type)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(type.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>

                            {types.length === 0 && (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Type className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>Aucun type de rendez-vous configuré</p>
                                    <p className="text-sm">Commencez par créer votre premier type</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Create/Edit Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingType ? 'Modifier le type' : 'Nouveau type de rendez-vous'}
                            </DialogTitle>
                            <DialogDescription>
                                Configurez les détails du type de rendez-vous
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom du type</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Consultation..."
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="default_duration">Durée par défaut</Label>
                                    <Select 
                                        value={data.default_duration.toString()} 
                                        onValueChange={(value) => setData('default_duration', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {appointmentDurations.map(duration => (
                                                <SelectItem key={duration.id} value={duration.duration.toString()}>
                                                    {duration.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.default_duration && (
                                        <p className="text-sm text-red-600">{errors.default_duration}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description du type de rendez-vous..."
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icône</Label>
                                    <Input
                                        id="icon"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        placeholder="Emoji ou icône..."
                                    />
                                    <div className="flex flex-wrap gap-1">
                                        {PREDEFINED_ICONS.map(icon => (
                                            <button
                                                key={icon}
                                                type="button"
                                                onClick={() => setData('icon', icon)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-lg"
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="color">Couleur</Label>
                                    <Input
                                        id="color"
                                        type="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="h-10"
                                    />
                                    <div className="flex flex-wrap gap-1">
                                        {PREDEFINED_COLORS.map(color => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setData('color', color)}
                                                className="w-6 h-6 rounded border-2 border-gray-300 hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="is_active">Statut</Label>
                                    <p className="text-sm text-gray-600">
                                        Les types inactifs ne sont pas proposés lors de la prise de rendez-vous
                                    </p>
                                </div>
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                            </div>

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
                                    disabled={processing}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                >
                                    {processing ? 'En cours...' : (editingType ? 'Modifier' : 'Créer')}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}