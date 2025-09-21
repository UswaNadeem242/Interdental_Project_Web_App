import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const login = (user, token) => {
     localStorage.setItem("token", token);
    localStorage.setItem("users", JSON.stringify(user));
    setUser(user);
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
    localStorage.setItem("users", null);
    setUser(null);
    fetchWishlistCount()
    fetchCartCount()
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        fetchWishlistCount,
        wishlistCount,
        cartCount,
        fetchCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};