<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Property\FindProperty;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Property\PropertyController;
use App\Http\Controllers\Property\RegisterPropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name("root");

Route::resource('admin', AdminController::class)
    ->only(['index', 'registerProperty'])
    ->middleware(['auth', 'verified']);

Route::controller(AdminController::class)->group(function () {
    Route::get('admin/register-property', 'registerProperty')->name('admin.registerProperty');
    Route::delete('admin/register-property/{id}', 'destroyRegisterProperty')->name('admin.destroyRegisterProperty');
})->middleware(['auth', 'verified']);

Route::get('admin/property/detail/{id}', [PropertyController::class, 'detail'])
    ->middleware(['auth', 'verified']);

Route::resource('admin/property', PropertyController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('daftar', RegisterPropertyController::class)
    ->only(['index', 'store']);

Route::get('tentang', function () {
    return Inertia::render('AboutUs/Index');
});

Route::get('cari', [FindProperty::class, 'index'])->name('cari');

require __DIR__ . '/auth.php';
