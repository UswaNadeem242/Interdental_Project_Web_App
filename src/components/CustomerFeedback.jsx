import React from "react";
// import starFilled from "../assets/star-filled.png";
// import starOutlined from "../assets/star-outlined.png";
// import customer from "../assets/customer.png";

const CustomerFeedback = () => {
  return (
    <div className="flex flex-col justify-start items-start w-[92%] h-[69.58px] border-b-[1px] border-[#0000000D] space-y-[9.59px]">
      <div className="flex gap-[10px] w-full h-[33.99px]">
        <img
          src="/assets/customer.png"
          alt="customer image"
          className="w-[33.98px] h-[31.97px]"
        />
        <div className="flex flex-col justify-start items-start w-[198.96px] h-[33.99px] space-y-[1.6px]">
          <h1>Kristin Watson</h1>
          <div className="flex w-[63.95px] h-[12.79px]">
            <img
              src="/assets/star-filled.png"
              alt="star filled"
              className="w-[12.79px] h-[12.79px]"
            />
            <img
              src="/assets/star-filled.png"
              alt="star filled"
              className="w-[12.79px] h-[12.79px]"
            />
            <img
              src="/assets/star-filled.png"
              alt="star filled"
              className="w-[12.79px] h-[12.79px]"
            />
            <img
              src="/assets/star-filled.png"
              alt="star filled"
              className="w-[12.79px] h-[12.79px]"
            />
            <img
              src="/assets/star-filled.png"
              alt="star filled"
              className="w-[12.79px] h-[12.79px]"
            />
          </div>
        </div>
        <h1 className="flex w-full justify-end font-poppins font-normal text-[9.59px] leading-[14.39px] text-[#999999]">
          2 min ago
        </h1>
      </div>
      <h1 className="font-poppins font-normal text-[12px] leading-[18px] text-[#808080]">
        himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et
        ipsum. Nulla varius magna a consequat
      </h1>
    </div>
  );
};

export default CustomerFeedback;
