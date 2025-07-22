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

    /**
     * Retrieve active references with a specific tag.
     *
     * This function queries the database to find all partners 
     * that are marked as active and referenceable, and have the 
     * specified tag. It includes associated media in the results.
     *
     * @param string $tag The tag to filter the references by.
     * 
     * @return \Illuminate\Database\Eloquent\Builder The query builder instance.
     */
    public static function getActiveReferences(string $tag)
    {
        return self::query()
            ->where('is_active', true)
            ->where('is_reference', true)
            ->when($tag, function ($query) use ($tag) {
                return $query->where(function ($query) use ($tag) {
                    $query->where('tag', $tag)
                        ->orWhere('tag', 'like', "%;$tag;%")
                        ->orWhere('tag', 'like', "$tag;%")
                        ->orWhere('tag', 'like', "%;$tag");
                });
                return $query;
            })
            ->with('media')
            ->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|Partner[]
     */
    public static function allWithMedia()
    {
        return static::query()
            ->where('is_reference', true)
            ->with('media')
            ->withTrashed()
            ->latest('id')
            ->get();
    }

    /**
     * Store a new partner in storage.
     *
     * This function takes a request object and uses it to create a new partner in the database.
     * It will also upload a picture to the "references" directory if one is provided.
     *
     * @param \Illuminate\Http\Request $request Form request containing partner information.
     * 
     * @return \App\Models\Partner The stored partner.
     */
    public static function storeByRequest($request)
    {
        $picture = $request->hasFile('picture') ? MediaRepository::storeByRequest(
            $request->file('picture'),
            'references',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'name'         => $request->name,
            'link'         => $request->link,
            'tag'          => $request->tag,
            'is_reference' => $request->has('is_reference') ? true : false,
            'media_id'     => $picture?->id,
            'is_active'    => $request->has('is_active') ? true : false,
        ]);
    }

    /**
     * Update the specified partner using the provided request data.
     *
     * This method updates a partner's information in the database, including
     * its media if a new picture is provided. The picture is stored in the 
     * 'references' directory. The method ensures that the partner's media 
     * is updated or stored as necessary and that other attributes are 
     * updated with the request data or retain their existing values.
     *
     * @param \Illuminate\Http\Request $request The request containing the partner's updated information.
     * @param \App\Models\Partner $partner The partner instance to update.
     * @return \App\Models\Partner The updated partner.
     */
    public static function updateByRequest($request, Partner $partner)
    {
        $path = 'references';

        if ($partner->media) {
            $picture = $request->hasFile('picture') ? MediaRepository::updateByRequest(
                $request->file('picture'),
                $partner->media,
                $path,
                MediaTypeEnum::IMAGE
            ) : $partner->media;
        } else {
            $picture = $request->hasFile('picture') ? MediaRepository::storeByRequest(
                $request->file('picture'),
                $path,
                MediaTypeEnum::IMAGE
            ) : null;
        }

        return self::update($partner, [
            'name'         => $request->name ?? $partner->name,
            'link'         => $request->link ?? $partner->link,
            'tag'          => $request->tag ?? $partner->tag,
            'is_reference' => $request->has('is_reference') ? true : $partner->is_reference,
            'media_id'     => $picture?->id ?? $partner->media_id,
            'is_active'    => $request->has('is_active') ? true : $partner->is_active,
        ]);
    }
}
