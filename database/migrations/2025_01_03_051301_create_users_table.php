<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');  // Primary key sebagai user_id
            $table->string('name', 100);  // Nama lengkap pengguna
            $table->string('email', 100)->unique();  // Email pengguna
            $table->string('password');  // Kata sandi pengguna
            $table->string('phone', 15);  // Nomor telepon pengguna
            $table->text('address');  // Alamat pengguna
            $table->enum('role', ['customer', 'provider']); // Peran pengguna (customer atau provider)
            $table->timestamp('joined_at')->useCurrent();  // Tanggal pendaftaran
            $table->timestamps();  // Kolom created_at dan updated_at

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
