import { Route, Routes } from "react-router-dom";
import AdminPanelDashboard from "./admin-dashbaord";
import DoctorsAdminPanel from "./admin-doctors";
import AdminPanelDoctorDetail from "./admin-doctor-detail";
import OrdersAdminPanel from "./admin-orders";
import AdminOrdersDetail from "./admin-orders-detail";
import DentalDesignForm from "./dental-design-form";
import ProductsAdminPanel from "./admin-products";
import ListProduct from "./admin-products/list-product";
import ProductDetails from "./admin-products/product-details";
import Subscriptions from "./admin-subscriptions/subscriptions";
import AdminClaimRequest from "./admin-claim-request";
import ClaimDetailAdminPanel from "./admin-claim-request/claim-detail-form";
import ProfileInfoAdminPanel from "./admin-profile-info";
import BlogAndArticles from "./blogs-and-articles";
import BlogsDetailPage from "./blogs-and-articles/blogs-detail";
import DropDownAdminPanel from "./drop-downs";

const AdminPanel = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/dashboard" element={<AdminPanelDashboard />} />
        <Route path="/doctors" element={<DoctorsAdminPanel />} />
        <Route path="/doctor-detail" element={<AdminPanelDoctorDetail />} />
        <Route path="/orders" element={<OrdersAdminPanel />} />
        <Route path="/order-detail" element={<AdminOrdersDetail />} />
        <Route path="/dental-design-form" element={<DentalDesignForm />} />
        <Route path="/products" element={<ProductsAdminPanel />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/claim-requests" element={<AdminClaimRequest />} />

        <Route path="/claim-detail-form" element={<ClaimDetailAdminPanel />} />
        <Route path="/profile-info" element={<ProfileInfoAdminPanel />} />
        <Route path="/blogs-and-articles" element={<BlogAndArticles />} />
        <Route path="/blogs-detail" element={<BlogsDetailPage />} />
        <Route path="/drop-downs" element={<DropDownAdminPanel />} />

        {/* // <Route path="/patient" element={<PatientPage />} />
        // <Route path="/claim-request" element={<ClaimRequest />} />
        // <Route path="/orders-details" element={<DoctorOrder />} />
        // <Route path="/profile" element={<DoctorProfile />} />
        // <Route path="/orders" element={<OrderDoctorPage />} />
        // <Route path="/details" element={<DoctorDeailsPage />} />  */}
      </Routes>
    </div>
  );
};

export default AdminPanel;
