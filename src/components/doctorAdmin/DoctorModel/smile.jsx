import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

export const SmileDesignPicker = ({
  isModalOpen,
  setIsModalOpen,
  selected,
  setSelected,
  
}) => {
  const { orders: dropdowns } = useSelector((state) => state.dropdown);
  const [smileItems, setSmileItems] = useState([]);
  const [selectedSmile, setSelectedSmile] = useState(null);

  // Load Smile Type from dropdownsa
  useEffect(() => {
    if (!dropdowns || !Array.isArray(dropdowns)) return;
    const smileGroup = dropdowns.find((item) => item.name === "Smile Type");
    if (smileGroup?.children && Array.isArray(smileGroup.children)) {
      console.log("Setting smileItems:", smileGroup.children);
      setSmileItems(smileGroup.children);

      // Initialize selectedSmile from selected prop
      if (selected) {
        setSelectedSmile(selected);
      }
    }
  }, [dropdowns, selected]);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelect = (smile) => {
    console.log("handleSelect called with smile:", smile);
    // Update local state for UI only
    setSelectedSmile(smile);
    console.log("setSelectedSmile called with:", smile);
  };

  const handleConfirm = () => {
    console.log("handleConfirm called, selectedSmile:", selectedSmile);
    if (selectedSmile) {
      // Pass the selected smile back to parent component
      setSelected(selectedSmile);
      setIsModalOpen(false);
    } else {
      alert("Please select a smile design first");
    }
  };

  if (!smileItems || smileItems.length === 0) {
    console.log("No smile items found, showing empty modal");
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white rounded-2xl p-6 shadow-lg w-[80%] max-w-3xl h-auto max-h-[95vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[rgba(0,29,88,1)]">
              Select Smile Design
            </h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-500 mb-6 font-poppins text-[13px]">
            No smile designs available. Please check your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-[80%] max-w-3xl h-auto max-h-[95vh] overflow-y-auto scrollbar-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[rgba(0,29,88,1)]">
            Select Smile Design
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-500 mb-6 font-poppins text-[13px]">
          Choose the smile design that suits you best. Click on any design to
          select it.
        </p>

        {/* Smile Design Grid */}
        <div className="grid grid-cols-4 gap-4">
          {smileItems.map((smile) => {
            console.log("Rendering smile:", smile);
            return (
              <label
                key={smile.id}
                onClick={() => handleSelect(smile)}
                className={`relative border rounded-lg p-2 flex flex-col items-center cursor-pointer transition ${
                  selectedSmile?.id === smile.id
                    ? "border-blue-600 ring-1 ring-blue-600"
                    : "border-gray-200"
                }`}
              >
                {/* Custom radio button */}
                <input
                  type="radio"
                  name="smileDesign"
                  checked={selectedSmile?.id === smile.id}
                  onChange={() => handleSelect(smile)}
                  className="hidden peer"
                />

                <div className="flex gap-1 items-center justify-center">
                  <div className="top-2 left-2 w-4 h-4 text-center border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
                    <CheckIcon
                      className={`w-5 h-5 text-[#001D58] ${
                        selectedSmile?.id === smile.id ? "block" : "hidden"
                      }`}
                    />
                  </div>
                  <span className="md:text-sm text-xs font-poppins">
                    {smile.name}
                  </span>
                </div>

                <img
                  src={smile.filePath || "/assets/doctor/teeth1.png"}
                  alt={smile.name}
                  className="w-full h-auto rounded-md mt-2"
                />
              </label>
            );
          })}
        </div>

        {/* Selected Smile Summary */}
        {selectedSmile && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              Selected Smile Design:
            </p>
            <p className="text-xs text-blue-600 mt-1">{selectedSmile.name}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-[#001D58] text-white rounded-lg hover:bg-[#001D58]/90 transition-colors"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};
