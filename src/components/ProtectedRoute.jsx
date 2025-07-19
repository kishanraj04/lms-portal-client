// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import App from "../App";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
   const {isAuthenticated} = useSelector((state)=>state?.user)
  return isAuthenticated ? <App /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
