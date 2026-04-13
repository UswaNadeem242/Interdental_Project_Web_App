import React from "react";
import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/landing-page/header";
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
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectRoute";
import { AuthProvider } from "./auth/AuthContext";
import CompleteProfile from "./pages/CompleteProfile";
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
// import ProductLandingPage from "./pages/landing-page/product";
import ArgenZ from "./pages/landing-page/product/argen-z-h";
import BlogDetailPage from "./pages/landing-page/blogs/sub-page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from "./pages/landing-page/blog";
import ProductDetail from "./components/ProductDetail";
import { ERole } from "./constants/roles";
import EnrollmentPlans from "./pages/landing-page/enrollemnt-plans";

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const DashboardLayout = ({ children, menuItems, role }) => (
  <div className="flex bg-gray-50 min-h-screen lg:gap-4 lg:p-4">
    <div className="w-52 flex-shrink-0 hidden lg:block">
      <DoctorSidebar items={menuItems} />
    </div>
    <div className="flex-1 flex flex-col relative ">
      <header className="fixed lg:left-64 lg:top-0 top-0 left-0 lg:right-0 right-0 h-16 lg:h-20 py-3 lg:py-5 bg-[#f9fafb] flex items-center gap-3 lg:px-6 px-4 z-20">
        <div className="lg:hidden flex-shrink-0">
          <MobileSidebar items={menuItems} role={role} />
        </div>
        <DoctorHeader role={role} />
      </header>
      <main className="flex-1 lg:p-6 py-3 px-0 lg:px-6 mt-16 lg:mt-20 lg:ml-4 rounded-xl overflow-auto">
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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/product/:id"
              element={<ProductDetail isLanding={false} />}
            />
            <Route path="/patient" element={<Patients isLanding={false} />} />
            <Route path="/doctor" element={<Doctor isLanding={false} />} />
            <Route path="/enrollment-plans" element={<EnrollmentPlans />} />
            <Route path="/blog" element={<Blog isLanding={false} />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route
              path="/our-products"
              element={<ArgenZ isLanding={false} />}
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
              path="/login"
              element={
                <PublicRoute>
                  <SimpleLayout>
                    <Login />
                  </SimpleLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute redirectAuthenticated={false}>
                  <SimpleLayout>
                    <Signup />
                  </SimpleLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <SimpleLayout>
                    <ForgetPassword />
                  </SimpleLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/new-password"
              element={
                <PublicRoute>
                  <SimpleLayout>
                    <NewPassword />
                  </SimpleLayout>
                </PublicRoute>
              }
            />

            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute>
                  <CompleteProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/shop" element={<Shop />} />
            <Route
              path="/shop/:productId"
              element={
                <MainLayout>
                  <SingleProduct />
                </MainLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PrivateRoute requiredRoles={[ERole.CUSTOMER]}>
                  <MainLayout>
                    <Wishlist />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute requiredRoles={[ERole.CUSTOMER]}>
                  <MainLayout>
                    <Orders />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/order-info/:orderId"
              element={
                <PrivateRoute requiredRoles={[ERole.CUSTOMER]}>
                  <MainLayout>
                    <OrderInfo />
                  </MainLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/doctor-admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.DOCTOR]}>
                  <DashboardLayout menuItems={menuItems} role="doctor">
                    <ScrollToTop />
                    <DoctorAdmin />
                  </DashboardLayout>
                </RoleRoute>
              }
            />

            <Route
              path="/patient-admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.PATIENT]}>
                  <DashboardLayout menuItems={menuPatientItem} role="patient">
                    <ScrollToTop />
                    <PatientAdmin />
                  </DashboardLayout>
                </RoleRoute>
              }
            />

            <Route
              path="/admin-panel/*"
              element={
                <RoleRoute allowedRoles={[ERole.ADMIN]} exactRole={true}>
                  <DashboardLayout menuItems={menuAdminPanelItem} role="admin">
                    <ScrollToTop />
                    <AdminPanel />
                  </DashboardLayout>
                </RoleRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.ADMIN]}>
                  <DashboardLayout menuItems={menuItemsUser} role="patient">
                    <Admin />
                  </DashboardLayout>
                </RoleRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
