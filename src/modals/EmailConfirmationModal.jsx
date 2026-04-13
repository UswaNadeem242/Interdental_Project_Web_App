import React, { useEffect } from "react";
import EnvlopeIcon from "../icon/envlopeIcon";

const EmailConfirmation = ({ isModalOpen, setIsModalOpen }) => {
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
      <div className="flex flex-col justify-center items-center gap-[32px] bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[375px] h-[381.97px] relative">
        <EnvlopeIcon />

        <div className="flex flex-col justify-center items-center gap-[32px] w-[327px] h-[186px]">
          <p className="font-poppins   text-2xl font-bold  text-primaryText capitalize">
            Email Confirmation
          </p>
          <p className="font-poppins font-normal text-sm    text-secondaryText text-center">
            A verification code will be sent to your email associated with
            <span className="text-xs font-poppins font-semibold text-secondaryBrand">  unknown134@gmail.com.</span>   Please enter the code to reset your password
          </p>

          <div className="flex justify-start items-start gap-[24px] w-[316px] h-[40px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center text-[#001D58] w-[189.5px] h-[48px] rounded-[28px] border-[1px] border-[#001D58] gap-[8px] py-[17px] px-[24px]"
            >
              <h1 className="text-[14px] font-poppins font-semibold leading-[21px]">
                Cancel
              </h1>
            </button>
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center bg-[#001D58] text-white w-[189.5px] h-[48px] rounded-[28px] border-[1px] border-[#001D58] gap-[8px] py-[17px] px-[24px]"
            >
              <h1 className="text-[14px] font-poppins font-semibold leading-[21px]">
                Check E-mail
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
