<?php

namespace App\Http\Controllers\Private;

use App\Enum\MediaTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\BlogStoreRequest;
use App\Http\Requests\BlogUpdateRequest;
use App\Http\Requests\UserStoreRequest;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $data = [];
        $data['blogs']['list'] = BlogRepository::initQuery()->latest('id')->get();

        return Inertia::render('dashboard/blogs/index', [
            'data' => $data,
        ]);
    }

    public function create()
    {
        $data = [];
        $data['blogs']['categories'] = BlogCategoryRepository::query()->get();

        return Inertia::render('dashboard/blogs/create', [
            "data" => $data
        ]);
    }

    public function store(BlogStoreRequest $request)
    {
        $blog = BlogRepository::storeByRequest($request);

        return to_route('blog.index')->withSuccess('Blog created');
    }

    public function edit(string $slug)
    {
        $blog = BlogRepository::initQuery()->where('slug', $slug)->firstOrFail();
        // dd($blog);
        if (!$blog) {
            return redirect()->back()->withError('Blog introuvable');
        }

        $data['blogs']['single'] = $blog;

        return Inertia::render('dashboard/blogs/create', [
            'data' => $data,
        ]);
    }

    public function update(BlogUpdateRequest $request, Blog $blog)
    {
        BlogRepository::updateByRequest($request, $blog);
        return to_route('blog.index')->withSuccess('Blog updated');
    }

    /**
     * Delete a blog entry by its ID.
     *
     * @param int $id The ID of the blog to be deleted.
     * @return \Illuminate\Http\RedirectResponse Redirects back with a success message if deleted,
     *                                           or an error message if the blog is not found.
     */
    public function delete(int $id)
    {
        $blog = BlogRepository::query()->findOrFail($id);
        if ($blog) {
            $blog->delete();
            return redirect()->back()->withSuccess('Blog supprimé avec succès');
        }

        return redirect()->back()->withError('Blog introuvable');
    }


    public function restore(int $id)
    {
        BlogRepository::query()->onlyTrashed()->find($id)->restore();

        return redirect()->route('blog.index')->withSuccess('Blog restored');
    }
}
