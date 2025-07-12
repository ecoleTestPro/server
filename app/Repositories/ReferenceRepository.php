<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Reference;

class ReferenceRepository extends Repository
{
    public static function model()
    {
        return Reference::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'text' => $request->text,
            'media_id' => $request->media_id,
            'is_active' => $request->has('is_active') ? true : false,
        ]);
    }

    public static function updateByRequest($request, Reference $reference)
    {
        return self::update($reference, [
            'text' => $request->text ?? $reference->text,
            'media_id' => $request->media_id ?? $reference->media_id,
            'is_active' => $request->has('is_active') ? true : $reference->is_active,
        ]);
    }
}
