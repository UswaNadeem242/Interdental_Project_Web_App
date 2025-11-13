import { useState, useEffect, useRef } from "react";
import DropDownArrow from "../../../icon/DropDownArrow";
import PullUpArrow from "../../../icon/pull-up-arrow";

import AddBrandModall from "../../../modals/AddBrandModalTwo";
import { Xmark } from "../../../icon/xmark";

export default function AddCategoryDropDown({
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
  const [showField, setShowfield] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

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
          {showField && (
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mx-4 mt-4 py-2 mb-2">
              <input
                type="text"
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
                placeholder="category name"
                className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 outline-none"
              />

              <button className="bg-[#001D58] text-[#F8F8F8] text-xs  px-5 py-3 rounded-full font-medium hover:bg-[#002b75] transition">
                Add
              </button>

              <button
                onClick={() => {
                  setShowfield(false);
                  setShowButton(true);
                }}
                className="px-3 text-gray-500 hover:text-gray-700 transition"
              >
                <Xmark />
              </button>
              <hr />
            </div>
          )}

          {showButton && (
            <button
              onClick={() => {
                setShowfield(true);
                setShowButton(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-[#001D58] text-sm font-normal hover:bg-gray-100 ${buttonClassName}`}
            >
              <span className={`text-xl `}>＋</span> {buttonText}
            </button>
          )}

          {/* Brands List */}
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className="flex justify-between mb-1 items-center w-full px-4 py-2 text-left text-xs text-[#828386] hover:bg-gray-100"
            >
              <span>{option}</span>
              <span
                className={`w-5 h-5 border rounded-full flex items-center justify-center  ${
                  selected === option ? "border-blue-600" : "border-gray-300"
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
      {brandModal && <AddBrandModall setIsModalOpen={setBrandModal} />}
    </div>
  );
}
