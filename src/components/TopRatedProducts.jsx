import React from "react";

const TopRatedProducts = () => {
  return (
    // h-[906px] change needs to be done on parent div
    <div className="flex flex-col justify-center items-center w-[1306px] mb-[100px]">
      <div className="flex justify-center items-center w-[1305px] h-[63px] gap-[41px]">
        <div className="w-[376px] h-[1px] border-[1px] border-[#0000001A]"></div>
        <div className="flex flex-col justify-center items-center w-[229px] h-[63px] space-y-[8px]">
          <h1 className="font-workSans font-semibold text-[20px] leading-[23.46px] text-black">
            TOP RATED PRODUCTS
          </h1>
          <div className="flex justify-center items-center w-[119px] h-[32px] gap-[8px] px-[12px] py-[8px] text-secondaryBrand rounded-[16px] border-[1px] border-secondaryBrand">
            <h1 className="flex font-workSans font-normal w-[55px] text-[14px] leading-[6.42px]">
              View All
            </h1>
          </div>
        </div>
        <div className="w-[376px] h-[1px] border-[1px] border-[#0000001A]"></div>
      </div>
      <div>1</div>
    </div>
  );
};

export default TopRatedProducts;
