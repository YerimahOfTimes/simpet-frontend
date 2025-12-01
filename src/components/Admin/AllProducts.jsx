import React, { useEffect, useState } from "react";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://simpet-backend-1.onrender.com/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `https://simpet-backend-1.onrender.com/api/admin/products/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-4 animate-pulse">Loading products...</p>;

  if (!Array.isArray(products) || products.length === 0)
    return <p className="text-center text-gray-500 mt-4">No products found.</p>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <table className="w-full border-collapse min-w-[600px] text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Seller</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.seller?.name || "Unknown"}</td>
              <td className="p-2 border">₦{p.price?.toLocaleString() || 0}</td>
              <td className="p-2 border">{p.stock ?? 0}</td>
              <td className="p-2 border flex gap-2">
                <button className="text-blue-500 hover:underline text-xs sm:text-sm">
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline text-xs sm:text-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;

