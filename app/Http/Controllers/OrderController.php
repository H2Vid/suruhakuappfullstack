<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Menampilkan semua order
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // Menampilkan order berdasarkan ID
    public function show($order_id)
    {
        $order = Order::find($order_id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    // Membuat order baru
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,completed,canceled',
            'total_price' => 'required|numeric',
            'name' => 'required|string|max:100',
        ]);

        // Membuat order baru
        $order = Order::create($validated);

        return response()->json($order, 201);
    }

    // Mengupdate order berdasarkan ID
    public function update(Request $request, $order_id)
    {
        $order = Order::find($order_id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Validasi input
        $validated = $request->validate([
            'status' => 'sometimes|required|in:pending,accepted,completed,canceled',
            'total_price' => 'sometimes|required|numeric',
            'name' => 'sometimes|required|string|max:100',
        ]);

        // Update order
        $order->update($validated);

        return response()->json($order);
    }

    // Menghapus order berdasarkan ID
    public function destroy($order_id)
    {
        $order = Order::find($order_id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
