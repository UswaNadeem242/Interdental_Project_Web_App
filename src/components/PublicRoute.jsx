import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { DEFAULT_ROUTES } from "../constants/roles";

const PublicRoute = ({ children, redirectAuthenticated = true }) => {
  const { isAuthenticated, loading, getUserHighestRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondaryBrand"></div>
      </div>
    );
  }

  // If user is authenticated and we should redirect them
  if (isAuthenticated() && redirectAuthenticated) {
    // Get the intended destination or default route
    const from = location.state?.from?.pathname;
    if (from) {
      return <Navigate to={from} replace />;
    }

    // Redirect to appropriate dashboard based on user's highest role
    const highestRole = getUserHighestRole();
    const defaultRoute = DEFAULT_ROUTES[highestRole] || "/";

    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default PublicRoute;
