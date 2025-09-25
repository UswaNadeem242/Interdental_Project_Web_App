import { Route, Routes } from "react-router-dom";
import AdminPanelDashboard from "./admin-dashbaord";
import DoctorsAdminPanel from "./admin-doctors";
import AdminPanelDoctorDetail from "./admin-doctor-detail";
import OrdersAdminPanel from "./admin-orders";
import AdminOrdersDetail from "./admin-orders-detail";
import DentalDesignForm from "./dental-design-form";

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
