import React, { useState } from "react";
import { CardComponet } from "../../../Common/Card";
import {
  CardAdminPanelDashboard,
  Chartdata,
  ChartStatusLines,
  ChartStatusLines2,
  monthlyData,
  planss,
  productDataAdminPanel,
  weeklyData,
  yearlyData,
} from "../../../Constant";
import { SingleLineChart } from "../../../Common/SingleLineChart";
import { MultiLineChart } from "../../../Common/Chart";
import { ChartDropDown } from "../../../Common/ChartDropDown";
import { AdminPanelProductCard } from "../../../Common/AdminPanelProductCard";

function AdminPanelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  const chartDataMap = {
    weekly: weeklyData,
    monthly: monthlyData,
    yearly: yearlyData,
  };

  return (
    <div className="p-2">
      {/* Top stats cards */}
      <div className="flex flex-col md:flex-row md:justify-center items-center gap-4">
        {CardAdminPanelDashboard.map((item, id) => (
          <div className="w-full">
            <CardComponet
              key={id}
              title={item?.title}
              count={item?.count}
              fromDate={item?.date}
              toDate={item?.duedate}
              icon={item?.icon}
            />
          </div>
        ))}
      </div>

      <div className="flex md:flex-row flex-col gap-6">
        {/* Left Side */}
        <div className="mt-8  md:w-4/6 flex flex-col gap-4 ">
          <div>
            <div className="p-6 bg-bgWhite rounded-2xl">
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

          {/* Multi Line Chart */}
          <div className="p-6 rounded-2xl bg-bgWhite mt-4  ">
            <MultiLineChart
              data={Chartdata}
              lines={ChartStatusLines2}
              title="Engaged Users"
              titleClassName="xl:text-lg lg:text-lg " // overwrites A
              legendTextClassName="xl:font-normal xl:text-sm xl:text-primaryText  font-poppins"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="mt-8 gap-4   md:w-1/3 font-poppins">
          {/* Table Header */}
          <div className="bg-white rounded-2xl p-4">
            <ChartDropDown
              title={"Plan Usage"}
              selectedPeriod={selectedPlan}
              setSelectedPeriod={setSelectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            />
            <div className="flex p-4 gap-4 justify-center">
              <button className="px-6 py-3 bg-[#F8F8F8] rounded-3xl w-full font-semibold text-primaryText">
                Doctor
              </button>
              <button className="px-6 py-3 border border-[#0000000D] rounded-3xl w-full text-secondaryText">
                Patient
              </button>
            </div>
            <div className="flex  text-sm font-semibold text-primaryText pb-2 mb-4 items-end">
              <span className="w-10 font-normal text-xs ">#</span>
              <span className="w-24 font-normal text-xs">Name</span>

              {/* empty space for progress bar */}
              <span className="ml-36 text-center font-light text-xs text-primaryText  whitespace-nowrap ">
                Sales Percentage
              </span>
            </div>
            {planss.map((plan, key) => (
              <div
                key={key}
                className="flex items-center justify-center text-sm text-gray-700 border-b border-t pt-4 pb-4 "
              >
                {/* ID */}
                <span className="w-10">{plan.id}</span>

                {/* Name */}
                <span className="w-24">{plan.name}</span>

                {/* Progress + % */}
                <div className="flex items-center flex-1">
                  {/* Progress bar container */}
                  <div className="relative flex-1 h-1 bg-textFieldColor rounded-full overflow-hidden">
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

          {/* Product Rankinge */}
          <AdminPanelProductCard
            cardData={productDataAdminPanel}
            title={"Product Rankinge"}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPanelDashboard;
