<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SongController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/song/store', [SongController::class, 'store']);
Route::get('/songs', [SongController::class, 'index']);
Route::get('/song/latest', [SongController::class, 'latest_song']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
