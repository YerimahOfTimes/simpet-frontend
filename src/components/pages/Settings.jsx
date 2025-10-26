import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({});
  const [buyerSettings, setBuyerSettings] = useState({});
  const [sellerSettings, setSellerSettings] = useState({});
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Axios instance for reuse
  const api = axios.create({
    baseURL: "http://localhost:5000/api/settings",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/${userId}`);
        setProfile(res.data.profile || {});
        setBuyerSettings(res.data.buyerSettings || {});
        setSellerSettings(res.data.sellerSettings || {});
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  // Handle input change for different sections
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "profile") setProfile({ ...profile, [name]: value });
    if (section === "buyer") setBuyerSettings({ ...buyerSettings, [name]: value });
    if (section === "seller") setSellerSettings({ ...sellerSettings, [name]: value });
    if (section === "passwords") setPasswords({ ...passwords, [name]: value });
  };

  // Update Profile
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/${userId}/profile`, profile);
      alert("Profile updated successfully!");
      setProfile(res.data);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Update Buyer Settings
  const handleBuyerUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/${userId}/buyer`, buyerSettings);
      alert("Buyer settings updated successfully!");
    } catch (err) {
      console.error("Error updating buyer settings:", err);
      alert("Failed to update buyer settings.");
    } finally {
      setLoading(false);
    }
  };

  // Update Seller Settings
  const handleSellerUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/${userId}/seller`, sellerSettings);
      alert("Seller settings updated successfully!");
    } catch (err) {
      console.error("Error updating seller settings:", err);
      alert("Failed to update seller settings.");
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      await api.put(`/${userId}/password`, passwords);
      alert("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await api.delete(`/${userId}`);
      alert("Account deleted successfully.");
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  // UI Tabs
  const renderTabs = () => {
    const tabs = [
      { id: "profile", label: "Profile" },
      { id: "buyer", label: "Buyer Settings" },
      { id: "seller", label: "Seller Settings" },
      { id: "password", label: "Change Password" },
      { id: "delete", label: "Delete Account" },
    ];

    return (
      <div className="flex justify-center mb-6 gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  // Profile Section
  const renderProfile = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Profile Information</h3>
      {["name", "email", "phone", "address"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={profile[field] || ""}
            onChange={(e) => handleChange(e, "profile")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}
      <button
        onClick={handleProfileUpdate}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-6 py-2 rounded-lg`}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );

  // Buyer Settings Section
  const renderBuyerSettings = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Buyer Preferences</h3>
      {["preferredCategory", "notificationEmail", "deliveryAddress"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            name={field}
            value={buyerSettings[field] || ""}
            onChange={(e) => handleChange(e, "buyer")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}
      <button
        onClick={handleBuyerUpdate}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        } text-white px-6 py-2 rounded-lg`}
      >
        {loading ? "Saving..." : "Save Buyer Settings"}
      </button>
    </div>
  );

  // Seller Settings Section
  const renderSellerSettings = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Seller Preferences</h3>
      {["shopName", "businessType", "bankAccount", "shopAddress"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            name={field}
            value={sellerSettings[field] || ""}
            onChange={(e) => handleChange(e, "seller")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}
      <button
        onClick={handleSellerUpdate}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
        } text-white px-6 py-2 rounded-lg`}
      >
        {loading ? "Saving..." : "Save Seller Settings"}
      </button>
    </div>
  );

  // Password Change Section
  const renderPasswordChange = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Change Password</h3>
      {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="password"
            name={field}
            value={passwords[field] || ""}
            onChange={(e) => handleChange(e, "passwords")}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}
      <button
        onClick={handlePasswordChange}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-yellow-600 hover:bg-yellow-700"
        } text-white px-6 py-2 rounded-lg`}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );

  // Delete Account Section
  const renderDeleteAccount = () => (
    <div className="space-y-4 bg-red-50 p-6 rounded-lg border border-red-200">
      <h3 className="text-xl font-semibold text-red-700 mb-3">
        Delete Your Account
      </h3>
      <p className="text-gray-700 mb-3">
        Deleting your account will permanently erase your data, listings, and
        history. This action cannot be undone.
      </p>
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
        } text-white px-6 py-2 rounded-lg`}
      >
        {loading ? "Deleting..." : "Delete Account Permanently"}
      </button>
    </div>
  );

  // Render main UI
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Account Settings</h2>
      {renderTabs()}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "profile" && renderProfile()}
        {activeTab === "buyer" && renderBuyerSettings()}
        {activeTab === "seller" && renderSellerSettings()}
        {activeTab === "password" && renderPasswordChange()}
        {activeTab === "delete" && renderDeleteAccount()}
      </div>
    </div>
  );
};

export default Settings;
