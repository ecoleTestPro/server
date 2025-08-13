<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\AppointmentType;
use App\Models\AppointmentDuration;
use App\Models\BusinessHours;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class PrivateAppointmentController extends Controller
{
    /**
     * Liste des rendez-vous avec filtres et pagination
     */
    public function index(Request $request): Response
    {
        $query = Appointment::with(['user', 'adminUser'])
            ->orderBy('appointment_date', 'desc');

        // Filtres
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('appointment_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('appointment_date', '<=', $request->date_to);
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('client_email', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%');
            });
        }

        $appointments = $query->paginate(20);

        // Statistiques
        $stats = [
            'total' => Appointment::count(),
            'today' => Appointment::today()->count(),
            'pending' => Appointment::pending()->count(),
            'confirmed' => Appointment::confirmed()->count(),
            'upcoming' => Appointment::upcoming()->count(),
        ];

        return Inertia::render('dashboard/appointments/index', [
            'appointments' => $appointments,
            'filters' => $request->only(['status', 'type', 'date_from', 'date_to', 'search']),
            'stats' => $stats,
            'statusOptions' => $this->getStatusOptions(),
            'typeOptions' => $this->getTypeOptions(),
            'appointmentTypes' => AppointmentType::active()->orderBy('sort_order')->get(['id', 'name', 'slug', 'color']),
        ]);
    }

    /**
     * Affichage du calendrier des rendez-vous
     */
    public function calendar(Request $request): Response
    {
        $startDate = $request->get('start', now()->startOfMonth()->toDateString());
        $endDate = $request->get('end', now()->endOfMonth()->toDateString());

        $appointments = Appointment::with(['user', 'adminUser', 'appointmentType'])
            ->whereBetween('appointment_date', [$startDate, $endDate])
            ->get();

        return Inertia::render('dashboard/appointments/calendar', [
            'appointments' => $appointments,
            'filters' => $request->only(['month', 'year', 'type', 'status']),
            'appointmentTypes' => AppointmentType::active()->orderBy('sort_order')->get(['id', 'name', 'slug', 'color']),
        ]);
    }

    /**
     * Voir les détails d'un rendez-vous
     */
    public function show(Appointment $appointment): Response
    {
        $appointment->load(['user', 'adminUser']);
        
        return Inertia::render('dashboard/appointments/show', [
            'appointment' => $appointment,
        ]);
    }

    /**
     * Confirmer un rendez-vous
     */
    public function confirm(Appointment $appointment): JsonResponse
    {
        try {
            $appointment->confirm(auth()->id());
            
            return response()->json([
                'success' => true,
                'message' => 'Rendez-vous confirmé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la confirmation: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Annuler un rendez-vous
     */
    public function cancel(Request $request, Appointment $appointment): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $appointment->cancel($request->reason);
            
            return response()->json([
                'success' => true,
                'message' => 'Rendez-vous annulé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'annulation: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Marquer un rendez-vous comme terminé
     */
    public function complete(Request $request, Appointment $appointment): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'notes' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $appointment->complete($request->notes);
            
            return response()->json([
                'success' => true,
                'message' => 'Rendez-vous marqué comme terminé'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Page de paramétrage des types de rendez-vous
     */
    public function settingsTypes(): Response
    {
        $appointmentTypes = AppointmentType::ordered()->get();
        $appointmentDurations = AppointmentDuration::active()->orderBy('sort_order')->get(['id', 'duration', 'label']);
        
        return Inertia::render('dashboard/appointments/settings/types', [
            'appointmentTypes' => $appointmentTypes,
            'appointmentDurations' => $appointmentDurations,
        ]);
    }

    /**
     * Créer ou mettre à jour un type de rendez-vous
     */
    public function storeType(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'icon' => 'nullable|string|max:10',
            'color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
            'description' => 'nullable|string|max:500',
            'default_duration' => 'required|integer|min:5|max:480',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $type = AppointmentType::create($validator->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Type de rendez-vous créé avec succès',
                'type' => $type
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un type de rendez-vous
     */
    public function updateType(Request $request, AppointmentType $type): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'icon' => 'nullable|string|max:10',
            'color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
            'description' => 'nullable|string|max:500',
            'default_duration' => 'required|integer|min:5|max:480',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $type->update($validator->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Type de rendez-vous mis à jour avec succès',
                'type' => $type
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un type de rendez-vous
     */
    public function destroyType(AppointmentType $type): JsonResponse
    {
        try {
            // Vérifier si le type est utilisé
            $appointmentsCount = Appointment::where('type', $type->slug)->count();
            
            if ($appointmentsCount > 0) {
                return response()->json([
                    'success' => false,
                    'message' => "Ce type est utilisé par {$appointmentsCount} rendez-vous et ne peut pas être supprimé"
                ], 409);
            }
            
            $type->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Type de rendez-vous supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Page de paramétrage des durées
     */
    public function settingsDurations(): Response
    {
        $durations = AppointmentDuration::ordered()->get();
        
        return Inertia::render('dashboard/appointments/settings/durations', [
            'durations' => $durations
        ]);
    }

    /**
     * Créer une durée
     */
    public function storeDuration(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'duration' => 'required|integer|min:5|max:480',
            'label' => 'required|string|max:50',
            'description' => 'nullable|string|max:200',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $duration = AppointmentDuration::create($validator->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Durée créée avec succès',
                'duration' => $duration
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Page de paramétrage des horaires
     */
    public function settingsHours(): Response
    {
        $businessHours = BusinessHours::orderByRaw("FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')")->get();
        $appointmentDurations = AppointmentDuration::active()->orderBy('sort_order')->get(['id', 'duration', 'label']);
        
        return Inertia::render('dashboard/appointments/settings/hours', [
            'businessHours' => $businessHours,
            'appointmentDurations' => $appointmentDurations,
        ]);
    }

    /**
     * Mettre à jour les horaires
     */
    public function updateHours(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hours' => 'required|array',
            'hours.*.day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'hours.*.is_active' => 'boolean',
            'hours.*.opening_time' => 'nullable|date_format:H:i',
            'hours.*.closing_time' => 'nullable|date_format:H:i',
            'hours.*.lunch_break_start' => 'nullable|date_format:H:i',
            'hours.*.lunch_break_end' => 'nullable|date_format:H:i',
            'hours.*.slot_duration' => 'required|integer|min:5|max:120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::transaction(function() use ($request) {
                foreach ($request->hours as $hourData) {
                    BusinessHours::updateOrCreate(
                        ['day_of_week' => $hourData['day_of_week']],
                        $hourData
                    );
                }
            });
            
            return response()->json([
                'success' => true,
                'message' => 'Horaires mis à jour avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * API - Obtenir les créneaux disponibles pour une date
     */
    public function getAvailableSlots(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date|after_or_equal:today'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $date = Carbon::parse($request->date);
            $dayOfWeek = strtolower($date->format('l'));
            
            $businessHour = BusinessHours::getForDay($dayOfWeek);
            
            if (!$businessHour) {
                return response()->json([
                    'success' => true,
                    'slots' => []
                ]);
            }

            $slots = $businessHour->getAvailableSlots($date);
            
            // Vérifier la disponibilité de chaque créneau
            foreach ($slots as &$slot) {
                $slotDateTime = Carbon::parse($slot['datetime']);
                $slot['available'] = !Appointment::hasConflict($slotDateTime, 30);
            }
            
            return response()->json([
                'success' => true,
                'slots' => $slots
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * API - Obtenir les types de rendez-vous actifs
     */
    public function getActiveTypes(): JsonResponse
    {
        try {
            $types = AppointmentType::active()->ordered()->get();
            
            return response()->json([
                'success' => true,
                'types' => $types
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * API - Obtenir les durées actives
     */
    public function getActiveDurations(): JsonResponse
    {
        try {
            $durations = AppointmentDuration::active()->ordered()->get();
            
            return response()->json([
                'success' => true,
                'durations' => $durations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Méthodes helper privées
     */
    private function getStatusOptions(): array
    {
        return [
            ['value' => Appointment::STATUS_PENDING, 'label' => 'En attente'],
            ['value' => Appointment::STATUS_CONFIRMED, 'label' => 'Confirmé'],
            ['value' => Appointment::STATUS_COMPLETED, 'label' => 'Terminé'],
            ['value' => Appointment::STATUS_CANCELLED, 'label' => 'Annulé'],
            ['value' => Appointment::STATUS_NO_SHOW, 'label' => 'Absent'],
        ];
    }

    private function getTypeOptions(): array
    {
        return [
            ['value' => Appointment::TYPE_CONSULTATION, 'label' => 'Consultation'],
            ['value' => Appointment::TYPE_INFORMATION, 'label' => 'Information'],
            ['value' => Appointment::TYPE_SUPPORT, 'label' => 'Support'],
            ['value' => Appointment::TYPE_ENROLLMENT, 'label' => 'Inscription'],
            ['value' => Appointment::TYPE_OTHER, 'label' => 'Autre'],
        ];
    }

    private function getStatusColor(string $status): string
    {
        return match($status) {
            Appointment::STATUS_PENDING => '#f59e0b',
            Appointment::STATUS_CONFIRMED => '#10b981',
            Appointment::STATUS_COMPLETED => '#6366f1',
            Appointment::STATUS_CANCELLED => '#ef4444',
            Appointment::STATUS_NO_SHOW => '#6b7280',
            default => '#9ca3af'
        };
    }
}