<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CourseSession;

class Enrollment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'course_id',
        'course_session_id',
        // 'coupon_id',
        'mode',
        'progress',
        'is_certificate_downloaded', 
    ];

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function course_session(): BelongsTo
    {
        return $this->belongsTo(CourseSession::class);
    }

    // public function coupon(): BelongsTo
    // {
    //     return $this->belongsTo(Coupon::class);
    // }

    // public function transactions(): HasMany
    // {
    //     return $this->hasMany(Transaction::class);
    // }
}
