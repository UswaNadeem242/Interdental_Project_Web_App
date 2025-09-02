import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOrder from "./OrderStep/RestorationDesignForm";

 
const DoctorAdmin = () => {
  return (
    <div className="flex justify-start items-start w-screen min-h-screen">
      {/* w-full h-[982px]  */}
      <Routes>
        <Route path="/doctor" element={<DoctorOrder/>} />
      </Routes>
    </div>
  );
};

export default DoctorAdmin;
