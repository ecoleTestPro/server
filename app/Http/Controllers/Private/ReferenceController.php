<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenceStoreRequest;
use App\Http\Requests\ReferenceUpdateRequest;
use App\Models\Reference;
use App\Repositories\ReferenceRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferenceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;

        $references = ReferenceRepository::query()
            ->when($search, function ($query) use ($search) {
                $query->where('text', 'like', '%' . $search . '%');
            })
            ->with('media')
            ->withTrashed()
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $data = [
            'references' => $references,
        ];

        return Inertia::render('dashboard/references/index', [
            'data' => $data,
        ]);
    }

    public function store(ReferenceStoreRequest $request)
    {
        if (app()->isLocal()) {
            return to_route('dashboard.references.index')->with('error', 'Reference not created in demo mode');
        }

        ReferenceRepository::storeByRequest($request);

        return to_route('dashboard.references.index')->withSuccess('Reference created successfully.');
    }

    public function update(ReferenceUpdateRequest $request, Reference $reference)
    {
        ReferenceRepository::updateByRequest($request, $reference);
        return to_route('dashboard.references.index')->withSuccess('Reference updated successfully.');
    }

    public function destroy(Reference $reference)
    {
        $reference->delete();
        $reference->is_active = false;
        $reference->save();
        return to_route('dashboard.references.index')->withSuccess('Reference deleted successfully.');
    }

    public function restore($reference)
    {
        ReferenceRepository::query()->withTrashed()->find($reference)->restore();
        return to_route('dashboard.references.index')->withSuccess('Reference restored successfully.');
    }
}
