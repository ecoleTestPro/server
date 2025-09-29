<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PublicAbstractController;
use App\Http\Requests\JobApplicationStoreRequest;
use App\Mail\JobApplicationMail;
use App\Models\JobOffer;
use App\Repositories\JobOfferRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PublicJobController extends PublicAbstractController
{
    private string $email;
    private $default_data = [];

    public function __construct()
    {
        $this->email = env('CONTACT_EMAIL', 'contact@example.com');
        $this->default_data = $this->getDefaultData();
    }

    public function list()
    {
        $data = $this->default_data;
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
            // Récupérer les détails de l'offre d'emploi
            $jobOffer = JobOffer::findOrFail($request->job_offer_id);

            Mail::to($this->email)->send(new JobApplicationMail(
                $request->name,
                $request->email,
                $request->phone,
                $jobOffer,
                $request->file('cv')
            ));

            return response()->json(['message' => 'Application sent successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Job application email error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send application'], 500);
        }
    }
}
