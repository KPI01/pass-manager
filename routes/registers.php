<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::resource('register', RegisterController::class)->only(['index', 'store', 'destroy', 'update']);
    Route::name('register.')->prefix('/register')->group(function () {
        Route::post('/{register}/reveal-password', [RegisterController::class, 'revealPassword'])
            ->name('reveal-password');
        Route::post('/{register}/check-can-update', [RegisterController::class, 'checkCanUpdate'])
            ->name('check-can-update');
        Route::post('/{register}/changes', [RegisterController::class, 'getChanges'])->name('get-changes');
    });
});
