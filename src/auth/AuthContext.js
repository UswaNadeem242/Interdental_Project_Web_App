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
    console.log("=-==-=-=user=-=--==--=-=", user);
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
      console.log("resposne: datta:", response);
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

// // src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ⬅️ show loader while checking session
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem("token", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//     setWishlistCount(0);
//     setCartCount(0);
//   };

//   // 🔹 Check user session on page refresh
//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem("token");
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!token || !refreshToken) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // verify token with backend
//         const res = await axios.get(`${BASE_URL}/api/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("-=-==-==--sakldmalsdmldsamkldsa=-=-=-==-=--==--=-=");

//         setUser(res.data.user);
//       } catch (err) {
//         console.log("Access token expired, trying refresh...");

//         try {
//           const res = await axios.post(`${BASE_URL}/api/refresh`, {
//             refreshToken,
//           });

//           const { accessToken, refreshToken: newRefresh, user } = res.data;

//           localStorage.setItem("token", accessToken);
//           localStorage.setItem("refreshToken", newRefresh);
//           setUser(user);
//         } catch (refreshErr) {
//           console.error("Refresh token invalid, logging out:", refreshErr);
//           logout();
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   // 🔹 Refresh token every 10 minutes
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) return;

//       try {
//         const res = await axios.post(`${BASE_URL}/api/refresh`, {
//           refreshToken,
//         });
//         const { accessToken, refreshToken: newRefresh, user } = res.data;

//         localStorage.setItem("token", accessToken);
//         localStorage.setItem("refreshToken", newRefresh);
//         if (user) setUser(user);
//       } catch (err) {
//         console.error("Auto refresh failed, logging out:", err);
//         logout();
//       }
//     }, 10 * 60 * 1000);

//     console.log("-=-==-==--=-=-=-==-=--==--=-=");

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <div>Loading...</div>; // ⬅️ prevent flicker

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
