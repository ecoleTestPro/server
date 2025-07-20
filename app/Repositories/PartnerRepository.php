<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Partner;
use App\Repositories\MediaRepository;
use App\Enum\MediaTypeEnum;

class PartnerRepository extends Repository
{
    public static function model()
    {
        return Partner::class;
    }

    public static function getActiveReferences(string $tag)
    {
        return self::query()
            ->where('is_active', true)
            ->where('is_reference', true)
            ->where('tag', $tag)
            ->with('media')
            ->get();
    }

    public static function storeByRequest($request)
    {
        $picture = $request->hasFile('picture') ? MediaRepository::storeByRequest(
            $request->file('picture'),
            'partner/logo',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'name' => $request->name,
            'link' => $request->link,
            'tag' => $request->tag,
            'is_reference' => $request->has('is_reference') ? true : false,
            'media_id' => $picture?->id,
            'is_active' => $request->has('is_active') ? true : false,
        ]);
    }

    public static function updateByRequest($request, Partner $partner)
    {
        if ($partner->media) {
            $picture = $request->hasFile('picture') ? MediaRepository::updateByRequest(
                $request->file('picture'),
                $partner->media,
                'partner/logo',
                MediaTypeEnum::IMAGE
            ) : $partner->media;
        } else {
            $picture = $request->hasFile('picture') ? MediaRepository::storeByRequest(
                $request->file('picture'),
                'partner/logo',
                MediaTypeEnum::IMAGE
            ) : null;
        }

        return self::update($partner, [
            'name' => $request->name ?? $partner->name,
            'link' => $request->link ?? $partner->link,
            'tag' => $request->tag ?? $partner->tag,
            'is_reference' => $request->has('is_reference') ? true : $partner->is_reference,
            'media_id' => $picture?->id ?? $partner->media_id,
            'is_active' => $request->has('is_active') ? true : $partner->is_active,
        ]);
    }
}
