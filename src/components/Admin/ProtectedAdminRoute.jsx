// src/components/Admin/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const admin = JSON.parse(localStorage.getItem("adminData")); // e.g. after login

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
