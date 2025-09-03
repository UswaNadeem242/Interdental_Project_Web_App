import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOrder from "./OrderStep/RestorationDesignForm";
import DoctorDashaboard from "./DoctorDashboard";
import PatientDoctor from "./PatientDoctor";


const DoctorAdmin = () => {
  return (
    <div className="flex justify-start items-start">
      {/* w-full h-[982px]    w-screen min-h-screen*/}
      <Routes>
        <Route path="/doctor" element={<DoctorDashaboard />} />
        <Route path="/doctor" element={<PatientDoctor />} />
       
      </Routes>
    </div>
  );
};

export default DoctorAdmin;
