<?php

use App\Http\Controllers\AttentionController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CategoryValueController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('banks', BankController::class);
    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('permissions', PermissionController::class)->except(['show']);
    Route::resource('roles', RoleController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('donors', DonorController::class)->except(['show']);
    Route::resource('organizations', OrganizationController::class)->except(['show']);
    Route::resource('attentions', AttentionController::class)->except(['show']);
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('categoryValues', CategoryValueController::class)->except(['create', 'show', 'destroy']);
    /* Operaciones */
    Route::get('/operations', [App\Http\Controllers\OperationController::class, 'index'])->name('operations.index');
    /* Operaciones Control Peso */
    Route::get('/operations/weight', [App\Http\Controllers\OperationController::class, 'weight'])->name('operations.weight');
    /* Operaciones Control*/
    Route::post('/operations/control', [App\Http\Controllers\OperationController::class, 'control'])->name('operations.control');
    Route::get('/operations/control', [App\Http\Controllers\OperationController::class, 'control'])->name('operations.control');
    Route::post('/operations/control/guardar', [App\Http\Controllers\OperationController::class, 'guardar'])->name('operations.guardar');
    /* Operaciones Distribucion*/
    Route::get('/operations/distribution', [App\Http\Controllers\OperationController::class, 'distribution'])->name('operations.distribution');
});

require __DIR__.'/auth.php';
