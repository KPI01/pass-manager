<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::resource('registers', RegisterController::class)->only(['index', 'store', 'destroy', 'update']);
    Route::name('registers.')->group(function () {
        Route::post('registers/{register}/reveal-password', [RegisterController::class, 'revealPassword'])
            ->name('reveal-password');
    });
});
