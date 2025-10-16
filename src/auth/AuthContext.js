import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("users", JSON.stringify(user));
    setUser(user);
    setLoading(false);
  };

  const fetchWishlistCount = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWishlistCount(response?.data?.items?.length);
    } catch (err) {
      console.log("Error fetching wishlist count:", err);
    }
  };

  const fetchCartCount = async () => {
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
  };

  // 🔹 Refresh token every 10 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
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
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    setUser(null);
    setWishlistCount(0);
    setCartCount(0);
    setLoading(false);
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        fetchWishlistCount,
        wishlistCount,
        cartCount,
        fetchCartCount,
        // Role management functions
        getUserRoles,
        hasUserRole,
        hasUserAnyRole,
        hasUserRoleAccess,
        getUserHighestRole,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};