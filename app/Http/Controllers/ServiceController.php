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
            // Menambahkan URL foto pada setiap layanan
            $service->photo_url = Storage::url($service->photo);
        });

        return response()->json($services);
    }

    public function store(Request $request)
    {
        // Validasi input
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

        // Menambahkan URL foto ke dalam respons
        $service->photo_url = Storage::url($service->photo);

        return response()->json($service, 201); // Menampilkan data layanan yang baru dibuat
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);

        // Mengembalikan data layanan dengan URL foto
        return response()->json([
            'id' => $service->id,
            'name' => $service->name,
            'description' => $service->description,
            'price' => $service->price,
            'duration' => $service->duration,
            'location' => $service->location,
            'photo_url' => Storage::url($service->photo), // URL foto
        ]);
    }


    public function update(Request $request, $id)
{
    // Cari data service berdasarkan ID
    $service = Service::find($id);

    if (!$service) {
        return response()->json(['error' => 'Service not found'], 404);
    }

    // Validasi hanya pada field yang dikirimkan
    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string|max:1000',
        'price' => 'sometimes|required|numeric',
        'duration' => 'sometimes|required|numeric',
        'location' => 'sometimes|required|string|max:255',
        'photo' => 'nullable|image|max:2048', // Photo opsional
    ]);

    // Update hanya field yang ada dalam request
    $service->fill($validated);

    // Jika foto baru diunggah, ganti foto lama
    if ($request->hasFile('photo')) {
        // Hapus foto lama
        if ($service->photo) {
            Storage::disk('public')->delete($service->photo);
        }

        // Simpan foto baru
        $path = $request->file('photo')->store('photos', 'public');
        $service->photo = $path;
    }

    // Simpan perubahan
    $service->save();

    // Tambahkan URL foto ke respons
    $service->photo_url = Storage::url($service->photo);

    return response()->json($service, 200);
}




    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        // Hapus foto dari storage
        Storage::disk('public')->delete($service->photo);

        // Hapus layanan
        $service->delete();

        // Return response 204 (no content)
        return response()->json(null, 204);
    }
}
