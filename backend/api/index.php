<?php

// Ensure runtime-writable directories exist on Vercel.
foreach (['/tmp/views', '/tmp/sessions', '/tmp/cache', '/tmp/logs'] as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

require __DIR__ . '/../public/index.php';
