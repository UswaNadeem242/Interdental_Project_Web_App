// DentalChart.jsx
import React, { useState } from "react";

const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);  // 1–16
const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17); // 17–32

export const DentalChart = () => {
    const [selectedTeeth, setSelectedTeeth] = useState([]);

    const toggleTooth = (id) => {
        setSelectedTeeth((prev) =>
            prev.includes(id)
                ? prev.filter((tooth) => tooth !== id) // unselect
                : [...prev, id] // select
        );
    };

    const Tooth = ({ id }) => (
        <div
            onClick={() => toggleTooth(id)}
            className={`w-10 h-14 flex items-center justify-center border rounded-md cursor-pointer transition
        ${selectedTeeth.includes(id) ? "border-secondaryBrand text-secondaryBrand" : "bg-white"}`}
        >
            {id}
        </div>
    );

    return (
        <div className="p-6">
            {/* Selected Teeth */}
            {/* {selectedTeeth.length > 0 && (
                <div className="mb-6 p-4   text-blue-800 rounded-lg font-semibold text-center">
                    Selected Teeth: {selectedTeeth.sort((a, b) => a - b).join(", ")}
                </div>
            )} */}

            {/* Upper Jaw (1–16) */}
            <div className="flex justify-center gap-2 mb-8">
                {upperTeeth.map((id) => (
                    <Tooth key={id} id={id} />
                ))}
            </div>

            {/* Lower Jaw (17–32) */}
            <div className="flex justify-center gap-2">
                {lowerTeeth.map((id) => (
                    <Tooth key={id} id={id} />
                ))}
            </div>
        </div>
    );
};

