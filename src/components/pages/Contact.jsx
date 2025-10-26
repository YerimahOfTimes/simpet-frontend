import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Have questions, feedback, or need help? We’d love to hear from you!
          Use the form below or reach us through our social media channels.
        </p>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message..."
                  className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl shadow flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-3">
              <strong>Email:</strong> support@simpet.com
            </p>
            <p className="mb-3">
              <strong>Phone:</strong> +234 802 143 6895
            </p>
            <p className="mb-6">
              <strong>Address:</strong> 19 Street BDPA, Benin City, Nigeria
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300">Facebook</a>
              <a href="#" className="hover:text-yellow-300">Twitter</a>
              <a href="#" className="hover:text-yellow-300">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
