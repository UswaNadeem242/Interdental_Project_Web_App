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
      console.log("resposne: datta:", response);
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
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

