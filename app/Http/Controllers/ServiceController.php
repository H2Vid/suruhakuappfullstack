<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all(); // Mendapatkan semua layanan
        $services->each(function ($service) {
            $service->photo_url = $service->photo_url; // Menambahkan URL foto
        });
        return response()->json($services);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'location' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048', // Validasi foto
        ]);

        // Simpan foto ke storage
        $photoPath = $request->file('photo')->store('photos', 'public');

        // Menyimpan layanan baru
        $service = Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'duration' => $request->duration,
            'location' => $request->location,
            'photo' => $photoPath,
        ]);

        $service->photo_url = $service->photo_url; // Tambahkan URL foto ke respons
        return response()->json($service, 201); // Menampilkan data layanan yang baru dibuat
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json([
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'price' => $service->price,
            'duration' => $service->duration,
            'location' => $service->location,
            'photo_url' => $service->photo_url, // Menggunakan accessor
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // Validasi opsional foto
        ]);

        if ($request->hasFile('photo')) {
            // Hapus foto lama
            Storage::disk('public')->delete($service->photo);

            // Simpan foto baru
            $photoPath = $request->file('photo')->store('photos', 'public');
            $service->photo = $photoPath;
        }

        $service->update([
            'name' => $request->name ?? $service->name,
            'description' => $request->description ?? $service->description,
            'price' => $request->price ?? $service->price,
            'duration' => $request->duration ?? $service->duration,
            'location' => $request->location ?? $service->location,
        ]);


        $service->photo_url = $service->photo_url; // Tambahkan URL foto ke respons

        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        // Hapus foto dari storage
        Storage::disk('public')->delete($service->photo);

        $service->delete(); // Hapus layanan
        return response()->json(null, 204); // Return response 204 (no content)
    }
}
