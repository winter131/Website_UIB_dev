<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
    return view('welcome');
});

Route::get('/create-admin', function () {
    $user = User::updateOrCreate(
        ['email' => 'admin@admin.com'],
        [
            'name' => 'admin',
            'password' => Hash::make('admin')
        ]
    );

    return "<h2>Akun Admin Berhasil Dibuat!</h2><p>Silakan login di sistem Filament dengan kredensial berikut:</p><ul><li><b>Email:</b> admin@admin.com</li><li><b>Password:</b> admin</li></ul><a href='/admin'>Klik di sini untuk ke Halaman Login</a>";
});
