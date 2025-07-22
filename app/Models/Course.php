<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use App\Models\Partner;

class Course extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_featured'        => 'boolean',
        'is_published'       => 'boolean',
        'published_at'       => 'datetime',
        'regular_price'      => 'float',
        'price_includes_tax' => 'boolean',
        'duration'           => 'integer',
    ];

    use HasFactory, SoftDeletes;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }

    public function course_sessions(): HasMany
    {
        return $this->hasMany(CourseSession::class);
    }

    // public function nextSession(): string
    // {
    //     $nextSession = $this->course_sessions()
    //         ->where('start_date', '>', now())
    //         ->orderBy('start_date')
    //         ->first();

    //     return $nextSession ? $nextSession->start_date->format('Y-m-d H:i:s') : 'No upcoming sessions';
    // }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class)->withTrashed();
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function mediaPath(): Attribute
    {
        $media = 'https://placehold.co/600x400';

        if ($this->media && Storage::disk('public')->exists($this->media->src)) {
            $media = Storage::disk('public')->url($this->media->src);
        }

        return Attribute::make(
            get: fn() => $media,
        );
    }

    public function video(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'video_id');
    }

    public function videoPath(): Attribute
    {
        $video = null;

        if ($this->video && Storage::disk('public')->exists($this->video->src)) {
            $video = Storage::disk('public')->url($this->video->src);
        }

        return Attribute::make(
            get: fn() => $video,
        );
    }

    public function gallery(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'course_media');
    }

    public function galleryPaths(): Attribute
    {
        $paths = $this->gallery->map(function ($media) {
            return Storage::disk('public')->exists($media->src) ? Storage::disk('public')->url($media->src) : null;
        })->filter()->values()->toArray();

        return Attribute::make(
            get: fn() => $paths,
        );
    }

    public function logo(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'logo_id');
    }

    public function logoPath(): Attribute
    {
        $logo = null;

        if ($this->logo && Storage::disk('public')->exists($this->logo->src)) {
            $logo = Storage::disk('public')->url($this->logo->src);
        }

        return Attribute::make(
            get: fn() => $logo,
        );
    }

    public function organizationLogo(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'organization_logo_id');
    }

    public function organizationLogoPath(): Attribute
    {
        $logo = null;

        if ($this->organizationLogo && Storage::disk('public')->exists($this->organizationLogo->src)) {
            $logo = Storage::disk('public')->url($this->organizationLogo->src);
        }

        return Attribute::make(
            get: fn() => $logo,
        );
    }

    public function favouriteUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_courses');
    }

    public function partners(): BelongsToMany
    {
        return $this->belongsToMany(Partner::class, 'course_partner');
    }

    // public function chapters(): HasMany
    // {
    //     return $this->hasMany(Chapter::class);
    // }

    // public function reviews(): HasMany
    // {
    //     return $this->hasMany(Review::class)->withTrashed();
    // }

    // public function enrollments(): HasMany
    // {
    //     return $this->hasMany(Enrollment::class);
    // }

    // public function userProgress()
    // {
    //     return $this->belongsToMany(User::class, 'user_course_progresses')->withPivot('progress', 'course_id');
    // }

    // public function favouriteGuests(): BelongsToMany
    // {
    //     return $this->belongsToMany(Guest::class, 'guest_courses');
    // }

    // public function transactions(): HasMany
    // {
    //     return $this->hasMany(Transaction::class);
    // }

    // public function exams(): HasMany
    // {
    //     return $this->hasMany(Exam::class);
    // }

    // public function quizzes(): HasMany
    // {
    //     return $this->hasMany(Quiz::class);
    // }

    // public function questions(): HasMany
    // {
    //     return $this->hasMany(Question::class);
    // }
}
