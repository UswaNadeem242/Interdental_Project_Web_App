import React, { useEffect } from "react";

const PasswordReset = ({ isModalOpen, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col justify-center items-center  bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[372px] h-[388px] relative">
        <svg
          width="108"
          height="108"
          viewBox="0 0 108 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="10" width="88" height="88" rx="44" fill="#4FAD2E" />
          <rect
            x="5.36842"
            y="5.36842"
            width="97.2632"
            height="97.2632"
            rx="48.6316"
            stroke="#4BD31A"
            stroke-opacity="0.1"
            stroke-width="9.26316"
          />
          <path
            d="M39.5254 54L49.1632 63.2631L68.4728 44.7368"
            stroke="white"
            stroke-width="4.63158"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div className="flex flex-col justify-center items-center gap-[8px] w-[319px] h-[183px]">
          <p className="font-poppins font-bold text-[26px] leading-[39px] text-[#000000]">
            Password Reset
          </p>
          <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] text-center">
            Your Password has been successfully reset. click below to log in
          </p>
        </div>
        {/* <button
          onClick={handleCloseModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button> */}
        <div className="flex flex-col justify-center items-center w-[494px] h-[113px] gap-[32px]">
          <button
            onClick={handleCloseModal}
            className="w-[324px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
          >
            Continue
          </button>
          <div
            onClick={handleCloseModal}
            className="flex justify-center items-center gap-[8px] w-[128px] h-[24px]"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M20.5 12.75C20.9142 12.75 21.25 12.4142 21.25 12C21.25 11.5858 20.9142 11.25 20.5 11.25V12.75ZM20.5 11.25H4.5V12.75H20.5V11.25Z"
                fill="#001D58"
              />
              <path
                d="M10.5 6L4.5 12L10.5 18"
                stroke="#001D58"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-poppins font-semibold text-[14px] leading-[21px] text-secondaryBrand">
              Back to log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
