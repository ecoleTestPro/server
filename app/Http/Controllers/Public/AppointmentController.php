<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Models\Appointment;
use App\Models\BusinessHours;
use App\Mail\AppointmentConfirmation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends PublicAbstractController
{
    /**
     * Affiche le formulaire de prise de rendez-vous
     */
    public function create(): Response
    {
        $data = $this->getDefaultData();
        $businessHours = BusinessHours::active()->get()->keyBy('day_of_week');
        $data['businessHours'] = $businessHours;

        // Sinon, utiliser le layout public
        return Inertia::render('public/appointment', [
            'data' => $data
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
        // Validation - type retiré et client_name ajouté
        $rules = [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'appointment_date' => 'required|date|after:now',
            'duration' => 'required|integer|min:15|max:240',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email',
            'client_phone' => 'nullable|string|max:20',
            'metadata' => 'nullable|array'
        ];

        $validated = $request->validate($rules);

        $appointmentDate = Carbon::parse($validated['appointment_date']);

        // Vérifier que le créneau est disponible
        if (!$this->isSlotAvailable($appointmentDate, $validated['duration'])) {
            return response()->json([
                'message' => 'Ce créneau n\'est pas disponible',
                'errors' => ['appointment_date' => ['Créneau non disponible']]
            ], 422);
        }

        // Préparer les données avec client_name dans metadata
        $metadata = $validated['metadata'] ?? [];
        $metadata['client_name'] = $validated['client_name'];
        
        $appointment = Appointment::create([
            'title' => $validated['title'] ?? 'Rendez-vous de ' . $validated['client_name'],
            'description' => $validated['description'] ?? null,
            'appointment_date' => $appointmentDate,
            'duration' => $validated['duration'],
            'client_email' => $validated['client_email'],
            'client_phone' => $validated['client_phone'] ?? null,
            'metadata' => $metadata,
        ]);

        // Envoyer l'email de confirmation
        try {
            Mail::to($appointment->client_email)->send(new AppointmentConfirmation($appointment));
            Log::info('Email de confirmation envoyé pour le rendez-vous ID: ' . $appointment->id);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi de l\'email de confirmation: ' . $e->getMessage());
            // Ne pas bloquer la création du RDV si l'email échoue
        }

        return response()->json([
            'message' => 'Rendez-vous créé avec succès. Un email de confirmation a été envoyé.',
            'appointment' => $appointment
        ], 201);
    }

    /**
     * Annule un rendez-vous
     */
    public function cancel(Request $request, Appointment $appointment): JsonResponse
    {
        // Vérifier l'autorisation via l'email
        if ($appointment->client_email !== $request->input('client_email')) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $validated = $request->validate([
            'reason' => 'nullable|string|max:500'
        ]);

        $appointment->update([
            'cancellation_reason' => $validated['reason'] ?? 'Annulé par le client'
        ]);
        $appointment->delete();

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
}
