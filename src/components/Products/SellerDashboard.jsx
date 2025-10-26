// src/components/Products/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerDashboard = () => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/seller/me");
        setSellerProducts(res.data || []);
      } catch (error) {
        console.error("❌ Failed to load seller products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

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
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://localhost:5000/${item.image || "uploads/default.jpg"}`
                }
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
              <p className="text-blue-600 font-bold mt-1">
                ₦{item.price?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Sold: {item.sold || 0}</p>

              <div className="mt-3 flex justify-between">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm">
                  Edit
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm">
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
