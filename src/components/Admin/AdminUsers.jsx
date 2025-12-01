import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://simpet-backend-1.onrender.com/api/admin/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `https://simpet-backend-1.onrender.com/api/admin/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Users Management
      </h1>
      <p className="text-gray-600 mb-8 text-center md:text-left">
        View and manage all registered users.
      </p>

      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-600">No users found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-3 text-sm sm:text-base font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-2 sm:p-3 text-sm sm:text-base font-semibold text-gray-600">
                  Email
                </th>
                <th className="p-2 sm:p-3 text-sm sm:text-base font-semibold text-gray-600 hidden sm:table-cell">
                  Role
                </th>
                <th className="p-2 sm:p-3 text-sm sm:text-base font-semibold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2 sm:p-3 text-gray-700 font-medium text-sm sm:text-base">
                    {user.name || "Unnamed"}
                  </td>
                  <td className="p-2 sm:p-3 text-gray-600 text-sm sm:text-base">
                    {user.email}
                  </td>
                  <td className="p-2 sm:p-3 text-gray-600 text-sm sm:text-base hidden sm:table-cell">
                    {user.role || "User"}
                  </td>
                  <td className="p-2 sm:p-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

