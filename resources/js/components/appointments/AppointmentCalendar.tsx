import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Mail, MessageSquare, CheckCircle, User, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface TimeSlot {
    time: string;
    datetime: string;
    display: string;
    available: boolean;
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
    client_name: string;
}

type CalendarValue = Date | null;

const AppointmentCalendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState<'calendar' | 'time' | 'details' | 'confirmation'>('calendar');
    
    const [form, setForm] = useState<AppointmentForm>({
        title: '',
        description: '',
        appointment_date: '',
        duration: 30,
        type: 'consultation',
        client_email: '',
        client_phone: '',
        client_name: ''
    });

    const appointmentTypes = [
        { value: 'consultation', label: '💡 Consultation', description: 'Conseil personnalisé' },
        { value: 'information', label: '📋 Information', description: 'Demande d\'information' },
        { value: 'support', label: '🛠️ Support technique', description: 'Assistance technique' },
        { value: 'enrollment', label: '📚 Inscription', description: 'Inscription formation' },
        { value: 'other', label: '❓ Autre', description: 'Autre motif' }
    ];

    const durations = [
        { value: 15, label: '15 min', description: 'Question rapide' },
        { value: 30, label: '30 min', description: 'Consultation standard' },
        { value: 45, label: '45 min', description: 'Entretien approfondi' },
        { value: 60, label: '1h', description: 'Rendez-vous détaillé' },
        { value: 90, label: '1h30', description: 'Session complète' },
        { value: 120, label: '2h', description: 'Accompagnement personnalisé' }
    ];

    // Générer les créneaux horaires (mock - remplacer par API)
    const generateTimeSlots = (date: Date): TimeSlot[] => {
        const slots: TimeSlot[] = [];
        const startHour = 9;
        const endHour = 18;
        const lunchStart = 12;
        const lunchEnd = 14;
        
        for (let hour = startHour; hour < endHour; hour++) {
            // Skip lunch break
            if (hour >= lunchStart && hour < lunchEnd) continue;
            
            for (let minute = 0; minute < 60; minute += 30) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const datetime = new Date(date);
                datetime.setHours(hour, minute, 0, 0);
                
                // Simuler la disponibilité (remplacer par logique réelle)
                const isAvailable = Math.random() > 0.3;
                
                slots.push({
                    time: timeStr,
                    datetime: datetime.toISOString(),
                    display: timeStr,
                    available: isAvailable
                });
            }
        }
        
        return slots;
    };

    // Gérer la sélection de date
    const handleDateChange = (value: CalendarValue) => {
        if (value instanceof Date) {
            setSelectedDate(value);
            setSelectedTime('');
            setStep('time');
            
            // Générer les créneaux (remplacer par appel API)
            const slots = generateTimeSlots(value);
            setAvailableSlots(slots);
            
            // Mock business hours
            setBusinessHours({
                opening: '09:00',
                closing: '18:00',
                lunchBreak: { start: '12:00', end: '14:00' }
            });
        }
    };

    // Gérer la sélection de créneau
    const handleTimeSelect = (slot: TimeSlot) => {
        if (!slot.available) return;
        
        setSelectedTime(slot.time);
        setForm(prev => ({
            ...prev,
            appointment_date: slot.datetime
        }));
        setStep('details');
    };

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.appointment_date || !form.client_name.trim()) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setSubmitting(true);
        try {
            // Mock API call - remplacer par vraie API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.success('Rendez-vous confirmé ! Vous recevrez une confirmation par email.');
            setStep('confirmation');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Erreur lors de la création du rendez-vous';
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    // Réinitialiser le formulaire
    const resetForm = () => {
        setSelectedDate(null);
        setSelectedTime('');
        setAvailableSlots([]);
        setStep('calendar');
        setForm({
            title: '',
            description: '',
            appointment_date: '',
            duration: 30,
            type: 'consultation',
            client_email: '',
            client_phone: '',
            client_name: ''
        });
    };

    // Désactiver les week-ends et jours passés
    const isDateDisabled = ({ date }: { date: Date }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Désactiver les dates passées
        if (date < today) return true;
        
        // Désactiver les week-ends
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                    {[
                        { key: 'calendar', label: '📅 Date', step: 1 },
                        { key: 'time', label: '⏰ Heure', step: 2 },
                        { key: 'details', label: '📝 Détails', step: 3 },
                        { key: 'confirmation', label: '✅ Confirmation', step: 4 }
                    ].map((stepInfo, index) => (
                        <React.Fragment key={stepInfo.key}>
                            <motion.div
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                    step === stepInfo.key
                                        ? 'bg-primary text-primary-foreground'
                                        : index < ['calendar', 'time', 'details', 'confirmation'].indexOf(step)
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                                animate={{
                                    scale: step === stepInfo.key ? 1.05 : 1
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="text-sm font-medium">{stepInfo.label}</span>
                            </motion.div>
                            {index < 3 && (
                                <div className="w-8 h-px bg-gray-300" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Calendar */}
                {step === 'calendar' && (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="mx-auto max-w-2xl">
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <CalendarDays className="w-6 h-6 text-primary" />
                                    Choisissez votre date
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    Sélectionnez un jour de la semaine pour votre rendez-vous
                                </p>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <div className="calendar-container">
                                    <style jsx>{`
                                        .calendar-container .react-calendar {
                                            border: none;
                                            border-radius: 12px;
                                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                                            padding: 20px;
                                            font-family: inherit;
                                            max-width: 400px;
                                        }
                                        .calendar-container .react-calendar__tile {
                                            border: none;
                                            border-radius: 8px;
                                            margin: 2px;
                                            padding: 12px 8px;
                                            transition: all 0.2s;
                                        }
                                        .calendar-container .react-calendar__tile:hover {
                                            background: hsl(var(--primary) / 0.1);
                                            transform: scale(1.05);
                                        }
                                        .calendar-container .react-calendar__tile--active {
                                            background: hsl(var(--primary)) !important;
                                            color: hsl(var(--primary-foreground)) !important;
                                        }
                                        .calendar-container .react-calendar__tile--now {
                                            background: hsl(var(--primary) / 0.2);
                                            border: 2px solid hsl(var(--primary));
                                        }
                                        .calendar-container .react-calendar__navigation button {
                                            font-weight: 600;
                                            font-size: 16px;
                                            background: none;
                                            border: none;
                                            color: hsl(var(--primary));
                                        }
                                        .calendar-container .react-calendar__navigation button:hover {
                                            background: hsl(var(--primary) / 0.1);
                                            border-radius: 6px;
                                        }
                                        .calendar-container .react-calendar__tile:disabled {
                                            background-color: #f3f4f6;
                                            color: #9ca3af;
                                            cursor: not-allowed;
                                        }
                                        .calendar-container .react-calendar__tile:disabled:hover {
                                            background-color: #f3f4f6;
                                            transform: none;
                                        }
                                    `}</style>
                                    <ReactCalendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        minDate={new Date()}
                                        tileDisabled={isDateDisabled}
                                        locale="fr-FR"
                                        formatShortWeekday={(locale, date) => 
                                            ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][date.getDay()]
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Step 2: Time Selection */}
                {step === 'time' && selectedDate && (
                    <motion.div
                        key="time"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="mx-auto max-w-4xl">
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <Clock className="w-6 h-6 text-primary" />
                                    Choisissez votre créneau
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    {selectedDate.toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                {/* Business Hours Info */}
                                {businessHours && (
                                    <div className="mb-6 p-4 bg-primary/5 rounded-lg text-center">
                                        <p className="text-sm text-primary font-medium">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Horaires : {businessHours.opening} - {businessHours.closing}
                                            {businessHours.lunchBreak && (
                                                <span className="ml-2">
                                                    (Pause : {businessHours.lunchBreak.start} - {businessHours.lunchBreak.end})
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                )}

                                {/* Time Slots Grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {availableSlots.map((slot) => (
                                        <motion.button
                                            key={slot.time}
                                            type="button"
                                            disabled={!slot.available}
                                            onClick={() => handleTimeSelect(slot)}
                                            className={`
                                                p-3 rounded-lg border-2 transition-all text-sm font-medium
                                                ${slot.available
                                                    ? selectedTime === slot.time
                                                        ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                                                        : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                                                    : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                }
                                            `}
                                            whileHover={slot.available ? { scale: 1.05 } : {}}
                                            whileTap={slot.available ? { scale: 0.95 } : {}}
                                        >
                                            {slot.display}
                                            {!slot.available && (
                                                <div className="text-xs mt-1">Occupé</div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setStep('calendar')}
                                    >
                                        ← Retour au calendrier
                                    </Button>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        {availableSlots.filter(s => s.available).length} créneaux disponibles
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Step 3: Details Form */}
                {step === 'details' && selectedDate && selectedTime && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="mx-auto max-w-3xl">
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-center gap-2">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                    Détails du rendez-vous
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Type et durée */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label>Type de rendez-vous</Label>
                                            <div className="space-y-2">
                                                {appointmentTypes.map(type => (
                                                    <motion.div
                                                        key={type.value}
                                                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                            form.type === type.value
                                                                ? 'border-primary bg-primary/5'
                                                                : 'border-gray-200 hover:border-primary/50'
                                                        }`}
                                                        onClick={() => setForm(prev => ({ ...prev, type: type.value }))}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium text-sm">{type.label}</div>
                                                                <div className="text-xs text-muted-foreground">{type.description}</div>
                                                            </div>
                                                            {form.type === type.value && (
                                                                <CheckCircle className="w-5 h-5 text-primary" />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Durée souhaitée</Label>
                                            <div className="space-y-2">
                                                {durations.map(duration => (
                                                    <motion.div
                                                        key={duration.value}
                                                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                            form.duration === duration.value
                                                                ? 'border-primary bg-primary/5'
                                                                : 'border-gray-200 hover:border-primary/50'
                                                        }`}
                                                        onClick={() => setForm(prev => ({ ...prev, duration: duration.value }))}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium text-sm">{duration.label}</div>
                                                                <div className="text-xs text-muted-foreground">{duration.description}</div>
                                                            </div>
                                                            {form.duration === duration.value && (
                                                                <CheckCircle className="w-5 h-5 text-primary" />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4 border-t pt-6">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Vos informations
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="client_name">Nom complet *</Label>
                                                <Input
                                                    id="client_name"
                                                    type="text"
                                                    placeholder="Votre nom et prénom"
                                                    value={form.client_name}
                                                    onChange={(e) => setForm(prev => ({ ...prev, client_name: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="client_email">Email *</Label>
                                                <Input
                                                    id="client_email"
                                                    type="email"
                                                    placeholder="votre.email@exemple.com"
                                                    value={form.client_email}
                                                    onChange={(e) => setForm(prev => ({ ...prev, client_email: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="client_phone">Téléphone</Label>
                                                <Input
                                                    id="client_phone"
                                                    type="tel"
                                                    placeholder="+225 XX XX XX XX"
                                                    value={form.client_phone}
                                                    onChange={(e) => setForm(prev => ({ ...prev, client_phone: e.target.value }))}
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="title">Sujet du rendez-vous</Label>
                                                <Input
                                                    id="title"
                                                    type="text"
                                                    placeholder="Ex: Inscription formation comptabilité"
                                                    value={form.title}
                                                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Message (optionnel)</Label>
                                            <textarea
                                                id="description"
                                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Décrivez brièvement l'objet de votre rendez-vous ou toute information utile..."
                                                value={form.description}
                                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                                rows={4}
                                            />
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-3">📋 Récapitulatif</h4>
                                        <div className="space-y-2 text-sm">
                                            <p className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-green-600" />
                                                <span className="font-medium">
                                                    {selectedDate.toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-green-600" />
                                                <span>{selectedTime} ({form.duration} minutes)</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4 text-green-600" />
                                                <span>{appointmentTypes.find(t => t.value === form.type)?.label}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-6">
                                        <Button 
                                            type="button"
                                            variant="outline" 
                                            onClick={() => setStep('time')}
                                        >
                                            ← Changer l'heure
                                        </Button>
                                        
                                        <Button 
                                            type="submit" 
                                            disabled={submitting || !form.client_name.trim() || !form.client_email.trim()}
                                            className="px-8"
                                        >
                                            {submitting ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                                    />
                                                    Confirmation...
                                                </>
                                            ) : (
                                                'Confirmer le rendez-vous ✓'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirmation' && (
                    <motion.div
                        key="confirmation"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="mx-auto max-w-2xl text-center">
                            <CardContent className="pt-12 pb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </motion.div>
                                
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    🎉 Rendez-vous confirmé !
                                </h2>
                                
                                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                                    <h3 className="font-semibold mb-3">Détails de votre rendez-vous :</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Date :</strong> {selectedDate?.toLocaleDateString('fr-FR', {
                                            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                        })}</p>
                                        <p><strong>Heure :</strong> {selectedTime}</p>
                                        <p><strong>Durée :</strong> {form.duration} minutes</p>
                                        <p><strong>Type :</strong> {appointmentTypes.find(t => t.value === form.type)?.label}</p>
                                        {form.title && <p><strong>Sujet :</strong> {form.title}</p>}
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-8">
                                    Un email de confirmation a été envoyé à <strong>{form.client_email}</strong> 
                                    avec tous les détails de votre rendez-vous et les instructions de connexion.
                                </p>
                                
                                <div className="space-y-4">
                                    <Button 
                                        onClick={resetForm}
                                        className="w-full sm:w-auto"
                                    >
                                        Prendre un autre rendez-vous
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppointmentCalendar;