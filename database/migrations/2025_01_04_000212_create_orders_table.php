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
            $table->id('order_id'); // Primary Key, auto increment
            $table->enum('status', ['pending', 'accepted', 'completed', 'canceled'])->default('pending'); // Status
            $table->decimal('total_price', 10, 2); // Total Price
            $table->timestamps(); // Created and Updated At
            $table->string('name', 100); // Nama layanan
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
