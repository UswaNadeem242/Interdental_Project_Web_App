import React from "react";

function Shades({ shades, title }) {
  return (
    <div>
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-[#001D58] mb-10">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-6 gap-4 justify-items-center">
        {shades.map((shade, index) => (
          <div
            key={index}
            className={`w-24 h-12 flex items-center justify-center rounded-full text-sm font-medium 
              ${shade.border ? "border border-gray-300" : ""}`}
            style={{ backgroundColor: shade.color }}
          >
            {shade.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shades;
