import React from "react";
import { CardComponet } from "../../../Common/Card";
import { UserIcon } from "../../../icon/UserIcon";
import {
  CardDashboard,
  Chartdata,
  ChartStatusLines,
  PatientDashboard,
} from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard/index.jsx";
import OrdersTable from "../../../Common/OrdersTable/index.jsx";
import { ChartLegend, MultiLineChart } from "../../../Common/Chart/index.jsx";
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
          <div className="col-span-1 md:col-span-1 lg:col-span-8 bg-[#FFFFFF] mt-3 md:mt-4 lg:mt-5 rounded-lg p-3 md:p-4 lg:p-4">
            <div className="mt-3 md:mt-4 lg:mt-5">
              <MultiLineChart
                data={Chartdata}
                lines={ChartStatusLines}
                // height={300}
                title="Order Overview"
                showLegend={true}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#FFFFFF] rounded-lg md:rounded-xl lg:rounded-xl">
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
