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
    /**
     * Display a listing of the blogs.
     *
     * This method initializes a query to retrieve all blog entries,
     * orders them by the latest 'id', and passes the data to the
     * 'dashboard/blogs/index' view using Inertia.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $data = [];
        $data['blogs']['list'] = BlogRepository::getAllBlogs();
        $data['blogs']['categories'] = BlogCategoryRepository::query()->get();

        return Inertia::render('dashboard/blogs/index', [
            'data' => $data,
        ]);
    }

    /**
     * Show the form for creating a new blog.
     *
     * This method retrieves all blog categories from the repository 
     * and passes them to the 'dashboard/blogs/create' view using Inertia.
     *
     * @return \Inertia\Response
     */
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
        try {
            $created = BlogRepository::storeByRequest($request);
            if (!$created) {
                return response()->json(['message' => 'Error creating blog'], 500);
            }
            return response()->json(['message' => 'Blog created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating blog: ' . $e->getMessage()], 500);
        }
    }

    public function edit(string $slug)
    {
        $blog = BlogRepository::initQuery()->where('slug', $slug)->firstOrFail();

        if (!$blog) {
            return redirect()->back()->withError('Blog introuvable');
        }

        $data['blogs']['single'] = $blog;
        $data['blogs']['categories'] = BlogCategoryRepository::query()->get();

        return Inertia::render('dashboard/blogs/create', [
            'data' => $data,
        ]);
    }

    public function update(BlogUpdateRequest $request)
    {
        try {
            $blog = Blog::findOrFail($request->blog);
            $updated = BlogRepository::updateByRequest($request, $blog);
            if (!$updated) {
                return response()->json(['message' => 'Error updating blog'], 500);
            }
            return response()->json(['message' => 'Blog updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating blog: ' . $e->getMessage()], 500);
        }
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
