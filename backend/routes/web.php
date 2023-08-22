<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'status'=> 200,
        'Project'=>'API Backend for Survey App',        
        'Programming Language'=>'PHP ' . phpversion(),
        'Framework'=>'Laravel ' . app()->version()
    ]);
});
