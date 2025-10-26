// src/components/Products/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Loading product details...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000/${product.image || "uploads/default.jpg"}`
          }
          alt={product.name}
          className="w-full sm:w-1/2 h-64 sm:h-80 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold text-xl sm:text-2xl mt-4">
            ₦{product.price?.toLocaleString()}
          </p>
          <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
