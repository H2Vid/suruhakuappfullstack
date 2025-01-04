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


// // untuk api lumen harus install dlu
// <?php

// /** @var \Laravel\Lumen\Routing\Router $router */

// use App\Http\Controllers\OrderController;
// use App\Http\Controllers\UsersController;
// use App\Http\Controllers\ServiceController;

// // Rute Users
// $router->post('/users', 'UsersController@users');
// $router->post('/users/login', 'UsersController@login');
// $router->get('/users', 'UsersController@getUsers'); // GET untuk mendapatkan semua provider
// $router->get('/users/{id}', 'UsersController@getUserById'); // GET untuk mendapatkan provider berdasarkan ID

// // Rute Services
// $router->get('/services', 'ServiceController@index'); // GET semua layanan
// $router->post('/services', 'ServiceController@store'); // POST tambah layanan
// $router->get('/services/{id}', 'ServiceController@show'); // GET satu layanan
// $router->put('/services/{id}', 'ServiceController@update'); // PUT update layanan
// $router->delete('/services/{id}', 'ServiceController@destroy'); // DELETE hapus layanan

// // Rute Orders
// $router->get('/orders', 'OrderController@index'); // GET semua pesanan
// $router->post('/orders', 'OrderController@store'); // POST tambah pesanan
// $router->get('/orders/{id}', 'OrderController@show'); // GET satu pesanan
// $router->put('/orders/{id}', 'OrderController@update'); // PUT update pesanan
// $router->delete('/orders/{id}', 'OrderController@destroy'); // DELETE hapus pesanan
