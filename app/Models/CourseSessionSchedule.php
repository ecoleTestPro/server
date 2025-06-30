<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseSessionSchedule extends Model
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
        'mode'
    ];

    protected $guarded = ['id', 'course_session_id'];

    public function course_session(): BelongsTo
    {
        return $this->belongsTo(CourseSession::class);
    }
}
