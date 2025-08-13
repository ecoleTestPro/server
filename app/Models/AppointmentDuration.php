<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentDuration extends Model
{
    use HasFactory;

    protected $fillable = [
        'duration',
        'label',
        'description',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'duration' => 'integer'
    ];

    /**
     * Scopes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('duration');
    }

    /**
     * Accessors
     */
    public function getFormattedDurationAttribute()
    {
        $hours = intdiv($this->duration, 60);
        $minutes = $this->duration % 60;
        
        if ($hours > 0 && $minutes > 0) {
            return $hours . 'h' . $minutes . 'min';
        } elseif ($hours > 0) {
            return $hours . 'h';
        } else {
            return $minutes . 'min';
        }
    }
}