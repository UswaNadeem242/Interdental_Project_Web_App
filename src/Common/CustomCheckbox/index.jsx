import React from "react";

export default function CustomCheckbox({ checked, onChange, className = "" }) {
  return (
    <div
      className={`inline-flex items-center justify-center cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onChange) {
          onChange(!checked);
        }
      }}
    >
      <div
        className={`
          flex items-center justify-center
          w-5 h-5 rounded
          transition-all duration-200 ease-in-out
          border-2
          ${
            checked
              ? "bg-[#F9F5FF] border-[#001D58]"
              : "bg-white border-gray-300"
          }
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
          >
            <path
              d="M10.3333 1L3.91667 7.41667L1 4.5"
              stroke="#001D58"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

