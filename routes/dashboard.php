<?php

use App\Http\Controllers\Private\CategoryController;
use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\DashboardController;
use App\Http\Controllers\Private\FaqController;
use App\Http\Controllers\Private\SettingController;
use App\Http\Controllers\Private\TestimonialController;
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
    });
});
