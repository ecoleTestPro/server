import React, { useState } from 'react';
import { Calendar, Clock, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TimeSlot {
    time: string;
    datetime: string;
    display: string;
}

interface BusinessHours {
    opening: string;
    closing: string;
    lunchBreak?: {
        start: string;
        end: string;
    };
}

interface AppointmentForm {
    title: string;
    description: string;
    appointment_date: string;
    duration: number;
    type: string;
    client_email: string;
    client_phone: string;
}

const AppointmentCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    const [form, setForm] = useState<AppointmentForm>({
        title: '',
        description: '',
        appointment_date: '',
        duration: 30,
        type: 'consultation',
        client_email: '',
        client_phone: ''
    });

    const appointmentTypes = [
        { value: 'consultation', label: 'Consultation' },
        { value: 'information', label: 'Demande d\'information' },
        { value: 'support', label: 'Support technique' },
        { value: 'enrollment', label: 'Inscription formation' },
        { value: 'other', label: 'Autre' }
    ];

    const durations = [
        { value: 15, label: '15 minutes' },
        { value: 30, label: '30 minutes' },
        { value: 45, label: '45 minutes' },
        { value: 60, label: '1 heure' },
        { value: 90, label: '1h30' },
        { value: 120, label: '2 heures' }
    ];


    // Obtenir les dates des 30 prochains jours (exclure les week-ends)
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i < 60; i++) { // Regarder sur 60 jours pour avoir 30 jours ouvrables
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Exclure les week-ends (samedi = 6, dimanche = 0)
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                dates.push({
                    value: date.toISOString().split('T')[0],
                    label: date.toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                    })
                });
                
                // Arrêter quand on a 30 dates
                if (dates.length >= 30) break;
            }
        }
        
        return dates;
    };

    // Charger les créneaux disponibles pour une date
    const fetchAvailableSlots = async (date: string) => {
        if (!date) return;
        
        setLoading(true);
        try {
            const response = await axios.get('/api/appointments/available-slots', {
                params: { date }
            });
            
            setAvailableSlots(response.data.slots);
            setBusinessHours(response.data.businessHours);
        } catch (error) {
            toast.error('Erreur lors du chargement des créneaux');
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    // Gérer le changement de date
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedTime('');
        fetchAvailableSlots(date);
    };

    // Gérer le changement de créneau
    const handleTimeSelect = (slot: TimeSlot) => {
        setSelectedTime(slot.time);
        setForm(prev => ({
            ...prev,
            appointment_date: slot.datetime
        }));
    };

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.appointment_date) {
            toast.error('Veuillez sélectionner une date et un créneau');
            return;
        }

        setSubmitting(true);
        try {
            await axios.post('/api/appointments', form);
            toast.success('Rendez-vous créé avec succès ! Vous recevrez une confirmation par email.');
            
            // Réinitialiser le formulaire
            setForm({
                title: '',
                description: '',
                appointment_date: '',
                duration: 30,
                type: 'consultation',
                client_email: '',
                client_phone: ''
            });
            setSelectedDate('');
            setSelectedTime('');
            setAvailableSlots([]);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Erreur lors de la création du rendez-vous';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Prendre un rendez-vous
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Sélection de la date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Date souhaitée *</Label>
                                <Select value={selectedDate} onValueChange={handleDateChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir une date" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getAvailableDates().map(date => (
                                            <SelectItem key={date.value} value={date.value}>
                                                {date.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Durée du rendez-vous</Label>
                                <Select 
                                    value={form.duration.toString()} 
                                    onValueChange={(value) => setForm(prev => ({ ...prev, duration: parseInt(value) }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {durations.map(duration => (
                                            <SelectItem key={duration.value} value={duration.value.toString()}>
                                                {duration.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Affichage des horaires d'ouverture */}
                        {businessHours && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Horaires : {businessHours.opening} - {businessHours.closing}
                                    {businessHours.lunchBreak && (
                                        <span> (Pause : {businessHours.lunchBreak.start} - {businessHours.lunchBreak.end})</span>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* Créneaux disponibles */}
                        {selectedDate && (
                            <div className="space-y-2">
                                <Label>Créneaux disponibles</Label>
                                {loading ? (
                                    <div className="text-center py-8">Chargement des créneaux...</div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                        {availableSlots.map((slot) => (
                                            <Button
                                                key={slot.time}
                                                type="button"
                                                variant={selectedTime === slot.time ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleTimeSelect(slot)}
                                                className="text-xs"
                                            >
                                                {slot.display}
                                            </Button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Aucun créneau disponible pour cette date
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Informations du rendez-vous */}
                        {selectedTime && (
                            <div className="space-y-4 border-t pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type de rendez-vous *</Label>
                                        <Select 
                                            value={form.type} 
                                            onValueChange={(value) => setForm(prev => ({ ...prev, type: value }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {appointmentTypes.map(type => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="title">Sujet du rendez-vous *</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Ex: Inscription formation comptabilité"
                                            value={form.title}
                                            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (optionnelle)</Label>
                                    <textarea
                                        id="description"
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                                        value={form.description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="client_email">
                                            <Mail className="w-4 h-4 inline mr-1" />
                                            Email de contact
                                        </Label>
                                        <Input
                                            id="client_email"
                                            type="email"
                                            placeholder="votre.email@exemple.com"
                                            value={form.client_email}
                                            onChange={(e) => setForm(prev => ({ ...prev, client_email: e.target.value }))}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="client_phone">
                                            <Phone className="w-4 h-4 inline mr-1" />
                                            Téléphone (optionnel)
                                        </Label>
                                        <Input
                                            id="client_phone"
                                            type="tel"
                                            placeholder="+225 XX XX XX XX"
                                            value={form.client_phone}
                                            onChange={(e) => setForm(prev => ({ ...prev, client_phone: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                {/* Récapitulatif */}
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-green-800 mb-2">Récapitulatif de votre rendez-vous</h4>
                                    <div className="space-y-1 text-sm text-green-700">
                                        <p><Calendar className="w-4 h-4 inline mr-1" /> 
                                            {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                                                weekday: 'long', 
                                                day: 'numeric', 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                        <p><Clock className="w-4 h-4 inline mr-1" /> {selectedTime} ({form.duration} minutes)</p>
                                        <p><MessageSquare className="w-4 h-4 inline mr-1" /> {form.title || 'Non spécifié'}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedDate('');
                                            setSelectedTime('');
                                            setAvailableSlots([]);
                                        }}
                                    >
                                        Annuler
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={submitting || !form.title.trim()}
                                    >
                                        {submitting ? 'Création...' : 'Confirmer le rendez-vous'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentCalendar;