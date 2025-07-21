// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import App from "../App";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../store/slice/userSlice.js";
import Loader from "./Loader.jsx";
const ProtectedRoute = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
   useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const res = await axios.get("http://localhost:3000/api/v1/user/directlogin", {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setUser(res?.data.user));
          navigate("/");
          setIsLoading(false)
        }
      } catch (err) {
        console.log("Auto login failed:", err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate]);

   const {isAuthenticated} = useSelector((state)=>state?.user)
  return isAuthenticated ? <App /> : isLoading ? <Loader/>  : <Navigate to="/auth" />;
};

export default ProtectedRoute;
