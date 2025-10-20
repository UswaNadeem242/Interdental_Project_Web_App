import { Route, Routes } from "react-router-dom";
import DoctorDashaboard from "./DoctorDashboard";
import DoctorProfile from "./DoctorProfile";
import PatientPage from "./PatientDoctor";
// import ClaimRequest from "./ClaimRequest";
import DoctorOrder from "./OrderStep/RestorationDesignForm";
import OrderDoctorPage from "./DoctorOrder";
import DoctorDeailsPage from "./DoctorOrder/DoctorOrderDetail"; 
import DoctorClaimRequests from "./claim-requests"; 
import { DoctorCalimsForm } from "./claim-requests/form-doctor-claims";
import DoctorTermCondition from './TermCondition'


const DoctorAdmin = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/dashboard" element={<DoctorDashaboard />} />
        <Route path="/patient" element={<PatientPage />} />
        {/* <Route path="/claim-request" element={<ClaimRequest />} /> */}
        <Route path="/claim-request" element={<DoctorClaimRequests />} />
        <Route path="/claim-request/:slug" element={<DoctorCalimsForm />} />
        <Route path="/place-order" element={<DoctorOrder />} />
        <Route path="/profile" element={<DoctorProfile />} />
        <Route path="/orders" element={<OrderDoctorPage />} />
        <Route path="/order-details/:id" element={<DoctorDeailsPage />} />
         <Route path="/term-condition" element={<DoctorTermCondition/>} />
      </Routes>
    </div>
  );
};

export default DoctorAdmin;
