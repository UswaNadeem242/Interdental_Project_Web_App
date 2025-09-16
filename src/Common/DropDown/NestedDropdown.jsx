import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

// --- SubDropdown Component ---
const SubDropdown = ({ label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-2">
            {/* Sub-dropdown header */}
            <button
                className="flex items-center justify-between w-full text-sm font-normal text-textFieldHeading font-poppins "
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <span>{isOpen ? <ChevronUpIcon className="w-3 h-3 " /> : <ChevronDownIcon className="w-3 h-3" />}</span>
            </button>

            {/* Options list */}
            {isOpen && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={`px-3 py-1 rounded-full border text-sm 
                ${selected === opt
                                    ? "bg-secondaryBrand text-white border-blue-600"
                                    : " text-gray-700 border border-textField"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Dropdown Component ---
export const ShadeDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    // State for each sub-dropdown
    const [selectedClassic, setSelectedClassic] = useState(null);
    const [selected3D1, setSelected3D1] = useState(null);
    const [selected3D2, setSelected3D2] = useState(null);

    return (
        <div className=" border border-gray-300 shadow-sm bg-white rounded-xl">
            {/* Main dropdown header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2   rounded-xl bg-white  px-4 py-3 text-sm   outline-none transition-shadow   text-textFieldHeading font-normal"
            >
                Shade
                <span>{isOpen ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}</span>
            </button>

            {isOpen && (
                <div className="p-3 space-y-3">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none "
                    />

                    {/* Sub-dropdowns */}
                    <SubDropdown
                        label="Vita Classic Shades"
                        options={["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", 'D2', 'D3', 'D4']}
                        selected={selectedClassic}
                        onSelect={setSelectedClassic}
                    />

                    <SubDropdown
                        label="Vita 3D-Master Shades"
                        options={["1m1", "1m2", "2L1.5", "2L2.5", "2R 1.5", "2R 2.5 ", "2m1", "2m2", "2m3", "3L 1.5", "3L 2.5", "3R1.5", '3R2.5', '3L1.5', '3L2.5', '3M1', '3M2', '3M3', '4L1.5', '4L2.5', '4M1', '4M2', '4M3', '4R2.5', '5M1', '5M2', '5M3']}
                        selected={selected3D1}
                        onSelect={setSelected3D1}
                    />

                    <SubDropdown
                        label="Vita 3D-Master Shades (Extra)"
                        options={["0M1", "0M2", "0M3", "0.5m1", "1m1", "1m2", "1.4m2", "2m2", '2.5m2', '3.5m2', '4m2', '4.5m2', '5m2', '5m2.5', '5m3']}
                        selected={selected3D2}
                        onSelect={setSelected3D2}
                    />
                </div>
            )}
        </div>
    );
};

