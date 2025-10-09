import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CheckIcon } from "@heroicons/react/24/solid";
import { updateToothSelection } from "../../../store/slices/restoration-slice";
import { useDispatch, useSelector } from "react-redux";

export const SmileDesignPicker = ({
  isModalOpen,
  setIsModalOpen,
  selected,
  setSelected,
  
}) => {
  const dispatch = useDispatch();
  const { dropdowns, selectedTooth, toothSelections } = useSelector(
    (state) => state.restoration
  );

  const [smileItems, setSmileItems] = useState([]);
  const [selectedSmile, setSelectedSmile] = useState(null);

  // Load Smile Type from dropdownsa
  useEffect(() => {
    if (!dropdowns || !Array.isArray(dropdowns)) return;

    const smileGroup = dropdowns.find((item) => item.name === "Smile Type");
    if (smileGroup?.children && Array.isArray(smileGroup.children)) {
      setSmileItems(smileGroup.children);

      // Preselect the current smile for the selected tooth
      const currentSmile = toothSelections.find(
        (t) => t.toothId === selectedTooth
      )?.smile;
      if (currentSmile) setSelectedSmile(currentSmile);
    }
  }, [dropdowns, selectedTooth, toothSelections]);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelect = (smile) => {
    if (!selectedTooth) {
      alert("⚠️ Please select a tooth first");
      return;
    }

    // Update local state for UI
    setSelectedSmile(smile);

    // Dispatch to Redux
    dispatch(
      updateToothSelection({
        toothId: selectedTooth,
        field: "smile",
        value: smile.name,
        option: smile, // full object including filePath, children, etc.
      })
    );

    // Close modal
    setIsModalOpen(false);
  };

  if (!smileItems || smileItems.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl   p-6 shadow-lg w-[80%] max-w-3xl  h-auto max-h-[95vh] overflow-y-auto  scrollbar-hidden ">
        {/* Header */}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[rgba(0,29,88,1)]">
            Pick Your Perfect Smile Design
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-500 mb-6 font-poppins text-[13px]">
          Choose one or more smile designs that suit you best. Browse the
          options below and select the ones you love!
        </p>

        {/* Smile Design Grid */}
        <div className="grid grid-cols-4 gap-4">
          {smileItems.map((smile, id) => (
            <label
              key={id}
              className={`relative border rounded-lg p-2  flex flex-col items-center cursor-pointer transition ${selected.includes(id)
                ? "border-blue-600 ring-1 ring-blue-600"
                : "border-gray-200"
                }`}
            >
              {/* Custom checkbox */}

              <input
                type="radio"
                name={`smile_${selectedTooth}`}
                checked={selectedSmile?.id === smile.id}
                onChange={() => handleSelect(smile)}
                className="hidden peer"
              />


              {/* <div className="flex gap-1 items-center justify-center">
                <div className="top-2 left-2 w-4 h-4  text-center border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
             
                  <CheckIcon
                    className={`w-8 h-8 text-[#001D58] ${selected.includes(design) ? "block" : "hidden"
                      }`}
                  />
                </div>

              
                <span className="md:text-sm  text-xs  font-poppins">
                  Smile Design {design}
                </span>
              </div>

           
              <img
                src="/assets/doctor/teeth1.png"
                alt={`Smile Design ${design}`}
                className="w-full h-auto rounded-md mt-2"
              />
            </label> */}

              <div className="flex gap-1 items-center justify-center">
                <div className="top-2 left-2 w-4 h-4 text-center border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
                  <CheckIcon
                    className={`w-5 h-5 text-[#001D58] ${selectedSmile?.id === smile.id ? "block" : "hidden"
                      }`}
                  />
                </div>
                <span className="md:text-sm text-xs font-poppins">{smile.name}</span>
              </div>

              <img
                src={smile.filePath || "/assets/doctor/teeth1.png"}
                alt={smile.name}
                className="w-full h-auto rounded-md mt-2"
              />
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <button
            onClick={handleCloseModal}
            className="flex-1 px-6 py-3 rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // alert(
              //     `Smile Design(s) confirmed: ${selected.length > 0 ? selected.join(", ") : "None"
              //     }`
              // );
              setIsModalOpen(false);
            }}
            className="flex-1 px-6 py-3 rounded-3xl bg-[rgba(0,29,88,1)] text-white hover:bg-blue-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
