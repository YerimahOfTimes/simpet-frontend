import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Swal from "sweetalert2";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check login state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Handle login/logout click
  const handleUserClick = () => {
    if (user) {
      // Show logout confirmation
      Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          Swal.fire("Logged Out!", "You have been logged out.", "success");
          navigate("/login");
        }
      });
    } else {
      // Redirect to login
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-md">
      {/* ✅ Top Section: Logo, Search Bar, and Icons */}
      <div className="p-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-blue-600"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          SIMPET
        </h1>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center w-1/2 border rounded-full px-3 py-1">
          <IoSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 outline-none"
          />
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-6 relative">
          {/* 🔍 Search Icon for Mobile */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <IoSearch size={22} />
          </button>

          {/* 👤 User Icon (Login / Logout Handler) */}
          <button
            onClick={handleUserClick}
            className="cursor-pointer text-gray-700 hover:text-blue-600 transition"
            title={user ? "Logout" : "Login / Register"}
          >
            <FaRegUser size={24} />
          </button>

          {/* 🛒 Cart Icon */}
          <Link to="/cart" className="relative cursor-pointer">
            <FiShoppingCart
              size={24}
              className="text-gray-700 hover:text-blue-600 transition"
              title="Cart"
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* ✅ Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 animate-fadeIn">
          <div className="flex items-center border rounded-full px-3 py-2 shadow-sm">
            <IoSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 outline-none"
            />
          </div>
        </div>
      )}

      {/* ✅ Navbar Section */}
      <nav className="bg-blue-600 text-white py-2 relative z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Hamburger Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-end gap-8 font-medium">
            <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-yellow-300 transition">Products</Link></li>
            <li><Link to="/add-product" className="hover:text-yellow-300 transition">Add Product</Link></li>
            <li><Link to="/SellerDashboard" className="hover:text-yellow-300 transition">Dashboard</Link></li>
            <li><Link to="/events" className="hover:text-yellow-300 transition">Events</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link></li>
            <li><Link to="/settings" className="hover:text-yellow-300">Settings</Link></li>
          </ul>
        </div>

        {/* ✅ Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-4 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-44 md:hidden animate-fadeIn z-50">
            <ul className="flex flex-col text-sm">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Home</Link></li>
              <li><Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Products</Link></li>
              <li><Link to="/add-product" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Add Product</Link></li>
              <li><Link to="/SellerDashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Dashboard</Link></li>
              <li><Link to="/events" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Events</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Contact</Link></li>
              <li><Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 hover:bg-blue-100">Settings</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* ✅ Hidden Admin Shortcut */}
      <Link
        to="/admin/dashboard"
        className="fixed bottom-2 right-2 text-[10px] text-gray-300 hover:text-blue-600 transition-opacity opacity-10 hover:opacity-100"
      >
        Admin
      </Link>
    </header>
  );
}



