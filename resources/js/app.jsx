// src/App.jsx
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./components/UserList";
import Login from "./components/LoginForm"; //komponen login
import UserLandingpage from "./components/UserLandingpage"; // Landing page untuk customer
import RegisterForm from "./components/RegisterForm";
import DashboardAdmin from "./components/Dashboard/DashboardAdmin";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/user-landingpage" element={<UserLandingpage />} />
                <Route path="/admin-dashboard" element={<DashboardAdmin />} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
