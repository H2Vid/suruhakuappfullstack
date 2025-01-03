import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    useEffect(() => {
        fetchServicesData();
    }, []);

    const fetchServicesData = async () => {
        try {
            const response = await axios.get("/api/services");
            setServices(response.data); // Pastikan API mengembalikan array
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await axios.delete(`/api/services/${serviceId}`);
            fetchServicesData();
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleAddService = () => {
        setCurrentService(null);
        setShowForm(true);
    };

    const handleEditService = (service) => {
        console.log("Editing service:", service); // Debugging
        setCurrentService(service);
        setShowForm(true);
    };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("name", formData.get("name"));
            form.append("description", formData.get("description"));
            form.append("price", formData.get("price"));
            form.append("duration", formData.get("duration"));
            form.append("location", formData.get("location"));
            form.append("photo", formData.get("photo"));

            if (currentService) {
                // Update existing service
                await axios.put(
                    `/api/services/${currentService.service_id}`,
                    form
                );
            } else {
                // Add new service
                await axios.post("/api/services", form);
            }
            fetchServicesData();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Services Available</h2>

            <button
                onClick={handleAddService}
                className="mb-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Add New Service
            </button>

            {showForm && (
                <div className="p-4 bg-white shadow rounded mb-4">
                    <h3 className="text-lg font-semibold">
                        {currentService ? "Edit Service" : "Add New Service"}
                    </h3>
                    <form
                        onSubmit={(e) =>
                            handleSubmit(e, new FormData(e.target))
                        }
                    >
                        <label className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={currentService?.name || ""}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        />

                        <label className="block text-sm font-medium mt-4">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={currentService?.description || ""}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        ></textarea>

                        <label className="block text-sm font-medium mt-4">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={currentService?.price || ""}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        />

                        <label className="block text-sm font-medium mt-4">
                            Duration
                        </label>
                        <input
                            type="number"
                            name="duration"
                            defaultValue={currentService?.duration || ""}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        />

                        <label className="block text-sm font-medium mt-4">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={currentService?.location || ""}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            required
                        />

                        <label className="block text-sm font-medium mt-4">
                            Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />

                        <div className="mt-4 flex space-x-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {currentService
                                    ? "Update Service"
                                    : "Add Service"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <table className="min-w-full bg-white border border-gray-300 rounded">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Service Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Photo</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.service_id} className="border-b">
                            <td className="px-4 py-2">{service.name}</td>
                            <td className="px-4 py-2">{service.description}</td>
                            <td className="px-4 py-2">{service.price}</td>
                            <td className="px-4 py-2">
                                {service.duration} mins
                            </td>
                            <td className="px-4 py-2">{service.location}</td>
                            <td className="px-4 py-2">
                                <img
                                    src={service.photo_url}
                                    alt="Service"
                                    className="w-24 h-24 object-cover"
                                />
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleEditService(service)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteService(service.service_id)
                                    }
                                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;
