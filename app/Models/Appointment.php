<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'appointment_date',
        'duration',
        'client_email',
        'client_phone',
        'metadata',
        'reminded_at',
        'admin_notes',
        'cancellation_reason'
    ];

    protected $casts = [
        'appointment_date' => 'datetime',
        'reminded_at' => 'datetime',
        'metadata' => 'array'
    ];

    /**
     * Scope pour les rendez-vous d'aujourd'hui
     */
    public function scopeToday(Builder $query): Builder
    {
        return $query->whereDate('appointment_date', today());
    }

    /**
     * Scope pour les rendez-vous à venir
     */
    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('appointment_date', '>', now());
    }

    /**
     * Scope pour les rendez-vous passés
     */
    public function scopePast(Builder $query): Builder
    {
        return $query->where('appointment_date', '<', now());
    }

    /**
     * Calcule l'heure de fin du rendez-vous
     */
    public function getEndTimeAttribute(): Carbon
    {
        return $this->appointment_date->addMinutes($this->duration);
    }

    /**
     * Vérifie si le rendez-vous nécessite un rappel
     */
    public function needsReminder(): bool
    {
        // Rappel 24h avant si pas encore envoyé
        $reminderTime = $this->appointment_date->subDay();
        
        return now()->gte($reminderTime) && 
               $this->appointment_date->isFuture() && 
               !$this->reminded_at;
    }

    /**
     * Marque le rappel comme envoyé
     */
    public function markReminderSent(): void
    {
        $this->update(['reminded_at' => now()]);
    }

    /**
     * Vérifie s'il y a un conflit avec un autre rendez-vous
     */
    public static function hasConflict(Carbon $startTime, int $duration, ?int $excludeId = null): bool
    {
        $endTime = $startTime->copy()->addMinutes($duration);
        
        $query = static::where(function ($q) use ($startTime, $endTime) {
                // Vérifier les chevauchements
                $q->whereBetween('appointment_date', [$startTime, $endTime])
                  ->orWhere(function ($q2) use ($startTime, $endTime) {
                      // Vérifier si un RDV existant chevauche avec le nouveau créneau
                      $q2->where('appointment_date', '<', $startTime)
                         ->whereRaw('DATE_ADD(appointment_date, INTERVAL duration MINUTE) > ?', [$startTime]);
                  });
            });

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }
}