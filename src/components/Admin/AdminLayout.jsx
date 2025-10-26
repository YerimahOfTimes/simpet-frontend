import React from "react";
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
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  // ✅ Highlight the active menu link
  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded transition ${
      location.pathname.includes(path)
        ? "bg-blue-700 text-white"
        : "hover:bg-blue-800 text-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 flex flex-col shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center border-b border-blue-700 pb-3">
          Admin Panel
        </h2>

        {/* Navigation Links */}
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

        {/* Footer Navigation */}
        <div className="mt-auto pt-6 border-t border-blue-700">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* ✅ Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
