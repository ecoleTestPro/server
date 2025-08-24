<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\PartnerStoreRequest;
use App\Http\Requests\PartnerUpdateRequest;
use App\Models\Partner;
use App\Repositories\PartnerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferenceController extends Controller
{
    /**
     * Get all references with their media.
     *
     * @param  Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $references = PartnerRepository::allWithMedia();
        $data = [
            'references' => $references,
        ];

        return Inertia::render('dashboard/references/index', [
            'data' => $data,
        ]);
    }

    public function store(PartnerStoreRequest $request)
    {
        $request->merge(['is_reference' => true]);

        $reference = PartnerRepository::storeByRequest($request);
        $reference->load('media'); // Charger la relation media

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Reference created successfully.',
                'reference' => $reference
            ], 201);
        }

        return to_route('dashboard.references.index')->withSuccess('Reference created successfully.');
    }

    public function update(PartnerUpdateRequest $request, Partner $reference)
    {
        $request->merge(['is_reference' => true]);

        $updatedReference = PartnerRepository::updateByRequest($request, $reference);
        $updatedReference->load('media');

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Reference updated successfully.',
                'reference' => $updatedReference
            ], 200);
        }

        return to_route('dashboard.references.index')->withSuccess('Reference updated successfully.');
    }

    public function destroy(Partner $reference)
    {
        $reference->delete();
        $reference->is_active = false;
        $reference->save();
        return to_route('dashboard.references.index')->withSuccess('Reference deleted successfully.');
    }

    public function restore($reference)
    {
        PartnerRepository::query()->withTrashed()->find($reference)->restore();
        return to_route('dashboard.references.index')->withSuccess('Reference restored successfully.');
    }
}
