<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PublicAbstractController;
use App\Http\Requests\SettingUpdateRequest;
use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use App\Repositories\SettingRepository;
use App\Repositories\SocialMediaRepository;
use App\Mail\ContactFormMail;
use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactUsController extends PublicAbstractController
{
    private $default_data = [];

    // private $email = 'info@ecoletestpro.com';
    private $email = 'keraste38@gmail.com';

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }

    public function contact()
    {
        $data = $this->default_data;
        return Inertia::render('public/contact-us', [
            'data' => $data,
        ]);
    }

    public function contactSubmit(Request $request)
    {
        // Handle the contact form submission
        // Validate the request data
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName'  => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'phone'     => 'required|string|max:255',
            'subject'   => 'required|string|max:225',
            'message'   => 'required|string|max:1000',
            'civility'  => 'required|in:mr,mme,mlle',
            'company'   => 'nullable|string|max:255',
        ]);

        try {
            // Envoyer l'e-mail
            Mail::to($this->email)->send(new ContactFormMail(
                $validated['firstName'],
                $validated['lastName'],
                $validated['email'],
                $validated['phone'],
                $validated['subject'],
                $validated['message'],
                $validated['civility'],
                $validated['company']
            ));

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès.',
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors de l\'envoi de l\'e-mail de contact: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer plus tard.',
            ], 500);
        }
    }
}
