<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\JobOffer;

class JobOfferRepository extends Repository
{
    public static function model()
    {
        return JobOffer::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'title' => $request->title,
            'company' => $request->company,
            'location' => $request->location,
            'type' => $request->type,
            'salary' => $request->salary,
            'description' => $request->description,
            'is_active' => $request->has('is_active') ? true : false,
        ]);
    }

    public static function updateByRequest($request, JobOffer $offer)
    {
        return self::update($offer, [
            'title' => $request->title ?? $offer->title,
            'company' => $request->company ?? $offer->company,
            'location' => $request->location ?? $offer->location,
            'type' => $request->type ?? $offer->type,
            'salary' => $request->salary ?? $offer->salary,
            'description' => $request->description ?? $offer->description,
            'is_active' => $request->has('is_active') ? true : $offer->is_active,
        ]);
    }
}
