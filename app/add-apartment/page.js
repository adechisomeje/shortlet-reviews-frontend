"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddApartment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: "Studio",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  // Check if the user is logged in; otherwise, redirect to login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectTo", "/add-apartment"); // Store where the user wanted to go
      setAuthMessage("You must be logged in to add an apartment. Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000); // Redirect after 3 seconds
    }
  }, [router]);

  // Redirect to homepage if user logs out while on this page
  useEffect(() => {
    const interval = setInterval(() => {
      if (!localStorage.getItem("token")) {
        router.push("/"); // Redirect to homepage if token is removed
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/apartments`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("Apartment added successfully! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add apartment.");
    } finally {
      setLoading(false);
    }
  };

  if (authMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-red-400 bg-red-800 p-4 rounded-lg">{authMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full text-center py-20 px-6 bg-gray-800 rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-4">Add a New <span className="text-blue-400">Apartment</span></h1>
        <p className="text-gray-300 text-lg mb-8">Provide accurate details to help others find the apartment.</p>
      </div>

      <div className="mt-10 w-full max-w-2xl px-6">
        {success && <p className="text-green-400 text-center">{success}</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Apartment Name */}
          <div className="mb-4">
            <label className="block text-gray-300">Apartment Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
              placeholder="E.g. Moore House"
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-gray-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
            >
              <option value="Studio">Studio</option>
              <option value="1-Bedroom">1-Bedroom</option>
              <option value="2-Bedroom">2-Bedroom</option>
              <option value="3-Bedroom">3-Bedroom</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
            </select>
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-gray-300">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
              placeholder="E.g. Nigeria"
            />
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-gray-300">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
              placeholder="E.g. Lagos"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
              placeholder="E.g. 23 Unn Road"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-gray-300">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
              placeholder="E.g. +2348012345678"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
          >
            {loading ? "Adding Apartment..." : "Submit Apartment"}
          </button>
        </form>
      </div>
    </div>
  );
}
