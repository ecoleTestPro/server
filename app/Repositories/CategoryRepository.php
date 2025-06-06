<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Enum\MediaTypeEnum;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;

class CategoryRepository extends Repository
{
    public static function model()
    {
        return Category::class;
    }

    public static function parents($limit = 9999)
    {
        return static::query()
            // ->whereNull('parent_id')
            ->latest('id')
            ->with('image')
            ->take($limit)
            ->get();
    }

    public static function children($parentId, $limit = 10)
    {
        return static::query()
            ->where('parent_id', $parentId)
            ->latest('id')
            ->with('image')
            ->paginate($limit)
            ->withQueryString();
    }


    /**
     * Retrieve all categories, optionally filtered by a search term, with pagination.
     * 
     * @param string|null $search An optional search term to filter categories by title.
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator Paginated list of categories with transformed images.
     */
    public static function findAll($search = null)
    {
        $categories = static::query()
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->latest('id')
            ->with('image')
            ->paginate(99999)
            ->withQueryString();


        // On mappe sur la collection de résultats (ici sur la propriété 'items' du paginator)
        $categories->getCollection()->transform(function ($category) {
            return [
                ...$category->toArray(),
                "image" => [
                    "id" => $category->image?->id,
                    "src" => $category->imagePath,
                ]
            ];
        });

        return $categories;
    }

    /**
     * Store a new category in storage.
     * 
     * @param CategoryStoreRequest $request Form request containing category information.
     * @return \App\Models\Category Stored category.
     */
    public static function storeByRequest(CategoryStoreRequest $request)
    {
        $isFeatured = false;

        if (isset($request->is_featured)) {
            $isFeatured = $request->is_featured == 'on' ? true : false;
        }

        $media = $request->hasFile('media') ? MediaRepository::storeByRequest(
            $request->file('media'),
            'category/image',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'title'       => $request->title,
            'media_id'    => $media ? $media->id : null,
            'is_featured' => $isFeatured,
            'color'       => $request->color
        ]);
    }

    /**
     * Update a category by the given request.
     * 
     * @param  \App\Http\Requests\CategoryUpdateRequest  $request
     * @param  \App\Models\Category  $category
     * @return \App\Models\Category
     */
    public static function updateByRequest(CategoryUpdateRequest $request, Category $category)
    {
        $isFeatured = false;

        if (isset($request->is_featured)) {
            $isFeatured = $request->is_featured == 'on' ? true : false;
        }

        if ($category->image) {
            $media = $request->hasFile('media') ? MediaRepository::updateByRequest(
                $request->file('media'),
                $category->image,
                'category/image',
                MediaTypeEnum::IMAGE
            ) : $category->image;
        } else {
            $media = $request->hasFile('media') ? MediaRepository::storeByRequest(
                $request->file('media'),
                'category/image',
                MediaTypeEnum::IMAGE
            ) : null;
        }

        return self::update($category, [
            'title' => $request->title ?? $category->title,
            'media_id' => $media ? $media->id : null,
            'is_featured' => $isFeatured,
            'color' => $request->color ?? $category->color
        ]);
    }

    /**
     * Récupère toutes les catégories organisées de parent à enfant de façon récursive.
     *
     * @return array
     */
    public static function getRecursiveTree()
    {
        $categories = static::query()
            ->with('image')
            ->orderBy('parent_id')
            ->orderBy('id')
            ->get();

        $categoriesByParent = [];
        foreach ($categories as $category) {
            $parentId = $category->parent_id ?? 0;
            $categoriesByParent[$parentId][] = $category;
        }

        $buildTree = function ($parentId) use (&$buildTree, $categoriesByParent) {
            $tree = [];
            if (isset($categoriesByParent[$parentId])) {
                foreach ($categoriesByParent[$parentId] as $category) {
                    $node = $category->toArray();
                    $node['image'] = [
                        'id' => $category->image?->id,
                        'src' => $category->imagePath,
                    ];
                    $node['children'] = $buildTree($category->id);
                    $tree[] = $node;
                }
            }
            return $tree;
        };

        return $buildTree(0);
    }
}
