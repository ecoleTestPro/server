<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobApplicationStoreRequest;
use App\Mail\JobApplicationMail;
use App\Models\JobOffer;
use App\Repositories\JobOfferRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PublicJobController extends Controller
{
    private string $email;

    public function __construct()
    {
        $this->email = env('CONTACT_EMAIL', 'contact@example.com');
    }

    public function list()
    {
        $offers = JobOfferRepository::query()
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>=', now());
            })
            ->latest('id')
            ->get();
        $data['job_offers'] = $offers;
        return Inertia::render('public/careers/careers', [
            'data' => $data,
        ]);
    }

    public function apply(JobApplicationStoreRequest $request)
    {
        try {
            Mail::to($this->email)->send(new JobApplicationMail(
                $request->name,
                $request->job_offer_id,
                $request->file('cv')
            ));

            return redirect()->back()->with('success', 'Application sent');
        } catch (\Exception $e) {
            Log::error('Job application email error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to send application');
        }
    }
}
