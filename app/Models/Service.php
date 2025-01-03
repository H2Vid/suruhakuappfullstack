<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

    protected $primaryKey = 'service_id'; // Tentukan primary key jika bukan 'id'

    // Kolom yang bisa diisi
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'location',
        'photo',
    ];

    // Jika Anda ingin menambahkan created_at dan updated_at secara otomatis
    public $timestamps = true;

    public function getPhotoUrlAttribute()
{
    return asset('storage/' . $this->photo); // Menggunakan asset() untuk membuat URL foto
}

}

