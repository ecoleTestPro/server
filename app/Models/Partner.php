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

    public function saveTagFromCourse(Course $course, string $tag, array $partner_ids): void
    {
        try {
            // #0 : Save tag from course
            $course->partners()->sync($partner_ids);

            // #1 save reference tag to course
            $course->reference_tag = $tag;
            $course->save();

            // #2 : add tag to tags string partner
            $partners = $this->whereIn('id', $partner_ids)->get();
            foreach ($partners as $partner) {
                $existingTags = explode(';', $partner->tag ?? '');
                $newTags      = array_unique(array_merge($existingTags, [$tag]));
                $partner->tag = implode(';', $newTags);
                $partner->save();
            }
        } catch (\Exception $e) {
            // Handle exception if needed
            throw new \Exception('Error saving tag from course: ' . $e->getMessage());
        }
    }
}
