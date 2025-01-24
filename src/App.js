import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Orders from "./pages/Orders";
import OrderInfo from "./pages/OrderInfo";
import Admin from "./pages/admin/Admin";
import ProtectedRoute from "./components/ProtectRoute";
import AdminSidebar from "./components/admin/AdminSidebar";
import { AuthProvider } from "./auth/AuthContext";
import Wishlist from "./pages/Wishlist";
// const SingleProduct = React.lazy(() => import("./pages/SingleProduct"));

const MainLayout = ({ children }) => (
  // <ProtectedRoute>
  <>
    <Header />
    {children}
    <Footer />
  </>
  // </ProtectedRoute>
);

const PlainLayout = ({ children }) => (
  <div className="flex absolute pt-[16px] pl-[16px] pb-[16px] gap-8 bg-gray-200 w-full">
    <AdminSidebar />
    {children}
  </div>
);
const SimpleLayout = ({ children }) => <div className="">{children}</div>;

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter basename="/build">
          {/* <Header /> */}
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/shop"
              element={
                <MainLayout>
                  <Shop />
                </MainLayout>
              }
            />
            <Route
              path="/brands"
              element={
                <MainLayout>
                  <Brands />
                </MainLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <MainLayout>
                  <Categories />
                </MainLayout>
              }
            />
            <Route
              path="/aboutus"
              element={
                <MainLayout>
                  <About />
                </MainLayout>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <MainLayout>
                  <SingleProduct />
                </MainLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <MainLayout>
                  <Wishlist />
                </MainLayout>
              }
            />
            <Route
              path="/login"
              element={
                <SimpleLayout>
                  <Login />
                </SimpleLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <SimpleLayout>
                  <Signup />
                </SimpleLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <SimpleLayout>
                  <ForgetPassword />
                </SimpleLayout>
              }
            />
            <Route
              path="/new-password"
              element={
                <SimpleLayout>
                  <NewPassword />
                </SimpleLayout>
              }
            />
            <Route
              path="/orders"
              element={
                <MainLayout>
                  <Orders />
                </MainLayout>
              }
            />
            <Route
              path="/order-info"
              element={
                <MainLayout>
                  <OrderInfo />
                </MainLayout>
              }
            />
            <Route
              path="/admin/*"
              element={
                <PlainLayout>
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                </PlainLayout>
              }
            />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
      {/* <Layout>
        <RouterProvider router={router} />
      </Layout> */}
    </div>
  );
}

export default App;
