<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Show the categories index page.
     *
     * @param Request $request The incoming request with potential search parameters.
     * @return \Inertia\Response The Inertia response for the categories index page.
     */
    public function index(Request $request)
    {
        $search = $request->cat_search ? strtolower($request->cat_search) : null;
        $categories = CategoryRepository::findAll($search);

        $data = [
            'categories' => $categories,
            'filters'    => $request->only(['cat_search']),
        ];
        return Inertia::render('dashboard/categories/index', [
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created category in storage.
     *
     * @param  \App\Http\Requests\CategoryStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryStoreRequest $request)
    {
        CategoryRepository::storeByRequest($request);
        return back()->with('success', 'Category created');
    }

    public function update(CategoryUpdateRequest $request)
    {
        $category = CategoryRepository::query()->find($request->id);
        if (!$category) {
            return back()->withErrors('Category not found');
        }
        CategoryRepository::updateByRequest($request, $category);
        return back()->withSuccess('Category updated');
    }

    public function delete(int $id)
    {
        $category = CategoryRepository::query()->find($id);
        if (!$category) {
            return back()->withErrors('Category not found');
        }
        $category?->delete();
        return back()->withSuccess('Category deleted');
    }

    public function restore(int $id)
    {
        CategoryRepository::query()->onlyTrashed()->find($id)->restore();

        return redirect()->route('category.index')->withSuccess('Category restored');
    }

    public function sort(Request $request)
    {
        $sortedCategories = $request->input('sortedCategories');

        foreach ($sortedCategories as $categoryData) {
            Category::where('id', $categoryData['id'])
                ->update(['display_order' => $categoryData['display_order']]);
        }

        return response()->json(['success' => true]);
    }
}
