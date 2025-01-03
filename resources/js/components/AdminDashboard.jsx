// // src/components/DashboardAdmin.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DashboardAdmin = () => {
//     const [services, setServices] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [currentService, setCurrentService] = useState(null);
//     const [activeTab, setActiveTab] = useState("dashboard");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || user.role !== "provider") {
//             navigate("/"); // Redirect ke login jika tidak ada user
//         }
//         fetchServices();
//         // fetchOrders();
//     }, [navigate]);

//     const fetchServices = async () => {
//         try {
//             const response = await axios.get("/api/services");
//             setServices(response.data);
//         } catch (error) {
//             console.error("Error fetching services:", error);
//         }
//     };

//     // const fetchOrders = async () => {
//     //     try {
//     //         const response = await axios.get("/api/orders"); // Ganti dengan URL yang sesuai
//     //         setOrders(response.data);
//     //     } catch (error) {
//     //         console.error("Error fetching orders:", error);
//     //     }
//     // };

//     const handleAddService = () => {
//         setCurrentService(null);
//         setShowForm(true);
//     };

//     const handleEditService = (service) => {
//         setCurrentService(service);
//         setShowForm(true);
//     };

//     const handleDeleteService = async (serviceId) => {
//         try {
//             await axios.delete(`/api/services/${serviceId}`);
//             fetchServices(); // Refresh the services list after deletion
//         } catch (error) {
//             console.error("Error deleting service:", error);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("user"); // Hapus data user dari localStorage
//         navigate("/"); // Arahkan ke halaman login
//     };

//     const handleSubmit = async (e, formData) => {
//         e.preventDefault();
//         try {
//             if (currentService) {
//                 await axios.put(
//                     `/api/services/${currentService.service_id}`,
//                     formData
//                 );
//             } else {
//                 await axios.post("/api/services", formData);
//             }
//             fetchServices();
//             setShowForm(false);
//         } catch (error) {
//             console.error("Error saving service:", error);
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside className="w-64 bg-blue-800 text-white flex flex-col">
//                 <div className="p-4 text-center font-bold text-lg border-b border-blue-700">
//                     My Dashboard
//                 </div>
//                 <nav className="flex-1 p-4 space-y-2">
//                     <a
//                         href="#"
//                         onClick={() => setActiveTab("dashboard")}
//                         className={`block p-2 rounded ${
//                             activeTab === "dashboard"
//                                 ? "bg-blue-700"
//                                 : "hover:bg-blue-700"
//                         }`}
//                     >
//                         Dashboard
//                     </a>
//                     <a
//                         href="#"
//                         onClick={() => setActiveTab("services")}
//                         className={`block p-2 rounded ${
//                             activeTab === "services"
//                                 ? "bg-blue-700"
//                                 : "hover:bg-blue-700"
//                         }`}
//                     >
//                         Service
//                     </a>
//                     <a
//                         href="#"
//                         onClick={() => setActiveTab("orders")}
//                         className={`block p-2 rounded ${
//                             activeTab === "orders"
//                                 ? "bg-blue-700"
//                                 : "hover:bg-blue-700"
//                         }`}
//                     >
//                         Pemesanan
//                     </a>
//                 </nav>
//                 <div className="p-4 border-t border-blue-700">
//                     <button
//                         onClick={handleLogout}
//                         className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <header className="bg-white shadow p-4">
//                     <h1 className="text-xl font-bold">
//                         Welcome to the Dashboard
//                     </h1>
//                 </header>

//                 {/* Content */}
//                 <div className="flex-1 p-4">
//                     {/* Dashboard Tab */}
//                     {activeTab === "dashboard" && (
//                         <div>
//                             <h2 className="text-lg font-bold mb-4">Orders</h2>
//                             <div className="grid grid-cols-1 gap-4">
//                                 {orders.length === 0 ? (
//                                     <div className="p-4 bg-white shadow rounded">
//                                         <p>No orders yet.</p>
//                                     </div>
//                                 ) : (
//                                     orders.map((order) => (
//                                         <div
//                                             key={order.id}
//                                             className="p-4 bg-white shadow rounded"
//                                         >
//                                             <h3 className="font-semibold">
//                                                 {order.name}
//                                             </h3>
//                                             <p>{order.details}</p>
//                                             <div className="mt-2">
//                                                 <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//                                                     Confirm Payment
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                             <h2 className="text-lg font-bold mt-8 mb-4">
//                                 Services Available
//                             </h2>
//                             <div className="grid grid-cols-3 gap-4">
//                                 {services.map((service) => (
//                                     <div
//                                         key={service.service_id}
//                                         className="p-4 bg-white shadow rounded"
//                                     >
//                                         <h2 className="text-lg font-bold">
//                                             {service.name}
//                                         </h2>
//                                         <p>{service.description}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Services Tab */}
//                     {activeTab === "services" && (
//                         <div>
//                             <button
//                                 onClick={handleAddService}
//                                 className="mb-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                             >
//                                 Add New Service
//                             </button>
//                             <div className="grid grid-cols-3 gap-4">
//                                 {services.map((service) => (
//                                     <div
//                                         key={service.service_id}
//                                         className="p-4 bg-white shadow rounded"
//                                     >
//                                         <h2 className="text-lg font-bold">
//                                             {service.name}
//                                         </h2>
//                                         <p>{service.description}</p>
//                                         <div className="mt-4 flex space-x-2">
//                                             <button
//                                                 onClick={() =>
//                                                     handleEditService(service)
//                                                 }
//                                                 className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() =>
//                                                     handleDeleteService(
//                                                         service.service_id
//                                                     )
//                                                 }
//                                                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Orders Tab */}
//                     {activeTab === "orders" && (
//                         <div>
//                             <h2 className="text-lg font-bold mb-4">
//                                 Order List
//                             </h2>
//                             <div className="grid grid-cols-1 gap-4">
//                                 {orders.length === 0 ? (
//                                     <div className="p-4 bg-white shadow rounded">
//                                         <p>No orders to display.</p>
//                                     </div>
//                                 ) : (
//                                     orders.map((order) => (
//                                         <div
//                                             key={order.id}
//                                             className="p-4 bg-white shadow rounded"
//                                         >
//                                             <h3 className="font-semibold">
//                                                 {order.name}
//                                             </h3>
//                                             <p>{order.details}</p>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* Add/Edit Service Form */}
//                     {showForm && (
//                         <div className="p-4 bg-white shadow rounded mt-8">
//                             <h2 className="text-lg font-bold">
//                                 {currentService
//                                     ? "Edit Service"
//                                     : "Add New Service"}
//                             </h2>
//                             <form
//                                 onSubmit={(e) =>
//                                     handleSubmit(e, new FormData(e.target))
//                                 }
//                             >
//                                 <label className="block text-sm font-medium mt-4">
//                                     Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     defaultValue={currentService?.name}
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                     required
//                                 />

//                                 <label className="block text-sm font-medium mt-4">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     defaultValue={currentService?.description}
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                     required
//                                 />

//                                 <label className="block text-sm font-medium mt-4">
//                                     Price
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     defaultValue={currentService?.price}
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                     required
//                                 />

//                                 <label className="block text-sm font-medium mt-4">
//                                     Duration
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="duration"
//                                     defaultValue={currentService?.duration}
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                     required
//                                 />

//                                 <label className="block text-sm font-medium mt-4">
//                                     Location
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     defaultValue={currentService?.location}
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                     required
//                                 />

//                                 <label className="block text-sm font-medium mt-4">
//                                     Photo
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="photo"
//                                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                                 />

//                                 <div className="mt-4 flex space-x-2">
//                                     <button
//                                         type="submit"
//                                         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                                     >
//                                         {currentService
//                                             ? "Update Service"
//                                             : "Add Service"}
//                                     </button>
//                                     <button
//                                         onClick={() => setShowForm(false)}
//                                         className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DashboardAdmin;
