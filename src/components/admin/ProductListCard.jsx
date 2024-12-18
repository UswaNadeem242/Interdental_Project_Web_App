import React from "react";
import product6 from "../../assets/product6.png";

const ProductListCard = () => {
  return (
    <div className="flex justify-between items-center w-[350px] h-[62.05px] border-b-[1px] border-[#0000000D] py-[12px]">
      <div className="flex justify-between items-center w-[186.12px] h-[38px] gap-[16.07px]">
        <img src={product6} alt="product" className="w-[38.05px] h-[38.05px]" />
        <div className="flex flex-col justify-start items-start w-[132px] h-[37.69px]">
          <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
            Pain Management
          </p>
          <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#949494]">
            $79.99
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-end w-[52px] h-[37px] space-y-[4px]">
        <p className="font-poppins font-semibold text-[12px] leading-[18px] text-[#434343]">
          983 Sold
        </p>
        <p className="font-poppins font-normal text-[10px] leading-[15px] text-[#949494]">
          $948.55
        </p>
      </div>
    </div>
  );
};

export default ProductListCard;
