<?php

namespace App\Services;

use App\Models\User;

class AuthUserService
{
    /**
     * The authenticated user instance.
     */
    public static User $user;

    public function __construct()
    {
        self::$user = auth()->user();
    }
}
