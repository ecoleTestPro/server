<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // peut être null pour les invités
        'admin_user_id',
        'title',
        'description',
        'appointment_date',
        'duration',
        'status',
        'type',
        'client_email', // obligatoire pour les invités
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
     * Statuts possibles des rendez-vous
     */
    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_NO_SHOW = 'no_show';

    /**
     * Types de rendez-vous possibles
     */
    const TYPE_CONSULTATION = 'consultation';
    const TYPE_INFORMATION = 'information';
    const TYPE_SUPPORT = 'support';
    const TYPE_ENROLLMENT = 'enrollment';
    const TYPE_OTHER = 'other';

    /**
     * Relation avec l'utilisateur client (peut être null pour les invités)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec l'administrateur assigné
     */
    public function adminUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_user_id');
    }

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
     * Scope par statut
     */
    public function scopeByStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope pour les rendez-vous confirmés
     */
    public function scopeConfirmed(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_CONFIRMED);
    }

    /**
     * Scope pour les rendez-vous en attente
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Vérifie si le rendez-vous est modifiable
     */
    public function isEditable(): bool
    {
        return in_array($this->status, [self::STATUS_PENDING, self::STATUS_CONFIRMED]) &&
               $this->appointment_date->isFuture();
    }

    /**
     * Vérifie si le rendez-vous peut être annulé
     */
    public function isCancellable(): bool
    {
        return in_array($this->status, [self::STATUS_PENDING, self::STATUS_CONFIRMED]) &&
               $this->appointment_date->isFuture();
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
        if ($this->status !== self::STATUS_CONFIRMED) {
            return false;
        }

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
     * Confirme le rendez-vous
     */
    public function confirm(int $adminUserId = null): bool
    {
        return $this->update([
            'status' => self::STATUS_CONFIRMED,
            'admin_user_id' => $adminUserId ?? $this->admin_user_id
        ]);
    }

    /**
     * Annule le rendez-vous
     */
    public function cancel(string $reason = null): bool
    {
        return $this->update([
            'status' => self::STATUS_CANCELLED,
            'cancellation_reason' => $reason
        ]);
    }

    /**
     * Marque le rendez-vous comme terminé
     */
    public function complete(string $notes = null): bool
    {
        return $this->update([
            'status' => self::STATUS_COMPLETED,
            'admin_notes' => $notes ?? $this->admin_notes
        ]);
    }

    /**
     * Vérifie s'il y a un conflit avec un autre rendez-vous
     */
    public static function hasConflict(Carbon $startTime, int $duration, int $excludeId = null): bool
    {
        $endTime = $startTime->copy()->addMinutes($duration);
        
        $query = static::where('status', '!=', self::STATUS_CANCELLED)
            ->where(function ($q) use ($startTime, $endTime) {
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

    /**
     * Obtient le libellé du statut
     */
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            self::STATUS_PENDING => 'En attente',
            self::STATUS_CONFIRMED => 'Confirmé',
            self::STATUS_COMPLETED => 'Terminé',
            self::STATUS_CANCELLED => 'Annulé',
            self::STATUS_NO_SHOW => 'Absent',
            default => 'Inconnu'
        };
    }

    /**
     * Obtient le libellé du type
     */
    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            self::TYPE_CONSULTATION => 'Consultation',
            self::TYPE_INFORMATION => 'Information',
            self::TYPE_SUPPORT => 'Support',
            self::TYPE_ENROLLMENT => 'Inscription',
            self::TYPE_OTHER => 'Autre',
            default => 'Non défini'
        };
    }
}