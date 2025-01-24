import React from "react";
import { useNavigate } from "react-router-dom";

const TopRatedProducts = ({ products }) => {
  const navigate = useNavigate();
  return (
    // h-[906px] change needs to be done on parent div
    <div className="flex flex-col justify-center items-center w-[1306px] mb-[100px] space-y-[45px]">
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
      <div className="w-[1305.62px] h-auto space-y-[32px]">
        <div className="flex flex-wrap w-full h-auto gap-[31px]">
          {products.map((product) => (
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              className="flex flex-col justify-center items-center bg-white cursor-pointer w-[303.15px] h-[386px] p-[20px] space-y-[24px] border-[1px] border-[#0000000D] rounded-[16px]"
            >
              <img
                src={product?.img}
                alt="product"
                className="w-[263.15px] h-[260.45px]"
              />
              <div className="flex flex-col justify-center items-center space-y-[7.55px]">
                <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-black">
                  {product.name}
                </h1>
                <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                  ${product.price}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="w-full h-[386px] gap-[31px]">
          <div className="w-[303.15px] h-[386px] p-[20px] gap-[24px] border-[1px] border-[#0000000D] rounded-[16px]"></div>
        </div> */}
      </div>
    </div>
  );
};

export default TopRatedProducts;
