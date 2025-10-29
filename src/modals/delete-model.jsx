import React, { useEffect, useState, useRef } from "react";


const DeleteModel = ({
    title,
    desc,
    onConfirm,
    isLoading,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="w-[383px] h-[295px] gap-[16px]">
                <div className="flex w-[383px] flex-col justify-center items-center space-y-[16px]  bg-white py-10 px-6 rounded-3xl shadow-lg h-auto relative">

                    <div className="bg-[#001D58] w-28 h-28 rounded-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="51" viewBox="0 0 48 51" fill="none">
                            <path d="M23.6074 15.313V27.4478M45.1685 17.2314V33.0414C45.1685 35.6302 43.7438 38.034 41.4404 39.3515L27.3355 47.2796C25.0321 48.574 22.1826 48.574 19.8555 47.2796L5.75056 39.3515C4.61497 38.7106 3.67264 37.7901 3.01825 36.6825C2.36385 35.5749 2.02042 34.3191 2.02247 33.0414V17.2314C2.02247 14.6427 3.44722 12.2388 5.75056 10.9213L19.8555 2.99325C22.1589 1.69887 25.0084 1.69887 27.3355 2.99325L41.4404 10.9213C43.7438 12.2388 45.1685 14.6196 45.1685 17.2314Z" stroke="white" stroke-width="4.04494" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M23.4951 35.9717V36.297" stroke="white" stroke-width="3.08186" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <p className="font-poppins  font-bold text-lg mt-[12px] leading-[18px]">
                        {title}
                    </p>
                    <p className="font-poppins text-[#98A0A0] mt-[12px] text-center font-[400] text-[14px] leading-[18px]">
                        {desc}
                    </p>

                    <div className="flex justify-center items-center mt-[28px] w-[271px] h-[57px] gap-[24px]">
                        <button
                            onClick={onClose}
                            className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
                        >
                            Go Back
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={onConfirm}
                            className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand  hover:bg-secondaryBrand/90 font-poppins font-semibold text-white text-[14px] leading-[21px]"
                        >
                            {isLoading ? "Deleting..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModel;
