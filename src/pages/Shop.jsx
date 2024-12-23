import React, { useState } from "react";
// import product1 from "../assets/product1.png";
// import product2 from "../assets/product2.png";
// import product3 from "../assets/product3.png";
// import product4 from "../assets/product4.png";
// import product5 from "../assets/product5.png";
// import product6 from "../assets/product6.png";
// import product7 from "../assets/product7.png";
// import product8 from "../assets/product8.png";
import { useNavigate } from "react-router-dom";
const featureProducts = [
  {
    id: 1,
    img: "/build/assets/product1.png",
    title: "G Gold Lable 1 Mini",
    price: 233.65,
  },
  {
    id: 2,
    img: "/build/assets/product2.png",
    title: "G Gold Lable 1 Mini",
    price: 739.65,
  },
  {
    id: 3,
    img: "/build/assets/product3.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 4,
    img: "/build/assets/product4.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 5,
    img: "/build/assets/product5.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 6,
    img: "/build/assets/product6.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 7,
    img: "/build/assets/product7.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
  {
    id: 8,
    img: "/build/assets/product8.png",
    title: "G Gold Lable 1 Mini",
    price: 634.23,
  },
];

const Shop = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleProduct = (product) => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="flex justify-center items-start gap-8 px-28 pt-8 pb-[240px] bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600]">
      <div className="flex flex-col justify-start items-center w-[290px] h-[679.33px] py-[16px] px-[32px] gap-[16px] rounded-[12px] bg-[#FFFFFF] top-[143px] left-[109px]">
        <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
          Filter
        </h1>
        <div className="w-[258px] h-[1px] border-[1px] border-[#0000001A]"></div>
        {/* Price filter */}
        <div className="flex flex-col justify-center items-start w-[258px] h-[99.33px] rounded-[17px] p-[12px] gap-[32px] bg-white">
          <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
            Price Range
          </h1>
          <div className="w-full mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Min: ${minPrice}</span>
              <span>Max: ${maxPrice}</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded">
              {/* Active Range Bar */}
              <div
                className="absolute h-2 bg-blue-500 rounded"
                style={{
                  left: `${(minPrice / 2000) * 100}%`,
                  right: `${100 - (maxPrice / 2000) * 100}%`,
                }}
              ></div>

              {/* Min Range Slider */}
              <input
                type="range"
                min="0"
                max="2000"
                value={minPrice}
                onChange={handleMinChange}
                className="absolute top-0 w-full h-2 appearance-none bg-transparent pointer-events-auto"
                style={{
                  accentColor: "transparent",
                }}
              />

              {/* Max Range Slider */}
              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={handleMaxChange}
                className="absolute top-0 w-full h-2 appearance-none bg-transparent pointer-events-auto"
                style={{
                  accentColor: "transparent",
                }}
              />
            </div>
          </div>
        </div>
        {/* Availability filter */}
        <div className="flex flex-col justify-center items-start w-[258px] h-[97px] rounded-[17px] p-[12px] space-y-[16px]">
          <h1 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#404145] h-[21px]">
            Avalibility
          </h1>
          <div className="flex flex-col justify-start items-start space-y-[8px] h-[44px] w-[142px] ">
            <div className="flex items-center gap-[5px] h-[18px]">
              <input
                type="checkbox"
                id="inStock"
                className="mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px]"
              />
              <label
                htmlFor="inStock"
                className="cursor-pointer font-poppins font-normal text-[12px] leading-[18px] text-[#949494]"
              >
                In Stock
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="outOfStock"
                className="mr-2 cursor-pointer rounded-[4.43px] border-[0.74px] border-[#949494] w-[14.77px] h-[14.77px] accent-secondaryBrand"
              />
              <label
                htmlFor="outOfStock"
                className="cursor-pointer font-poppins font-normal text-[12px] leading-[18px] text-secondaryBrand"
              >
                Out of Stock
              </label>
            </div>
          </div>
        </div>
        <div className="w-[258px] h-[1px] border-[1px] border-[#0000001A]"></div>
        <div className="w-[258px] h-[201px] space-y-[16px]">
          <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
            Categories
          </h1>
          <div className="w-[142px] h-[148px] space-y-[8px]">
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Dental Laser
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Fanta Files
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Feature Products
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Materials
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Ortho-Dontics
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Mega Discount
            </h1>
          </div>
        </div>
        <div className="w-[258px] h-[201px] space-y-[16px]">
          <h1 className="w-[150px] h-[21px] font-poppins font-semibold text-[14px] leading-[21px] text-[#404145]">
            Brands
          </h1>
          <div className="w-[142px] h-[148px] space-y-[8px]">
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Lascod
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Fanta
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              Feature Products
            </h1>
            <h1 className="font-poppins text-[12px] leading-[18px] font-normal text-secondaryText">
              GG
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[1224px] h-[971.44px] gap-[32px] top-[143px] left-[431px]">
        <div className="flex flex-wrap w-full h-[386px] gap-[31px]">
          {featureProducts.map((product) => (
            <div
              onClick={() => handleProduct(product)}
              className="flex flex-col justify-center items-center cursor-pointer bg-white w-[303.15px] h-[386px] p-[20px] space-y-[24px] border-[1px] border-[#0000000D] rounded-[16px]"
            >
              <img
                src={product.img}
                alt="product"
                className="w-[263.15px] h-[260.45px]"
              />
              <div className="flex flex-col justify-center items-center space-y-[7.55px]">
                <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-black">
                  {product.title}
                </h1>
                <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#94D3DD]">
                  ${product.price}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
