<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\PartnerStoreRequest;
use App\Http\Requests\PartnerUpdateRequest;
use App\Models\Partner;
use App\Repositories\PartnerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;

        $partners = PartnerRepository::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->with('media')
            ->withTrashed()
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        $data = [
            'partners' => $partners,
        ];

        return Inertia::render('dashboard/partners/index', [
            'data' => $data,
        ]);
    }

    public function store(PartnerStoreRequest $request)
    {
        if (app()->isLocal()) {
            return to_route('dashboard.partners.index')->with('error', 'Partner not created in demo mode');
        }

        PartnerRepository::storeByRequest($request);

        return to_route('dashboard.partners.index')->withSuccess('Partner created successfully.');
    }

    public function update(PartnerUpdateRequest $request, Partner $partner)
    {
        PartnerRepository::updateByRequest($request, $partner);
        return to_route('dashboard.partners.index')->withSuccess('Partner updated successfully.');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();
        $partner->is_active = false;
        $partner->save();
        return to_route('dashboard.partners.index')->withSuccess('Partner deleted successfully.');
    }

    public function restore($partner)
    {
        PartnerRepository::query()->withTrashed()->find($partner)->restore();
        return to_route('dashboard.partners.index')->withSuccess('Partner restored successfully.');
    }
}
