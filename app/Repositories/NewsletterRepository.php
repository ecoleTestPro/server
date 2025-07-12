<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Newsletter;

class NewsletterRepository extends Repository
{
    public static function model()
    {
        return Newsletter::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'email' => $request->email,
        ]);
    }
}
