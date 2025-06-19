<?php

use App\Http\Controllers\Public\PublicController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "/"], function () {
    Route::get('', [PublicController::class, 'index'])->name('home');
    Route::get('about-us', [PublicController::class, 'aboutUs'])->name('aboutUs');
    Route::get('services', [PublicController::class, 'services'])->name('services');
    Route::get('faqs', [PublicController::class, 'faqs'])->name('faqs');
    Route::get('contact', [PublicController::class, 'contact'])->name('contact');
    Route::post('contact', [PublicController::class, 'contactSubmit'])->name('contact.post');
    Route::get('privacy-policy', [PublicController::class, 'privacyPolicy'])->name('privacyPolicy');
    Route::get('terms-of-service', [PublicController::class, 'termsOfService'])->name('termsOfService');

    Route::get('blogs', [PublicController::class, 'blogs'])->name('blogs');
    Route::get('blog/{blog_slug}', [PublicController::class, 'blogCategory'])->name('blogs.category');

    Route::get('careers', [PublicController::class, 'careers'])->name('careers');


    Route::get('formations', [PublicController::class, 'courses'])->name('courses');
    Route::get('formation/{category_slug}', [PublicController::class, 'courseCategory'])->name('courses.category');
    Route::get('formation/{categorySlug}/{courseSlug}', [PublicController::class, 'courseDetail'])->name('courses.detail');

    Route::get('consulting', [PublicController::class, 'consulting'])->name('consulting');
    Route::get('consulting/audit-of-maturity-of-tests', [PublicController::class, 'auditMaturity'])->name('consulting.audit');
    Route::get('consulting/consulting-testing', [PublicController::class, 'consultingTesting'])->name('consulting.testing');

    Route::get('services/test-outsourcing-services', [PublicController::class, 'serviceTestOutsourcingServices'])->name('services.test.outsourcing');
    Route::get('services/integration-of-specialists-on-your-premises-test-outsourcing-services', [PublicController::class, 'serviceIntegrationSpecialists'])->name('services.integration.specialists');

    // You can add more routes here for authenticated users
});
