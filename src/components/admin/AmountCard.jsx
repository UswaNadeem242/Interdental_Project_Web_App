import React from "react";

const AmountCard = () => {
  return (
    <div className="flex flex-col justify-start items-start w-[339px] h-[153px] rounded-[16px] bg-white">
      <div className="w-[339px] h-[119px] flex justify-between items-center p-[16px]">
        <div className="flex flex-col justify-start items-between w-[243px] h-[87px] space-y-[24px]">
          <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
            Total Sales
          </p>
          <p className="font-poppins font-bold text-[28px] leading-[42px] text-[#001D58]">
            $2.5M
          </p>
        </div>
        <svg
          width="64"
          height="65"
          viewBox="0 0 64 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.5"
            width="64"
            height="64"
            rx="32"
            fill="#94D3DD"
            fill-opacity="0.1"
          />
          <path
            d="M32 37.8333V44.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M37.3334 35.1667V44.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M42.6666 29.8333V44.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M45.3333 20.5L33.8053 32.028C33.7434 32.0901 33.6698 32.1393 33.5888 32.1729C33.5078 32.2066 33.421 32.2239 33.3333 32.2239C33.2456 32.2239 33.1588 32.2066 33.0778 32.1729C32.9968 32.1393 32.9232 32.0901 32.8613 32.028L28.472 27.6387C28.3469 27.5137 28.1774 27.4435 28.0006 27.4435C27.8238 27.4435 27.6543 27.5137 27.5293 27.6387L18.6666 36.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.3334 40.5V44.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.6666 35.1667V44.5"
            stroke="#001D58"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="w-[339px] h-[34px] border-t-[1px] border-[#0000000D] py-[8px] px-[16px] gap-[10px]">
        <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
          From jan 01,2024 March 30,2024
        </p>
      </div>
    </div>
  );
};

export default AmountCard;
