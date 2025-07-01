<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseSessionSchedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id', 'course_session_id'];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time'   => 'datetime:H:i',
        'date'       => 'date:d M Y',
    ];

    public function course_session(): BelongsTo
    {
        return $this->belongsTo(CourseSession::class);
    }
}
