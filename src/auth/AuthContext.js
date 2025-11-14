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

  const login = (user, token, role) => {
    localStorage.setItem("token", token);
    const userToStore = role
      ? { ...user, roles: [role] }
      : user;

    localStorage.setItem("users", JSON.stringify(userToStore));
    setUser(userToStore);
    setLoading(false);
  };


  const updateUser = (updatedUserData) => {
    localStorage.setItem("users", JSON.stringify({ ...updatedUserData, roles: [updatedUserData.role] }));
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

      setCartCount(count);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  }, [user]);

  const fetchUnreadNotificationsCount = useCallback(async (force = false) => {
    if (!user) return;

    if (!force && notificationFetchRef.current) {
      return;
    }

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
      notificationFetchTimeoutRef.current = setTimeout(() => {
        notificationFetchRef.current = false;
      }, 2000);
    }
  }, [user]);

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
    if (notificationFetchTimeoutRef.current) {
      clearTimeout(notificationFetchTimeoutRef.current);
      notificationFetchTimeoutRef.current = null;
    }
    notificationFetchRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (notificationFetchTimeoutRef.current) {
        clearTimeout(notificationFetchTimeoutRef.current);
      }
    };
  }, []);

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

  const getUserRoles = () => {
    if (!user) return [];
    let roles =
      user.roles ||
      user.Roles ||
      user.role ||
      user.Role ||
      [];
    if (Array.isArray(roles)) {
      return roles;
    }
    if (typeof roles === "string") {
      return [roles];
    }
    return [];
  };

  useEffect(() => {
    if (user) {
      const userRoles = getUserRoles();
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

    if (userRoles.includes("DOCTOR")) {
      return !!(user.drLicenseNo && user.officeRefNo);
    }

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
