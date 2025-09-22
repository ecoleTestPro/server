import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { fr } from 'date-fns/locale';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, CalendarDays, CheckCircle, Clock, HelpCircle, Info, Mail, MessageSquare, Phone, User } from 'lucide-react';
import React, { useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
        client_email: '',
        client_phone: '',
        client_name: '',
    });

    const durations = [
        { value: 15, label: '15 min', description: 'Question rapide', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
        {
            value: 30,
            label: '30 min',
            description: 'Consultation standard',
            color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
        },
        {
            value: 45,
            label: '45 min',
            description: 'Entretien approfondi',
            color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
        },
        {
            value: 60,
            label: '1h',
            description: 'Rendez-vous détaillé',
            color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
        },
        { value: 90, label: '1h30', description: 'Session complète', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' },
        {
            value: 120,
            label: '2h',
            description: 'Accompagnement personnalisé',
            color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
        },
    ];

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
                        const slotsWithAvailability = response.data.slots.map((slot: TimeSlot) => ({
                            ...slot,
                            available: slot.available !== false,
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
                        toast.error('Aucun créneau disponible pour cette date');
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
            await axios.post(
                route('appointments.store'),
                {
                    title: form.title || `Rendez-vous de ${form.client_name}`,
                    description: form.description,
                    appointment_date: form.appointment_date,
                    duration: form.duration,
                    client_email: form.client_email,
                    client_phone: form.client_phone,
                    client_name: form.client_name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                },
            );

            toast.success('Rendez-vous confirmé ! Vous recevrez une confirmation par email.');
            setStep('confirmation');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Erreur lors de la création du rendez-vous';
            toast.error(message);
            console.error('Erreur:', error);
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
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            {step === 'select' && (
                                <>
                                    <CalendarDays className="w-5 h-5 text-teal-600" />
                                    1. Choisissez votre créneau
                                </>
                            )}
                            {step === 'details' && (
                                <>
                                    <User className="w-5 h-5 text-teal-600" />
                                    2. Vos informations
                                </>
                            )}
                            {step === 'confirmation' && (
                                <>
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    Rendez-vous confirmé
                                </>
                            )}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">
                                {step === 'select' && '1'}
                                {step === 'details' && '2'}
                                {step === 'confirmation' && '✓'}
                            </span>
                            <span>/</span>
                            <span>2 étapes</span>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Sélectionnez d'abord une date et un créneau, puis remplissez vos informations</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
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
                                <div className="flex items-center gap-1 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full">
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
                            {/* Info Box */}
                            <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-teal-900 dark:text-teal-100 mb-1">Comment prendre rendez-vous ?</h3>
                                        <div className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                                            <p>1. Sélectionnez une date disponible dans le calendrier (jours ouvrables uniquement)</p>
                                            <p>2. Choisissez un créneau horaire parmi ceux proposés</p>
                                            <p>3. Remplissez vos informations de contact</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar and Time Slots Side by Side */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* Calendar Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                                        <CardHeader className="text-center pb-4">
                                            <motion.div className="flex items-center justify-center gap-3 mb-2" whileHover={{ scale: 1.02 }}>
                                                <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                                    <CalendarDays className="w-6 h-6 text-teal-600" />
                                                </div>
                                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                                                    Choisissez votre date
                                                </CardTitle>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="w-5 h-5 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Les week-ends et jours fériés ne sont pas disponibles</p>
                                                    </TooltipContent>
                                                </Tooltip>
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

                                {/* Time Slots Section - Only show when date is selected */}
                                {selectedDate && (
                                    <motion.div
                                        id="time-slots"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                        className=""
                                    >
                                        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full">
                                            <CardHeader className="text-center pb-4">
                                                {loading ? (
                                                    <div className="py-8">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                            className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto"
                                                        />
                                                        <p className="text-muted-foreground mt-4">Chargement des créneaux...</p>
                                                    </div>
                                                ) : showTimeSlots ? (
                                                    <>
                                                        <motion.div
                                                            className="flex items-center justify-center gap-3 mb-2"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                                                                <Clock className="w-6 h-6 text-teal-600" />
                                                            </div>
                                                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                                                                Choisissez l'heure
                                                            </CardTitle>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <HelpCircle className="w-5 h-5 text-gray-400" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Les créneaux grisés ne sont pas disponibles</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </motion.div>
                                                        <p className="text-muted-foreground text-sm">
                                                            {selectedDate.toLocaleDateString('fr-FR', {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'long',
                                                            })}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="py-8 text-center">
                                                        <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                                                        <p className="text-muted-foreground">
                                                            Sélectionnez une date pour voir les créneaux disponibles
                                                        </p>
                                                    </div>
                                                )}
                                            </CardHeader>
                                            <CardContent className="pb-6">
                                                {showTimeSlots && !loading && (
                                                    <>
                                                        {/* Available Slots Info */}
                                                        <div className="mb-6 flex flex-wrap justify-center gap-2">
                                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                                <span className="text-green-700 dark:text-green-300 text-xs font-medium">
                                                                    {availableSlots.filter((s) => s.available !== false).length} créneaux disponibles
                                                                </span>
                                                            </div>
                                                            {businessHours?.lunchBreak && (
                                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                                                    <Clock className="w-3 h-3 text-orange-600" />
                                                                    <span className="text-orange-700 dark:text-orange-300 text-xs">
                                                                        Pause: {businessHours.lunchBreak.start}-{businessHours.lunchBreak.end}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Time Slots Grid */}
                                                        {availableSlots.length > 0 ? (
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                                {availableSlots.map((slot, index) => (
                                                                    <motion.button
                                                                        key={slot.time}
                                                                        type="button"
                                                                        disabled={slot.available === false}
                                                                        onClick={() => handleTimeSelect(slot)}
                                                                        className={cn(
                                                                            'relative p-3 rounded-lg border transition-all duration-200 text-sm font-medium',
                                                                            slot.available !== false
                                                                                ? selectedTime === slot.time
                                                                                    ? 'border-teal-500 bg-teal-500 text-white shadow-lg ring-2 ring-teal-500/20'
                                                                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:shadow-md text-gray-900 dark:text-white'
                                                                                : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50',
                                                                        )}
                                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: index * 0.02 }}
                                                                        whileHover={slot.available !== false ? { scale: 1.05 } : {}}
                                                                        whileTap={slot.available !== false ? { scale: 0.95 } : {}}
                                                                    >
                                                                        {/* Time Display */}
                                                                        <div className="font-semibold">{slot.display}</div>

                                                                        {/* Selected indicator */}
                                                                        {selectedTime === slot.time && (
                                                                            <motion.div
                                                                                className="absolute -top-1 -right-1"
                                                                                initial={{ scale: 0 }}
                                                                                animate={{ scale: 1 }}
                                                                            >
                                                                                <CheckCircle className="w-4 h-4 text-white bg-teal-500 rounded-full" />
                                                                            </motion.div>
                                                                        )}
                                                                    </motion.button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-center py-8">
                                                                <p className="text-gray-500">Aucun créneau disponible pour cette date</p>
                                                                <p className="text-sm text-gray-400 mt-2">Veuillez sélectionner une autre date</p>
                                                            </div>
                                                        )}

                                                        {selectedTime && (
                                                            <motion.div
                                                                className="mt-6 flex justify-center"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                            >
                                                                <Button
                                                                    onClick={() => setStep('details')}
                                                                    size="lg"
                                                                    className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <span>Continuer</span>
                                                                        <ArrowRight className="w-4 h-4" />
                                                                    </span>
                                                                </Button>
                                                            </motion.div>
                                                        )}
                                                    </>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </div>
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
                                        <MessageSquare className="w-6 h-6 text-teal-600" />
                                        Détails du rendez-vous
                                    </CardTitle>
                                    <CardDescription>Remplissez vos informations pour confirmer votre rendez-vous</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Durée */}
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Label className="text-base font-semibold">Durée souhaitée du rendez-vous</Label>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <HelpCircle className="w-4 h-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Choisissez la durée qui correspond le mieux à vos besoins</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {durations.map((duration) => (
                                                    <motion.div
                                                        key={duration.value}
                                                        className={cn(
                                                            'p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
                                                            form.duration === duration.value
                                                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20 ring-2 ring-teal-500/20'
                                                                : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 bg-white dark:bg-gray-800',
                                                        )}
                                                        onClick={() => setForm((prev) => ({ ...prev, duration: duration.value }))}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="text-center">
                                                            <div className={cn('inline-block px-2 py-1 rounded-md mb-2', duration.color)}>
                                                                <Clock className="w-4 h-4 inline mr-1" />
                                                                <span className="font-semibold text-sm">{duration.label}</span>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">{duration.description}</div>
                                                        </div>
                                                        {form.duration === duration.value && (
                                                            <CheckCircle className="w-4 h-4 text-teal-500 mx-auto mt-2" />
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
                                            <h3 className="font-semibold flex items-center gap-2 text-lg">
                                                <User className="w-5 h-5 text-teal-600" />
                                                Vos informations de contact
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="client_name">Nom complet *</Label>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="w-3 h-3 text-gray-400" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Votre nom et prénom complets</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <Input
                                                        id="client_name"
                                                        type="text"
                                                        placeholder="Jean Dupont"
                                                        value={form.client_name}
                                                        onChange={(e) => setForm((prev) => ({ ...prev, client_name: e.target.value }))}
                                                        required
                                                        className="h-12"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="client_email">Email *</Label>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="w-3 h-3 text-gray-400" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Nous vous enverrons la confirmation à cette adresse</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            id="client_email"
                                                            type="email"
                                                            placeholder="jean.dupont@exemple.com"
                                                            value={form.client_email}
                                                            onChange={(e) => setForm((prev) => ({ ...prev, client_email: e.target.value }))}
                                                            required
                                                            className="h-12 pl-10"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="client_phone">Téléphone</Label>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="w-3 h-3 text-gray-400" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Pour vous contacter si nécessaire</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                        <Input
                                                            id="client_phone"
                                                            type="tel"
                                                            placeholder="+225 XX XX XX XX"
                                                            value={form.client_phone}
                                                            onChange={(e) => setForm((prev) => ({ ...prev, client_phone: e.target.value }))}
                                                            className="h-12 pl-10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="title">Sujet du rendez-vous</Label>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="w-3 h-3 text-gray-400" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Décrivez brièvement l'objet de votre rendez-vous</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
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
                                                <div className="flex items-center space-x-2">
                                                    <Label htmlFor="description">Message (optionnel)</Label>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <HelpCircle className="w-3 h-3 text-gray-400" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p>Ajoutez toute information utile pour préparer votre rendez-vous</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
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

                                        {/* Summary */}
                                        <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200 dark:border-teal-800 p-6 rounded-xl">
                                            <h4 className="font-semibold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                Récapitulatif de votre rendez-vous
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                                    <div>
                                                        <div className="font-medium text-teal-700 dark:text-teal-300">Date</div>
                                                        <div className="text-teal-600 dark:text-teal-400">
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
                                                    <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                                    <div>
                                                        <div className="font-medium text-teal-700 dark:text-teal-300">Heure</div>
                                                        <div className="text-teal-600 dark:text-teal-400">
                                                            {selectedTime} ({form.duration} min)
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                                    <div>
                                                        <div className="font-medium text-teal-700 dark:text-teal-300">Contact</div>
                                                        <div className="text-teal-600 dark:text-teal-400 text-xs">
                                                            {form.client_name || 'À remplir'}
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
                                                className="px-8 w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
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

                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Rendez-vous confirmé !</h2>

                                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl mb-6 text-left shadow-inner">
                                        <h3 className="font-semibold mb-4 text-lg">Détails de votre rendez-vous :</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-teal-600" />
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
                                                <Clock className="w-4 h-4 text-teal-600" />
                                                <div>
                                                    <span className="font-medium">Heure : </span>
                                                    {selectedTime} ({form.duration} minutes)
                                                </div>
                                            </div>
                                            {form.title && (
                                                <div className="flex items-center gap-3 md:col-span-2">
                                                    <MessageSquare className="w-4 h-4 text-teal-600" />
                                                    <div>
                                                        <span className="font-medium">Sujet : </span>
                                                        {form.title}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                                        <div className="flex items-start space-x-3">
                                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                            <div className="text-left">
                                                <p className="text-blue-900 dark:text-blue-100 font-medium">Email de confirmation envoyé</p>
                                                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                                                    Un email a été envoyé à <strong>{form.client_email}</strong> avec tous les détails de votre
                                                    rendez-vous.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            onClick={resetForm}
                                            className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                                            size="lg"
                                        >
                                            <Calendar className="w-4 h-4 mr-2" />
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
