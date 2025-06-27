<?php

use App\Http\Controllers\Public\EnrollController;
use App\Http\Controllers\Public\PublicController;
use Illuminate\Support\Facades\Route;


/**
 * Public routes
 * These routes are accessible without authentication.
 * They are used for static pages, courses, blogs, etc.
 */
Route::group(["prefix" => "/"], function () {

    /**
     * Static pages
     */
    Route::get('', [PublicController::class, 'index'])->name('home');
    Route::get('about-us', [PublicController::class, 'aboutUs'])->name('aboutUs');
    Route::get('services', [PublicController::class, 'services'])->name('services');
    Route::get('faqs', [PublicController::class, 'faqs'])->name('faqs');
    Route::get('contact', [PublicController::class, 'contact'])->name('contact');
    Route::post('contact', [PublicController::class, 'contactSubmit'])->name('contact.post');
    Route::get('privacy-policy', [PublicController::class, 'privacyPolicy'])->name('privacyPolicy');
    Route::get('terms-of-service', [PublicController::class, 'termsOfService'])->name('termsOfService');

    /**
     * Consulting routes
     */
    Route::get('consulting',                            [PublicController::class, 'consulting'])->name('consulting');
    Route::get('consulting/audit-of-maturity-of-tests', [PublicController::class, 'auditMaturity'])->name('consulting.audit');
    Route::get('consulting/consulting-testing',         [PublicController::class, 'consultingTesting'])->name('consulting.testing');

    /**
     * Services routes
     * These routes handle the display of various services offered.
     * They are used to showcase the services and provide details about each service.
     * The routes are named for easy reference in the application.
     */
    Route::get('services/test-outsourcing-services', [PublicController::class, 'serviceTestOutsourcingServices'])->name('services.test.outsourcing');
    Route::get('services/integration-of-specialists-on-your-premises-test-outsourcing-services', [PublicController::class, 'serviceIntegrationSpecialists'])->name('services.integration.specialists');

    /**
     * Blog routes
     */
    Route::get('blogs', [PublicController::class, 'blogs'])->name('blogs');
    Route::get('blog/{blog_slug}', [PublicController::class, 'blogCategory'])->name('blogs.category');

    /**
     * Careers routes
     */
    Route::get('careers', [PublicController::class, 'careers'])->name('careers');
    Route::get('job/{job_slug}', [PublicController::class, 'jobDetail'])->name('job.detail');

    /**
     * Search functionality
     * This route handles search queries for blogs, courses, etc.
     */
    Route::post('search', [PublicController::class, 'search'])->name('search');

    /** 
     * formation routes
     * These routes handle course listings, categories, and details.
     * They are used to display courses, allow enrollment, and provide course details.
     */
    Route::get('formations',                            [PublicController::class, 'courses'])->name('courses');
    Route::get('formation/{category_slug}',             [PublicController::class, 'courseCategory'])->name('courses.category');
    Route::get('formation/{categorySlug}/{courseSlug}', [PublicController::class, 'courseDetail'])->name('courses.detail');
    Route::post('formation/enrollment',                 [EnrollController::class, 'registerEnrollment'])->name('course.enrollment');
});
