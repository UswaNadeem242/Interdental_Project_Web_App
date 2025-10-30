import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../store/toast-slice";

export const SmileDesignPicker = ({
  isModalOpen,
  setIsModalOpen,
  selected,
  setSelected,
}) => {
  const { orders: dropdowns } = useSelector((state) => state.dropdown);
  const [smileItems, setSmileItems] = useState([]);
  const [selectedSmile, setSelectedSmile] = useState(null);
  const dispatch = useDispatch();
  // Load Smile Type from dropdownsa

  console.log("dropdowns", dropdowns);
  useEffect(() => {
    if (!dropdowns || !Array.isArray(dropdowns)) return;
    const smileGroup = dropdowns.find((item) => item.name === "Smile Type");
    if (smileGroup?.children && Array.isArray(smileGroup.children)) {
      setSmileItems(smileGroup.children);

      // Initialize selectedSmile from selected prop
      if (selected) {
        setSelectedSmile(selected);
      }
    }
  }, [dropdowns, selected]);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelect = (smile) => {
    // Update local state for UI only
    if (smile.parentId === selectedSmile?.parentId) {
      setSelectedSmile(null);
      return null;
    } else {
      setSelectedSmile(smile);
      return null;
    }
  };

  const handleConfirm = () => {
    if (selectedSmile) {
      // Pass the selected smile back to parent component
      setSelected(selectedSmile);
      setIsModalOpen(false);
    } else {
      dispatch(
        showToast({
          message: `Please Select a Smile Design Image first.`,
          type: "error",
        })
      );
    }
  };

  if (!smileItems || smileItems.length === 0) {
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
          {smileItems.map((smile, i) => {
            return (
              <label
                key={smile.id}
                onClick={() => handleSelect(smile)}
                // className={`relative border rounded-lg p-2 flex flex-col items-center cursor-pointer transition-all duration-200 ease-in-out ${selectedSmile?.id === smile.id
                //   ? "border-blue-600 ring-1 ring-blue-600"
                //   : "border-gray-200"
                //   }`}
                className={`relative border rounded-lg p-2 flex flex-col items-center cursor-pointer transition-all duration-200 ease-in-out ${
                  selectedSmile?.parentId === smile?.parentId
                    ? "border-secondaryBrand border-2"
                    : "border-background border-2"
                }`}
              >
                <div className="flex gap-1 items-center justify-center">
                  <div className="top-2 left-2 w-4 h-4 text-center border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
                    <CheckIcon
                      className={`w-5 h-5 text-[#001D58] ${
                        selectedSmile?.parentId === smile.parentId
                          ? "block"
                          : "hidden"
                      }`}
                    />
                  </div>
                  <span className="md:text-sm text-xs font-poppins ml-1">
                    {`${smile.label}_${i + 1}`}
                    {/* {`Smile Design_${i + 1}`} */}
                  </span>
                </div>

                <img
                  src={smile.filePath || "/assets/doctor/teeth1.png"}
                  alt={smile.label}
                  className="w-full h-auto rounded-md mt-2"
                />
              </label>
            );
          })}
        </div>

        {/* Selected Smile Summary */}

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
