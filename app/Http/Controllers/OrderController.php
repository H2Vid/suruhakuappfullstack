<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'order_date' => 'required|date',
            'address' => 'required|string|max:255',
            'payment_proof' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048', // Validasi foto pembayaran
            'status' => 'in:pending,accepted,completed,canceled', // Validasi status
        ]);

        // Simpan foto pembayaran ke storage
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');

        // Simpan order ke database
        $order = Order::create([
            'order_date' => $request->order_date,
            'address' => $request->address,
            'payment_proof' => $paymentProofPath,
            'status' => $request->status ?? 'pending', // Default status 'pending'
        ]);

        // Menambahkan URL foto pembayaran ke dalam respons
        $order->payment_proof_url = Storage::url($order->payment_proof);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);

        // Menambahkan URL foto pembayaran ke dalam respons
        $order->payment_proof_url = Storage::url($order->payment_proof);

        return response()->json($order);
    }
}
