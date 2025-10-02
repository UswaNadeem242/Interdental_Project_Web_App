import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const DropdownWrapper = ({ buttonLabel, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="inline-block w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="px-2 py-3 w-full border bg-[#F8F8F8] font-poppins text-left text-[#828386] font-normal text-xs"
      >
        <div className="flex gap-4 justify-between items-center">
          <span>{buttonLabel}</span>
          <ChevronDownIcon
            className={`w-4 h-4 mr-1 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>
      {/* Dropdown Content  */}
      {open && (
        <div
          className="w-full bg-white rounded-md shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};
