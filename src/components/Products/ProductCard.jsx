import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "http://localhost:5000/uploads/default.jpg";

  // Add product to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart!");
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      {/* Clickable image to go to product details */}
      <div
        className="w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={imageUrl}
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
          {product.location && (
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Location: {product.location}
            </p>
          )}
          {product.sellerEmail && (
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Email: {product.sellerEmail}
            </p>
          )}
          {product.sellerPhone && (
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Phone: {product.sellerPhone}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-700 text-sm sm:text-base">
            ₦{product.price?.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;







