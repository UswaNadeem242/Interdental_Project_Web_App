import React from "react";
import { PatientDashboard } from "../../Constant";

export const PatientCard = ({
  heading,
  name,
  email,
  linkName,

  icon,
}) => {
  return (
    <div className="p-4">
      <div className="  flex flex-row items-center justify-between">
        <h2 className="font-poppins text-sm font-medium text-gray-700">
          Patients
        </h2>
        <button className="font-poppins text-xs bor font-medium text-gray-700 border-2 border-[#013764] px-3 py-1 rounded-lg">
          View All
        </button>
      </div>
      {PatientDashboard?.map((item) => {
        return (
          <div className="flex mt-5 justify-between p-3 rounded-md border-2 border-black/5 mb-5">
            <div className="flex">
              <div className="mr-2">{icon}</div>
              <div className="flex gap-2">
                <img src="/assets/users.png" alt="image" />

                <div>
                  <h2 className="font-poppins text-xs font-semibold bor  text-gray-700">
                    {item?.name}
                  </h2>
                  <p className="font-poppins text-xs text-[#949494]">
                    {item?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-[#278AE5] text-xs mt-2 font-poppins">
              {item?.linkName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
