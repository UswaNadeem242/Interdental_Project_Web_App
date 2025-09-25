import React from "react";

function Dimensions({ thicknesses, diameters }) {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondaryBrand mb-8 sm:mb-10">
        Dimensions
      </h2>

      <div className="space-y-6">
        {/* Diameters */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-10 mb-12">
          <span className="font-bold text-[#000000] mb-2 md:mb-0 w-full md:w-auto">
            Diameters
          </span>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {diameters.map((item, index) => (
              <div
                key={index}
                className="px-3 sm:px-5 py-2 sm:py-3 bg-card rounded-full text-xs sm:text-sm font-medium text-[#000000]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Thicknesses */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <span className="font-bold text-[#000000] mb-2 md:mb-0 w-full md:w-auto">
            Thicknesses
          </span>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {thicknesses.map((item, index) => (
              <div
                key={index}
                className="px-3 sm:px-5 py-2 sm:py-3 bg-card rounded-full text-xs sm:text-sm font-medium text-[#000000]"
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
