import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const tabs = ["Active", "Shipped", "Completed"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex justify-center items-center w-full h-auto py-8 bg-[#F8F8F8]">
      <div className="flex flex-col justify-start items-start w-[1124px] h-[505px] p-[32px] space-y-[16px] rounded-[16px] bg-white ">
        <p className="font-poppins font-semibold text-[24px] leading-[36px] text-black">
          Orders
        </p>
        <div className="flex justify-start items-center w-[1060px] h-[55px] rounded-[12px] border-[1px] border-[#0000001A] gap-[8px] p-[8px]">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={
                index === selectedIndex
                  ? "w-[342.67px] h-[39px] text-center font-poppins font-semibold text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#434343] bg-[#F8F8F8]"
                  : "w-[342.67px] h-[39px] text-center font-poppins font-normal text-[14px] leading-[21px] rounded-[12px] py-[8px] px-[16px] gap-[16px] text-[#949494]"
              }
            >
              <p className="">{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
