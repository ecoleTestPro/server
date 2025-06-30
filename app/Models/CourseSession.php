<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseSession extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'location',
        'country',
        'city',
        'longitude',
        'latitude',
        'timezone',
        'language',
        'start_date',
        'end_date',
        'price',
        'price_discount',
        'tva',
    ];

    protected $guarded = ['id', 'course_id'];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(CourseSessionSchedule::class);
    }
}
