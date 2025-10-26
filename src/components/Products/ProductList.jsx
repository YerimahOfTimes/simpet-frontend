// src/components/Products/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        let data = res.data;

        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = data.products || [];
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 animate-pulse">Loading products...</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Available Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, index) => (
            <ProductCard key={p._id || index} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
