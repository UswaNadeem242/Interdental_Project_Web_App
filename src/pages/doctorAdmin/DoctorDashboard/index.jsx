import React from "react";
import { CardComponet } from "../../../Common/Card";
import { UserIcon } from "../../../icon/UserIcon";
import { CardDashboard, PatientDashboard } from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard/index.jsx";
import OrdersTable from "../../../Common/OrdersTable/index.jsx";

const DoctorDashaboard = () => {
  return (
    <div>
      {/* Card Component Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3 lg:gap-4 ">
        <div className="col-span-1 md:col-span-1 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-4">
            {CardDashboard?.map((item, id) => (
              <CardComponet
                key={id}
                title={item?.title}
                count={item?.count}
                fromDate={item?.date}
                toDate={item?.duedate}
                icon={item?.icon}
              />
            ))}
          </div>

          {/* Order Overview */}
          <div className="col-span-1 md:col-span-1 lg:col-span-8 bg-[#FFFFFF] mt-3 md:mt-4 lg:mt-5 rounded-lg p-3 md:p-4 lg:p-4 ">
            <div className="flex flex-row items-center md:flex-row lg:flex-row justify-between ">
              <h3 className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm  text-[#434343] ">
                Order Overview
              </h3>
              <div className="flex flex-row md:flex-row lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-3 md:gap-3 lg:gap-5 font-poppins text-xs md:text-xs lg:text-xs text-[#434343] mt-2 md:mt-2 lg:mr-3 lg:mt-0">
                <div className="flex items-center">
                  <span className="text-[7px] w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#94D3DD] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-[#434343]">
                    Total Orders
                  </label>
                </div>
                {/* <p>Total Orders</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#4FAD2E] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-[#434343]">
                    Completed
                  </label>
                </div>
                {/* <p>In Progress</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#E13434] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-[#434343]">
                    In progress
                  </label>
                </div>
                {/* <p>Pending</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-blue-500 rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-[#434343]">
                    Pending
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-4 lg:mt-5">
              <img
                className="w-full h-auto md:h-[180px] lg:h-full object-cover"
                src="/assets/Months.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#FFFFFF] rounded-lg md:rounded-xl lg:rounded-xl h-[660px] overflow-auto ">
          <PatientCard />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-12">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashaboard;
