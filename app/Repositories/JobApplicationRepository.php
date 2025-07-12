<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\JobApplication;

class JobApplicationRepository extends Repository
{
    public static function model()
    {
        return JobApplication::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'job_offer_id' => $request->job_offer_id,
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);
    }
}
