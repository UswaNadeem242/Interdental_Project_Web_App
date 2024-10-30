import React from "react";

const SearchBarDropdown = () => {
  const searchedItems = [
    "Dental Laser",
    "Fanta Files",
    "Materials",
    "Mega Discount",
    "Ortho-Dontics",
  ];
  return (
    <div className="w-[533px] h-auto rounded-[8px] py-[8px] px-[16px] space-y-[8px] bg-white">
      {searchedItems.map((item) => (
        <p
          key={item}
          className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343] cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default SearchBarDropdown;
