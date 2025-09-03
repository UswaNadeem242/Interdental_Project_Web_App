import React from "react";
import { CardComponet } from "../../../Common/Card";
import { UserIcon } from "../../../icon/UserIcon";
import { CardDashboard, PatientDashboard } from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard.jsx";

const DoctorDashaboard = () => {
  // return <div>indesx</div>;
  return (
    // <div className="p-6 flex gap-6">
    // {CardDashboard?.map((item, id) => {
    //   return (
    //     <CardComponet
    //       key={id}
    //       title={item?.title}
    //       count={item?.count}
    //       fromDate={item?.date}
    //       toDate={item?.duedate}
    //       icon={item?.icon}
    //     />
    //   );
    // })}

    // </div>
    <div className="grid grid-cols-12 gap-4 ">
      <div className="col-span-8">
        <div className="flex gap-4">
          {CardDashboard?.map((item, id) => {
            return (
              <CardComponet
                key={id}
                title={item?.title}
                count={item?.count}
                fromDate={item?.date}
                toDate={item?.duedate}
                icon={item?.icon}
              />
            );
          })}
        </div>
        <div className="cols-span-8 bg-[#FFFFFF] mt-5 rounded-lg p-4">
          <div className="flex justify-between">
            <h3 className="font-poppins text-sm font-semibold text-[#434343] ">
              Order Overview
            </h3>
            <div className="flex justify-between items-center gap-5 font-poppins text-xs text-[#434343] mr-3 ">
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 bg-[#94D3DD] rounded-full inline-block"></span>
                <label className="text-sm text-[#434343]">Total Orders</label>
              </div>
              {/* <p>Total Orders</p> */}

              {/* <p>Completed</p> */}
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 bg-[#4FAD2E] rounded-full inline-block"></span>
                <label className="text-sm text-[#434343]">Completed</label>
              </div>
              {/* <p>In Progress</p> */}
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 bg-[#E13434] rounded-full inline-block"></span>
                <label className="text-sm text-[##434343]">In progress</label>
              </div>
              {/* <p>Pending</p> */}
              <div className="flex items-center">
                <span className="w-3 h-3 mr-1 bg-blue-500 rounded-full inline-block"></span>
                <label className="text-sm text-gray-700">Pending</label>
              </div>
            </div>
          </div>
          <div className="mt-5 ">
            <img
              className="w-full h-full object-cover"
              src="/assets/Months.jpg"
              alt="image"
            />
          </div>
        </div>
      </div>

      <div className="col-span-4 bg-[#FFFFFF] rounded-xl">
        <PatientCard />
      </div>
    </div>
  );
};

export default DoctorDashaboard;
