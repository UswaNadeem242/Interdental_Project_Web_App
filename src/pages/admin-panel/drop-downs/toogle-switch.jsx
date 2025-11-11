import React, { useState } from "react";

export const ToggleSwitch = ({
  label,
  price,
  showPrice,
  initialState = true,
  onClick,
  setOpen,
  compact = false,
  bgColor = "bg-white",

}) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const toggleHandler = () => {
    setIsChecked(!isChecked);
    console.log(`Toggled ${label}: ${!isChecked ? "ON" : "OFF"}`);
  };

  return (
    <div
      onClick={() => onClick()}
      className={`flex ${compact ? "min-w-16" : "md:min-w-40"} rounded-3xl items-center justify-between gap-20 py-2 px-3 ${bgColor} border-2 cursor-pointer`}
    >
      <span className={`text-xs font-normal ml-2 text-textFieldHeading`}>{label}</span>

      <div className="flex items-center gap-2">
        <p className={`text-secondaryBrand text-xs font-semibold ${showPrice}`}>
          ${price || 0}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleHandler();
          }}
          className={`relative inline-flex items-center h-6 w-10 rounded-full transition-colors duration-200 ease-in-out flex-shrink-0  ${
            isChecked ? "bg-secondaryBrand" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={isChecked}
        >
          <span className="sr-only">Toggle {label}</span>

          <span
            className={`
            inline-block h-4 w-4 transform rounded-full bg-bgWhite shadow-lg ring-0 transition duration-200 ease-in-out
            ${isChecked ? "translate-x-5" : "translate-x-1"}
          `}
          >
            {isChecked && (
              <span className="block h-full w-full rounded-full  "></span>
            )}
            {!isChecked && (
              <span className="block h-full w-full rounded-full"></span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
