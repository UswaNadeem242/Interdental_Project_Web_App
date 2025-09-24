function Shades({ shades, title }) {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#001D58] mb-8 sm:mb-10">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-6 gap-x-8 gap-y-14 lg:mx-40 ">
        {shades.map((shade, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded-full text-xs sm:text-sm font-medium py-6 
              `}
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
