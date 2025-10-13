// export const ChartDropDown = ({
//   title,
//   selectedPeriod,
//   setSelectedPeriod,
//   onChange,
// }) => {
//   return (
//     <div className="flex justify-between items-center mb-4 font-poppins ">
//       <h2 className="text-lg font-semibold text-primaryText ">{title}</h2>
//       <select
//         value={selectedPeriod}
//         onChange={onChange}
//         className="border border-gray-100 rounded-md px-3 py-1 text-sm"
//       >
//         <option value="weekly">Weekly</option>
//         <option value="monthly">Monthly</option>
//         <option value="yearly">Yearly</option>
//       </select>
//     </div>
//   );
// };

import React, { useState, useRef, useEffect } from "react";

import DropDownArrow from "../../icon/DropDownArrow";

export const ChartDropDown = ({
  title,
  selectedPeriod,
  setSelectedPeriod,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    setSelectedPeriod(value);
    onChange({ target: { value } }); // keeps same functionality
    setIsOpen(false);
  };

  return (
    <div
      className="flex justify-between items-center mb-4 font-poppins relative"
      ref={dropdownRef}
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-primaryText">{title}</h2>

      {/* Dropdown button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 min-w-[110px] focus:outline-none"
        >
          {options.find((opt) => opt.value === selectedPeriod)?.label}
          <DropDownArrow
            className={`ml-2 w-4 h-4 transition-transform ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-md py-2 z-20">
            {options.map((option, index) => (
              <div key={option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="flex justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {option.label}
                  <span
                    className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                      selectedPeriod === option.value
                        ? "border-sky-400"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPeriod === option.value && (
                      <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
                    )}
                  </span>
                </button>
                {index < options.length - 1 && (
                  <hr className="border-gray-100 my-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
