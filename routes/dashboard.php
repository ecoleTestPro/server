<?php

use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\PrivateController;
use Illuminate\Support\Facades\Route;

/***
 * * Dashboard Routes
 */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [PrivateController::class, 'index'])->name('dashboard.index');

    Route::group([
        'prefix' => 'courses',
    ], function () {
        Route::get('', [PrivateController::class, 'index'])->name('dashboard.index');
        Route::get('create', [CourseController::class, 'create'])->name('course.create');
    });
});
