<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function index()
    {
        // Mengambil semua data order
        $orders = Order::all();

        // Menambahkan URL foto pembayaran pada setiap order
        $orders->each(function ($order) {
            $order->payment_proof = Storage::url($order->payment_proof); // Convert path to URL
        });

        // Mengembalikan data dalam format JSON
        return response()->json(['data' => $orders], 200);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'order_date' => 'required|date',
            'address' => 'required|string|max:255',
            'payment_proof' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048', // Validasi foto pembayaran
            'status' => 'in:pending,accepted,completed,canceled', // Validasi status
            'user_name' => 'required|string',
            'service_name' => 'required|string',
            'service_price' => 'required|numeric',
        ]);

        // Simpan foto pembayaran ke storage dan ambil path
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');

        // Menyimpan order ke database dengan path foto pembayaran
        $order = Order::create([
            'order_date' => $request->order_date,
            'address' => $request->address,
            'payment_proof' => $paymentProofPath, // Menyimpan path di database
            'status' => $request->status ?? 'pending', // Default status 'pending'
            'user_name' => $request->user_name, // Pastikan sesuai dengan input
            'service_name' => $request->service_name, // Pastikan sesuai dengan input
            'service_price' => $request->service_price, // Pastikan sesuai dengan input
        ]);

        // Menambahkan URL foto pembayaran ke dalam respons
        $order->payment_proof = Storage::url($order->payment_proof); // Mengubah path menjadi URL

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);

        // Menambahkan URL foto pembayaran ke dalam respons
        $order->payment_proof = Storage::url($order->payment_proof); // Mengubah path menjadi URL

        return response()->json($order);
    }
    public function update(Request $request, $id)
{
    // Validasi input
    $request->validate([
        'status' => 'required|in:pending,accepted,completed,canceled', // Validasi status
    ]);

    // Cari order berdasarkan ID
    $order = Order::findOrFail($id);

    // Perbarui status
    $order->status = $request->status;
    $order->save();

    // Tambahkan URL bukti pembayaran dalam respons
    $order->payment_proof = Storage::url($order->payment_proof);

    return response()->json([
        'message' => 'Order status updated successfully',
        'order' => $order,
    ], 200);
}

}
