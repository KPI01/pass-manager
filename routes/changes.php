<?php

use App\Http\Controllers\ChangeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::resource('logs', ChangeController::class)->only(['index']);
});
