import React from "react";

const TeethSelection = ({
  selectedTeeth = [],
  onToothSelect,
  showIds = false,
}) => {
  // Use selectedTeeth prop directly - no local state needed

  const teethData = [
    // Top row (1-16)
    { id: 1, name: "UR 3rd Molar (Wisdom)", position: "top" },
    { id: 2, name: "UR 2nd Molar", position: "top" },
    { id: 3, name: "UR 1st Molar", position: "top" },
    { id: 4, name: "UR 2nd Premolar", position: "top" },
    { id: 5, name: "UR 1st Premolar", position: "top" },
    { id: 6, name: "UR Canine", position: "top" },
    { id: 7, name: "UR Lateral Incisor", position: "top" },
    { id: 8, name: "UR Central Incisor", position: "top" },
    { id: 9, name: "UL Central Incisor", position: "top" },
    { id: 10, name: "UL Lateral Incisor", position: "top" },
    { id: 11, name: "UL Canine", position: "top" },
    { id: 12, name: "UL 1st Premolar", position: "top" },
    { id: 13, name: "UL 2nd Premolar", position: "top" },
    { id: 14, name: "UL 1st Molar", position: "top" },
    { id: 15, name: "UL 2nd Molar", position: "top" },
    { id: 16, name: "UL 3rd Molar (Wisdom)", position: "top" },
    // Bottom row (17-32)
    { id: 17, name: "LL 3rd Molar (Wisdom)", position: "bottom" },
    { id: 18, name: "LL 2nd Molar", position: "bottom" },
    { id: 19, name: "LL 1st Molar", position: "bottom" },
    { id: 20, name: "LL 2nd Premolar", position: "bottom" },
    { id: 21, name: "LL 1st Premolar", position: "bottom" },
    { id: 22, name: "LL Canine", position: "bottom" },
    { id: 23, name: "LL Lateral Incisor", position: "bottom" },
    { id: 24, name: "LL Central Incisor", position: "bottom" },
    { id: 25, name: "LR Central Incisor", position: "bottom" },
    { id: 26, name: "LR Lateral Incisor", position: "bottom" },
    { id: 27, name: "LR Canine", position: "bottom" },
    { id: 28, name: "LR 1st Premolar", position: "bottom" },
    { id: 29, name: "LR 2nd Premolar", position: "bottom" },
    { id: 30, name: "LR 1st Molar", position: "bottom" },
    { id: 31, name: "LR 2nd Molar", position: "bottom" },
    { id: 32, name: "LR 3rd Molar (Wisdom)", position: "bottom" },
  ];

  // No click handler needed - teeth are display only

  const getToothColor = (tooth) => {
    if (selectedTeeth.includes(tooth.id)) {
      return "bg-blue-500 border-blue-600"; // Selected color - blue
    }
    return "bg-white border-gray-300"; // Default color - white with border
  };

  return (
    // <div className="w-full overflow-hidden">

    //   <div className="flex justify-center items-center gap-0.5 mb-2 flex-wrap">
    //     {teethData
    //       .filter((tooth) => tooth.position === "top")
    //       .map((tooth) => (
    //         <div key={tooth.id} className="flex flex-col items-center m-0.5">

    //           <span className="text-[10px] font-semibold text-gray-600 mb-0.5">
    //             {tooth.id}
    //           </span> 
    //           <div
    //             className={`
    //               w-6 h-4 sm:w-8 sm:h-5 md:w-10 md:h-6
    //               ${getToothColor(tooth)}
    //               border border-gray-300 rounded-sm
    //               flex items-center justify-center
    //               ${
    //                 selectedTeeth.includes(tooth.id)
    //                   ? "ring-1 ring-blue-500"
    //                   : ""
    //               }
    //             `}
    //             title={tooth.name}
    //           >
    //             {showIds && (
    //               <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
    //                 {tooth.id}
    //               </span>
    //             )}
    //           </div>
    //         </div>
    //       ))}
    //   </div> 
    //   <div className="flex justify-center items-center gap-0.5 flex-wrap">
    //     {teethData
    //       .filter((tooth) => tooth.position === "bottom")
    //       .map((tooth) => (
    //         <div key={tooth.id} className="flex flex-col items-center m-0.5">

    //           <div
    //             className={`
    //               w-6 h-4 sm:w-8 sm:h-5 md:w-10 md:h-6
    //               ${getToothColor(tooth)}
    //               border border-gray-300 rounded-sm
    //               flex items-center justify-center
    //               ${
    //                 selectedTeeth.includes(tooth.id)
    //                   ? "ring-1 ring-blue-500"
    //                   : ""
    //               }
    //             `}
    //             title={tooth.name}
    //           >
    //             {showIds && (
    //               <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
    //                 {tooth.id}
    //               </span>
    //             )}
    //           </div> 
    //           <span className="text-[10px] font-semibold text-gray-600 mt-0.5">
    //             {tooth.id}
    //           </span>
    //         </div>
    //       ))}
    //   </div> 
    // </div>


    // <div className="w-full overflow-hidden">
    <div className="w-full overflow-visible relative">

      {/* Top row */}
      <div className="flex justify-center items-center gap-0.5 mb-2 flex-wrap">
        {teethData
          .filter((t) => t.position === "top")
          .map((tooth) => (
            <div key={tooth.id} className="flex flex-col items-center m-0.5 relative group">
              <span className="text-[10px] font-semibold text-gray-600 mb-0.5">
                {tooth.id}
              </span>

              {/* Tooth box */}
              <div
                className={`
                  w-6 h-4 sm:w-8 sm:h-5 md:w-10 md:h-6
                  ${getToothColor(tooth)}
                  border rounded-sm flex items-center justify-center
                  ${selectedTeeth.includes(tooth.id)
                    ? "ring-1 ring-blue-500"
                    : ""
                  }
                `}
              >
                {showIds && (
                  <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
                    {tooth.id}
                  </span>
                )}
              </div>

              {/* Tooltip (only for selected teeth) */}
              {selectedTeeth.includes(tooth.id) && (
                <div
                  className="absolute bottom-8 bg-background text-secondaryBrand text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                >
                  {tooth.name}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Bottom row */}
      <div className="flex justify-center items-center gap-0.5 flex-wrap">
        {teethData
          .filter((t) => t.position === "bottom")
          .map((tooth) => (
            <div key={tooth.id} className="flex flex-col items-center m-0.5 relative group">
              <div
                className={`
                  w-6 h-4 sm:w-8 sm:h-5 md:w-10 md:h-6
                  ${getToothColor(tooth)}
                  border rounded-sm flex items-center justify-center
                  ${selectedTeeth.includes(tooth.id)
                    ? "ring-1 ring-blue-500"
                    : ""
                  }
                `}
              >
                {showIds && (
                  <span className="text-[8px] sm:text-[10px] font-bold text-gray-700">
                    {tooth.id}
                  </span>
                )}
              </div>

              {/* Tooltip for selected */}
              {selectedTeeth.includes(tooth.id) && (
                <div
                  className="absolute top-8 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                >
                  {tooth.name}
                </div>
              )}

              <span className="text-[10px] font-semibold text-gray-600 mt-0.5">
                {tooth.id}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeethSelection;
