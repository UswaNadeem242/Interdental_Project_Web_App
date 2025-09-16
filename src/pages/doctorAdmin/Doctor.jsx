import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorDashaboard from "./DoctorDashboard";
import DoctorProfile from "./DoctorProfile";
import PatientPage from "./PatientDoctor";
import ClaimRequest from "./ClaimRequest";
import DoctorOrder from "./OrderStep/RestorationDesignForm";
import OrderDoctorPage from "./DoctorOrder";
import DoctorDeailsPage from "./DoctorOrder/DoctorOrderDetail";
import PatientDashboard from "../PatientAdmin/PatientDashboard";
import PatientDashboardPage from "../PatientAdmin/PatientDashboard";
import PatientClaimrequests from "../PatientAdmin/ClaimRequest";
import ProfileSettings from "../PatientAdmin/ProfileSettings";
import { PatientForm } from "../PatientAdmin/PatientForm";

const DoctorAdmin = () => {
  return (
    <div className="">
      {/* w-full h-[982px]    w-screen min-h-screen flex justify-start items-start*/}
      <Routes>
        <Route path="/doctor-dashboard" element={<DoctorDashaboard />} />
        <Route path="/Patient" element={<PatientPage />} />
        <Route path="/Claim-Request" element={<ClaimRequest />} />
        <Route path="/Orders-Details" element={<DoctorOrder />} />
        <Route path="/Profile" element={<DoctorProfile />} />
        <Route path="/Orders" element={<OrderDoctorPage />} />
        <Route path="/Details" element={<DoctorDeailsPage />} />
        <Route path="/Patientdashboard" element={<PatientDashboardPage />} />
        <Route
          path="/PatientClaim-Requests"
          element={<PatientClaimrequests />}
        />
        <Route path="/Profile-Settings" element={<ProfileSettings />} />
        <Route path="/Patient-Form" element={<PatientForm />} />
      </Routes>
    </div>
  );
};

export default DoctorAdmin;
