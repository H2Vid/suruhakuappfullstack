// src/components/ProtectedRoute.jsx
import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !localStorage.getItem("token")) {
        // Jika tidak ada token atau user, arahkan ke login
        return <Redirect to="/login" />;
    }

    if (role && user.role !== role) {
        // Jika role tidak sesuai, arahkan ke halaman lain
        return <Redirect to="/landingpage-user" />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
