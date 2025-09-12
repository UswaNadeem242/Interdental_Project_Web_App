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
        <div className="flex items-center md:justify-between w-full md:flex-row flex-col">
            {steps.map((step, idx) => {
                const Icon = step.icon;
                return (

                    <div key={idx} className="flex-1  flex items-center">
                        {/* Line before step */}
                        {idx !== 0 && (
                            <div
                                className={`flex-1 h-1 ${steps[idx - 1].status === "completed" ? "bg-secondaryBrand" : "bg-gray-300"
                                    }`}
                            ></div>
                        )}

                        {/* Step */}
                        <div className="flex flex-col items-center  ">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                                    ${step.status === "completed"
                                        ? "bg-secondaryBrand text-white"
                                        : step.status === "current"
                                            ? "bg-[#94D3DD] text-white"
                                            : "bg-gray-300 text-secondaryText"
                                    }`}
                            >
                                {step.status === "completed" ? <CheckIcon className="w-5 h-5" /> : idx + 1}
                            </div>
                            <div className="flex gap-2 ">
                                <div className="text-[10px] text-gray-400"><Icon className="w-5 h-5" /></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold font-poppins capitalize">{step.title}</span>
                                    <span className="text-[10px] text-gray-400">{step.date}</span>
                                </div>
                            </div>


                        </div>

                        {/* Line after step */}
                        {idx !== steps.length - 1 && (
                            <div className={`flex-1 h-1 ${step.status === "completed" ? "bg-secondaryBrand" : "bg-gray-300"
                                }`}></div>
                        )}
                    </div>
                )

            })}
        </div>
    );
};

