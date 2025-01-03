<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class Userscontroller extends Controller
{

    public function users(Request $request)
    {
        // Validasi input dari request
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'phone' => 'required|max:15',
            'address' => 'required|string',
            'role' => 'required|in:customer,provider',
        ]);

        // Membuat data users baru
        $users = User::create($request->all());
        return response()->json(['data' => $users]);
    }

    // Menambahkan metode untuk mendapatkan semua users
    public function getUsers()
    {
        $users = User::all(); // Mengambil semua users
        return response()->json(['data' => $users]);
    }

    // Menambahkan metode untuk mendapatkan user berdasarkan ID
    public function getUserById($id)
    {
        $user = User::find($id); // Mencari user berdasarkan ID

        if ($user) {
            return response()->json(['data' => $user]);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
    public function login(Request $request)
{
    // Validasi input
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8',
    ]);

    // Mencari user berdasarkan email
    $user = User::where('email', $request->email)->first();

    if (!$user || $user->password !== $request->password) {
        // Jika user tidak ditemukan atau password tidak cocok
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Login berhasil, kirimkan response sukses
    return response()->json(['message' => 'Login successful', 'user' => $user]);
}

}
