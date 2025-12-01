import React from "react";
import { Menu } from "lucide-react";

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 sticky top-0 z-50">
      {/* Sidebar toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-blue-600 p-2 rounded hover:bg-blue-100 transition"
      >
        <Menu size={24} />
      </button>

      {/* Page Title */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center md:text-left flex-1">
        Admin Dashboard
      </h2>
    </header>
  );
}

