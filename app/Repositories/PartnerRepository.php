<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Partner;

class PartnerRepository extends Repository
{
    public static function model()
    {
        return Partner::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'name' => $request->name,
            'link' => $request->link,
            'media_id' => $request->media_id,
            'is_active' => $request->has('is_active') ? true : false,
        ]);
    }

    public static function updateByRequest($request, Partner $partner)
    {
        return self::update($partner, [
            'name' => $request->name ?? $partner->name,
            'link' => $request->link ?? $partner->link,
            'media_id' => $request->media_id ?? $partner->media_id,
            'is_active' => $request->has('is_active') ? true : $partner->is_active,
        ]);
    }
}
