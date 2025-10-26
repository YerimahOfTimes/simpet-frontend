import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-10 mt-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* 🏢 Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SIMPET</h2>
          <p className="text-sm text-gray-200">
            Your trusted marketplace for buying and selling quality products.
            Connect with real people and shop smartly anytime, anywhere.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-300 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-200">
            <li>Email: support@simpet.com</li>
            <li>Phone: +234 8021436895</li>
            <li>Address: Benin City, Nigeria</li>
          </ul>
        </div>

        {/* 🌍 Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Divider */}
      <div className="border-t border-blue-500 mt-10 pt-4 text-center text-gray-200 text-sm">
        <p>
          © {new Date().getFullYear()} <strong>SIMPET</strong>. All rights
          reserved.
        </p>
        <p className="mt-1">
          Developed with 💙 by <span className="text-yellow-300">Yerimah Of Times</span>
        </p>
      </div>
    </footer>
  );
}

