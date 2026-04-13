import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { DEFAULT_ROUTES } from "../constants/roles";

const RoleRoute = ({
  children,
  allowedRoles = [],
  exactRole = false, // If true, user must have exactly the specified role
  fallbackRoute = null,
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRoles = getUserRoles();

  // If exactRole is true, user must have exactly the specified role
  if (exactRole && allowedRoles.length > 0) {
    const hasExactRole = allowedRoles.some(
      (role) => userRoles.length === 1 && userRoles[0] === role
    );

    if (!hasExactRole) {
      const highestRole = getUserHighestRole();
      const defaultRoute = DEFAULT_ROUTES[highestRole] || "/";
      return <Navigate to={fallbackRoute || defaultRoute} replace />;
    }
  } else {
    // Check if user has any of the allowed roles
    if (!hasUserAnyRole(allowedRoles)) {
      const highestRole = getUserHighestRole();
      const defaultRoute = DEFAULT_ROUTES[highestRole] || "/";
      return <Navigate to={fallbackRoute || defaultRoute} replace />;
    }
  }

  return children;
};

export default RoleRoute;
