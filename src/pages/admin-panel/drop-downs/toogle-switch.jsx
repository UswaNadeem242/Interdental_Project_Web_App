import React, { useState } from "react";

// Reusable Toggle Switch Component
export const ToggleSwitch = ({
  label,
  price,
  showPrice,
  initialState = true,
  onClick,
  setOpen,
}) => {
  // Use state to manage the toggle's checked status
  const [isChecked, setIsChecked] = useState(initialState);

  const toggleHandler = () => {
    setIsChecked(!isChecked);
    // In a real application, you would call an API or update a global state here
    console.log(`Toggled ${label}: ${!isChecked ? "ON" : "OFF"}`);
  };

  return (
    <div
      onClick={() => setOpen(true)}
      className="flex md:min-w-96 items-center justify-between gap-20  py-2 px-3 bg-white border-2 border-gray-100 cursor-pointer "
    >
      {/* Label Text (e.g., '3Shape') */}
      <span className={`text-xs font-normal ml-2 text-[#828386]`}>{label}</span>

      {/* Toggle Container */}
      <div className="flex items-center gap-2">
        <p className={`text-[#001D58] text-xs font-semibold ${showPrice}`}>
          ${price || 0}
        </p>
        <button
          // onClick={toggleHandler}
          onClick={(e) => {
            e.stopPropagation(); // 🚫 prevent bubbling up
            toggleHandler(); // ✅ your actual toggle logic
          }}
          // Tailwind classes for the track (background)
          className={`relative inline-flex items-center h-6 w-10 rounded-full transition-colors duration-200 ease-in-out flex-shrink-0  ${
            isChecked ? "bg-[#001D58]" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={isChecked}
        >
          <span className="sr-only">Toggle {label}</span>

          {/* Toggle Indicator (The circle/thumb) */}
          <span
            // Tailwind classes for the thumb
            className={`
            inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] shadow-lg ring-0 transition duration-200 ease-in-out
            ${isChecked ? "translate-x-5" : "translate-x-1"}
          `}
          >
            {/* Inner circle to create the hollow effect when ON, matching the dark blue in your image */}
            {isChecked && (
              <span className="block h-full w-full rounded-full  "></span>
            )}
            {/* Inner circle when OFF (simple white thumb) */}
            {!isChecked && (
              <span className="block h-full w-full rounded-full"></span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
