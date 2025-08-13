<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessHours extends Model
{
    use HasFactory;

    protected $fillable = [
        'day_of_week',
        'opening_time',
        'closing_time',
        'lunch_break_start',
        'lunch_break_end',
        'is_active',
        'slot_duration',
        'excluded_times'
    ];

    protected $casts = [
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
        'lunch_break_start' => 'datetime:H:i',
        'lunch_break_end' => 'datetime:H:i',
        'is_active' => 'boolean',
        'excluded_times' => 'array'
    ];

    /**
     * Obtient les créneaux disponibles pour un jour donné
     */
    public function getAvailableSlots(Carbon $date): array
    {
        if (!$this->is_active || !$this->opening_time || !$this->closing_time) {
            return [];
        }

        $slots = [];
        $current = Carbon::createFromFormat('H:i', $this->opening_time->format('H:i'))->setDateFrom($date);
        $end = Carbon::createFromFormat('H:i', $this->closing_time->format('H:i'))->setDateFrom($date);
        
        $lunchStart = $this->lunch_break_start ? 
            Carbon::createFromFormat('H:i', $this->lunch_break_start->format('H:i'))->setDateFrom($date) : null;
        $lunchEnd = $this->lunch_break_end ? 
            Carbon::createFromFormat('H:i', $this->lunch_break_end->format('H:i'))->setDateFrom($date) : null;

        while ($current->addMinutes($this->slot_duration)->lte($end)) {
            $slotStart = $current->copy()->subMinutes($this->slot_duration);
            
            // Vérifier si le créneau tombe pendant la pause déjeuner
            $isLunchBreak = $lunchStart && $lunchEnd && 
                $slotStart->between($lunchStart, $lunchEnd->subMinutes($this->slot_duration));
                
            // Vérifier si le créneau est dans les exclusions
            $isExcluded = $this->excluded_times && 
                in_array($slotStart->format('H:i'), $this->excluded_times);

            if (!$isLunchBreak && !$isExcluded) {
                $slots[] = [
                    'time' => $slotStart->format('H:i'),
                    'datetime' => $slotStart->toISOString(),
                    'display' => $slotStart->format('H:i')
                ];
            }
        }

        return $slots;
    }

    /**
     * Vérifie si un créneau est disponible
     */
    public function isSlotAvailable(Carbon $datetime): bool
    {
        $dayOfWeek = strtolower($datetime->format('l'));
        
        if ($this->day_of_week !== $dayOfWeek || !$this->is_active) {
            return false;
        }

        $time = $datetime->format('H:i');
        $slots = $this->getAvailableSlots($datetime);
        
        return collect($slots)->pluck('time')->contains($time);
    }

    /**
     * Scope pour obtenir les horaires actifs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Obtient les horaires pour un jour spécifique
     */
    public static function getForDay(string $dayOfWeek): ?self
    {
        return static::where('day_of_week', strtolower($dayOfWeek))->first();
    }

    /**
     * Initialise les horaires par défaut pour tous les jours
     */
    public static function initializeDefaultHours(): void
    {
        $defaultHours = [
            'monday' => ['08:00', '18:00', '12:00', '13:00'],
            'tuesday' => ['08:00', '18:00', '12:00', '13:00'],
            'wednesday' => ['08:00', '18:00', '12:00', '13:00'],
            'thursday' => ['08:00', '18:00', '12:00', '13:00'],
            'friday' => ['08:00', '18:00', '12:00', '13:00'],
            'saturday' => ['09:00', '13:00', null, null], // Pas de pause le samedi
            'sunday' => [null, null, null, null], // Fermé le dimanche
        ];

        foreach ($defaultHours as $day => [$opening, $closing, $lunchStart, $lunchEnd]) {
            static::updateOrCreate(
                ['day_of_week' => $day],
                [
                    'opening_time' => $opening,
                    'closing_time' => $closing,
                    'lunch_break_start' => $lunchStart,
                    'lunch_break_end' => $lunchEnd,
                    'is_active' => $opening !== null,
                    'slot_duration' => 30,
                ]
            );
        }
    }
}