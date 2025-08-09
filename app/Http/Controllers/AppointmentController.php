<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BusinessHours;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    /**
     * Affiche le formulaire de prise de rendez-vous
     */
    public function create(): Response
    {
        $businessHours = BusinessHours::active()->get()->keyBy('day_of_week');
        
        // Si l'utilisateur est connecté, utiliser le layout dashboard
        if (auth()->check()) {
            return Inertia::render('Appointments/Create', [
                'businessHours' => $businessHours,
                'appointmentTypes' => $this->getAppointmentTypes()
            ]);
        }
        
        // Sinon, utiliser le layout public
        return Inertia::render('Public/AppointmentCreate', [
            'businessHours' => $businessHours,
            'appointmentTypes' => $this->getAppointmentTypes()
        ]);
    }

    /**
     * Obtient les créneaux disponibles pour une date donnée
     */
    public function getAvailableSlots(Request $request): JsonResponse
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:today'
        ]);

        $date = Carbon::parse($request->date);
        $dayOfWeek = strtolower($date->format('l'));
        
        $businessHours = BusinessHours::getForDay($dayOfWeek);
        
        if (!$businessHours) {
            return response()->json([
                'slots' => [],
                'message' => 'Aucune disponibilité pour ce jour'
            ]);
        }

        $availableSlots = $businessHours->getAvailableSlots($date);
        
        // Filtrer les créneaux déjà réservés
        $bookedSlots = Appointment::whereDate('appointment_date', $date)
            ->whereIn('status', [Appointment::STATUS_PENDING, Appointment::STATUS_CONFIRMED])
            ->pluck('appointment_date')
            ->map(fn($datetime) => Carbon::parse($datetime)->format('H:i'))
            ->toArray();

        $slots = collect($availableSlots)->reject(function ($slot) use ($bookedSlots) {
            return in_array($slot['time'], $bookedSlots);
        })->values();

        return response()->json([
            'slots' => $slots,
            'businessHours' => [
                'opening' => $businessHours->opening_time?->format('H:i'),
                'closing' => $businessHours->closing_time?->format('H:i'),
                'lunchBreak' => $businessHours->lunch_break_start ? [
                    'start' => $businessHours->lunch_break_start->format('H:i'),
                    'end' => $businessHours->lunch_break_end->format('H:i')
                ] : null
            ]
        ]);
    }

    /**
     * Stocke un nouveau rendez-vous
     */
    public function store(Request $request): JsonResponse
    {
        // Validation différente selon si l'utilisateur est connecté ou non
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'appointment_date' => 'required|date|after:now',
            'duration' => 'required|integer|min:15|max:240',
            'type' => 'required|in:consultation,information,support,enrollment,other',
            'client_phone' => 'nullable|string|max:20',
            'metadata' => 'nullable|array'
        ];

        // Si l'utilisateur n'est pas connecté, l'email est obligatoire
        if (!auth()->check()) {
            $rules['client_email'] = 'required|email';
        } else {
            $rules['client_email'] = 'nullable|email';
        }

        $validated = $request->validate($rules);

        $appointmentDate = Carbon::parse($validated['appointment_date']);
        
        // Vérifier que le créneau est disponible
        if (!$this->isSlotAvailable($appointmentDate, $validated['duration'])) {
            return response()->json([
                'message' => 'Ce créneau n\'est pas disponible',
                'errors' => ['appointment_date' => ['Créneau non disponible']]
            ], 422);
        }

        $appointment = Appointment::create([
            'user_id' => auth()->id(), // null si non connecté
            'title' => $validated['title'],
            'description' => $validated['description'],
            'appointment_date' => $appointmentDate,
            'duration' => $validated['duration'],
            'type' => $validated['type'],
            'client_email' => $validated['client_email'] ?? (auth()->user()?->email ?? null),
            'client_phone' => $validated['client_phone'],
            'metadata' => $validated['metadata'] ?? [],
            'status' => Appointment::STATUS_PENDING
        ]);

        // Notifier les admins
        // TODO: Envoyer notification

        return response()->json([
            'message' => 'Rendez-vous créé avec succès',
            'appointment' => $appointment->load(['user', 'adminUser'])
        ], 201);
    }

    /**
     * Affiche les rendez-vous de l'utilisateur
     */
    public function index(): Response
    {
        $appointments = Appointment::where('user_id', auth()->id())
            ->with(['adminUser'])
            ->orderBy('appointment_date', 'desc')
            ->paginate(10);

        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Annule un rendez-vous
     */
    public function cancel(Request $request, Appointment $appointment): JsonResponse
    {
        if ($appointment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        if (!$appointment->isCancellable()) {
            return response()->json([
                'message' => 'Ce rendez-vous ne peut plus être annulé'
            ], 422);
        }

        $validated = $request->validate([
            'reason' => 'nullable|string|max:500'
        ]);

        $appointment->cancel($validated['reason']);

        return response()->json([
            'message' => 'Rendez-vous annulé avec succès'
        ]);
    }

    /**
     * Vérifie si un créneau est disponible
     */
    private function isSlotAvailable(Carbon $dateTime, int $duration): bool
    {
        $dayOfWeek = strtolower($dateTime->format('l'));
        $businessHours = BusinessHours::getForDay($dayOfWeek);
        
        if (!$businessHours || !$businessHours->isSlotAvailable($dateTime)) {
            return false;
        }

        // Vérifier les conflits avec d'autres rendez-vous
        return !Appointment::hasConflict($dateTime, $duration);
    }

    /**
     * Obtient les types de rendez-vous disponibles
     */
    private function getAppointmentTypes(): array
    {
        return [
            Appointment::TYPE_CONSULTATION => 'Consultation',
            Appointment::TYPE_INFORMATION => 'Demande d\'information',
            Appointment::TYPE_SUPPORT => 'Support technique',
            Appointment::TYPE_ENROLLMENT => 'Inscription formation',
            Appointment::TYPE_OTHER => 'Autre'
        ];
    }
}