import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondaryBrand"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    // If no user, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
