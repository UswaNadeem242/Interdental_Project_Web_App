// // DentalChart.jsx
// import React, { useState } from "react";

// const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);  // 1–16
// const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17); // 17–32

// export const TeethSelection = ({ selectedTeeth, setSelectedTeeth, toggleTooth }) => {
//     const Tooth = ({ id }) => (
//         <div
//             onClick={() => toggleTooth(id)}
//             className={`w-10 h-14 flex items-center justify-center border rounded-md cursor-pointer transition
//         ${selectedTeeth.includes(id) ? "border-secondaryBrand text-secondaryBrand" : "bg-white"}`}
//         >
//             {id}
//         </div>
//     );

//     return (
//         <div className="p-6">
//             {/* Selected Teeth */}
//             {/* {selectedTeeth.length > 0 && (
//                 <div className="mb-6 p-4   text-blue-800 rounded-lg font-semibold text-center">
//                     Selected Teeth: {selectedTeeth.sort((a, b) => a - b).join(", ")}
//                 </div>
//             )} */}

//             {/* Upper Jaw (1–16) */}
//             <div className="flex justify-center gap-2 mb-8">
//                 {upperTeeth.map((id) => (
//                     <Tooth key={id} id={id} />
//                 ))}
//             </div>

//             {/* Lower Jaw (17–32) */}
//             <div className="flex justify-center gap-2">
//                 {lowerTeeth.map((id) => (
//                     <Tooth key={id} id={id} />
//                 ))}
//             </div>
//         </div>
//     );
// };





// DentalChart.jsx
import React from "react";

// Replace with your actual image URLs
const toothImage = "https://placehold.co/40x40/000000/FFFFFF.png?text=Tooth";

const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);  // 1–16
const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17); // 17–32

export const TeethSelection = ({ selectedTeeth, setSelectedTeeth }) => {
    const toggleTooth = (id) => {
        setSelectedTeeth((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const Tooth = ({ id }) => {
        const isSelected = selectedTeeth.includes(id);

        return (
            <div
                onClick={() => toggleTooth(id)}
                className=" w-10  gap-2 flex flex-col items-center cursor-pointer "
            >
                <div
                    className={`w-12 h-12 flex items-center justify-center border rounded-md 
                        ${isSelected ? "border-secondaryBrand" : "border-gray-300"}
                    `}
                >
                    <img
                        src={toothImage}
                        alt={`Tooth ${id}`}
                        className={`w-10 h-10 ${isSelected ? "opacity-100" : "opacity-70"}`}
                    />

                </div>
                <span className="mt-1 text-xs font-medium text-gray-700">{id}</span>
            </div>
        );
    };

    const renderJaw = (teeth) => (
        <div className="flex justify-center gap-2 mb-4">
            {teeth.map((id) => (
                <Tooth key={id} id={id} />
            ))}
        </div>
    );

    return (
        <div className="p-6">
            {/* Upper Jaw */}
            {renderJaw(upperTeeth)}

            {/* Lower Jaw */}
            {renderJaw(lowerTeeth)}
        </div>
    );
};

