import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLandingPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [userName, setUserName] = useState("Pengguna"); // Nama pengguna

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "customer") {
            navigate("/"); // Redirect ke login jika tidak ada user
        }
        fetchServices();
        fetchUserName();
    }, [navigate]);

    const fetchServices = async () => {
        try {
            const response = await axios.get("/api/services");
            setServices(response.data);
            setFilteredServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchUserName = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.get(
                "/api/users"
            );
            const currentUser = response.data.data.find(
                (userData) => userData.user_id === user.user_id
            );
            setUserName(currentUser ? currentUser.name : "Pengguna");
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };

    const handleViewOrders = () => {
        navigate("/my-orders");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar (Navbar Kiri) */}
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
                                onClick={handleViewOrders}
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

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Cari
                        </button>
                    </div>
                </header>
            </main>
        </div>
    );
};

export default UserLandingPage;
