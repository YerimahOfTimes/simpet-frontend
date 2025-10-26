import React from "react";
import { Menu } from "lucide-react";

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      <button onClick={toggleSidebar} className="md:hidden text-blue-600">
        <Menu size={24} />
      </button>
      <h2 className="text-xl font-semibold text-gray-700">Admin Dashboard</h2>
    </header>
  );
}
