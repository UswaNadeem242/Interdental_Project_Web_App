import React, { useState } from "react";

// This component represents the plain custom checkbox
const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-5 h-5 bg-gray-50 flex items-center justify-center">
      {/* The click target for the checkbox */}
      <div
        className="inline-flex cursor-pointer select-none"
        onClick={toggleCheckbox}
      >
        {/* Custom Checkbox Box with conditional styling */}
        <div
          className={`
            flex items-center justify-center 
            w-5 h-5 border rounded-md 
            transition duration-200 ease-in-out
            ${
              isChecked
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-[#D0D5DD]"
            }
          `}
        >
          {/* SVG Tick Mark - Only visible when checked */}
          {isChecked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
