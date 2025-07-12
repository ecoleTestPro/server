<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subject',
        'content',
        'is_sent',
        'sent_at',
        'error',
    ];

    protected $casts = [
        'is_sent' => 'boolean',
        'sent_at' => 'datetime',
    ];
}
