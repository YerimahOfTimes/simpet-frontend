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

  useEffect(() => {
    if (!token) {
      console.warn("No admin token found");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://simpet-backend-1.onrender.com/api/admin/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(res.data || {});
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8 text-center md:text-left">
        Monitor system activity and manage the platform.
      </p>

      {loading ? (
        <div className="text-center text-gray-500">Loading dashboard data...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">{stats.users || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Products</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.products || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Orders</h2>
            <p className="text-2xl font-bold text-purple-600">
              {stats.orders || 0}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-sm text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold text-orange-600">
              ₦{(stats.revenue || 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="mt-10 bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ New users registered</li>
          <li>🛒 New products added</li>
          <li>💳 Orders processed</li>
        </ul>
      </div>
    </div>
  );
}


