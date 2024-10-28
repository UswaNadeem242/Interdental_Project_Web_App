import React from "react";
import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand3.png";
import brand4 from "../assets/brand4.png";
import brand5 from "../assets/brand5.png";
import brand6 from "../assets/brand6.png";

const Brands = () => {
  const brands = [
    {
      logo: brand1,
    },
    {
      logo: brand2,
    },
    {
      logo: brand3,
    },
    {
      logo: brand4,
    },
    {
      logo: brand5,
    },
    {
      logo: brand6,
    },
  ];
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center w-[1306px] h-[205px] space-y-[24px]">
        <h1 className="font-workSans font-semibold text-[20px] leading-[23.46px] text-black">
          BRANDS
        </h1>
        <div className="flex justify-center items-center w-[1282px] h-[158px] gap-[21.72px]">
          {brands.map((brand) => (
            <div className="flex justify-center items-center bg-white rounded-[28.97px] gap-[21.72px] p-[10.86px] w-[195.56px] h-[158px] shadow-[0_4px_8px_0_rgba(0,0,0,0.05)]">
              <img src={brand.logo} alt="brands" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
