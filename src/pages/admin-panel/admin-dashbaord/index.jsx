// import React from "react";
// import { CardComponet } from "../../../Common/Card";
// import { DoctorIcon } from "../../../icon/DoctorIcon";
// import {
//   CardAdminPanelDashboard,
//   Chartdata,
//   ChartStatusLines,
// } from "../../../Constant";
// import { SingleLineChart } from "../../../Common/SingleLineChart";
// import { MultiLineChart } from "../../../Common/Chart";

// const sampleData = [
//   { day: "Jan", earnings: 1200 },
//   { day: "Feb", earnings: 1800 },
//   { day: "Mar", earnings: 1500 },
//   { day: "Apr", earnings: 2200 },
//   { day: "May", earnings: 2800 },
//   { day: "Jun", earnings: 3200 },
//   { day: "Jul", earnings: 4000 },
//   { day: "Aug", earnings: 3700 },
//   { day: "Sep", earnings: 3100 },
//   { day: "Oct", earnings: 4500 },
//   { day: "Nov", earnings: 4800 },
//   { day: "Dec", earnings: 5200 },
// ];

// function AdminPanelDashboard() {
//   return (
//     <div className="p-6">
//       {/* <div className="p-2 mb-4">
//         <h1>AdminPanelDashboard</h1>
//       </div> */}
//       <div className="flex justify-center items-center gap-4">
//         {CardAdminPanelDashboard.map((item, id) => (
//           <CardComponet
//             key={id}
//             title={item?.title}
//             count={item?.count}
//             fromDate={item?.date}
//             toDate={item?.duedate}
//             icon={item?.icon}
//           />
//         ))}
//       </div>
//       <div className=" mt-8  w-3/6  flex flex-col gap-4">
//         <div className="p-6 bg-bgWhite rounded-2xl">
//           <SingleLineChart
//             data={sampleData}
//             dataKey="earnings"
//             height={250}
//             showLegend={true}
//             showXAxis={true}
//             showYAxis={true}
//             showDots={false}
//             showGrid={true}
//           />
//         </div>
//         <div className="p-6 rounded-2xl bg-bgWhite">
//           <MultiLineChart
//             data={Chartdata}
//             lines={ChartStatusLines}
//             // height={300}
//             title="Order Overview"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanelDashboard;

//
//

import React, { useState } from "react";
import { CardComponet } from "../../../Common/Card";
import {
  CardAdminPanelDashboard,
  Chartdata,
  ChartStatusLines,
} from "../../../Constant";
import { SingleLineChart } from "../../../Common/SingleLineChart";
import { MultiLineChart } from "../../../Common/Chart";

// Static datasets
const weeklyData = [
  { day: "Mon", earnings: 200 },
  { day: "Tue", earnings: 300 },
  { day: "Wed", earnings: 250 },
  { day: "Thu", earnings: 400 },
  { day: "Fri", earnings: 350 },
  { day: "Sat", earnings: 500 },
  { day: "Sun", earnings: 450 },
];

const monthlyData = [
  { day: "Week 1", earnings: 1200 },
  { day: "Week 2", earnings: 1800 },
  { day: "Week 3", earnings: 1500 },
  { day: "Week 4", earnings: 2000 },
];

const yearlyData = [
  { day: "Jan", earnings: 1200 },
  { day: "Feb", earnings: 1800 },
  { day: "Mar", earnings: 1500 },
  { day: "Apr", earnings: 2200 },
  { day: "May", earnings: 2800 },
  { day: "Jun", earnings: 3200 },
  { day: "Jul", earnings: 4000 },
  { day: "Aug", earnings: 3700 },
  { day: "Sep", earnings: 3100 },
  { day: "Oct", earnings: 4500 },
  { day: "Nov", earnings: 4800 },
  { day: "Dec", earnings: 5200 },
];

function AdminPanelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");

  // Map period -> dataset
  const chartDataMap = {
    weekly: weeklyData,
    monthly: monthlyData,
    yearly: yearlyData,
  };

  return (
    <div className="p-6">
      {/* Top stats cards */}
      <div className="flex justify-center items-center gap-4">
        {CardAdminPanelDashboard.map((item, id) => (
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

      {/* Charts Section */}
      <div className="mt-8 w-3/6 flex flex-col gap-4">
        {/* Line Chart with dropdown */}
        <div className="p-6 bg-bgWhite rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Earnings Overview
            </h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <SingleLineChart
            data={chartDataMap[selectedPeriod]}
            dataKey="earnings"
            height={250}
            showLegend={true}
            showXAxis={true}
            showYAxis={true}
            showDots={false}
            showGrid={true}
          />
        </div>

        {/* Multi Line Chart */}
        <div className="p-6 rounded-2xl bg-bgWhite">
          <MultiLineChart
            data={Chartdata}
            lines={ChartStatusLines}
            title="Order Overview"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanelDashboard;
