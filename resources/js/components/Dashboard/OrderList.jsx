import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                "http://suruhappbe.test/api/orders"
            );
            if (Array.isArray(response.data.data)) {
                setOrders(response.data.data);
            } else {
                console.error("Unexpected data format:", response.data);
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `http://suruhappbe.test/api/orders/${orderId}`,
                { status: newStatus }
            );
            alert(response.data.message); // Tampilkan pesan sukses
            // Perbarui status pada state lokal
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Gagal memperbarui status pesanan.");
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "accepted":
                return "bg-blue-200 text-blue-800";
            case "completed":
                return "bg-green-200 text-green-800";
            case "canceled":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">
                Dashboard Admin - Daftar Pesanan
            </h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama Layanan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tanggal Pesanan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Alamat
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Harga
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bukti Pembayaran
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.service_name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {new Date(
                                            order.order_date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {order.address}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        Rp{" "}
                                        {parseFloat(
                                            order.service_price
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <img
                                            src={`http://suruhappbe.test${order.payment_proof}`}
                                            alt="Bukti Pembayaran"
                                            className="w-24 h-24 object-cover cursor-pointer"
                                            onClick={() =>
                                                setSelectedImage(
                                                    order.payment_proof
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <select
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                order.status
                                            )}`}
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="accepted">
                                                Accepted
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="canceled">
                                                Canceled
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    Tidak ada data pesanan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Enlarged Image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={`http://suruhappbe.test${selectedImage}`}
                        alt="Bukti Pembayaran"
                        className="max-w-3xl max-h-[600px] object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default OrderList;
