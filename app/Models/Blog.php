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
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'description',
        'tags',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $guarded = [
        'id',
        'blog_category_id',
        // 'user_id',
        'media_id',
    ];

    protected $casts = [
        'status'     => 'boolean',
        'tags'       => 'array',
        'created_at' => 'datetime:D/m/Y H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    use HasFactory, SoftDeletes;

    /**
     * The blog category that this blog belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    /**
     * The user that this blog belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
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

        if ($this->media && Storage::disk('public')->exists($this->media->src)) {
            $media = Storage::disk('public')->url($this->media->src);
        }

        return Attribute::make(
            get: fn() => $media,
        );
    }

    // public function tags(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn() => $this->tags ? explode(';', $this->tags) : [],
    //     );
    // }
}

