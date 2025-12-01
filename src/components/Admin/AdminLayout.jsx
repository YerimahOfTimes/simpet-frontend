import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ShoppingBag,
  Store,
  DollarSign,
  Settings,
  ArrowLeft,
  Menu,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "hover:bg-blue-800 text-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-blue-900 text-white px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h2 className="font-bold text-lg">Admin Panel</h2>
        <div /> {/* empty for spacing */}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-blue-900 text-white w-64 p-5 shadow-lg transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className={linkClass("dashboard")}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/users" className={linkClass("users")}>
            <Users size={18} /> Users
          </Link>
          <Link to="/admin/events" className={linkClass("events")}>
            <CalendarDays size={18} /> Events
          </Link>
          <Link to="/admin/products" className={linkClass("products")}>
            <ShoppingBag size={18} /> Products
          </Link>
          <Link to="/admin/sellers" className={linkClass("sellers")}>
            <Store size={18} /> Sellers
          </Link>
          <Link to="/admin/withdrawals" className={linkClass("withdrawals")}>
            <DollarSign size={18} /> Withdrawals
          </Link>
          <Link to="/admin/settings" className={linkClass("settings")}>
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-blue-700">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
