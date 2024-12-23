import React, { useEffect, useState } from "react";
// import Group from "../assets/Group.png";

const NotifcationSettingsModal = ({ isModalOpen, setIsModalOpen }) => {
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
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[449px] h-[530px] gap-[23.06px] p-[23.06px] rounded-[21.62px]">
        <div className="flex flex-col justify-center items-center  bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[449px] h-[530px] gap-[23.06px] relative">
          <div className="flex justify-center items-center w-[402.91px] h-[30px] gap-[49.01px]">
            <h1 className="font-poppins font-bold text-[24px] w-full leading-[36px] text-[#434343]">
              Notification Settings
            </h1>
            <button
              onClick={handleCloseModal}
              className="bg-[#E5E5E5] w-[17.3px] h-[17.3px] text-[8.21px] rounded-[20.88px] p-[2.88px] gap-[7.21px] text-[#4F4F4F]"
            >
              ✕
            </button>
          </div>
          <div className="w-full border-[1px] border-[#0000001A]"></div>

          <div className="flex justify-start items-center w-[402.91px] h-[67.75px] rounded-[7.21px] border-[0.72px] border-[#F3F3F3] py-[23.06] px-[10.09px] gap-[10.09px]">
            <p className="font-poppins font-normal w-[351.01px] h-[18px] text-[12px] leading-[18px] text-[#434343]">
              Email Notification
            </p>
            {/* Toggle */}
            <div
              onClick={handleToggle}
              className={`relative w-14 h-8 bg-[#949494] rounded-full p-1 cursor-pointer transition-all duration-300 ${
                isOn ? "bg-green-500" : "bg-[#949494]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  isOn ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-[402.91px] h-[67.75px] rounded-[7.21px] border-[0.72px] border-[#F3F3F3] py-[23.06] px-[10.09px] gap-[10.09px]">
            <p className="font-poppins font-normal w-[351.01px] h-[18px] text-[12px] leading-[18px] text-[#434343]">
              Offers and Promotions
            </p>
            {/* Toggle */}
            <div
              onClick={handleToggle}
              className={`relative w-14 h-8 bg-[#949494] rounded-full p-1 cursor-pointer transition-all duration-300 ${
                isOn ? "bg-green-500" : "bg-[#949494]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  isOn ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-[402.91px] h-[67.75px] rounded-[7.21px] border-[0.72px] border-[#F3F3F3] py-[23.06] px-[10.09px] gap-[10.09px]">
            <p className="font-poppins font-normal w-[351.01px] h-[18px] text-[12px] leading-[18px] text-[#434343]">
              News Letter
            </p>
            {/* Toggle */}
            <div
              onClick={handleToggle}
              className={`relative w-14 h-8 bg-[#949494] rounded-full p-1 cursor-pointer transition-all duration-300 ${
                isOn ? "bg-green-500" : "bg-[#949494]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  isOn ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex justify-start items-center w-[402.91px] h-[67.75px] rounded-[7.21px] border-[0.72px] border-[#F3F3F3] py-[23.06] px-[10.09px] gap-[10.09px]">
            <p className="font-poppins font-normal w-[351.01px] h-[18px] text-[12px] leading-[18px] text-[#434343]">
              Personalized Notification
            </p>
            {/* Toggle */}
            <div
              onClick={handleToggle}
              className={`relative w-14 h-8 bg-[#949494] rounded-full p-1 cursor-pointer transition-all duration-300 ${
                isOn ? "bg-green-500" : "bg-[#949494]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                  isOn ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex justify-center items-center  w-[402.91px] h-[57px] gap-[8px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[402.91px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[89px] bg-[#001D58] font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifcationSettingsModal;
