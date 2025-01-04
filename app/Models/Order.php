<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $primaryKey = 'order_id'; // Tentukan primary key jika bukan 'id'

    // Kolom yang bisa diisi
    protected $fillable = [
        'name',
        'total_price',
        'status',
    ];
}