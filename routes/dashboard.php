<?php

use App\Http\Controllers\Private\CategoryController;
use App\Http\Controllers\Private\CourseController;
use App\Http\Controllers\Private\PrivateController;
use Illuminate\Support\Facades\Route;

/***
 * * Dashboard Routes
 */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [CourseController::class, 'index'])->name('dashboard.index');


    Route::group([
        'prefix' => 'courses',
    ], function () {
        Route::get('', [CourseController::class, 'index'])->name('dashboard.index');
        Route::get('create', [CourseController::class, 'create'])->name('course.create');
        Route::post('create', [CourseController::class, 'store'])->name('course.store');
    });

    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('', [CategoryController::class, 'index'])->name('category.index');
        Route::get('create', [CategoryController::class, 'create'])->name('category.create');
        Route::post('store', [CategoryController::class, 'store'])->name('category.store');
        Route::post('update', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('delete/{category}', [CategoryController::class, 'delete'])->name('category.delete');
    });
});
