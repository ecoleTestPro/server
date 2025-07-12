<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PublicAbstractController;
use App\Http\Requests\SettingUpdateRequest;
use App\Repositories\BlogCategoryRepository;
use App\Repositories\BlogRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use App\Repositories\ReferenceRepository;
use App\Repositories\SettingRepository;
use App\Repositories\SocialMediaRepository;
use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\json;

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
        $data['popular_courses'] = CourseRepository::getPopularCourses();

        // dd($data);
        return Inertia::render('home', [
            'data' => $data,
        ]);
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
        $data = $this->default_data;
        $data['references'] = ReferenceRepository::query()
            ->where('is_active', true)
            ->where('tag', 'audit-conseil')
            ->with('media')
            ->get();

        return Inertia::render('public/consulting/consulting-audit', [
            'data'  => $data,
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
        $data = $this->default_data;

        return Inertia::render('public/services', [
            'data' => $data,
        ]);
    }

    public function blogs()
    {
        $data = $this->default_data;
        $data['blogs']['list'] = BlogRepository::getPublished(100);
        $data['blogs']['categories'] = BlogCategoryRepository::query()->get();
        return Inertia::render('public/blogs/blogs', [
            'data'  => $data,
        ]);
    }

    public function blogDetail(string $slug)
    {
        $data = $this->default_data;
        $blog = BlogRepository::findBySlug($slug);

        $data['blogs']['single'] = $blog;
        $data['blogs']['list'] = BlogRepository::getPublished(5);
        $data['blogs']['categories'] = BlogCategoryRepository::query()->get();

        return Inertia::render('public/blogs/blogDetail', [
            'data' => $data,
        ]);
    }

    public function careers()
    {
        $data = $this->default_data;
        return Inertia::render('public/careers/careers', [
            'data' => $data,
        ]);
    }

    public function faqs()
    {
        return Inertia::render('public/faqs', [
            ...$this->default_data,
        ]);
    }


    public function aboutUs()
    {
        $data = $this->default_data;
        return Inertia::render('public/about-us', [
            'data' => $data,
        ]);
    }

    public function reconversionMetier()
    {
        $data = $this->default_data;
        return Inertia::render('public/reconversion-metier', [
            'data' => $data,
        ]);
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
