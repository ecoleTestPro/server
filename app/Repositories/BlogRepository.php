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

    public static function getAllBlogs() {
        $blogs = self::initQuery()->latest('id')->get();
        foreach ($blogs as $blog) {
            $category = BlogCategoryRepository::find($blog->blog_category_id);
            $blog->category = $category;
        }
        return $blogs;
    }

    public static function storeByRequest(BlogStoreRequest $request)
    {
        $status = $request->status??false;

        $media = $request->hasFile('thumbnail') ? MediaRepository::storeByRequest(
            $request->file('thumbnail'),
            'blog/thumbnail',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'user_id'          => $request->user_id,
            'media_id'         => $media ? $media->id : null,
            'blog_category_id' => $request->category_id,
            'title'            => $request->title,
            'slug'             => Str::slug($request->title),
            'excerpt'          => $request->excerpt,
            'description'      => $request->description,
            'tags'             => $request->tags ? $request->tags : null,
            'status'           => true,
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
            'user_id'          => $request->user_id,
            'media_id'         => $media ? $media->id : null,
            'blog_category_id' => $request->category_id,
            'title'            => $request->title,
            'slug'             => $blog->slug ?? Str::slug($request->title),
            'excerpt'          => $request->excerpt,
            'description'      => $request->description,
            'tags'             => $request->tags ? json_encode($request->tags) : null,
            'status'           => $status,
        ]);
    }

    public static function findBySlug(string $slug): Blog
    {
        $blog = self::initQuery()
            ->where('slug', $slug)
            ->firstOrFail();

        if ($blog->description) {
            $decoded = json_decode($blog->description, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $blog->description = $decoded;
            }
        }

        if ($blog->tags) {
            $blog->tags = json_decode($blog->tags, true);
        }

        return $blog;
    }

    public static function getPublished(int $limit = 10)
    {
        return self::initQuery()
            ->where('status', true)
            ->latest('id')
            ->take($limit)
            ->get();
    }
}
