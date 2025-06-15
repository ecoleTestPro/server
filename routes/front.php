<?php

use App\Http\Controllers\Public\PublicController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "/"], function () {
    Route::get('', [PublicController::class, 'index'])->name('home');
    Route::get('about-us', [PublicController::class, 'aboutUs'])->name('aboutUs');
    Route::get('courses', [PublicController::class, 'courses'])->name('courses');
    Route::get('courses/{categoryId}', [PublicController::class, 'courseCategory'])->name('courses.category');
    Route::get('courses/{categoryId}/courses/{courseId}', [PublicController::class, 'courseDetail'])->name('courses.detail');
    Route::get('consulting', [PublicController::class, 'consulting'])->name('consulting');
    Route::get('consulting/audit-of-maturity-of-tests', [PublicController::class, 'auditMaturity'])->name('consulting.audit');
    Route::get('consulting/consulting-testing', [PublicController::class, 'consultingTesting'])->name('consulting.testing');
    Route::get('services', [PublicController::class, 'services'])->name('services');
    Route::get('blogs', [PublicController::class, 'blogs'])->name('blogs');
    Route::get('careers', [PublicController::class, 'careers'])->name('careers');
    Route::get('faqs', [PublicController::class, 'faqs'])->name('faqs');
    Route::get('contact', [PublicController::class, 'contact'])->name('contact');
    Route::post('contact', [PublicController::class, 'contactSubmit'])->name('contact.post');
    Route::get('privacy-policy', [PublicController::class, 'privacyPolicy'])->name('privacyPolicy');
    Route::get('terms-of-service', [PublicController::class, 'termsOfService'])->name('termsOfService');

    // You can add more routes here for authenticated users
});
