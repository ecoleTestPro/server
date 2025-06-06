<?php

use App\Http\Controllers\Private\CategoryController;
use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\SettingController;

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

/***
 * * Dashboard Routes
 */

Route::middleware(['auth', 'verified'])->group(function () {
    // DASHBOARD HOME
    Route::get('dashboard', [CourseController::class, 'index'])->name('dashboard.index');


    // COURSE MANAGEMENT
    Route::group([
        'prefix' => 'courses',
    ], function () {
        Route::get('', [CourseController::class, 'index'])->name('dashboard.index');
        Route::get('create', [CourseController::class, 'create'])->name('course.create');
        Route::post('create', [CourseController::class, 'store'])->name('course.store');
    });

    // CATEGORY COURSE MANAGEMENT
    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('', [CategoryController::class, 'index'])->name('category.index');
        Route::get('create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('store', [CategoryController::class, 'store'])->name('category.store');
        Route::post('update', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('category.delete');
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
});
