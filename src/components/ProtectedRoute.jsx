// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import App from "../App";

const ProtectedRoute = () => {
  console.log("runing");
  return true ? <App /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
