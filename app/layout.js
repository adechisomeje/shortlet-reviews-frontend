"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Helps detect page changes

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*export const metadata = {
  title: "Shortlet Reviews",
  description: "Find and review shortlet apartments",
};*/

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname(); // Detects route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token ? true : null); // Update UI when token changes
  }, [pathname]); // Runs every time the page changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white min-h-screen`}>
        <nav className="w-full py-4 px-6 bg-gray-800 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">
            <Link href="/">Shortlet Reviews</Link>
          </h1>

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className="bg-blue-500 px-4 py-2 rounded-md mr-4 hover:bg-blue-600 transition duration-300">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
