<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_date',
        'address',
        'payment_proof',
        'status',
        'user_name',        // Kolom nama pengguna
        'service_name',     // Kolom nama layanan
        'service_price',
    ];
}
