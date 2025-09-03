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
        <button className="py-1 px-4 font-poppins font-light text-xs border border-[#013764] bg-[#FFFFFF] text-[#013764]  rounded-lg shadow hover:bg-blue-800">
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
            <a
              href="#"
              className="text-[#278AE5] font-normal text-xs   mt-2 font-poppins"
            >
              {item?.linkName}
            </a>
          </div>
        );
      })}
    </div>
  );
};
