import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("customer");
    const [error, setError] = useState(null); // Untuk menangani error
    const [success, setSuccess] = useState(false); // Untuk menangani sukses
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/"); // Arahkan ke halaman login setelah beberapa detik
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            phone,
            address,
            role,
        };

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true); // Jika sukses, set success true
                setError(null); // Reset error

                // Menampilkan alert keberhasilan registrasi
                alert(
                    "Registrasi berhasil! Anda akan diarahkan ke halaman login."
                );

                // Setelah 3 detik, arahkan ke halaman login
                setTimeout(() => {
                    goToLogin();
                }, 3000);
            } else {
                setSuccess(false); // Jika gagal, set success false
                setError(data.message || "Registrasi gagal, coba lagi!"); // Set error message
            }
        } catch (err) {
            setSuccess(false);
            setError("Terjadi kesalahan, coba lagi nanti!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Register for Suruh Aku
                </h2>

                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}
                {success && (
                    <div className="text-green-500 text-center mb-4">
                        Registrasi berhasil! Silakan login.
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
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
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Address
                        </label>
                        <textarea
                            id="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="customer">Customer</option>
                            <option value="provider">Provider</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-blue-600 hover:underline"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
