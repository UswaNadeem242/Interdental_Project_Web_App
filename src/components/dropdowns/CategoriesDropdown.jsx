import React from "react";

const CategoriesDropdowon = () => {
  const categories = [
    "Dental Laser",
    "Fanta Files",
    "Materials",
    "Mega Discount",
    "Ortho-Dontics",
  ];
  return (
    <div className="w-[125px] h-[138px] rounded-[8px] py-[8px] px-[16px] space-y-[8px] bg-white">
      {categories.map((category) => (
        <p
          key={category}
          className="font-poppins font-normal text-[12px] leading-[18px] text-[#434343] cursor-pointer"
        >
          {category}
        </p>
      ))}
    </div>
  );
};

export default CategoriesDropdowon;
