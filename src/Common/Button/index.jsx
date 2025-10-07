import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function PrimaryButtonUI({ title, onClick, className, href }) {
  return (
    <NavLink to={href}>
      <button
        onClick={onClick}
        className={`${className} bg-secondaryBrand  text-white font-semibold font-poppins text-sm  whitespace-nowrap `}
      >
        {title}
      </button>
    </NavLink>
  );
}

export function SecondaryButton({ title, onClick, className, icon, href }) {
  return (
    <NavLink to={href}>
      <button
        onClick={onClick}
        className={`${className}   font-semibold font-poppins text-sm  whitespace-nowrap`}
      >
        <span className="flex gap-2 items-center">
          {icon} {title}
        </span>
      </button>
    </NavLink>
  );
}



export function ThirdButtonUI({ title, href }) {
  const navigate = useNavigate();
  return (
    <button className=" flex justify-between items-center   rounded-full border-2 border-fouthBrand gap-2 sm:gap-4 p-2" onClick={() => navigate(href)}>
      {/* w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px]  */}
      <h1 className="font-poppins font-semibold text-sm capitalize text-primaryText">
        {title}
      </h1>
      <div className="rounded-full bg-secondaryBrand text-white p-2 ">
        <ArrowRightIcon className="w-4 h-4" />
      </div>
    </button>
  )
}
