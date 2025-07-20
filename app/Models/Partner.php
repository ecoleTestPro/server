<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'is_reference' => 'boolean',
    ];

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    public function mediaPath(): Attribute
    {
        $media = null;
        if ($this->media && Storage::disk('public')->exists($this->media->src)) {
            $media = Storage::disk('public')->url($this->media->src);
        }

        return Attribute::make(
            get: fn() => $media,
        );
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_partner');
    }
}
