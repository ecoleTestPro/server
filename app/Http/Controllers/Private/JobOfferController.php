<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobOfferStoreRequest;
use App\Http\Requests\JobOfferUpdateRequest;
use App\Models\JobOffer;
use App\Repositories\JobOfferRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobOfferController extends Controller
{
    public function index(Request $request)
    {
        $offers = JobOfferRepository::query()->withTrashed()->latest('id')->get();
        $data = [
            'offers' => $offers,
        ];
        return Inertia::render('dashboard/job-offers/index', [
            'data' => $data,
        ]);
    }

    public function store(JobOfferStoreRequest $request)
    {
        JobOfferRepository::storeByRequest($request);
        return redirect()->back()->withSuccess('Offer created');
    }

    public function update(JobOfferUpdateRequest $request, JobOffer $jobOffer)
    {
        JobOfferRepository::updateByRequest($request, $jobOffer);
        return redirect()->back()->withSuccess('Offer updated');
    }

    public function destroy(JobOffer $jobOffer)
    {
        $jobOffer->delete();
        $jobOffer->is_active = false;
        $jobOffer->save();
        return redirect()->back()->withSuccess('Offer deleted');
    }

    public function restore($id)
    {
        JobOfferRepository::query()->withTrashed()->find($id)->restore();
        return redirect()->back()->withSuccess('Offer restored');
    }

    public function toggle(JobOffer $jobOffer)
    {
        $jobOffer->is_active = !$jobOffer->is_active;
        $jobOffer->save();
        return redirect()->back();
    }
}
