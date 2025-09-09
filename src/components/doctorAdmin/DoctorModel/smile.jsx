import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CheckIcon } from "@heroicons/react/24/solid";

export const SmileDesignPicker = ({
  isModalOpen,
  setIsModalOpen,
  selected,
  setSelected,
}) => {
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const [selected, setSelected] = useState([]);

  // Generate 16 designs dynamically
  const smileDesigns = Array.from({ length: 16 }, (_, i) => i + 1);

  const toggleDesign = (design) => {
    setSelected((prev) =>
      prev.includes(design)
        ? prev.filter((d) => d !== design)
        : [...prev, design]
    );
  };
  const [selectedTeeth, setSelectedTeeth] = useState([3, 4, 12, 30]);
  const [showSmilePicker, setShowSmilePicker] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl   p-6 shadow-lg w-[80%] max-w-3xl h-auto min-h-[90vh]  ">
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
          {smileDesigns.map((design) => (
            <label
              key={design}
              className={`relative border rounded-lg p-2  flex flex-col items-center cursor-pointer transition ${
                selected.includes(design)
                  ? "border-blue-600 ring-1 ring-blue-600"
                  : "border-gray-200"
              }`}
            >
              {/* Custom checkbox */}

              <input
                type="checkbox"
                value={design}
                checked={selected.includes(design)}
                onChange={() => toggleDesign(design)}
                className="hidden peer "
              />

              <div className="flex gap-1 items-center justify-center">
                <div className="top-2 left-2 w-4 h-4  text-center border border-gray-400 rounded-sm flex items-center justify-center peer-checked:border-blue-600">
                  {/* <SmileCheckBox selected={selected} design={design} /> */}
                  <CheckIcon
                    className={`w-8 h-8 text-blue-600 ${
                      selected.includes(design) ? "block" : "hidden"
                    }`}
                  />
                </div>

                {/* Label text */}
                <span className="text-sm font-poppins">
                  Smile Design {design}
                </span>
              </div>

              {/* Image */}
              <img
                src="/assets/doctor/teeth1.png"
                alt={`Smile Design ${design}`}
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
