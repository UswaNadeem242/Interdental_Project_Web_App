import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { ERole, DEFAULT_ROUTES } from "../constants/roles";

const PrivateRoute = ({
  children,
  requiredRoles = [],
  redirectTo = "/login",
}) => {
  const {
    isAuthenticated,
    loading,
    getUserRoles,
    hasUserAnyRole,
    getUserHighestRole,
  } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondaryBrand"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If no specific roles required, allow access to any authenticated user
  if (!requiredRoles || requiredRoles.length === 0) {
    return children;
  }

  const userRoles = getUserRoles();

  // Check if user has any of the required roles
  if (!hasUserAnyRole(requiredRoles)) {
    // Redirect to appropriate dashboard based on user's highest role
    const highestRole = getUserHighestRole();
    const defaultRoute = DEFAULT_ROUTES[highestRole] || "/";

    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default PrivateRoute;
