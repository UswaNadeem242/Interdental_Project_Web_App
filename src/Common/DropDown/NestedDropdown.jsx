import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";

// --- SubDropdown Component ---
const SubDropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-background py-2">
      <button
        type="button"
        className="flex items-center justify-between w-full text-sm font-normal text-textFieldHeading font-poppins"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <span>
          {isOpen ? (
            <ChevronUpIcon className="w-3 h-3" />
          ) : (
            <ChevronDownIcon className="w-3 h-3" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((opt) => {
            const optionLabel = opt?.name ?? String(opt);
            const optionValue = opt?.id ?? String(opt);
            const selectedValue = selected?.id ?? selected;
            const isActive = selectedValue === optionValue;

            return (
              <button
                type="button"
                key={optionValue}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(opt); // ✅ valid here
                  setIsOpen(false); // ✅ close dropdown after select
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  isActive
                    ? "bg-secondaryBrand text-white border-blue-600"
                    : "text-gray-700 border border-textField"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- Main ShadeDropdown ---
export const ShadeDropdown = ({
  shades = [],
  touched,
  setTouched = () => {},
  className,
  selectedShades = {}, // New prop for selected shades
  onChange = () => {}, // Updated to handle groupName and shade
  disabled = false, // New disabled prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (groupName, option) => {
    console.log("option", option);

    // Check if this option is already selected
    const currentSelection = selectedShades[groupName];
    const isAlreadySelected = currentSelection && currentSelection.id === option.id;

    // If already selected, deselect it (pass null), otherwise select it
    const newSelection = isAlreadySelected ? null : option;
    
    // Call the onChange prop with groupName and new selection
    onChange(groupName, newSelection);

    setTouched((prev) => ({ ...prev, [`shade_${groupName}`]: false }));

    // ✅ Close after selecting
    setIsOpen(false);
  };

  // ✅ Build label from selected shades
  const selectedLabel = Object.values(selectedShades)
    .map((s) => s?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="border border-background shadow-sm bg-white ">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-2 rounded-xl bg-white px-4 py-3 text-sm outline-none transition-shadow text-textFieldHeading font-normal ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {selectedLabel || "Select Shades"} {/* ✅ Show selected */}
        <span>
          {isOpen ? (
            <ChevronUpIcon className="w-3 h-3" />
          ) : (
            <ChevronDownIcon className="w-3 h-3" />
          )}
        </span>
      </button>

      {isOpen && !disabled && (
        <div className={`p-3 space-y-3 ${className}`}>
          <input
            type="text"
            placeholder="Search shades..."
            value={searchTerm} // ⚡ bind search term
            onChange={(e) => setSearchTerm(e.target.value)} // ⚡ update search term
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
          />
          {Array.isArray(shades) &&
            shades.map((group) => {
              // ⚡ ADDED: filter children based on search term
              const filteredOptions = (group.children || []).filter((child) =>
                child.name.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <SubDropdown
                  key={group.id}
                  label={group.name}
                  options={filteredOptions} // ⚡ pass filtered options
                  selected={selectedShades[group.name] || null}
                  onSelect={(opt) => handleSelect(group.name, opt)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
