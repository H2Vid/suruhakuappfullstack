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
        Schema::create('services', function (Blueprint $table) {
            $table->id('service_id'); // Primary Key, auto increment
            $table->string('name', 100); // Nama layanan
            $table->text('description')->nullable(); // Deskripsi layanan
            $table->decimal('price', 10, 2); // Harga layanan
            $table->integer('duration'); // Durasi layanan dalam menit
            $table->string('location'); // Location
            $table->string('photo')->nullable();
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
