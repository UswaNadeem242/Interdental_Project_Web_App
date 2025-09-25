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
import { AuthProvider } from "./auth/AuthContext";
import Wishlist from "./pages/Wishlist";
import LandingPage from "./pages/landing-page/landing-page";
import Patients from "./pages/landing-page/patient";
import Doctor from "./pages/landing-page/doctor";
import Contact from "./pages/landing-page/contact";
import DoctorAdmin from "./pages/doctorAdmin/Doctor";
import DoctorSidebar from "./components/doctorAdmin/DoctorSideBar";
import MobileSidebar from "./components/doctorAdmin/DoctorSideBar/MobileSideBar";
import ScrollToTop from "./Hooks/UseScroll";
import {
  menuAdminPanelItem,
  menuItems,
  menuItemsUser,
  menuPatientItem,
} from "./Constant";
import PatientAdmin from "./pages/PatientAdmin/Patient";
import DoctorHeader from "./components/doctorAdmin/doctorHeader";
import AdminPanel from "./pages/admin-panel/admin-panel";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "./Common/react-toastify";
import ProductLandingPage from "./pages/landing-page/product";
import ArgebbPmma from "./pages/landing-page/product/argen-pmma";
import ArgenZ from "./pages/landing-page/product/argen-z-h";
import ZidcardIvoclar from "./pages/landing-page/product/zidcard-ivoclar";
import ArgenzST from "./pages/landing-page/product/argenz-st";
import AiditeZirconia from "./pages/landing-page/product/multilayer-pro";
import Multilayerpro from "./pages/landing-page/product/multilayer-pro";
import Blog from "./pages/landing-page/blog";
import ImplantTabs from "./pages/landing-page/blogs/sub-page";
import ImplantDenturesPage from "./pages/landing-page/blogs/sub-page";

import LayZirPage from "./pages/landing-page/product/layzir";
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const PlainLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen p-4 gap-4">
      {/* Sidebar */}
      <div className="w-52 flex-shrink-0  hidden md:block">
        <DoctorSidebar items={menuItems} />
      </div>
      <div className="flex-1 flex flex-col relative">
        {/* Header */}

        <header className="fixed  md:left-64 md:top-0 top-2 left-4 md:right-0   right-4  md:rounded-none h-20 md:block py-4 bg-[#f9fafb] flex items-center md:px-6 px-6 z-20">
          {/* left-4 right-4  top-4*/}
          <div className="md:hidden mr-4">
            <MobileSidebar items={menuItems} />
          </div>
          <DoctorHeader role={"doctor"} />
        </header>

        {/* Main Content */}
        <main className="flex-1 md:p-6 p-0 mt-16 md:ml-4  rounded-xl overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const PlainLayoutUser = ({ children }) => (
  <div className="flex bg-gray-50 min-h-screen p-4 gap-4">
    {/* Sidebar */}
    <div className="w-52 flex-shrink-0  hidden md:block">
      <DoctorSidebar items={menuItemsUser} />
    </div>
    <div className="flex-1 flex flex-col relative">
      {/* Header */}

      <header className="fixed  md:left-64 md:top-0 top-2 left-4 md:right-0   right-4  md:rounded-none h-20 md:block py-4 bg-[#f9fafb] flex items-center md:px-6 px-6 z-20">
        {/* left-4 right-4  top-4*/}
        <div className="md:hidden mr-4">
          <MobileSidebar items={menuItemsUser} />
        </div>
        <DoctorHeader role={"patient"} />
      </header>

      {/* Main Content */}
      <main className="flex-1 md:p-6 p-0 mt-16 md:ml-4  rounded-xl overflow-auto">
        {children}
      </main>
    </div>
  </div>
);
// Patient Admin
const PlainLayoutPatient = ({ children }) => (
  <div className="flex bg-gray-50 min-h-screen p-4 gap-4">
    {/* Sidebar */}
    <div className="w-52 flex-shrink-0  hidden md:block">
      <DoctorSidebar items={menuPatientItem} />
    </div>
    <div className="flex-1 flex flex-col relative">
      {/* Header */}

      <header className="fixed  md:left-64 md:top-0 top-2 left-4 md:right-0   right-4  md:rounded-none h-20 md:block py-4 bg-[#f9fafb] flex items-center md:px-6 px-6 z-20">
        {/* left-4 right-4  top-4*/}
        <div className="md:hidden mr-4">
          <MobileSidebar items={menuPatientItem} />
        </div>
        <DoctorHeader />
      </header>

      {/* Main Content */}
      <main className="flex-1 md:p-6 p-0 mt-16 md:ml-4  rounded-xl overflow-auto">
        {children}
      </main>
    </div>
  </div>
);

// admin-panel

const PlainLayoutAdminPanel = ({ children }) => (
  <div className="flex bg-gray-50 min-h-screen p-4 gap-4">
    {/* Sidebar */}
    <div className="w-52 flex-shrink-0  hidden md:block">
      <DoctorSidebar items={menuAdminPanelItem} />
    </div>
    <div className="flex-1 flex flex-col relative">
      {/* Header */}

      <header className="fixed  md:left-64 md:top-0 top-2 left-4 md:right-0   right-4  md:rounded-none h-20 md:block py-4 bg-[#f9fafb] flex items-center md:px-6 px-6 z-20">
        {/* left-4 right-4  top-4*/}
        <div className="md:hidden mr-4">
          <MobileSidebar items={menuAdminPanelItem} />
        </div>
        <DoctorHeader />
      </header>

      {/* Main Content */}
      <main className="flex-1 md:p-6 p-0 mt-16 md:ml-4  rounded-xl overflow-auto">
        {children}
      </main>
    </div>
  </div>
);

const SimpleLayout = ({ children }) => <div className="">{children}</div>;

function App() {
  return (
    <div>
      <Toastify />

      <AuthProvider>
        <BrowserRouter basename="/">
          <ScrollToTop />
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
            <Route
              path="/product"
              element={<ProductLandingPage isLanding={false} />}
            />
            <Route
              path="/product/argen-pmma"
              element={<ArgebbPmma isLanding={false} />}
            />
            <Route
              path="/product/argen-zh"
              element={<ArgenZ isLanding={false} />}
            />
            <Route
              path="/product/argenz-st"
              element={<ArgenzST isLanding={false} />}
            />
            <Route
              path="/product/multilayer-pro"
              element={<Multilayerpro isLanding={false} />}
            />
            <Route
              path="/product/lay-zir"
              element={<LayZirPage isLanding={false} />}
            />
            <Route
              path="/product/zidcard-ivoclar"
              element={<ZidcardIvoclar isLanding={false} />}
            />
            <Route path="/patient" element={<Patients isLanding={false} />} />
            <Route path="/doctor" element={<Doctor isLanding={false} />} />
            <Route
              path="/blog"
              element={<ImplantDenturesPage isLanding={false} />}
            />
            <Route
              path="/our-products"
              element={<ArgenZ isLanding={false} />}
            />
            <Route
              path="/shop"
              element={
                // <MainLayout>
                <Shop />
                // </MainLayout>
              }
            />
            {/* <Route
              path="/product"
              element={
                // <MainLayout>
                <ProductLandingPage />
                // </MainLayout>
              }
            /> */}
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
                <PlainLayoutUser>
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                </PlainLayoutUser>
              }
            />
            <Route
              path="/doctor-admin/*"
              element={
                <PlainLayout>
                  <ProtectedRoute>
                    <ScrollToTop />
                    <DoctorAdmin />
                  </ProtectedRoute>
                </PlainLayout>
              }
            />
            <Route
              path="/patient-admin/*"
              element={
                <PlainLayoutPatient>
                  <ProtectedRoute>
                    <ScrollToTop />
                    <PatientAdmin />
                  </ProtectedRoute>
                </PlainLayoutPatient>
              }
            />
            <Route
              path="/admin-panel/*"
              element={
                <PlainLayoutAdminPanel>
                  <ProtectedRoute>
                    <ScrollToTop />
                    <AdminPanel />
                  </ProtectedRoute>
                </PlainLayoutAdminPanel>
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
