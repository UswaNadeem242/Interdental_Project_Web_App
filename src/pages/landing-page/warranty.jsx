import { useState } from "react";

const warranties = [
  {
    id: 1,
    title: "WARRANTY PROGRAM",
    subtitle: "PATIENT",
    description:
      "Our warranty gives you the comfort and reassurance you deserve",
    image: "/assets/landing-page/warranty-image-1.png",
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 2,
    title: "WARRANTY PLAN",
    subtitle: "DOCTOR",
    description:
      "Find everything you need to know about our Services Warranty Plan",
    image: "/assets/landing-page/warranty-image-2.png",
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
];

const Warranty = () => {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Section Header */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300 uppercase text-center">
        THE WARRANTY
      </h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        Interdental Lab provides peace of mind and a unique practice growth
        opportunity with a comprehensive Warranty Plans and Referral Program.
      </p>

      {/* Warranty Cards */}
      <div className="mx-auto mt-4 sm:mt-6 flex md:grid flex-row md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide">
        {warranties.map((warranty, index) => (
          <div
            key={warranty.id}
            className={`bg-white border flex flex-col sm:flex-row ${
              index % 2 === 0 ? "" : "sm:flex-row-reverse sm:pr-6 md:pr-8"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition min-w-[280px] sm:min-w-[400px] md:min-w-0 snap-center md:snap-none`}
          >
            <div className="relative">
              <img
                src={warranty.image}
                alt={warranty.subtitle}
                className="w-full sm:w-[200px] md:w-[300px] lg:w-[384px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[288px] m-2 sm:m-4 rounded-lg object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 my-auto">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                {warranty.title}
              </h3>
              <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-300 mt-4 sm:mt-6 md:mt-8">
                {warranty.subtitle}
              </h4>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-400">
                {warranty.description}
              </p>
              <button
                className={`ml-16 mt-4 sm:mt-6 px-4 sm:px-5 md:px-6 py-2 sm:py-3 border transition rounded-lg ${warranty.buttonStyle} text-xs sm:text-sm md:text-base`}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Warranty;
