import React from "react";
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
      {/* w-full h-[982px]    w-screen min-h-screen flex justify-start items-start*/}
      <Routes>
        <Route path="/doctordashboard" element={<DoctorDashaboard />} />
        <Route path="/Patient" element={<PatientPage />} />
        <Route path="/Claim-Request" element={<ClaimRequest />} />
        <Route path="/Orders-Details" element={<DoctorOrder />} />
        <Route path="/Profile" element={<DoctorProfile />} />
        <Route path="/Orders" element={<OrderDoctorPage />} />
        <Route path="/Details" element={<DoctorDeailsPage />} />

      </Routes>
    </div>
  );
};

export default DoctorAdmin;
