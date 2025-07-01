<?php

namespace App\Models;

use Carbon\Carbon;
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

    protected $casts = [
        'start_date'     => 'datetime:d M Y',
        'end_date'       => 'datetime:d M Y',
        'price'          => 'float',
        'price_discount' => 'float',
        'tva'            => 'float',
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
