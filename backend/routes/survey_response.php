<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyResponseController;

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/response/latest', [SurveyResponseController::class, 'latestList']);
    Route::get('/response/list', [SurveyResponseController::class, 'index']);
    Route::get('/response/{id}/show', [SurveyResponseController::class, 'show']);    
    Route::post('/response/delete', [SurveyResponseController::class, 'delete']);
});

Route::post('/response/create', [SurveyResponseController::class, 'create']);