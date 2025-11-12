import React, { useEffect, useState } from "react";
import { CardComponet } from "../../../Common/Card";
import {
  Chartdata,
  ChartStatusLines2,
  monthlyData,
  planss,
  weeklyData,
  yearlyData,
} from "../../../Constant";
import { SingleLineChart } from "../../../Common/SingleLineChart";
import { MultiLineChart } from "../../../Common/Chart";
import { ChartDropDown } from "../../../Common/ChartDropDown";
import { getAdminStats } from "../../../services/adminpanel-dashboard";

function AdminPanelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [adminStats, setAdminStats] = useState([]);
  const chartDataMap = {
    weekly: weeklyData,
    monthly: monthlyData,
    yearly: yearlyData,
  };

  const fetchDoctorStats = () => {
    getAdminStats()
      .then((res) => {
        console.log("===--=-=-=-=-==--=adminStats=-=--=-=", res.data.data);
        setAdminStats(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetchDoctorStats data:", error);

      });
  };
  useEffect(() => {
    fetchDoctorStats();
  }, []);

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row md:justify-center items-center gap-4">
        {adminStats.map((item, id) => (
          <div className="w-full">
            <CardComponet
              key={id}
              title={item?.label}
              count={item?.value.toString()}
              // fromDate={item?.date}
              // toDate={item?.duedate}
              // icon={item?.icon}
            />
          </div>
        ))}
      </div>
      {/* Revenue Graph & Plan Usage */}
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 mt-4">
        <div className="md:col-span-8 col-span-1">
          <div className="p-6 bg-bgWhite rounded-2xl ">
            <ChartDropDown
              title={"Revenue Graph: 100k"}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            />

            <SingleLineChart
              data={chartDataMap[selectedPeriod]}
              dataKey="earnings"
              height={400}
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
              showDots={false}
              showGrid={true}
            />
          </div>
        </div>

        {/* Plan Usage */}
        <div className="bg-white rounded-2xl p-4 md:col-span-4 col-span-1 ">
          <ChartDropDown
            title={"Plan Usage"}
            selectedPeriod={selectedPlan}
            setSelectedPeriod={setSelectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          />
          <div className="flex py-5 gap-4 justify-center">
            <button className="px-6 py-3 text-sm bg-[#F8F8F8] rounded-3xl w-full font-semibold text-primaryText">
              Doctor
            </button>
            <button className="px-6 py-3 text-sm border font-medium font-poppins border-[#0000000D] rounded-3xl w-full text-secondaryText">
              Patient
            </button>
          </div>
          <div className="flex  text-sm font-semibold text-primaryText pb-2 mb-4 items-end font-poppins mt-2 mb-2 justify-between">
            <div className="flex gap-0">
              <span className="w-10 font-normal text-xs ">#</span>
              <span className="w-24 font-normal text-xs text-[#444A6D]">
                Name
              </span>
            </div>

            {/* empty space for progress bar */}
            <span className=" text-center font-normal text-xs text-[#434343]  ">
              Sales Percentage
            </span>
          </div>
          {planss.map((plan, key) => (
            <div
              key={key}
              className="flex items-center justify-center text-xs text-gray-700 border-b border-t pt-4 pb-4  "
            >
              {/* ID */}
              <span className="w-10 font-poppins text-[#444A6D] ">
                {plan.id}
              </span>

              {/* Name */}
              <span className="w-24 font-normal text-xs text-[#444A6D] font-poppins">
                {plan.name}
              </span>

              {/* Progress + % */}
              <div className="flex items-center flex-1 py-2">
                {/* Progress bar container */}
                <div className="relative flex-1 h-1 bg-textFieldColor rounded-full overflow-hidden ">
                  <div
                    className={`h-1 rounded-full ${plan.color}`}
                    style={{ width: plan.percentage }}
                  ></div>
                </div>
                {/* Percentage badge */}
                <span
                  className={`ml-3  px-6 py-2 rounded-md bg-[#94C5221A] text-sm font-medium ${plan.badge}`}
                >
                  {plan.percentage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-bgWhite mt-4 md:col-span-12 col-span-1 ">
        <MultiLineChart
          data={Chartdata}
          lines={ChartStatusLines2}
          title="Engaged Users"
          titleClassName="xl:text-lg lg:text-lg " // overwrites A
          legendTextClassName="xl:font-normal xl:text-sm xl:text-primaryText  font-poppins"
        />
      </div>
      {/* Product Rankinge */}
      {/* <AdminPanelProductCard
//             cardData={productDataAdminPanel}
//             title={"Product Rankinge"}
//           /> */}
    </div>
  );
}

export default AdminPanelDashboard;
