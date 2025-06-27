<?php

namespace App\Models;

use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $guarded = ['id'];

    protected $fillable = [
        'title',
        'slug',
        'level',
        'media_id',
        'parent_id',
        'is_featured',
        'color',
    ];

    use HasFactory, SoftDeletes;

    /**
     * Get the image associated with the category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    /**
     * Get the image path attribute.
     *
     * This method returns the URL of the image associated with the category.
     * If the image exists in storage, it will return the storage URL; otherwise,
     * it will return a placeholder URL.
     *
     * @return Attribute
     */
    public function imagePath(): Attribute
    {
        $image = 'https://placehold.co/512x512';

        if ($this->image && Storage::exists($this->image->src)) {
            $image = Storage::url($this->image->src);
        }

        return Attribute::make(
            get: fn() => $image,
        );
    }

    /**
     * Get the courses for the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Get the parent category.
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * The categories that belong to the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


    // public function articles(): HasMany
    // {
    //     return $this->hasMany(Article::class);
    // }
}
