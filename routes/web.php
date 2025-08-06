<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => to_route('login'));

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/registers.php';
require __DIR__ . '/changes.php';
