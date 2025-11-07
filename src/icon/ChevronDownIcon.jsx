import React from "react";

function ChevronDownIcon({
  color = "#B1B1B1",
  isExpanded = false,
  className = "",
  ...props
}) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transform transition-transform duration-300 ${
        isExpanded ? "rotate-180" : "rotate-0"
      } ${className}`}
      {...props}
    >
      <path
        d="M0.958328 0.958008L6.70832 6.708L12.4583 0.958008"
        stroke={color}
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronDownIcon;
