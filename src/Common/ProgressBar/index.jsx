import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import HealthIcon from "../../icon/HealthIcon";
import BoxIcon from "../../icon/BoxIcon";
import ShipIcon from "../../icon/ShipIcon";
import TimeIcon from "../../icon/TimeIcon";
const stepsDefault = [
    { title: "Order Placed", date: "12 Sep 2024, 04:25 PM", status: "completed", icon: HealthIcon },
    { title: "In Progress", date: "12 Sep 2024, 04:25 PM", status: "current", icon: BoxIcon },
    { title: "Shipped", date: "12 Sep 2024, 04:25 PM", status: "upcoming", icon: ShipIcon },
    { title: "Delivered", date: "12 Sep 2024, 04:25 PM", status: "upcoming", icon: TimeIcon },
];

export const ProgressBar = ({ steps = stepsDefault }) => {
    return (
        // <div>
        //     <div className="flex items-center justify-between">
        //         {steps.map((step, idx) => {
        //             const Icon = step.icon;
        //             return (

        //                 <div key={idx} className="flex-1 gap-1  flex items-center">
        //                     {/* Line before step */}
        //                     {idx !== 0 && (
        //                         <div
        //                             className={`flex-1 h-1 ${steps[idx - 1].status === "completed" ? "bg-secondaryBrand" : "bg-gray-300"
        //                                 }`}
        //                         ></div>
        //                     )}

        //                     {/* Step */}
        //                     <div className="flex-1 flex-col items-center  ">
        //                         {/* <div
        //                             className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
        //                             ${step.status === "completed"
        //                                     ? "bg-secondaryBrand text-white"
        //                                     : step.status === "current"
        //                                         ? "bg-[#94D3DD] text-white"
        //                                         : "bg-gray-300 text-secondaryText"
        //                                 }`}
        //                         >
        //                             {step.status === "completed" ? <CheckIcon className="w-5 h-5" /> : idx + 1}
        //                         </div> */}
        //                         <div
        //                             className={`w-5 h-5 rounded-full flex items-center justify-center mb-1
        //                              ${step.status === "completed"
        //                                     ? "bg-secondaryBrand text-white"   // Completed
        //                                     : step.status === "current"
        //                                         ? "bg-[#94D3DD] text-white"      // Current
        //                                         : "bg-gray-300 text-gray-500"    // Upcoming
        //                                 }`}
        //                         >
        //                             <CheckIcon className="w-3 h-3" /> {/* Always show tick */}
        //                         </div>



        //                     </div>

        //                     {/* Line after step */}
        //                     {idx !== steps.length - 1 && (
        //                         <div className={`flex-1 h-1 ${step.status === "completed" ? "bg-secondaryBrand" : "bg-gray-300"
        //                             }`}></div>
        //                     )}
        //                 </div>
        //             )

        //         })}

        //     </div>
        //     <div className="flex  justify-between">  {
        //         steps?.map((step, idk) => {
        //             const Icon = step.icon;

        //             return (
        //                 <div className="flex gap-2 ">
        //                     <div className="text-[10px] text-gray-400"><Icon className="w-5 h-5" /></div>
        //                     <div className="flex flex-col">
        //                         <span className="text-xs font-semibold font-poppins capitalize">{step.title}</span>
        //                         <span className="text-[10px] text-gray-400">{step.date}</span>
        //                     </div>
        //                 </div>
        //             )
        //         })
        //     }
        //     </div>

        // </div>


        <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
                const Icon = step.icon;
                return (

                    <div
                        key={step.id}
                        className={`flex flex-col items-center  flex-1 relative ${idx === steps.length - 1 ? "mr-40" : "" 
                            }`}
                    >
                        {/* --- Circle with Check --- */}
                        <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full z-10
          ${step.status === "completed"
                                    ? "bg-[#001D58] text-white"
                                    : step.status === "current"
                                        ? "bg-[#94D3DD] text-white"
                                        : "bg-gray-300 text-gray-500"
                                }`}
                        >
                            <CheckIcon className="w-4 h-4" />
                        </div>

                        {/* --- Connector line (skip for last step) --- */}
                        {idx !== steps.length - 1 && (
                            <div
                                className={`absolute top-3 left-1/2 w-full h-0.5 -translate-y-1/2
            ${step.status === "completed"
                                        ? "bg-[#001D58]"
                                        : step.status === "current"
                                            ? "bg-[#94D3DD]"
                                            : "bg-gray-300"
                                    }`}
                            ></div>
                        )}

                        {/* --- Step Text --- */}
                        <div className="flex gap-2 mt-3 ">
                            <div className="text-[8px] text-gray-400"><Icon className="w-3 h-3" /></div>
                            <div className="flex flex-col ">
                                <span className="text-xs font-semibold font-poppins capitalize">{step.title}</span>
                                <span className="text-[10px] text-gray-400">{step.date}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>



    );
};

