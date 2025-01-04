import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [userName, setUserName] = useState("Pengguna");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "customer") {
            navigate("/"); // Redirect to login if no user is logged in
        }
        fetchOrders();
        fetchUserName();
    }, [navigate]);

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
            setOrders([]);
        }
    };

    const fetchUserName = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.get(
                "http://suruhappbe.test/api/users"
            );
            const currentUser = response.data.data.find(
                (userData) => userData.user_id === user.user_id
            );
            setUserName(currentUser ? currentUser.name : "Pengguna");
        } catch (error) {
            console.error("Error fetching user name:", error);
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

    // Filter orders to show only those matching the userName
    const filteredOrders = orders.filter(
        (order) => order.user_name === userName
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">
                    Selamat Datang, {userName}
                </h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => navigate("/user-landingpage")}
                                className="w-full text-left px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Layanan
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate("/my-orders")}
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
                <h1 className="text-3xl font-bold mb-6">Daftar Pesanan</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
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
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id}>
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
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        Tidak ada data pesanan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Orders;
