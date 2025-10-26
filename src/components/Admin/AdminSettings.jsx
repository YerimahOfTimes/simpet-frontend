import React, { useState, useEffect } from "react";
import axios from "axios";

const defaultAdmin = {
  name: "Admin User",
  email: "admin@simpet.com",
  phone: "+2348000000000",
  role: "Super Admin",
  avatar: "",
  siteCommissionOnline: 1.2,
  siteCommissionOffline: 1.0,
  maintenanceMode: false,
  allowNewRegistrations: true,
  logRetentionDays: 90,
};

export default function AdminSettings() {
  const [admin, setAdmin] = useState(defaultAdmin);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Load settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data || defaultAdmin);
      } catch (err) {
        console.warn("⚠️ Could not fetch admin settings, using defaults");
      }
    };
    fetchSettings();
  }, [token]);

  const handleChange = (key, value) => setAdmin((a) => ({ ...a, [key]: value }));

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmin((a) => ({ ...a, avatar: res.data.url }));
      alert("✅ Avatar uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Failed to upload avatar");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put("http://localhost:5000/api/admin/settings", admin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Admin settings saved successfully.");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default?")) {
      setAdmin(defaultAdmin);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwords.newPass) return alert("Enter new password");
    if (passwords.newPass !== passwords.confirm) return alert("Passwords do not match");

    try {
      await axios.put(
        "http://localhost:5000/api/admin/change-password",
        {
          currentPassword: passwords.current,
          newPassword: passwords.newPass,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Password updated successfully!");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      console.error("Password change error:", err);
      alert("❌ Failed to change password");
    }
  };

  const handleSystemClear = () => {
    if (window.confirm("Are you sure? This will clear all local data (demo only).")) {
      localStorage.clear();
      alert("All local data cleared.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
        Admin Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {admin.avatar ? (
                <img src={admin.avatar} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">No Avatar</span>
              )}
            </div>
            <button
              className="mt-2 text-blue-600 text-sm hover:underline"
              onClick={() => document.getElementById("admin-avatar").click()}
            >
              Change Avatar
            </button>
            <input
              id="admin-avatar"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                value={admin.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={admin.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                value={admin.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <input
                value={admin.role}
                readOnly
                className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* MIDDLE: System Controls */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Controls</h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Online Sales Commission (%)</label>
              <input
                type="number"
                step="0.1"
                value={admin.siteCommissionOnline}
                onChange={(e) => handleChange("siteCommissionOnline", parseFloat(e.target.value))}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Offline Sales Commission (%)</label>
              <input
                type="number"
                step="0.1"
                value={admin.siteCommissionOffline}
                onChange={(e) => handleChange("siteCommissionOffline", parseFloat(e.target.value))}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span>Maintenance Mode</span>
              <input
                type="checkbox"
                checked={admin.maintenanceMode}
                onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <span>Allow New Registrations</span>
              <input
                type="checkbox"
                checked={admin.allowNewRegistrations}
                onChange={(e) => handleChange("allowNewRegistrations", e.target.checked)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mt-3 block">Log Retention (days)</label>
              <input
                type="number"
                value={admin.logRetentionDays}
                onChange={(e) => handleChange("logRetentionDays", parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3 flex-wrap">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded border hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT: Security */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>

          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="text-sm font-medium">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, current: e.target.value }))
                }
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                value={passwords.newPass}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, newPass: e.target.value }))
                }
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, confirm: e.target.value }))
                }
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>

          <hr className="my-6" />

          <div>
            <h3 className="font-medium mb-2">Data Management</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use these tools carefully. Actions below are for demo only and do
              not affect actual backend data.
            </p>
            <button
              onClick={handleSystemClear}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear All Local Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
