function Shades({ shades, title, description }) {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001D58] mb-8 sm:mb-10">
        {title}
      </h2>
      <p className="text-base font-medium capitalize font-poppins text-center py-8">
        {description}
      </p>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {shades.map((shade, index) => (
          <div
            key={index}
            className={`w-20 h-10 sm:w-24 sm:h-12 flex items-center justify-center rounded-full text-xs sm:text-sm font-medium 
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
