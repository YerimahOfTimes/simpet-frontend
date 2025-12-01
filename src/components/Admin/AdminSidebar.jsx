import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 p-5 flex flex-col z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:static`}
      >
        <h1 className="text-2xl font-bold mb-10 text-center">Admin Panel</h1>

        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md transition ${
                location.pathname === item.path
                  ? "bg-blue-500"
                  : "hover:bg-blue-600"
              }`}
              onClick={toggleSidebar} // Close sidebar on mobile after click
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 p-2 hover:bg-blue-600 rounded-md">
          <LogOut size={18} /> Logout
        </button>
      </aside>
    </>
  );
}

