<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\CourseSession;

class Enrollment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'user_fullname',
        'user_email',
        'user_phone',
        'course_id',
        'course_session_id',
        // 'coupon_id',
        'mode',
        'progress',
        'is_certificate_downloaded', 
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'progress' => 'float',
        'created_at' => 'datetime:D M Y',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

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
