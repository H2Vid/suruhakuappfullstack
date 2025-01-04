import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDate, setOrderDate] = useState("");
    const [address, setAddress] = useState("");
    const [paymentProof, setPaymentProof] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        // Checking if the user is logged in and has the "customer" role.
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "customer") {
            window.location.href = "/"; // Redirect to login if no user
        }
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get("/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleSearch = () => {
        return services.filter((service) =>
            service.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    // Handle when user clicks the "Pesan Layanan" button
    const handleOrderService = (serviceId) => {
        setSelectedServiceId(serviceId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderDate("");
        setAddress("");
        setPaymentProof(null);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("order_date", orderDate);
        formData.append("address", address);
        formData.append("payment_proof", paymentProof);
        formData.append("service_id", selectedServiceId);

        try {
            const response = await axios.post("/api/orders", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Order placed successfully:", response.data);
            closeModal(); // Close modal after order
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Menu</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() =>
                                    (window.location.href = "/user-landingpage")
                                }
                                className="w-full text-left px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Layanan
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    (window.location.href = "/my-orders")
                                }
                                className="w-full text-left px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Pesanan Saya
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Cari layanan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-60 p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Cari
                        </button>
                    </div>
                </header>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {handleSearch().map((service) => (
                        <div
                            key={service.service_id}
                            className="p-4 bg-white shadow rounded"
                        >
                            <img
                                src={service.photo_url}
                                alt={service.name}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h3 className="text-lg font-bold">
                                {service.name}
                            </h3>
                            <p className="text-gray-600">
                                {service.description}
                            </p>
                            <p className="mt-2 font-semibold">
                                Rp {service.price}
                            </p>
                            <p className="text-sm text-gray-500">
                                Lokasi: {service.location}
                            </p>
                            <button
                                onClick={() =>
                                    handleOrderService(service.service_id)
                                }
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Pesan Layanan
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal Form Order */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-xl font-bold mb-4">
                            Pesan Layanan
                        </h2>
                        <form
                            onSubmit={handleSubmitOrder}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="orderDate"
                                    className="block font-medium"
                                >
                                    Waktu Layanan
                                </label>
                                <input
                                    type="datetime-local"
                                    id="orderDate"
                                    value={orderDate}
                                    onChange={(e) =>
                                        setOrderDate(e.target.value)
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="block font-medium"
                                >
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Masukkan alamat Anda"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="paymentProof"
                                    className="block font-medium"
                                >
                                    Foto Bukti Pembayaran
                                </label>
                                <input
                                    type="file"
                                    id="paymentProof"
                                    onChange={(e) =>
                                        setPaymentProof(e.target.files[0])
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
