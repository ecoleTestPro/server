<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Enum\MediaTypeEnum;
use App\Http\Requests\BlogStoreRequest;
use App\Http\Requests\BlogUpdateRequest;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogRepository extends Repository
{
    public static function model()
    {
        return Blog::class;
    }


    public static function initQuery()
    {
        return self::query()->with([
            'category',
            'user',
            'media',
            // 'tags'
        ]);
    }

    public static function storeByRequest(BlogStoreRequest $request)
    {
        $status = false;
        if ($request->status) {
            $status = true;
        }

        $media = $request->hasFile('thumbnail') ? MediaRepository::storeByRequest(
            $request->file('thumbnail'),
            'blog/thumbnail',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'user_id' => auth()->id(),
            'media_id' => $media ? $media->id : null,
            'blog_category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'description' => $request->description,
            'tags' => $request->tags ? json_encode($request->tags) : null,
            'status' => $status,
        ]);
    }

    public static function updateByRequest(BlogUpdateRequest $request, Blog $blog)
    {
        $status = false;
        if ($request->status) {
            $status = true;
        }

        $media = $blog->media;

        if ($request->hasFile('thumbnail')) {
            $media = MediaRepository::updateByRequest(
                $request->file('thumbnail'),
                $media,
                'blog/thumbnail',
                MediaTypeEnum::IMAGE
            );
        }

        return self::update($blog, [
            'user_id' => auth()->id(),
            'media_id' => $media ? $media->id : null,
            'blog_category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => $blog->slug ?? Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'description' => $request->description,
            'tags' => $request->tags ? json_encode($request->tags) : null,
            'status' => $status,
        ]);
    }
}

