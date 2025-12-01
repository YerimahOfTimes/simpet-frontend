// At the top, add:
import React, { useState, useEffect } from "react";
import axios from "axios";

const defaultAdmin = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
  role: "admin",
};


export default function AdminSettings() {
  // Existing states
  const [admin, setAdmin] = useState(defaultAdmin);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [users, setUsers] = useState([]); // NEW
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Load settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("https://simpet-backend-1.onrender.com/api/admin/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data || defaultAdmin);
      } catch (err) {
        console.warn("⚠️ Could not fetch admin settings, using defaults");
      }
    };
    fetchSettings();
    fetchUsers();
  }, [token]);

  // NEW: Fetch users for user management
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://simpet-backend-1.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // NEW: Make a user admin
  const makeAdmin = async (userId) => {
    try {
      const res = await axios.put(
        `https://simpet-backend-1.onrender.com/api/admin/make-admin/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to make user admin");
    }
  };

  // …keep all your existing functions (handleChange, handleAvatarUpload, etc.)

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
        Admin Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> {/* change grid-cols-3 → grid-cols-4 */}

        {/* LEFT / MIDDLE / RIGHT sections remain as-is */}
        {/* ...existing Profile, System Controls, Security sections */}

        {/* NEW: User Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b p-2"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    {user.role === "user" ? (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span className="text-green-600 font-medium">Admin</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

