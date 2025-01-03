import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users"); // Endpoint Laravel
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className="text-red-500 font-extrabold">Daftar Pengguna</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.user_id}>
                        <strong>Nama:</strong> {user.name} <br />
                        <strong>Email:</strong> {user.email}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
