import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, CalendarDays, CheckCircle, Clock, MessageSquare, Sparkles, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

// Enregistrer la locale française
registerLocale('fr', fr);

interface TimeSlot {
    time: string;
    datetime: string;
    display: string;
    available?: boolean;
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
    const [step, setStep] = useState<'select' | 'details' | 'confirmation'>('select');
    const [showTimeSlots, setShowTimeSlots] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const [form, setForm] = useState<AppointmentForm>({
        title: '',
        description: '',
        appointment_date: '',
        duration: 30,
        type: 'consultation',
        client_email: '',
        client_phone: '',
        client_name: '',
    });

    const [appointmentTypes, setAppointmentTypes] = useState([
        { value: 'consultation', label: 'Consultation', icon: '💡', description: 'Conseil personnalisé', color: 'bg-blue-500' },
        { value: 'information', label: 'Information', icon: '📋', description: "Demande d'information", color: 'bg-green-500' },
        { value: 'support', label: 'Support', icon: '🛠️', description: 'Assistance technique', color: 'bg-orange-500' },
        { value: 'enrollment', label: 'Inscription', icon: '📚', description: 'Inscription formation', color: 'bg-purple-500' },
        { value: 'other', label: 'Autre', icon: '❓', description: 'Autre motif', color: 'bg-gray-500' },
    ]);

    const [durations, setDurations] = useState([
        { value: 15, label: '15 min', description: 'Question rapide' },
        { value: 30, label: '30 min', description: 'Consultation standard' },
        { value: 45, label: '45 min', description: 'Entretien approfondi' },
        { value: 60, label: '1h', description: 'Rendez-vous détaillé' },
        { value: 90, label: '1h30', description: 'Session complète' },
        { value: 120, label: '2h', description: 'Accompagnement personnalisé' },
    ]);

    // Charger les types et durées depuis l'API
    useEffect(() => {
        // Charger les types
        axios
            .get(route('appointments.types'))
            .then((response) => {
                if (response.data.success && response.data.types) {
                    const formattedTypes = response.data.types.map((type: any) => ({
                        value: type.slug,
                        label: type.name,
                        icon: type.icon || '📅',
                        description: type.description,
                        color: type.color || 'bg-blue-500',
                    }));
                    setAppointmentTypes(formattedTypes);
                }
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des types:', error);
            });

        // Charger les durées
        axios
            .get(route('appointments.durations'))
            .then((response) => {
                if (response.data.success && response.data.durations) {
                    const formattedDurations = response.data.durations.map((duration: any) => ({
                        value: duration.duration,
                        label: duration.label,
                        description: duration.description,
                    }));
                    setDurations(formattedDurations);
                }
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des durées:', error);
            });
    }, []);

    // Cette fonction est remplacée par l'API

    // Gérer la sélection de date
    const handleDateChange = (date: Date | null) => {
        if (date instanceof Date) {
            setSelectedDate(date);
            setSelectedTime('');
            setLoading(true);

            // Appel API pour récupérer les créneaux disponibles
            axios
                .get(route('appointments.available-slots'), {
                    params: {
                        date: date.toISOString().split('T')[0],
                    },
                })
                .then((response) => {
                    if (response.data.slots) {
                        // Filtrer les créneaux de pause déjeuner (12h-14h)
                        const filteredSlots = response.data.slots.filter((slot: TimeSlot) => {
                            const time = slot.time;
                            const hour = parseInt(time.split(':')[0]);
                            const minutes = parseInt(time.split(':')[1]);
                            const totalMinutes = hour * 60 + minutes;

                            // Exclure les créneaux entre 12:00 (720 min) et 14:00 (840 min)
                            return totalMinutes < 720 || totalMinutes >= 840;
                        });

                        const slotsWithAvailability = filteredSlots.map((slot: TimeSlot) => ({
                            ...slot,
                            available: true,
                        }));

                        setAvailableSlots(slotsWithAvailability);
                        setBusinessHours(response.data.businessHours);
                        setShowTimeSlots(true);

                        // Scroll vers les créneaux horaires
                        setTimeout(() => {
                            const timeSlotsElement = document.getElementById('time-slots');
                            if (timeSlotsElement) {
                                timeSlotsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }, 100);
                    } else {
                        toast.error('Erreur lors de la récupération des créneaux');
                    }
                })
                .catch((error) => {
                    console.error('Erreur:', error);
                    toast.error('Erreur lors de la récupération des créneaux');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    // Gérer la sélection de créneau
    const handleTimeSelect = (slot: TimeSlot) => {
        if (slot.available === false) return;

        setSelectedTime(slot.time);
        setForm((prev) => ({
            ...prev,
            appointment_date: slot.datetime,
        }));
        setStep('details');

        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.appointment_date || !form.client_name.trim() || !form.client_email.trim()) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setSubmitting(true);
        try {
            // Soumettre via le formulaire existant ou créer une nouvelle route
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('appointment_date', form.appointment_date);
            formData.append('duration', form.duration.toString());
            formData.append('type', form.type);
            formData.append('client_email', form.client_email);
            formData.append('client_phone', form.client_phone);
            formData.append('client_name', form.client_name);

            await axios.post(route('appointments.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

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
        setStep('select');
        setShowTimeSlots(false);
        setForm({
            title: '',
            description: '',
            appointment_date: '',
            duration: 30,
            type: 'consultation',
            client_email: '',
            client_phone: '',
            client_name: '',
        });
    };

    // Fonction pour filtrer les dates disponibles (react-datepicker)
    const filterDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Exclure les dates passées
        if (date < today) return false;

        // Exclure les week-ends (0 = dimanche, 6 = samedi)
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Sticky Progress Bar */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {step === 'select' && '1. Choisissez votre créneau'}
                            {step === 'details' && '2. Vos informations'}
                            {step === 'confirmation' && 'Rendez-vous confirmé'}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">
                                {step === 'select' && '1'}
                                {step === 'details' && '2'}
                                {step === 'confirmation' && '✓'}
                            </span>
                            <span>/</span>
                            <span>2 étapes</span>
                        </div>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                            animate={{
                                width: step === 'select' ? '33%' : step === 'details' ? '66%' : '100%',
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* Quick Summary */}
                    {(selectedDate || selectedTime) && (
                        <motion.div
                            className="mt-3 flex flex-wrap items-center gap-3 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {selectedDate && (
                                <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                                    <Calendar className="w-3 h-3" />
                                    <span className="font-medium">
                                        {selectedDate.toLocaleDateString('fr-FR', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short',
                                        })}
                                    </span>
                                </div>
                            )}
                            {selectedTime && (
                                <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                    <Clock className="w-3 h-3" />
                                    <span className="font-medium">{selectedTime}</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-6">
                <AnimatePresence mode="wait">
                    {/* Step 1: Combined Calendar and Time Selection */}
                    {step === 'select' && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Calendar Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* Calendar */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                                        <CardHeader className="text-center pb-4">
                                            <motion.div className="flex items-center justify-center gap-3 mb-2" whileHover={{ scale: 1.02 }}>
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    <CalendarDays className="w-6 h-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                                    Choisissez votre date
                                                </CardTitle>
                                            </motion.div>
                                            <p className="text-muted-foreground text-sm">Sélectionnez un jour disponible pour votre rendez-vous</p>
                                        </CardHeader>
                                        <CardContent className="flex justify-center pb-6">
                                            <div className="datepicker-container w-full max-w-md">
                                         
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={handleDateChange}
                                                    minDate={new Date()}
                                                    filterDate={filterDate}
                                                    locale="fr"
                                                    inline
                                                    showDisabledMonthNavigation
                                                    calendarStartDay={1}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Quick Actions */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="space-y-6"
                                >
                                    {/* Business Hours Info */}
                                    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-primary/20 rounded-lg">
                                                    <Clock className="w-5 h-5 text-primary" />
                                                </div>
                                                <h3 className="font-semibold text-lg text-primary">Horaires d'ouverture</h3>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Lun - Ven</span>
                                                    <span className="font-medium">09:00 - 18:00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Pause déjeuner</span>
                                                    <span className="font-medium">12:00 - 14:00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Week-end</span>
                                                    <span className="font-medium text-red-500">Fermé</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Stats */}
                                    {false && (
                                        <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                                        <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">Disponibilités</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="text-center">
                                                        <div className="font-bold text-2xl text-green-600 dark:text-green-400">75%</div>
                                                        <div className="text-muted-foreground">Cette semaine</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-bold text-2xl text-green-600 dark:text-green-400">12</div>
                                                        <div className="text-muted-foreground">Créneaux libres</div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </motion.div>
                            </div>

                            {/* Time Slots Section */}
                            {showTimeSlots && selectedDate && (
                                <motion.div
                                    id="time-slots"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="mt-8"
                                >
                                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-primary/10">
                                        <CardHeader className="text-center pb-6">
                                            <motion.div className="flex items-center justify-center gap-3 mb-3" whileHover={{ scale: 1.02 }}>
                                                <div className="p-3 bg-gradient-to-br from-primary to-primary/70 rounded-xl shadow-lg">
                                                    <Clock className="w-6 h-6 text-white" />
                                                </div>
                                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                                    Choisissez l'heure
                                                </CardTitle>
                                            </motion.div>
                                            <div className="flex flex-col items-center gap-3">
                                                <motion.div
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium"
                                                    animate={{ scale: [1, 1.02, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        <strong>Date sélectionnée :</strong>{' '}
                                                        {selectedDate.toLocaleDateString('fr-FR', {
                                                            weekday: 'long',
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </motion.div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedDate(null);
                                                        setSelectedTime('');
                                                        setShowTimeSlots(false);
                                                        setAvailableSlots([]);
                                                    }}
                                                    className="text-xs"
                                                >
                                                    Modifier la date
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pb-8">
                                            {/* Available Slots Info */}
                                            <div className="mb-8 text-center space-y-3">
                                                <motion.div
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full"
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                                                        {availableSlots.filter((s) => s.available !== false).length} créneaux disponibles
                                                    </span>
                                                </motion.div>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-xs">
                                                    <Clock className="w-3 h-3" />
                                                    <span>Pause déjeuner : 12h00 - 14h00 (créneaux non disponibles)</span>
                                                </div>
                                            </div>

                                            {/* Time Slots Grid with Enhanced Design */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                                {availableSlots.map((slot, index) => (
                                                    <motion.button
                                                        key={slot.time}
                                                        type="button"
                                                        disabled={slot.available === false}
                                                        onClick={() => handleTimeSelect(slot)}
                                                        className={cn(
                                                            'group relative p-4 rounded-xl border-2 transition-all duration-300 text-sm font-semibold min-h-[70px] flex flex-col items-center justify-center',
                                                            slot.available !== false
                                                                ? selectedTime === slot.time
                                                                    ? 'border-green-500 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl scale-105 ring-4 ring-green-500/30'
                                                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-400 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:shadow-lg hover:scale-105 text-gray-900 dark:text-white'
                                                                : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60',
                                                        )}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                                        whileHover={
                                                            slot.available !== false
                                                                ? {
                                                                      y: -2,
                                                                      transition: { duration: 0.2 },
                                                                  }
                                                                : {}
                                                        }
                                                        whileTap={
                                                            slot.available !== false
                                                                ? {
                                                                      scale: 0.95,
                                                                      transition: { duration: 0.1 },
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {/* Time Display */}
                                                        <div className="text-base font-bold mb-1">{slot.display}</div>

                                                        {/* Status Indicator */}
                                                        {slot.available !== false ? (
                                                            selectedTime === slot.time ? (
                                                                <motion.div
                                                                    className="flex items-center gap-1 text-xs opacity-90"
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                >
                                                                    <CheckCircle className="w-3 h-3" />
                                                                    Sélectionné
                                                                </motion.div>
                                                            ) : (
                                                                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                                    Disponible
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="text-xs text-red-500 font-medium">Occupé</div>
                                                        )}

                                                        {/* Highlight for selected */}
                                                        {selectedTime === slot.time && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                layoutId="selectedSlot"
                                                            />
                                                        )}
                                                    </motion.button>
                                                ))}
                                            </div>

                                            {selectedTime && (
                                                <motion.div
                                                    className="mt-8 flex justify-center"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <Button
                                                        onClick={() => setStep('details')}
                                                        size="lg"
                                                        className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all duration-300 text-white font-semibold text-lg"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <CheckCircle className="w-5 h-5" />
                                                            <span>Confirmer la réservation</span>
                                                            <span className="bg-green-500/30 px-2 py-1 rounded text-sm">{selectedTime}</span>
                                                        </span>
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 2: Details Form */}
                    {step === 'details' && selectedDate && selectedTime && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="mx-auto max-w-4xl shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                                <CardHeader className="text-center">
                                    <CardTitle className="flex items-center justify-center gap-2">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                        Détails du rendez-vous
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Type et durée - Layout simplifié */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label className="text-base font-semibold">Type de rendez-vous</Label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {appointmentTypes.map((type) => (
                                                        <motion.div
                                                            key={type.value}
                                                            className={cn(
                                                                'p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
                                                                form.type === type.value
                                                                    ? 'border-primary bg-primary/10 ring-4 ring-primary/20'
                                                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-800',
                                                            )}
                                                            onClick={() => setForm((prev) => ({ ...prev, type: type.value }))}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-lg">{type.icon}</div>
                                                                    <div>
                                                                        <div className="font-semibold text-sm">{type.label}</div>
                                                                        <div className="text-xs text-muted-foreground">{type.description}</div>
                                                                    </div>
                                                                </div>
                                                                {form.type === type.value && <CheckCircle className="w-5 h-5 text-primary" />}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <Label className="text-base font-semibold">Durée souhaitée</Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {durations.map((duration) => (
                                                        <motion.div
                                                            key={duration.value}
                                                            className={cn(
                                                                'p-3 border-2 rounded-lg cursor-pointer transition-all duration-300',
                                                                form.duration === duration.value
                                                                    ? 'border-primary bg-primary/10'
                                                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-800',
                                                            )}
                                                            onClick={() => setForm((prev) => ({ ...prev, duration: duration.value }))}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <div className="text-center">
                                                                <div className="font-semibold text-sm">{duration.label}</div>
                                                                <div className="text-xs text-muted-foreground">{duration.description}</div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Info - Layout optimisé */}
                                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
                                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                                <User className="w-5 h-5" />
                                                Vos informations
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="client_name">Nom complet *</Label>
                                                    <Input
                                                        id="client_name"
                                                        type="text"
                                                        placeholder="Votre nom et prénom"
                                                        value={form.client_name}
                                                        onChange={(e) => setForm((prev) => ({ ...prev, client_name: e.target.value }))}
                                                        required
                                                        className="h-12"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="client_email">Email *</Label>
                                                    <Input
                                                        id="client_email"
                                                        type="email"
                                                        placeholder="votre.email@exemple.com"
                                                        value={form.client_email}
                                                        onChange={(e) => setForm((prev) => ({ ...prev, client_email: e.target.value }))}
                                                        required
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="client_phone">Téléphone</Label>
                                                    <Input
                                                        id="client_phone"
                                                        type="tel"
                                                        placeholder="+225 XX XX XX XX"
                                                        value={form.client_phone}
                                                        onChange={(e) => setForm((prev) => ({ ...prev, client_phone: e.target.value }))}
                                                        className="h-12"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="title">Sujet du rendez-vous</Label>
                                                    <Input
                                                        id="title"
                                                        type="text"
                                                        placeholder="Ex: Inscription formation comptabilité"
                                                        value={form.title}
                                                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">Message (optionnel)</Label>
                                                <textarea
                                                    id="description"
                                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    placeholder="Décrivez brièvement l'objet de votre rendez-vous ou toute information utile..."
                                                    value={form.description}
                                                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                                    rows={4}
                                                />
                                            </div>
                                        </div>

                                        {/* Summary - Design amélioré */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 p-6 rounded-xl">
                                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                Récapitulatif de votre rendez-vous
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    <div>
                                                        <div className="font-medium text-green-700 dark:text-green-300">Date</div>
                                                        <div className="text-green-600 dark:text-green-400">
                                                            {selectedDate.toLocaleDateString('fr-FR', {
                                                                weekday: 'short',
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    <div>
                                                        <div className="font-medium text-green-700 dark:text-green-300">Heure</div>
                                                        <div className="text-green-600 dark:text-green-400">
                                                            {selectedTime} ({form.duration} min)
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    <div>
                                                        <div className="font-medium text-green-700 dark:text-green-300">Type</div>
                                                        <div className="text-green-600 dark:text-green-400">
                                                            {appointmentTypes.find((t) => t.value === form.type)?.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                                            <Button type="button" variant="outline" onClick={() => setStep('select')} className="w-full sm:w-auto">
                                                ← Modifier le créneau
                                            </Button>

                                            <Button
                                                type="submit"
                                                disabled={submitting || !form.client_name.trim() || !form.client_email.trim()}
                                                className="px-8 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                                size="lg"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
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

                    {/* Step 3: Confirmation */}
                    {step === 'confirmation' && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="mx-auto max-w-2xl text-center shadow-2xl border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900/20">
                                <CardContent className="pt-12 pb-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                        className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                                    >
                                        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                                    </motion.div>

                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎉 Rendez-vous confirmé !</h2>

                                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl mb-6 text-left shadow-inner">
                                        <h3 className="font-semibold mb-4 text-lg">Détails de votre rendez-vous :</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <div>
                                                    <span className="font-medium">Date : </span>
                                                    {selectedDate?.toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <div>
                                                    <span className="font-medium">Heure : </span>
                                                    {selectedTime} ({form.duration} minutes)
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MessageSquare className="w-4 h-4 text-primary" />
                                                <div>
                                                    <span className="font-medium">Type : </span>
                                                    {appointmentTypes.find((t) => t.value === form.type)?.label}
                                                </div>
                                            </div>
                                            {form.title && (
                                                <div className="flex items-center gap-3">
                                                    <User className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <span className="font-medium">Sujet : </span>
                                                        {form.title}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                        Un email de confirmation a été envoyé à <strong>{form.client_email}</strong>
                                        avec tous les détails de votre rendez-vous et les instructions de connexion.
                                    </p>

                                    <div className="space-y-4">
                                        <Button
                                            onClick={resetForm}
                                            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                            size="lg"
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
        </div>
    );
};

export default AppointmentCalendar;
