// src/components/Products/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      {/* Product Image */}
      <div className="w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000/${product.image || "uploads/default.jpg"}`
          }
          alt={product.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-700 text-sm sm:text-base">
            ₦{product.price?.toLocaleString()}
          </span>
          <button className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
