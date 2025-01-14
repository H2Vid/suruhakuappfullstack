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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->date('order_date');
            $table->string('address');
            $table->string('payment_proof')->nullable(); // Foto pembayaran
            $table->enum('status', ['pending', 'accepted', 'completed', 'canceled'])->default('pending');
            // Menambahkan kolom baru
            $table->string('user_name'); // Nama pengguna
            $table->string('service_name'); // Nama layanan
            $table->decimal('service_price', 10, 2); // Harga layanan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
