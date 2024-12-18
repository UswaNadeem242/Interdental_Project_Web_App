import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  //   const { user } = useAuth();
  const user = localStorage.getItem("token");

  if (!user) {
    // If no user, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
