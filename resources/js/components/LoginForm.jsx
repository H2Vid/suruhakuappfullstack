import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fungsi untuk login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
            role,
        };

        try {
            const response = await axios.post("/api/users/login", loginData);

            if (response.status === 200) {
                const userData = response.data.user;
                localStorage.setItem("user", JSON.stringify(userData)); // Simpan user data di localStorage
                setError(null);

                // Arahkan ke halaman sesuai peran
                if (userData.role === "customer") {
                    navigate("/user-landingpage");
                } else if (userData.role === "provider") {
                    navigate("/admin-dashboard");
                }
            }
        } catch (err) {
            setError(err.response?.data.message || "Login gagal, coba lagi!");
        }
    };

    // Fungsi untuk mengarahkan ke halaman Register
    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Login to Suruh Aku
                </h2>

                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={goToRegister}
                            className="text-blue-600 hover:underline"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
