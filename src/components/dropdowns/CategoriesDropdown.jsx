import React, { useEffect, useRef, useState } from "react";

const CategoriesDropdowon = ({
  categories,
  setCategoryId,
  setCategoriesDropdown,
}) => {
  // const categories = [
  //   "Dental Laser",
  //   "Fanta Files",
  //   "Materials",
  //   "Mega Discount",
  //   "Ortho-Dontics",
  // ];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCategory = (id) => {
    setCategoryId(id);
    setCategoriesDropdown(false);
  };
  return (
    <div
      ref={dropdownRef}
      className="w-[125px] h-auto rounded-[8px] py-[8px] px-[16px] space-y-[8px] bg-white"
    >
      {categories.map((category) => (
        <p
          key={category?.categoryId}
          onClick={() => handleCategory(category.categoryId)}
          className="font-poppins font-normal text-[12px] leading-[18px] text-[#434343] cursor-pointer"
        >
          {category?.name}
        </p>
      ))}
    </div>
  );
};

export default CategoriesDropdowon;
