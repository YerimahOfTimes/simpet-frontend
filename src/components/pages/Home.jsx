import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// 🖼️ Banner images for carousel
const bannerImages = [
  "https://images.unsplash.com/photo-1607083206173-3f80a9196d49?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1585386959984-a41552262e4b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Smart Watch",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1518449007430-2c14b7a00e0e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Stylish Backpack",
      price: 9500,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div>
      {/* 🦋 HERO SECTION */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {bannerImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Banner ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Simpet Store
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover amazing products and connect directly with sellers.
          </p>
          <Link
            to="/Products"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Left/Right Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* 🌟 FEATURED PRODUCTS */}
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/Products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* 🧾 About / CTA Section */}
      <section className="bg-gray-100 py-12 px-6 md:px-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Why Choose Simpet?</h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Simpet connects buyers and sellers in a fast, secure, and transparent
          way. Shop confidently, chat directly with sellers, and enjoy flexible
          payment options including transfers, cards, or in-person deals.
        </p>
        <Link
          to="/about"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Learn More
        </Link>
      </section>
    </div>
  );
}




