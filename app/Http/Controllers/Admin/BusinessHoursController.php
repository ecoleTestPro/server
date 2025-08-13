<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessHours;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class BusinessHoursController extends Controller
{
    /**
     * Affiche les paramètres d'horaires d'ouverture
     */
    public function index(): Response
    {
        $businessHours = BusinessHours::orderByRaw("
            CASE day_of_week 
                WHEN 'monday' THEN 1 
                WHEN 'tuesday' THEN 2 
                WHEN 'wednesday' THEN 3 
                WHEN 'thursday' THEN 4 
                WHEN 'friday' THEN 5 
                WHEN 'saturday' THEN 6 
                WHEN 'sunday' THEN 7 
            END
        ")->get();

        // Initialiser les horaires par défaut si aucun n'existe
        if ($businessHours->isEmpty()) {
            BusinessHours::initializeDefaultHours();
            $businessHours = BusinessHours::orderByRaw("
                CASE day_of_week 
                    WHEN 'monday' THEN 1 
                    WHEN 'tuesday' THEN 2 
                    WHEN 'wednesday' THEN 3 
                    WHEN 'thursday' THEN 4 
                    WHEN 'friday' THEN 5 
                    WHEN 'saturday' THEN 6 
                    WHEN 'sunday' THEN 7 
                END
            ")->get();
        }

        return Inertia::render('Admin/BusinessHours/Index', [
            'businessHours' => $businessHours,
            'daysLabels' => $this->getDaysLabels()
        ]);
    }

    /**
     * Met à jour les horaires d'ouverture
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hours' => 'required|array',
            'hours.*.day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'hours.*.is_active' => 'required|boolean',
            'hours.*.opening_time' => 'nullable|required_if:hours.*.is_active,true|date_format:H:i',
            'hours.*.closing_time' => 'nullable|required_if:hours.*.is_active,true|date_format:H:i|after:hours.*.opening_time',
            'hours.*.lunch_break_start' => 'nullable|date_format:H:i',
            'hours.*.lunch_break_end' => 'nullable|date_format:H:i|after:hours.*.lunch_break_start',
            'hours.*.slot_duration' => 'required|integer|min:15|max:120',
            'hours.*.excluded_times' => 'nullable|array',
            'hours.*.excluded_times.*' => 'date_format:H:i'
        ]);

        foreach ($validated['hours'] as $hourData) {
            BusinessHours::updateOrCreate(
                ['day_of_week' => $hourData['day_of_week']],
                [
                    'is_active' => $hourData['is_active'],
                    'opening_time' => $hourData['is_active'] ? $hourData['opening_time'] : null,
                    'closing_time' => $hourData['is_active'] ? $hourData['closing_time'] : null,
                    'lunch_break_start' => $hourData['lunch_break_start'] ?? null,
                    'lunch_break_end' => $hourData['lunch_break_end'] ?? null,
                    'slot_duration' => $hourData['slot_duration'],
                    'excluded_times' => $hourData['excluded_times'] ?? []
                ]
            );
        }

        return response()->json([
            'message' => 'Horaires d\'ouverture mis à jour avec succès'
        ]);
    }

    /**
     * Copie les horaires d'un jour vers d'autres jours
     */
    public function copyToOtherDays(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'source_day' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'target_days' => 'required|array|min:1',
            'target_days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'
        ]);

        $sourceHours = BusinessHours::where('day_of_week', $validated['source_day'])->first();
        
        if (!$sourceHours) {
            return response()->json([
                'message' => 'Horaires source non trouvés'
            ], 404);
        }

        foreach ($validated['target_days'] as $targetDay) {
            if ($targetDay !== $validated['source_day']) {
                BusinessHours::updateOrCreate(
                    ['day_of_week' => $targetDay],
                    $sourceHours->only([
                        'is_active',
                        'opening_time',
                        'closing_time', 
                        'lunch_break_start',
                        'lunch_break_end',
                        'slot_duration',
                        'excluded_times'
                    ])
                );
            }
        }

        return response()->json([
            'message' => 'Horaires copiés avec succès vers les jours sélectionnés'
        ]);
    }

    /**
     * Prévisualise les créneaux disponibles pour un jour
     */
    public function previewSlots(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'date' => 'required|date'
        ]);

        $businessHours = BusinessHours::where('day_of_week', $validated['day_of_week'])->first();
        
        if (!$businessHours) {
            return response()->json([
                'slots' => [],
                'message' => 'Aucun horaire configuré pour ce jour'
            ]);
        }

        $date = \Carbon\Carbon::parse($validated['date']);
        $slots = $businessHours->getAvailableSlots($date);

        return response()->json([
            'slots' => $slots,
            'total_slots' => count($slots),
            'business_hours' => [
                'opening' => $businessHours->opening_time?->format('H:i'),
                'closing' => $businessHours->closing_time?->format('H:i'),
                'lunch_break' => $businessHours->lunch_break_start ? [
                    'start' => $businessHours->lunch_break_start->format('H:i'),
                    'end' => $businessHours->lunch_break_end->format('H:i')
                ] : null,
                'slot_duration' => $businessHours->slot_duration,
                'excluded_times' => $businessHours->excluded_times ?? []
            ]
        ]);
    }

    /**
     * Réinitialise les horaires aux valeurs par défaut
     */
    public function resetToDefaults(): JsonResponse
    {
        BusinessHours::truncate();
        BusinessHours::initializeDefaultHours();

        return response()->json([
            'message' => 'Horaires réinitialisés aux valeurs par défaut'
        ]);
    }

    /**
     * Obtient les libellés des jours de la semaine
     */
    private function getDaysLabels(): array
    {
        return [
            'monday' => 'Lundi',
            'tuesday' => 'Mardi', 
            'wednesday' => 'Mercredi',
            'thursday' => 'Jeudi',
            'friday' => 'Vendredi',
            'saturday' => 'Samedi',
            'sunday' => 'Dimanche'
        ];
    }
}