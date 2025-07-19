// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import App from "../App";
import { useSelector } from "react-redux";
import { useDirectLoginQuery } from "../store/api/userApi";

const ProtectedRoute = () => {
  const resp = useDirectLoginQuery()
   const {isAuthenticated} = useSelector((state)=>state?.user)
  return isAuthenticated ? <App /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
