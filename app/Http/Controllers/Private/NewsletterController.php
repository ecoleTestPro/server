<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsletterStoreRequest;
use App\Models\Newsletter;
use App\Repositories\NewsletterRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;

        $newsletters = NewsletterRepository::query()
            ->when($search, fn($query) => $query->where('email', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $data = [
            'newsletters' => $newsletters,
        ];

        return Inertia::render('dashboard/newsletters/index', [
            'data' => $data,
        ]);
    }

    public function store(NewsletterStoreRequest $request)
    {
        NewsletterRepository::storeByRequest($request);

        return to_route('dashboard.newsletters.index')->withSuccess('Newsletter created successfully.');
    }

    public function destroy(Newsletter $newsletter)
    {
        $newsletter->delete();
        return to_route('dashboard.newsletters.index')->withSuccess('Newsletter deleted successfully.');
    }
}
