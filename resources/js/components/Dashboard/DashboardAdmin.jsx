// src/pages/DashboardAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";
import ServiceList from "./ServicesList";
import OrderList from "./OrderList";

const DashboardAdmin = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "provider") {
            navigate("/"); // Redirect ke login jika tidak ada user
        }
        fetchServices();
        // fetchOrders();
    }, [navigate]);

    const fetchServices = async () => {
        try {
            const response = await axios.get("/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    // const fetchOrders = async () => {
    //     try {
    //         const response = await axios.get("http://localhost/api/orders");
    //         setOrders(response.data);
    //     } catch (error) {
    //         console.error("Error fetching orders:", error);
    //     }
    // };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-lg border-b border-blue-700">
                    My Dashboard
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a
                        href="#"
                        onClick={() => setActiveTab("dashboard")}
                        className={`block p-2 rounded ${
                            activeTab === "dashboard"
                                ? "bg-blue-700"
                                : "hover:bg-blue-700"
                        }`}
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        onClick={() => setActiveTab("services")}
                        className={`block p-2 rounded ${
                            activeTab === "services"
                                ? "bg-blue-700"
                                : "hover:bg-blue-700"
                        }`}
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        onClick={() => setActiveTab("orders")}
                        className={`block p-2 rounded ${
                            activeTab === "orders"
                                ? "bg-blue-700"
                                : "hover:bg-blue-700"
                        }`}
                    >
                        Orders
                    </a>
                </nav>
                <div className="p-4 border-t border-blue-700">
                    <button
                        onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                        }}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4">
                    <h1 className="text-xl font-bold">
                        Welcome to the Dashboard
                    </h1>
                </header>

                <div className="flex-1 p-4">
                    {activeTab === "dashboard" && <Dashboard />}
                    {activeTab === "services" && (
                        <ServiceList fetchServices={fetchServices} />
                    )}
                    {activeTab === "orders" && (
                        <OrderList />
                        // <OrderList fetchOrders={fetchOrders} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
