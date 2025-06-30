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
use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\json;

class ContactUsController extends PublicAbstractController
{

    private $default_data = [];

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

    public function contactSubmit()
    {
        // Handle the contact form submission
        // Validate the request data
        request()->validate([
            'firstName' => 'required|string|max:255',
            'lastName'  => 'required|string|max:255',
            'email'     => 'required|email|max:255',
            'phone'     => 'required|string|max:255',
            'subject'   => 'required|string|max:225',
            'message'   => 'required|string|max:1000',
        ]);

        // Here you would typically handle the contact form submission,
        // such as sending an email or saving the message to the database.  


        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès.',
        ]);
    }
}
