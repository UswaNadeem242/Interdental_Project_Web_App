import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandsDropdown = ({ setBrandsDropdown }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const brands = [
    {
      id: 1,
      name: "Outfitter",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbFLWasfkYhR0-T1Nj0ndJ_FMQlNRYNMkgRZpULJKgBkcQB_T7iGBMNNg_HVRLJVlSVo&usqp=CAU",
    },
    {
      id: 2,
      name: "Bonanza",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbFLWasfkYhR0-T1Nj0ndJ_FMQlNRYNMkgRZpULJKgBkcQB_T7iGBMNNg_HVRLJVlSVo&usqp=CAU",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBrandsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleBrand = (id) => {
    console.log(id);
  };
  return (
    <div
      ref={dropdownRef}
      className="flex justify-center items-center w-[154.58px] h-auto rounded-[8px] py-[8px] px-[16px] space-y-[8px] bg-white"
    >
      <div className="w-[122.58px] h-auto flex flex-col justify-center items-start space-y-[8px]">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/shop`)}
            className="flex justify-start items-center cursor-pointer gap-[4.8px] w-[103.58px] h-[24.79px]"
          >
            <img
              src={brand.imageUrl}
              alt={brand.name}
              className="w-[24.79px] h-[24.79px]"
            />
            <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#808080]">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsDropdown;
