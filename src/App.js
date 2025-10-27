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
import ProductLandingPage from "./pages/landing-page/product";
import ArgenZ from "./pages/landing-page/product/argen-z-h";
import BlogDetailPage from "./pages/landing-page/blogs/sub-page";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from "./pages/landing-page/blog";
import ProductDetail from "./components/ProductDetail";
import { ERole } from "./constants/roles";

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
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
        <DoctorHeader role={"admin"} />
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
            {/* Public Routes - No authentication required */}
            <Route path="/" element={<LandingPage />} />
            {/* <Route
              path="/product"
              element={<ProductLandingPage isLanding={false} />}
            />*/}
            <Route
              path="/product/:id"
              element={<ProductDetail isLanding={false} />}
            />
            <Route path="/patient" element={<Patients isLanding={false} />} />
            <Route path="/doctor" element={<Doctor isLanding={false} />} />
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
            <Route
              path="/contact-us"
              element={
            
                  <Contact isLanding={false} />
                
              }
            />

            {/* Auth Routes - Public but redirect if authenticated */}
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


            {/* Profile Completion - Requires authentication but not full protection */}
            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute>
                  <CompleteProfile />
                </ProtectedRoute>
              }
            />

            {/* Customer Routes - Accessible by CUSTOMER role */}
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

            {/* Doctor Routes - Accessible by DOCTOR role only */}
            <Route
              path="/doctor-admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.DOCTOR]}>
                  <PlainLayout>
                    <ScrollToTop />
                    <DoctorAdmin />
                  </PlainLayout>
                </RoleRoute>
              }
            />

            {/* Patient Routes - Accessible by PATIENT role */}
            <Route
              path="/patient-admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.PATIENT]}>
                  <PlainLayoutPatient>
                    <ScrollToTop />
                    <PatientAdmin />
                  </PlainLayoutPatient>
                </RoleRoute>
              }
            />

            {/* Admin Panel Routes - Accessible by ADMIN role only */}
            <Route
              path="/admin-panel/*"
              element={
                <RoleRoute allowedRoles={[ERole.ADMIN]} exactRole={true}>
                  <PlainLayoutAdminPanel>
                    <ScrollToTop />
                    <AdminPanel />
                  </PlainLayoutAdminPanel>
                </RoleRoute>
              }
            />

            {/* Legacy Admin Route - Accessible by ADMIN role */}
            <Route
              path="/admin/*"
              element={
                <RoleRoute allowedRoles={[ERole.ADMIN]}>
                  <PlainLayoutUser>
                    <Admin />
                  </PlainLayoutUser>
                </RoleRoute>
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
