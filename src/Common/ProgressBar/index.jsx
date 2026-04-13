import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; 
// const stepsDefault = [
//   {
//     title: "Order Placed",
//     date: "12 Sep 2024, 04:25 PM",
//     status: "completed",
//     icon: HealthIcon,
//   },
//   {
//     title: "In Progress",
//     date: "12 Sep 2024, 04:25 PM",
//     status: "current",
//     icon: BoxIcon,
//   },
//   {
//     title: "Shipped",
//     date: "12 Sep 2024, 04:25 PM",
//     status: "upcoming",
//     icon: ShipIcon,
//   },
//   {
//     title: "Delivered",
//     date: "12 Sep 2024, 04:25 PM",
//     status: "upcoming",
//     icon: TimeIcon,
//   },
// ];

export const ProgressBar = ({ steps }) => {
  return (
    <div className="flex items-start">
      {steps?.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            className={`flex flex-col w-[25%] relative ${
              idx === steps.length + 1 ? "mr-40" : ""
            }`}
          >
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full z-10
          ${
            step.status === "completed"
              ? "bg-[#001D58] text-white"
              : step.status === "current"
              ? "bg-[#94D3DD] text-white"
              : "bg-gray-300 text-gray-500"
          }`}
              >
                <CheckIcon className="w-4 h-4" />
              </div>
              {idx !== steps.length - 1 && (
                <div
                  className={`flex-1 absolute w-full h-0.5 
                    ${
                      step.status === "completed"
                        ? "bg-[#001D58]"
                        : step.status === "current"
                        ? "bg-[#94D3DD]"
                        : "bg-gray-300"
                    }`}
                ></div>
              )}

              {idx !== steps.length - 1 && (
                <div
                  className={`flex-1 absolute w-full h-0.5 ${
                    step.status === "completed"
                      ? "bg-[#001D58]"
                      : step.status === "current"
                      ? "bg-[#94D3DD]"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
            <div className="flex gap-2 mt-3 ">
              <div className="text-[8px] text-gray-400">
                <Icon className="w-3 h-3" />
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold font-poppins capitalize">
                  {step.title}
                </span>
                <span className="text-[10px] text-gray-400">{step.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
