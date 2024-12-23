import React, { useEffect } from "react";
// import Group from "../assets/Group.png";

const AccountDeactivate = ({ isModalOpen, setIsModalOpen }) => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
      <div className="flex flex-col justify-center items-center  bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[361px] h-[393px] relative">
        <img src="/build/assets/Group.png" alt="account deactivate profile" />

        <div className="flex flex-col justify-center items-center gap-[8px] w-[319px] h-[183px]">
          <p className="font-poppins font-bold text-[26px] leading-[39px] text-[#000000]">
            Account Deactivate
          </p>
          <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] text-center">
            Your Account is deactivated by the admin Contact admin to active
            your account
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
            className="w-[324px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[109px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
          >
            Back to Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeactivate;
