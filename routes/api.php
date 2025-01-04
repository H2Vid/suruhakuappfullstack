<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Userscontroller;
use App\Http\Controllers\ServiceController;

Route::post ('/users', [Userscontroller::class, 'users']);
Route::post ('/users/login', [Userscontroller::class, 'login']);
Route::get('/users', [Userscontroller::class, 'getUsers']);  // GET untuk mendapatkan semua provider
Route::get('/users/{id}', [Userscontroller::class, 'getUserById']);  // GET untuk mendapatkan provider berdasarkan ID
Route::resource('services', ServiceController::class);
Route::resource('orders', OrderController::class);