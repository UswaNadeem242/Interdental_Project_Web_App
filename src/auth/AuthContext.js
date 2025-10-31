import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { BASE_URL } from "../config";
import {
  hasRole,
  hasAnyRole,
  hasRoleAccess,
  getHighestRole,
} from "../constants/roles";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const notificationFetchRef = useRef(false);
  const notificationFetchTimeoutRef = useRef(null);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("users", JSON.stringify(user));
    setUser(user);
    setLoading(false);
  };

  const updateUser = (updatedUserData) => {
    localStorage.setItem("users", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  const fetchWishlistCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response?.data?.items?.length, "WISHLIST_COUNT");
      setWishlistCount(response?.data?.items?.length);
    } catch (err) {
      console.log("Error fetching wishlist count:", err);
    }
  }, [user]);

  const fetchCartCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const count = response?.data?.items?.length ?? 0;

      setCartCount(count); // fallback to 0
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  }, [user]);

  const fetchUnreadNotificationsCount = useCallback(async (force = false) => {
    if (!user) return;
    
    // Prevent duplicate calls within 2 seconds unless forced
    if (!force && notificationFetchRef.current) {
      return;
    }
    
    // Clear any existing timeout
    if (notificationFetchTimeoutRef.current) {
      clearTimeout(notificationFetchTimeoutRef.current);
    }
    
    notificationFetchRef.current = true;
    
    try {
      const response = await axios.get(`${BASE_URL}/api/notification`, {
        params: { page: 0, size: 1 },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const unreadCount = response?.data?.data?.unReadCount ?? 0;
      setUnreadNotificationsCount(unreadCount);
    } catch (error) {
      console.error("Failed to fetch unread notifications count:", error);
      setUnreadNotificationsCount(0);
    } finally {
      // Allow fetching again after 2 seconds
      notificationFetchTimeoutRef.current = setTimeout(() => {
        notificationFetchRef.current = false;
      }, 2000);
    }
  }, [user]);

  // 🔹 Refresh token every 10 minutes
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const refreshToken = localStorage.getItem("token");

        if (!refreshToken) return;

        try {
          const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {
            token: refreshToken,
          });

          const { accessToken, refreshToken: user } = res.data;

          localStorage.setItem("token", accessToken);
          if (user) setUser(user);
        } catch (err) {
          console.error("Auto refresh failed, logging out:", err);
          logout();
        }
      },
      1 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    setUser(null);
    setWishlistCount(0);
    setCartCount(0);
    setUnreadNotificationsCount(0);
    setLoading(false);
    // Clear notification fetch timeout
    if (notificationFetchTimeoutRef.current) {
      clearTimeout(notificationFetchTimeoutRef.current);
      notificationFetchTimeoutRef.current = null;
    }
    notificationFetchRef.current = false;
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationFetchTimeoutRef.current) {
        clearTimeout(notificationFetchTimeoutRef.current);
      }
    };
  }, []);

  // Initialize user from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("users");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Helper functions for role management
  const getUserRoles = () => {
    if (!user) return [];
    // Handle different possible role property names with safe access
    const roles =
      user && typeof user === "object"
        ? user["roles"] || user["Roles"] || user["role"] || user["Role"]
        : [];
    return Array.isArray(roles) ? roles : [];
  };

  // Fetch counts when user is available (but skip for DOCTOR role - they have their own dashboard)
  useEffect(() => {
    if (user) {
      const userRoles = getUserRoles();
      // Don't fetch cart/wishlist/notifications for doctors
      if (userRoles.includes("DOCTOR")) {
        return;
      }
      fetchWishlistCount();
      fetchCartCount();
      fetchUnreadNotificationsCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const hasUserRole = (role) => {
    return hasRole(getUserRoles(), role);
  };

  const hasUserAnyRole = (roles) => {
    return hasAnyRole(getUserRoles(), roles);
  };

  const hasUserRoleAccess = (route) => {
    return hasRoleAccess(getUserRoles(), route);
  };

  const getUserHighestRole = () => {
    return getHighestRole(getUserRoles());
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("token");
  };

  const isProfileComplete = () => {
    if (!user) return false;
    
    const userRoles = getUserRoles();
    
    // For DOCTOR role, check if drLicenseNo and officeRefNo exist
    if (userRoles.includes("DOCTOR")) {
      return !!(user.drLicenseNo && user.officeRefNo);
    }
    
    // For other roles, profile is considered complete
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
        fetchWishlistCount,
        wishlistCount,
        cartCount,
        fetchCartCount,
        unreadNotificationsCount,
        fetchUnreadNotificationsCount,
        // Role management functions
        getUserRoles,
        hasUserRole,
        hasUserAnyRole,
        hasUserRoleAccess,
        getUserHighestRole,
        isAuthenticated,
        isProfileComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
