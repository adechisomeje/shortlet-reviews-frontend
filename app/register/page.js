"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ displayName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Step 1: Register User
      const registerResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, formData);

      if (registerResponse.status === 201) {
        // Step 2: Automatically Login after registration
        const loginResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
          email: formData.email,
          password: formData.password,
        });

        // Step 3: Store token & Redirect
        localStorage.setItem("token", loginResponse.data.token);
        setSuccess("Registration successful! Logging in...");
        
        setTimeout(() => router.push("/"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      {success && <p className="text-green-500 bg-green-200 p-3 rounded-md">{success}</p>}
      {error && <p className="text-red-500 bg-red-200 p-3 rounded-md">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Register & Login
        </button>
      </form>
    </div>
  );
}
