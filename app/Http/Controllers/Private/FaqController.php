<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\FaqStoreRequest;
use App\Http\Requests\FaqUpdateRequest;
use App\Models\Faq;
use App\Repositories\FaqRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->cat_search ? strtolower($request->cat_search) : null;

        $faqs = FaqRepository::query()->when($search, function ($query) use ($search) {
            $query->where('question', 'like', '%' . $search . '%');
        })->withTrashed()->latest('id')->paginate(15)->withQueryString();

        $data = [
            'faqs' => $faqs,
        ];

        return Inertia::render('dashboard/faqs/index', [
            'data' => $data,
        ]);
    }

    public function store(FaqStoreRequest $request)
    {
        if (app()->isLocal()) {
            return to_route('dashboard.faqs.index')->with('error', 'Faq not created in demo mode');
        }

        FaqRepository::storeByRequest($request);

        return to_route('dashboard.faqs.index')->withSuccess('Faq created successfully.');
    }

    public function update(FaqUpdateRequest $request, Faq $faq)
    {
        FaqRepository::updateByRequest($request, $faq);
        return to_route('dashboard.faqs.index')->withSuccess('Faq updated successfully.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        $faq->is_active = false;
        $faq->save();
        return to_route('dashboard.faqs.index')->withSuccess('Faq deleted successfully.');
    }

    public function restore($faq)
    {
        FaqRepository::query()->withTrashed()->find($faq)->restore();
        return to_route('dashboard.faqs.index')->withSuccess('Faq restored successfully.');
    }
}
