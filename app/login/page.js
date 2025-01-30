"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, formData);
      localStorage.setItem("token", response.data.token); // Store JWT token
      setSuccess("Login successful! Redirecting to homepage...");
      setTimeout(() => router.push("/"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {success && <p className="text-green-500 bg-green-200 p-3 rounded-md">{success}</p>}
      {error && <p className="text-red-500 bg-red-200 p-3 rounded-md">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
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
          Login
        </button>
      </form>
    </div>
  );
}
