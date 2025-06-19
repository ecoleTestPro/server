<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PublicAbstractController;
use App\Http\Requests\SettingUpdateRequest;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use App\Repositories\SettingRepository;
use App\Repositories\SocialMediaRepository;
use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PublicController extends PublicAbstractController
{

    private $default_data = [];

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }
    public function index()
    {
        $data = $this->default_data;
        $data['featured_courses'] = CourseRepository::getFeaturedCourses();

        // dd($featuredCourses);

        return Inertia::render('home', [
            'data' => $data,
        ]);
    }

    public function courses()
    {
        $data = $this->default_data;
        $data['category'] = CategoryRepository::findAll();
        $data['courses'] = CourseRepository::findAll();
        // dd($data['courses']);

        // dd($featuredCourses);

        return Inertia::render('public/courses/courses.page', [
            'data' => $data,
        ]);
    }

    /**
     * Affiche la liste des cours appartenant à une catégorie.
     * 
     * @param string $category_slug Slug de la catégorie
     * 
     * @return \Inertia\Response
     */
    public function courseCategory($category_slug)
    {
        try {
            $data = $this->default_data;
            $category = CategoryRepository::findBySlug($category_slug);
            // dd($category);
            if (!$category) {
                return redirect()->route('courses')->withErrors('Introuvable');
            }

            if ($category) {
                $category->children = CategoryRepository::getRecursiveTree(true, $category->id);
                $data['category'] = $category;
            }

            return Inertia::render('public/courses/course-category.page', [
                'data' => $data,
            ]);
        } catch (Exception $e) {
            Log::error("Error in courseCategory: {$e->getMessage()}");
            return redirect()->route('courses')->withErrors('Une erreur est survenue lors de la récupération des données.');
        }
    }

    public function courseDetail($categorySlug, $courseSlug)
    {
        try {
            $course = CourseRepository::findBySlug($courseSlug);
            // dd($course);
            if (!$course) {
                return redirect()->route('courses')->withErrors('Introuvable');
            }

            $data = $this->default_data;
            $category = CategoryRepository::findBySlug($categorySlug);

            $data['category'] = $category;
            $data['course'] = $course;

            return Inertia::render('public/courses/course-detail.page', [
                'data' => $data,
            ]);
        } catch (Exception $e) {
            dd($e);
            Log::error("Error in courseCategory: {$e->getMessage()}");
            return redirect()->route('courses')->withErrors('Une erreur est survenue lors de la récupération des données.');
        }
    }

    public function consulting()
    {
        $data =  $this->default_data;

        return Inertia::render('consulting', [
            'data' => $data,
        ]);
    }

    public function auditMaturity()
    {
        return Inertia::render('public/consulting/consulting-audit', [
            'data'  => $this->default_data,
        ]);
    }

    public function consultingTesting()
    {
        return Inertia::render('public/consulting/consulting-test', [
            'data'  => $this->default_data,
        ]);
    }

    public function serviceTestOutsourcingServices()
    {
        return Inertia::render('public/our-services/service-test-outsourcing', [
            'data'  => $this->default_data,
        ]);
    }

    public function serviceIntegrationSpecialists()
    {
        return Inertia::render('public/our-services/service-integration-specialists', [
            'data'  => $this->default_data,
        ]);
    }

    public function services()
    {
        // Services
        return view('services');
    }

    public function blogs()
    {
        // Blogs
        return view('blogs');
    }

    public function careers()
    {
        // Carrières
        return view('careers');
    }

    public function faqs()
    {
        return Inertia::render('public/faqs', [
            ...$this->default_data,
        ]);
    }


    public function aboutUs()
    {
        return Inertia::render('public/about-us', [
            ...$this->default_data,
        ]);
    }

    public function contact()
    {
        return Inertia::render('public/contact-us', [
            ...$this->default_data,
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


        // For now, we just redirect back with a success message
        // In a real application, you would send an email or save the message to the database
        return back()->withSuccess('Your message has been sent successfully. We will get back to you soon.');
        // Here you would typically handle the contact form submission,
        // such as sending an email or saving the message to the database.
        // For now, we just redirect back with a success message.
    }

    public function privacyPolicy()
    {
        return Inertia::render('public/cgu/privacy-policy', [
            ...$this->default_data,
        ]);
    }

    public function termsOfService()
    {
        return Inertia::render('public/cgu/terms', [
            ...$this->default_data,
        ]);
    }

    public function update(SettingUpdateRequest $request)
    {
        $setting = SettingRepository::query()->first();

        SettingRepository::updateByRequest($request, $setting);

        $this->setEnv('APP_NAME', $request->get('app_name'));
        $this->setEnv('APP_CURRENCY', $request->get('app_currency'));
        $this->setEnv('APP_CURRENCY_SYMBOL', $request->get('app_currency_symbol'));
        $this->setEnv('APP_TIMEZONE', $request->get('app_timezone'));
        $this->setEnv('APP_MINIMUM_AMOUNT', $request->get('app_minimum_amount'));
        $this->setEnv('MAIL_HOST', $request->get('mail_host'));
        $this->setEnv('MAIL_PORT', $request->get('mail_port'));
        $this->setEnv('MAIL_USERNAME', $request->get('mail_user'));
        $this->setEnv('MAIL_PASSWORD', $request->get('mail_password'));
        $this->setEnv('MAIL_ENCRYPTION', $request->get('mail_encryption'));
        $this->setEnv('MAIL_FROM_ADDRESS', $request->get('mail_address'));
        $this->setEnv('MAIL_FROM_NAME', $request->get('mail_from_name'));
        $this->setEnv('JWT_SECRET', $request->get('jwt_secret'));

        $medias = $request->social_links;

        foreach ($medias as $id => $url) {
            SocialMediaRepository::query()->updateOrCreate(
                ['id' => $id],
                [
                    'url' => $url,
                    'status' => $url ? true : false,
                ],
            );
        };




        Artisan::call('config:clear');

        return to_route('setting.index')->withSuccess('Settings updated');
    }

    protected function setEnv($key, $value): bool
    {
        try {
            $path = base_path('.env');
            $file = file($path); // Open File Line By line
            $diffFileLines = array_diff($file, ["\n"]); // Remove all empty lines

            $exists = false;
            foreach ($diffFileLines as $lineNo => $oldValue) {
                if (strpos($oldValue, $key . '=') !== false) {
                    $file[$lineNo] = $key . '="' . $value . '"' . "\n";
                    $exists = true;
                }
            }
            if (!$exists) {
                $file[] = $key . '="' . $value . '"' . "\n";
            }

            file_put_contents($path, implode('', $file));

            return true;
        } catch (Exception $e) {
            // Log or report the exception
            Log::error("Error updating environment variable: {$e->getMessage()}");
            return false;
        }
    }
}
