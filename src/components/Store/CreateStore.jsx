import React, { useState } from "react";
import axios from "axios";

const CreateStore = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (logo) formData.append("logo", logo);

    try {
      await axios.post("http://localhost:5000/api/stores", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Store created successfully!");
      window.location.href = "/store";
    } catch (err) {
      alert(err.response?.data?.message || "Error creating store");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Store</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Store Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Store Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={form.contactEmail}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="contactPhone"
          placeholder="Contact Phone"
          value={form.contactPhone}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Store
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
