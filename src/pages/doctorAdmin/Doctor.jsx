import { Route, Routes } from "react-router-dom";
import DoctorDashaboard from "./DoctorDashboard";
import DoctorProfile from "./DoctorProfile";
import PatientPage from "./PatientDoctor";
import ClaimRequest from "./ClaimRequest";
import DoctorOrder from "./OrderStep/RestorationDesignForm";
import OrderDoctorPage from "./DoctorOrder";
import DoctorDeailsPage from "./DoctorOrder/DoctorOrderDetail";


const DoctorAdmin = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/doctor-dashboard" element={<DoctorDashaboard />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/claim-request" element={<ClaimRequest />} />
        <Route path="/orders-details" element={<DoctorOrder />} />
        <Route path="/profile" element={<DoctorProfile />} />
        <Route path="/orders" element={<OrderDoctorPage />} />
        <Route path="/details" element={<DoctorDeailsPage />} />


      </Routes>
    </div>
  );
};

export default DoctorAdmin;
