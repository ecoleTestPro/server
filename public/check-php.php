<?php

try {
    $extensions = ['ctype', 'curl', 'dom', 'fileinfo', 'filter', 'hash', 'mbstring', 'openssl', 'pcre', 'pdo', 'session', 'tokenizer', 'xml'];

    $results = [
        'php_version' => PHP_VERSION,
        'version_ok' => version_compare(PHP_VERSION, '8.2.0', '>='),
        'extensions' => []
    ];

    foreach ($extensions as $ext) {
        $results['extensions'][$ext] = extension_loaded($ext);
    }

    echo json_encode($results);
    return;
} catch (\Exception $e) {
    echo json_encode(['error' => 'An error occurred while checking PHP version and extensions: ' . $e->getMessage()]);
    return;
}
