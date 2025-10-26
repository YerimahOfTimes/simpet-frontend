import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../../api/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Detect if this login page is for admin (e.g., /admin/login route)
  const isAdminLogin = location.pathname.includes("/admin");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
        isAdmin: isAdminLogin, // 👈 add this flag for admin login
      });

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Login successful");

      // Redirect based on user role
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-4">
        <FaUserCircle className="text-blue-600" size={64} />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        {isAdminLogin ? "Admin Sign In" : "Sign In to Your Account"}
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isAdminLogin ? "Sign In as Admin" : "Sign In"}
        </button>
      </form>

      {!isAdminLogin && (
        <>
          <div className="mt-4 text-center text-sm">
            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
