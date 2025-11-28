// src/components/Products/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerDashboard = () => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch seller products
  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get(
        "https://simpet-backend-1.onrender.com/api/products/seller/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSellerProducts(res.data.products || []);
    } catch (error) {
      console.error("❌ Failed to load seller products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`https://simpet-backend-1.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSellerProducts((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete product:", error);
      alert("❌ Failed to delete product");
    }
  };

  // Totals
  const totalProducts = sellerProducts.length;
  const totalSold = sellerProducts.reduce((sum, p) => sum + (p.sold || 0), 0);
  const totalEarnings = sellerProducts.reduce(
    (sum, p) => sum + (p.sold * (p.price || 0)),
    0
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Seller Dashboard</h1>
        <Link
          to="/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition w-full sm:w-auto text-center"
        >
          + Add New Product
        </Link>
      </div>

      {/* Totals */}
      <div className="flex flex-wrap gap-4 mb-6 text-gray-700">
        <p>Total Products: <strong>{totalProducts}</strong></p>
        <p>Total Sold: <strong>{totalSold}</strong></p>
        <p>Total Earnings: <strong>₦{totalEarnings.toLocaleString()}</strong></p>
      </div>

      {sellerProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t listed any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sellerProducts.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-sm hover:shadow-lg transition duration-300 p-4 bg-white"
            >
              <img
                src={
                  item.images?.[0]?.startsWith("http")
                    ? item.images[0]
                    : `https://simpet-backend-1.onrender.com/${item.images?.[0] || "uploads/default.jpg"}`
                }
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
              <p className="text-blue-600 font-bold mt-1">
                ₦{item.price?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {item.stock || 0} | Sold: {item.sold || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Location: {item.location || "N/A"}
              </p>

              <div className="mt-3 flex justify-between">
                <Link
                  to={`/edit-product/${item._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;


