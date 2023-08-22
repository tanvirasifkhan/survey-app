<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyController;

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/survey/latest', [SurveyController::class, 'latestList']);
    Route::get('/survey/list', [SurveyController::class, 'index']);
    Route::post('/survey/create', [SurveyController::class, 'create']);
    Route::get('/survey/{id}/show', [SurveyController::class, 'show']);
    Route::post('/survey/delete', [SurveyController::class, 'delete']);
});

Route::get('/survey/list/home', [SurveyController::class, 'homeSurveyList']);
Route::get('/survey/{id}/home/show', [SurveyController::class, 'showForHome']);