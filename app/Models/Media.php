<?php

namespace App\Models;

use App\Enum\MediaTypeEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'type' => MediaTypeEnum::class,
    ];

    protected $appends = ['url'];

    public function url(): Attribute
    {
        $url = null;

        if ($this->src && Storage::disk('public')->exists($this->src)) {
            $url = Storage::disk('public')->url($this->src);
        }

        return Attribute::make(
            get: fn() => $url,
        );
    }
}
