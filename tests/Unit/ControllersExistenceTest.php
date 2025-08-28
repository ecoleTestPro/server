<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

it('all controller classes are loadable', function () {
    $controllerFiles = File::allFiles(app_path('Http/Controllers'));
    foreach ($controllerFiles as $file) {
        if ($file->getExtension() !== 'php') {
            continue;
        }
        $relative = $file->getRelativePathname();
        $class = 'App\\Http\\Controllers\\' . Str::replaceLast('.php', '', str_replace('/', '\\', $relative));
        expect(class_exists($class))->toBeTrue();
    }
});

