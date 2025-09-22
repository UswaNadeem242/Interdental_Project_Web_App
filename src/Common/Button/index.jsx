import React from "react";
import { NavLink } from "react-router-dom";

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
