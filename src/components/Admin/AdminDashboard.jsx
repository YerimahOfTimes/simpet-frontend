import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch dashboard stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8 text-center md:text-left">
        Manage your site and monitor key stats here.
      </p>

      {loading ? (
        <div className="text-center text-gray-500">Loading dashboard data...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.users}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Products</h2>
            <p className="text-2xl font-bold text-green-600">{stats.products}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Orders</h2>
            <p className="text-2xl font-bold text-purple-600">{stats.orders}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold text-orange-600">
              ₦{stats.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Optional: Recent activity section */}
      <div className="mt-10 bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ 3 new users registered</li>
          <li>🛒 2 new products added</li>
          <li>💳 1 order completed</li>
        </ul>
      </div>
    </div>
  );
}

