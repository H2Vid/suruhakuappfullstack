// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalServices, setTotalServices] = useState(0);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // const ordersResponse = await axios.get(
            //     "http://localhost/api/orders"
            // );
            const servicesResponse = await axios.get("/api/services");

            // setTotalOrders(ordersResponse.data.length);
            setTotalServices(servicesResponse.data.length);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">Dashboard Overview</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-100 text-blue-800 rounded shadow">
                    <h3 className="text-xl font-semibold">Total Orders</h3>
                    <p className="text-2xl">totalOrders</p>
                </div>
                <div className="p-4 bg-green-100 text-green-800 rounded shadow">
                    <h3 className="text-xl font-semibold">Total Services</h3>
                    <p className="text-2xl">{totalServices}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
