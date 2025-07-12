<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogCategoryStoreRequest;
use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;

class BlogCategoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\BlogCategoryStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogCategoryStoreRequest $request)
    {
        $category = BlogCategoryRepository::storeByRequest($request);
        if ($category) {
            return response()->json([
                'success' => true,
                'message' => 'Catégorie de blog créée avec succès',
                'data' => $category
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Échec de la création de la catégorie de blog'
        ], 500);
    }

    public function delete(int $id)
    {
        $blog = BlogRepository::query()->findOrFail($id);
        if ($blog) {
            $blog->delete();
            return redirect()->back()->withSuccess('Blog supprimé avec succès');
        }

        return redirect()->back()->withError('Blog introuvable');
    }
}
