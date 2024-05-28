<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminRole;
use Inertia\Inertia;

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

Route::middleware(['auth',AdminRole::class])->group(function () {
   Route::get('/user', [UserController::class, 'index'])->name('user');
   Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
   Route::post('/user', [UserController::class, 'store'])->name('user.store');
   Route::get('/user/edit/{user}', [UserController::class, 'edit'])->name('user.edit');
   ROute::patch('/user/{user}', [UserController::class, 'update'])->name('user.update');
   Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/attendance/submit', [AttendanceController::class, 'Submit'])->name("attendance.submit");
});

require __DIR__.'/auth.php';
