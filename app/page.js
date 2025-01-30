"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/apartments/search`, {
        params: { query },
      });

      if (response.data.results.length === 0) {
        setError("No apartments found. You can add a new one below.");
      }
      setResults(response.data.results);
    } catch (error) {
      setError("Error fetching search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full text-center py-20 px-6 bg-gray-800 rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-4">Find and Review <span className="text-blue-400">Your Perfect Stay</span></h1>
        <p className="text-gray-300 text-lg mb-8">Discover honest reviews from real guests and share your experiences.</p>

        <div className="flex items-center max-w-2xl mx-auto bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for apartments, Locations..."
            className="flex-1 px-6 py-3 text-gray-700 focus:outline-none"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
            Search
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-4xl px-6">
        {loading && <p className="text-blue-400 text-center">Searching...</p>}
        {error && (
          <div className="text-center">
            <p className="text-red-400">{error}</p>
            <Link href="/add-apartment">
              <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                Add Apartment
              </button>
            </Link>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((apartment, index) => (
              <div key={index} className="bg-white text-gray-900 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-2">{apartment.name}</h3>
                <p className="text-gray-600"><strong>Type:</strong> {apartment.type}</p>
                <p className="text-gray-600"><strong>Location:</strong> {apartment.city}, {apartment.country}</p>
                <p className="text-gray-600"><strong>Address:</strong> {apartment.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
