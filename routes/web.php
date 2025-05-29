<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Private\PrivateController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/storage/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);
    dd($path);

    if (! File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
})->name('storage');

require __DIR__ . '/dashboard.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
