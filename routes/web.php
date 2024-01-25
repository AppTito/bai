<?php

use App\Http\Controllers\ApiCategoriaController;
use App\Http\Controllers\ApiCategoryValueController;


use App\Http\Controllers\AttentionController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CategoryValueController;
use App\Http\Controllers\DistributionController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\EstimateController;
use App\Http\Controllers\OperationController;
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
    Route::get('/operations', [OperationController::class, 'index'])->name('operations.index');
    Route::post('/operations/control', [OperationController::class, 'control'])->name('operations.control');
    Route::post('/operations/control/guardar', [OperationController::class, 'guardar'])->name('operations.guardar');
    Route::post('/operations/operationsbydate', [OperationController::class, 'operationsbydate'])->name('operations.operationsbydate');
    Route::get('/operations/controlbydate', [OperationController::class, 'controlbydate'])->name('operations.controlbydate');

    /*Estimacion*/
    Route::get('/estimation', [EstimateController::class, 'index'])->name('estimations.index');
    Route::post('/estimation/distribution', [EstimateController::class, 'distribution'])->name('estimations.distribution');
    Route::post('/estimation/distribution/guardar', [EstimateController::class, 'guardar'])->name('estimations.guardar');

    /*Distribucion*/
    Route::get('/distribution', [DistributionController::class, 'index'])->name('distribution.distribution');
    Route::get('/distribution/distributionbydate', [DistributionController::class, 'distributionbydate'])->name('distribution.distributionbydate');

    /* Factura */
    Route::get('/factura', [FacturaController::class, 'Factura'])->name('factura.index');

    Route::get('/api/categories-list', [ApiCategoriaController::class, 'index']);
    Route::get('/api/categoriesValues-list', [ApiCategoryValueController::class, 'index']);
});

require __DIR__.'/auth.php';
