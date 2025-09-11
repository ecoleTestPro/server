<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Enum\MediaTypeEnum;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryRepository extends Repository
{
    public static function model()
    {
        return Category::class;
    }

    public static function parents($limit = 9999)
    {
        return static::query()
            ->whereNull('parent_id')
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

    public static function findChildrenByParentId($parentId)
    {
        return static::getRecursiveTree(true, $parentId);
    }

    /**
     * Find a category by its slug.
     * 
     * @param string $slug The category slug to search for.
     * @return \App\Models\Category|null The category if found, otherwise null.
     */
    public static function findBySlug($slug)
    {
        return static::query()
            ->where('slug', $slug)
            ->with('image')
            ->first();
    }

    /**
     * Récupère toutes les catégories organisées de parent à enfant de façon récursive.
     *
     * @param bool $includeCourses Indique si les cours doivent être inclus
     * @param int|null $categoryId ID de la catégorie à récupérer (avec ses descendants)
     * @return array
     */
    public static function getRecursiveTree($includeCourses = false, int|null $categoryId = null)
    {
        // Récupérer toutes les catégories avec leur image, triées par parent_id et id
        $categories = static::query()
            ->with('image')
            ->orderBy('id');

        // Si un categoryId est fourni, récupérer cette catégorie et ses descendants
        if ($categoryId !== null) {
            // Récupérer les IDs de la catégorie et de ses descendants
            $categoryIds = static::getDescendantIds($categoryId);
            $categoryIds[] = $categoryId; // Inclure la catégorie elle-même
            $categories = $categories->whereIn('id', $categoryIds);
        }

        // Exécuter la requête
        $categories = $categories->get();

        // Organiser les catégories par parent_id
        $categoriesByParent = [];
        foreach ($categories as $category) {
            $parentId = $category->parent_id ?? 0;
            $categoriesByParent[$parentId][] = $category;
        }

        // Fonction récursive pour construire l'arbre
        $buildTree = function ($parentId) use (&$buildTree, $categoriesByParent, $includeCourses) {
            $tree = [];
            if (isset($categoriesByParent[$parentId])) {
                foreach ($categoriesByParent[$parentId] as $category) {
                    $node = $category->toArray();
                    $node['image'] = [
                        'id' => $category->image?->id,
                        'src' => $category->imagePath,
                    ];
                    $node['children'] = $buildTree($category->id);
                    
                    // Récupérer les cours avec sessions et les trier par date de session
                    if ($includeCourses) {
                        $courses = CourseRepository::findAllByCategoryIdWithSessions($category->id);
                        $node['courses'] = $courses;
                    } else {
                        $node['courses'] = [];
                    }
                    
                    $tree[] = $node;
                }
            }
            return $tree;
        };

        // Si un categoryId est fourni, retourner l'arbre à partir de cette catégorie
        if ($categoryId !== null) {
            $rootCategory = $categories->firstWhere('id', $categoryId);
            $childrenTree = isset($categoriesByParent[$categoryId]) ? $buildTree($categoryId) : [];

            if ($rootCategory) {
                $rootNode = $rootCategory->toArray();
                $rootNode['image'] = [
                    'id' => $rootCategory->image?->id,
                    'src' => $rootCategory->imagePath,
                ];
                $rootNode['children'] = $childrenTree;
                $rootNode['courses'] = $includeCourses ? CourseRepository::findAllByCategoryIdWithSessions($rootCategory->id) : [];

                return [$rootNode];
            }

            return $childrenTree;
        }

        // Sinon, retourner l'arbre complet à partir de la racine (parent_id = 0)
        return $buildTree(0);
    }

    /**
     * Récupère les IDs de tous les descendants d'une catégorie de manière récursive.
     *
     * @param int $categoryId
     * @return array
     */
    protected static function getDescendantIds(int $categoryId): array
    {
        $descendantIds = [];
        $categories = static::query()->select('id', 'parent_id')->get();

        $findDescendants = function ($parentId) use (&$findDescendants, $categories, &$descendantIds) {
            foreach ($categories as $category) {
                if ($category->parent_id == $parentId) {
                    $descendantIds[] = $category->id;
                    $findDescendants($category->id);
                }
            }
        };

        $findDescendants($categoryId);
        return $descendantIds;
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
            $isFeatured = $request->is_featured == '1' || $request->is_featured == 'on' || $request->is_featured === true;
        }

        $media = $request->hasFile('media') ? MediaRepository::storeByRequest(
            $request->file('media'),
            'category/image',
            MediaTypeEnum::IMAGE
        ) : null;

        return self::create([
            'title'       => $request->title,
            'slug'        => Str::slug($request->title),
            'media_id'    => $media ? $media->id : null,
            'parent_id'   => $request->parent_id ?? null,
            'is_featured' => $isFeatured,
            'color'       => $request->color ?? null,
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
            $isFeatured = $request->is_featured == '1' || $request->is_featured == 'on' || $request->is_featured === true;
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
            'title'       => $request->title ?? $category->title,
            'slug'        => $request->title ? Str::slug($request->title) : $category->slug,
            'media_id'    => $media ? $media->id : $category->media_id,
            'parent_id'   => $request->parent_id ?? $category->parent_id,
            'is_featured' => $isFeatured,
            'color'       => $request->color ?? $category->color,
        ]);
    }
}
