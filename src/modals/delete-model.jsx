import React, { useEffect, useState, useRef } from "react";
// import Group from "../assets/Group.png";
import axios from "axios";
import { BASE_URL } from "../config";
import { TrashIcon } from "@heroicons/react/24/solid";

const DeleteModel = ({
    title,
    desc,
    onConfirm,
    onClose
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="w-[383px] h-[295px] gap-[16px]">
                <div className="flex w-[383px] flex-col justify-center items-center space-y-[16px]  bg-white py-[16px] rounded-[8px] shadow-lg w-[303px] h-auto relative">
                    {/* <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="120" height="120" rx="60" fill="#001D58" />
                        <path
                            d="M60.0119 50.1765V62.3113M81.5731 52.095V67.9049C81.5731 70.4937 80.1483 72.8975 77.845 74.215L63.74 82.1431C61.4367 83.4375 58.5872 83.4375 56.2601 82.1431L42.1551 74.215C41.0195 73.5742 40.0772 72.6537 39.4228 71.546C38.7684 70.4384 38.425 69.1827 38.427 67.9049V52.095C38.427 49.5062 39.8518 47.1024 42.1551 45.7849L56.2601 37.8568C58.5634 36.5624 61.4129 36.5624 63.74 37.8568L77.845 45.7849C80.1483 47.1024 81.5731 49.4831 81.5731 52.095Z"
                            stroke="white"
                            stroke-width="4.04494"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M59.8997 70.8352V71.1605"
                            stroke="white"
                            stroke-width="3.08186"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg> */}
                    <div className="bg-red-600 w-36 h-36 rounded-full flex justify-center items-center">

                        <TrashIcon className="w-16 h-16 text-white " />
                    </div>

                    <p className="font-poppins  font-bold text-lg px-[16px] mt-[12px] leading-[18px]">
                        {title}
                    </p>
                    <p className="font-poppins text-[#98A0A0] px-[16px] mt-[12px] text-center font-[400] text-[14px] leading-[18px]">
                        {desc}
                    </p>

                    <div className="flex justify-center items-center mt-[24px] w-[271px] h-[57px] gap-[24px]">
                        <button
                            onClick={onClose}
                            className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand  hover:bg-red-600 font-poppins font-semibold text-white text-[14px] leading-[21px]"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModel;
