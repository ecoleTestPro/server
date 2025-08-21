<?php

// use App\Http\Controllers\Public\PublicController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;


require __DIR__ . '/auth.php';
require __DIR__ . '/front.php';
require __DIR__ . '/dashboard.php';
require __DIR__ . '/settings.php';

Route::get('/check-php', function () {
    $extensions = ['ctype', 'curl', 'dom', 'fileinfo', 'filter', 'hash', 'mbstring', 'openssl', 'pcre', 'pdo', 'session', 'tokenizer', 'xml'];

    $results = [
        'php_version' => PHP_VERSION,
        'version_ok' => version_compare(PHP_VERSION, '8.2.0', '>='),
        'extensions' => []
    ];

    foreach ($extensions as $ext) {
        $results['extensions'][$ext] = extension_loaded($ext);
    }

    return response()->json($results);
});
