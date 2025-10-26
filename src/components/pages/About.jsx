import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          About Simpet
        </h1>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-10">
          Welcome to <span className="font-semibold text-blue-600">Simpet</span>, 
          your trusted online marketplace connecting buyers, sellers, and event lovers. 
          We make it easy for users to showcase their products, discover new items, 
          and even organize or attend exciting local events — all in one place!
        </p>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower small businesses and individuals 
              by providing them with a simple, secure, and efficient platform 
              to reach customers and grow their brand. We aim to promote trust, 
              transparency, and community-driven trade in every transaction.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where buying and selling are easier, 
              safer, and more enjoyable for everyone — whether you're a seller 
              showcasing your creativity or a buyer searching for unique products.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white p-8 rounded-2xl shadow mb-10">
          <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-700 text-center mb-4">
            Simpet was built by a passionate team of developers, designers, and thinkers 
            who believe that technology should make local commerce better.
          </p>
          <p className="text-center text-gray-600">
            Together, we’re working to create opportunities for every seller 
            and convenience for every buyer.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
