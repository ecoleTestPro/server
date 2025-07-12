<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobApplicationStoreRequest;
use App\Models\JobOffer;
use App\Repositories\JobApplicationRepository;
use App\Repositories\JobOfferRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicJobController extends Controller
{
    public function list()
    {
        $offers = JobOfferRepository::query()->where('is_active', true)->latest('id')->get();
        $data['job_offers'] = $offers;
        return Inertia::render('public/careers/careers', [
            'data' => $data,
        ]);
    }

    public function apply(JobApplicationStoreRequest $request)
    {
        JobApplicationRepository::storeByRequest($request);
        return redirect()->back()->withSuccess('Application sent');
    }
}
