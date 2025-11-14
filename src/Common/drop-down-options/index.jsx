import { useState, useEffect, useRef } from "react";
import DropDownArrow from "../../icon/DropDownArrow";
import PullUpArrow from "../../icon/pull-up-arrow";
import AddBrandModalTwo from "../../modals/AddBrandModalTwo";

export default function DropDownOptions({
  options = [],
  onSelect,
  onAddBrand,
  placeholder,
  buttonText,
  className,
  buttonClassName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [brandModal, setBrandModal] = useState(false);
  const dropdownRef = useRef(null); // Ref for detecting outside click

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  // Close dropdown on outside click
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

  return (
    <div ref={dropdownRef} className="relative w-full font-poppins">
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 py-3 border rounded-lg bg-white text-[#949494] text-sm font-normal ${className} `}
      >
        {selected || placeholder}
        <span className="ml-2  text-[#949494] text-sm font-normal">
          {isOpen ? <PullUpArrow /> : <DropDownArrow />}
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10 `}
        >
          {/* Add Brand */}
          <button
            type="button"
            onClick={() => setBrandModal(true)}
            className={`flex items-center gap-2 w-full px-4 py-2 text-[#001D58] text-sm font-normal hover:bg-gray-100 ${buttonClassName}`}
          >
            <span className={`text-xl `}>＋</span> {buttonText}
          </button>

          <hr />

          {/* Brands List */}
          {options.map((option, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleSelect(option)}
              className="flex justify-between items-center w-full px-4 py-2 text-left text-xs text-[#828386] hover:bg-gray-100"
            >
              <span>{option}</span>
              <span
                className={`w-5 h-5 border rounded-full flex items-center justify-center  ${selected === option ? "border-blue-600" : "border-gray-300"
                  }`}
              >
                {selected === option && (
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
      {brandModal && <AddBrandModalTwo setIsModalOpen={setBrandModal} />}
    </div>
  );
}
