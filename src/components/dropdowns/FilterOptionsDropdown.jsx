import React from "react";

const FilterOptionsDropdown = () => {
  return (
    <div className="flex justify-center items-center absolute top-10 right-0 w-[225px] h-[168px] rounded-[8px] py-[8px] px-[16px] gap-[8px] bg-white shadow-[0_0_10px_#00000017]">
      <div className="flex flex-col justify-start items-center w-[193px] h-[152px]">
        <div className="flex justify-start items-center w-[193px] h-[38px] border-b-[1px] border-[#0000000D] gap-[8px] py-[10px]">
          <p className="w-[169px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
            Buyer Name
          </p>
          <input
            type="radio"
            className="w-[16px] h-[16px] rounded-[15px] gap-[6px]"
          />
        </div>
        <div className="flex justify-start items-center w-[193px] h-[38px] border-b-[1px] border-[#0000000D] gap-[8px] py-[10px]">
          <p className="w-[169px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
            Order Id
          </p>
          <input
            type="radio"
            className="w-[16px] h-[16px] rounded-[15px] gap-[6px]"
          />
        </div>
        <div className="flex justify-start items-center w-[193px] h-[38px] border-b-[1px] border-[#0000000D] gap-[8px] py-[10px]">
          <p className="w-[169px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
            Date
          </p>
          <input
            type="radio"
            className="w-[16px] h-[16px] rounded-[15px] gap-[6px]"
          />
        </div>
        <div className="flex justify-start items-center w-[193px] h-[38px] border-b-[1px] border-[#0000000D] gap-[8px] py-[10px]">
          <p className="w-[169px] h-[18px] font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
            Price
          </p>
          <input
            type="radio"
            className="w-[16px] h-[16px] rounded-[15px] gap-[6px]"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptionsDropdown;
