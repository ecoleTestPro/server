<?php

use App\Http\Controllers\Private\BlogCategoryController;
use App\Http\Controllers\Private\BlogController;
use App\Http\Controllers\Private\CategoryController;
use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\DashboardController;
use App\Http\Controllers\Private\FaqController;
use App\Http\Controllers\Private\NewsletterController;
use App\Http\Controllers\Private\SettingController;
use App\Http\Controllers\Private\TestimonialController;
use App\Http\Controllers\Private\ReferenceController;
use App\Http\Controllers\Private\PartnerController;
use App\Http\Controllers\Private\JobOfferController;
use App\Http\Controllers\Private\EnrollmentController;
use App\Http\Controllers\Private\NotificationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

/***
 * * Dashboard Routes
 */

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    // DASHBOARD HOME
    Route::get('', [DashboardController::class, 'index'])->name('dashboard.index');

    // NOTIFICATIONS
    Route::get('notifications', [NotificationController::class, 'index'])->name('dashboard.notifications.index');


    // COURSE MANAGEMENT
    Route::group([
        'prefix' => 'courses',
    ], function () {
        Route::get('',                  [CourseController::class, 'index'])->name('dashboard.course.index');
        Route::get('all',               [CourseController::class, 'allCourses'])->name('dashboard.course.all');
        Route::get('edit/{slug}',       [CourseController::class, 'create'])->name('dashboard.course.edit');
        Route::get('create',            [CourseController::class, 'create'])->name('dashboard.course.create');
        Route::post('create',           [CourseController::class, 'store'])->name('dashboard.course.store');
        Route::put('update/{slug}',     [CourseController::class, 'update'])->name('dashboard.course.update');
        Route::delete('delete/{id}',    [CourseController::class, 'delete'])->name('dashboard.course.delete');
    });

    // CATEGORY COURSE MANAGEMENT
    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('',                     [CategoryController::class, 'index'])->name('dashboard.category.index');
        Route::get('create',               [CategoryController::class, 'create'])->name('dashboard.category.create');
        Route::post('store',               [CategoryController::class, 'store'])->name('dashboard.category.store');
        Route::post('update',              [CategoryController::class, 'update'])->name('dashboard.category.update');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('dashboard.category.delete');
    });

    // ENROLLMENTS MANAGEMENT
    Route::group([
        'prefix' => 'enrollments',
    ], function () {
        Route::get('', [EnrollmentController::class, 'index'])->name('dashboard.enrollment.index');
        Route::delete('delete/{enrollment}', [EnrollmentController::class, 'destroy'])->name('dashboard.enrollment.delete');
    });


    // APP SETTINGS 
    Route::group([
        'prefix' => 'settings',
    ], function () {
        Route::get('', [SettingController::class, 'index'])->name('settings.app.index');

        // Route::redirect('', 'dashboard/settings/profile');

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('appearance', function () {
            return Inertia::render('dashboard/settings/user/appearance');
        })->name('appearance');

        // APP SETTINGS
        Route::group([
            'prefix' => 'app',
        ], function () {
            // Route::get('', [SettingController::class, 'index'])->name('settings.app.index');
            // Route::patch('settings', [SettingsController::class, 'update'])->name('settings.update');
        });
    });

    // Blogs
    Route::group([
        'prefix' => 'blogs',
    ], function () {
        Route::get('', [BlogController::class, 'index'])->name('dashboard.blogs.index');
        Route::get('create', [BlogController::class, 'create'])->name('dashboard.blogs.create');
        Route::get('edit/{slug}', [BlogController::class, 'edit'])->name('dashboard.blogs.edit');
        Route::post('store', [BlogController::class, 'store'])->name('dashboard.blogs.store');
        Route::post('update', [BlogController::class, 'update'])->name('dashboard.blogs.update');
        Route::delete('delete/{id}', [BlogController::class, 'delete'])->name('dashboard.blogs.delete');
        Route::post('category/create', [BlogCategoryController::class, 'store'])->name('dashboard.blogs.category.store');
    });

    // TESTIMONIALS
    Route::group([
        'prefix' => 'testimonials',
    ], function () {
        Route::get('',               [TestimonialController::class, 'index'])->name('dashboard.testimonial.index');
        Route::get('create',         [TestimonialController::class, 'create'])->name('dashboard.testimonial.create');
        Route::get('edit/{slug}',    [TestimonialController::class, 'edit'])->name('dashboard.testimonial.edit');
        Route::post('create',        [TestimonialController::class, 'store'])->name('dashboard.testimonial.store');
        Route::put('update/{testimonial}', [TestimonialController::class, 'update'])->name('dashboard.testimonial.update');
        Route::delete('delete/{testimonial}', [TestimonialController::class, 'destroy'])->name('dashboard.testimonial.delete');
        Route::post('restore/{testimonial}', [TestimonialController::class, 'restore'])->name('dashboard.testimonial.restore');
    });


    // FAQS
    Route::group([
        'prefix' => 'faqs',
    ], function () {
        Route::get('',               [FaqController::class, 'index'])->name('dashboard.faqs.index');
        Route::post('create',        [FaqController::class, 'store'])->name('dashboard.faqs.store');
        Route::put('update/{faq}',   [FaqController::class, 'update'])->name('dashboard.faqs.update');
        Route::delete('delete/{faq}', [FaqController::class, 'destroy'])->name('dashboard.faqs.delete');
        Route::post('restore/{faq}', [FaqController::class, 'restore'])->name('dashboard.faqs.restore'); 
    });

    // REFERENCES
    Route::group([
        'prefix' => 'references',
    ], function () {
        Route::get('',               [ReferenceController::class, 'index'])->name('dashboard.references.index');
        Route::post('create',        [ReferenceController::class, 'store'])->name('dashboard.references.store');
        Route::put('update/{reference}', [ReferenceController::class, 'update'])->name('dashboard.references.update');
        Route::delete('delete/{reference}', [ReferenceController::class, 'destroy'])->name('dashboard.references.delete');
        Route::post('restore/{reference}', [ReferenceController::class, 'restore'])->name('dashboard.references.restore');
    });

    // JOB OFFERS
    Route::group([
        'prefix' => 'job-offers',
    ], function () {
        Route::get('', [JobOfferController::class, 'index'])->name('dashboard.job-offers.index');
        Route::post('create', [JobOfferController::class, 'store'])->name('dashboard.job-offers.store');
        Route::put('update/{jobOffer}', [JobOfferController::class, 'update'])->name('dashboard.job-offers.update');
        Route::delete('delete/{jobOffer}', [JobOfferController::class, 'destroy'])->name('dashboard.job-offers.delete');
        Route::post('restore/{jobOffer}', [JobOfferController::class, 'restore'])->name('dashboard.job-offers.restore');
        Route::post('toggle/{jobOffer}', [JobOfferController::class, 'toggle'])->name('dashboard.job-offers.toggle');
    });

    // PARTNERS
    Route::group([
        'prefix' => 'partners',
    ], function () {
        Route::get('',               [PartnerController::class, 'index'])->name('dashboard.partners.index');
        Route::post('create',        [PartnerController::class, 'store'])->name('dashboard.partners.store');
        Route::put('update/{partner}', [PartnerController::class, 'update'])->name('dashboard.partners.update');
        Route::delete('delete/{partner}', [PartnerController::class, 'destroy'])->name('dashboard.partners.delete');
        Route::post('restore/{partner}', [PartnerController::class, 'restore'])->name('dashboard.partners.restore');
    });

    // NEWSLETTERS
    Route::group([
        'prefix' => 'newsletters',
    ], function () {
        Route::get('', [\App\Http\Controllers\Private\NewsletterController::class, 'index'])->name('dashboard.newsletters.index');
        Route::post('create', [\App\Http\Controllers\Private\NewsletterController::class, 'store'])->name('dashboard.newsletters.store');
        Route::delete('delete/{newsletter}', [\App\Http\Controllers\Private\NewsletterController::class, 'destroy'])->name('dashboard.newsletters.delete');
    });

    // NEWSLETTERS
    Route::group([
        'prefix' => 'newsletters',
    ], function () {
        Route::get('', [NewsletterController::class, 'index'])->name('dashboard.newsletter.index');
        Route::post('send', [NewsletterController::class, 'send'])->name('dashboard.newsletter.send');
    });
});
