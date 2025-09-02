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
import LandingPage from "./pages/landing-page/landing-page";
import Patients from "./pages/landing-page/patient";
import Doctor from "./pages/landing-page/doctor";
import Contact from "./pages/landing-page/contact";
import DoctorAdmin from "./pages/doctorAdmin/Doctor";
import DoctorSidebar from "./components/doctorAdmin/DoctorSideBar";
import MobileSidebar from "./components/doctorAdmin/DoctorSideBar/MobileSideBar";
import DoctorHeader from "./components/doctorAdmin/doctorHeader";
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

// const PlainLayout = ({ children }) => (
//   <div className="  ">
//     {/* flex absolute pt-[16px] pl-[16px] pb-[16px] gap-8 bg-gray-200 w-full */}
//     {/* <AdminSidebar /> */}
//     <DoctorSidebar />
//     <DoctorHeader/>
//     {/* {children} */}
//   </div>
// );

const PlainLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen p-4 gap-4">
      {/* Sidebar */}
      <div className="w-52 flex-shrink-0  hidden md:block">
        <DoctorSidebar />
      </div>

      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="fixed top-4 md:left-64 left-4 right-4    md:rounded-none  h-16 md:block  flex items-center md:px-6 px-6   z-50">
          <div className="md:hidden mr-4"><MobileSidebar /></div>
          <DoctorHeader />
        </header>

        {/* Main Content */}
        <main className="bg-gray-100 flex-1 p-6 mt-28 md:ml-4  rounded-xl overflow-auto">
          {children}
        </main>
      </div>
    </div>

  );
};





const SimpleLayout = ({ children }) => <div className="">{children}</div>;

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter basename="/">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {
              /* <Route
              path="/landing"
              element={
                <LandingPage />

                // <MainLayout>
                /* <Home /> */
              // </MainLayout>
              // test
            }{" "}
            <Route path="/patient" element={<Patients isLanding={false} />} />
            <Route path="/doctor" element={<Doctor isLanding={false} />} />
            <Route
              path="/shop"
              element={
                // <MainLayout>
                <Shop />
                // </MainLayout>
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
            <Route path="/about-us" element={<About isLanding={false} />} />
            <Route path="/contact-us" element={<Contact isLanding={false} />} />
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
              path="/order-info/:orderId"
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
            <Route
              path="/doctorAdmin/*"
              element={
                <PlainLayout>
                  <ProtectedRoute>
                    <DoctorAdmin />
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
