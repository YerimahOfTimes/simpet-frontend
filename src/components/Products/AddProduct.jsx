// src/components/Products/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    condition: "New",
    deliveryOption: "",
    location: "",
    tags: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [agreement, setAgreement] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  /* ✅ Handle Image Upload */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  /* ✅ Submit Form Data using Axios */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreement) {
      alert("⚠️ Please agree to the seller policy before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((image) => formData.append("images", image));

      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setProduct({
        name: "",
        brand: "",
        price: "",
        stock: "",
        category: "",
        condition: "New",
        deliveryOption: "",
        location: "",
        tags: "",
        description: "",
      });
      setImages([]);
      setPreviewImages([]);
      setAgreement(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6 mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-blue-700">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ============ Basic Info ============ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Brand"
              value={product.brand}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
        </section>

        {/* ============ Category & Condition ============ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
            Category & Condition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category (e.g. Electronics, Fashion)"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <select
              value={product.condition}
              onChange={(e) => setProduct({ ...product, condition: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            >
              <option>New</option>
              <option>Used - Like New</option>
              <option>Used - Good</option>
              <option>Used - Fair</option>
            </select>
          </div>
        </section>

        {/* ============ Delivery & Location ============ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
            Delivery & Seller Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={product.deliveryOption}
              onChange={(e) => setProduct({ ...product, deliveryOption: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Select Delivery Option</option>
              <option value="Door Delivery">Door Delivery</option>
              <option value="Pickup Only">Pickup Only</option>
              <option value="Both Options">Both Options</option>
            </select>
            <input
              type="text"
              placeholder="Seller Location (City / State)"
              value={product.location}
              onChange={(e) => setProduct({ ...product, location: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <input
            type="text"
            placeholder="Tags (comma separated e.g. electronics, phone, gadget)"
            value={product.tags}
            onChange={(e) => setProduct({ ...product, tags: e.target.value })}
            className="border rounded px-3 py-2 w-full mt-3"
          />
        </section>

        {/* ============ Description ============ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
            Product Description
          </h3>
          <textarea
            placeholder="Write a detailed description..."
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full border rounded px-3 py-2 h-32"
            required
          ></textarea>
        </section>

        {/* ============ Images ============ */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
            Product Images
          </h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="border rounded px-3 py-2 w-full"
          />
          <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded border"
              />
            ))}
          </div>
        </section>

        {/* ============ Agreement ============ */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            View Seller Agreement
          </button>
        </div>

        <label className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the seller agreement and commission policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreement}
          className={`w-full py-2 rounded text-white font-medium mt-4 ${
            agreement
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Product
        </button>
      </form>

      {/* 🧾 Modal for Agreement */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-11/12 max-w-2xl p-6 overflow-y-auto max-h-[85vh] relative">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
              SIMPET Seller Agreement & Commission Policy
            </h3>
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                By submitting your product for listing on <strong>SIMPET</strong>, you confirm that you are the legal owner or authorized reseller of the item.
              </p>
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  <strong>Commission Policy:</strong> A fee of <strong>1.2%</strong> of the total sale amount is automatically charged on every successful online transaction.
                </li>
                <li>
                  If the transaction is completed in person, the seller must remit <strong>1%</strong> of the sale value to SIMPET.
                </li>
                <li>Sellers must provide clear and truthful product details and images.</li>
                <li>All prices must include VAT or other applicable charges if required.</li>
              </ul>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
