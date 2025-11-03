import React from "react";

function ChevronDownIcon({ isExpanded = false, className = "" }) {
  return (
    <div>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform duration-300 ${
          isExpanded ? "rotate-180" : "rotate-0"
        } ${className}`}
      >
        <path
          d="M0.958328 0.958008L6.70832 6.708L12.4583 0.958008"
          stroke="#B1B1B1"
          stroke-width="1.41667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default ChevronDownIcon;
