import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOrder from "./OrderStep/RestorationDesignForm";
import DoctorDashaboard from "./DoctorDashboard";
import PatientDoctor from "./PatientDoctor";
import DoctorProfile from "./DoctorProfile";


const DoctorAdmin = () => {
  return (
    <div className="">
      {/* w-full h-[982px]    w-screen min-h-screen flex justify-start items-start*/}
      <Routes>
        <Route path="/doctordashboard" element={<DoctorDashaboard />} />
        <Route path="/profile" element={<DoctorProfile />} />

      </Routes>
    </div>
  );
};

export default DoctorAdmin;
