<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'status' => 'boolean',
        // 'created_at' => Carbon::class,
    ];

    use HasFactory, SoftDeletes;

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function mediaPath(): Attribute
    {
        $media = 'https://placehold.co/600x400';

        if ($this->media && Storage::exists($this->media->src)) {
            $media = Storage::url($this->media->src);
        }

        return Attribute::make(
            get: fn() => $media,
        );
    }
}
