import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLandingpage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "customer") {
            navigate("/"); // Redirect ke login jika tidak ada user
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Hapus data user dari localStorage
        navigate("/"); // Arahkan ke halaman login
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-700">
                Landing Page User (Customer)
            </h2>
            <button
                onClick={handleLogout}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
                Logout
            </button>
        </div>
    );
};

export default UserLandingpage;
