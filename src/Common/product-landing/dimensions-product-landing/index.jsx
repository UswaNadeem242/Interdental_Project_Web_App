import React from "react";

function Dimensions({ thicknesses, diameters }) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-secondaryBrand mb-10 ">
        Dimensions
      </h2>
      <div className="space-y-6">
        {/* Diameters */}
        <div className="flex items-center gap-20">
          <span className="font-bold text-[#000000] ">Diameters</span>
          <div className="flex gap-4 flex-wrap">
            {diameters.map((item, index) => (
              <div
                key={index}
                className="px-5 py-3 bg-card rounded-full text-sm font-medium text-[#000000]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Thicknesses */}
        <div className="flex items-center gap-20">
          <span className="font-bold text-[#000000] ">Thicknesses</span>
          <div className="flex gap-4 flex-wrap: nowrap;">
            {thicknesses.map((item, index) => (
              <div
                key={index}
                className="px-5 py-3 bg-card rounded-full text-sm font-medium text-[#000000]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dimensions;
