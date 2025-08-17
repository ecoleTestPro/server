<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobOffer extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'company',
        'location',
        'type',
        'salary',
        'description',
        'expires_at',
        'is_active',
    ];

    protected $casts = [
        // 'salary' => 'float',
        'expires_at' => 'datetime:d/m/Y',
        'created_at' => 'datetime:D M Y',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];
}
