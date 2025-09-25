import { useState } from "react";
import { warrantyCards } from "../../Constant";
import CircleIcon from "../../icon/circle-icon";



const Warranty = () => {
  return (
    <section className="container px-4 mx-auto py-28  border-b border-background">
      <div className="flex justify-center ">
        <h1 className="text-primaryText text-base md:text-3xl font-normal font-poppins capitalize">
          THE

          <span className="md:text-3xl font-bold font-poppins text-secondaryBrand capitalize ml-2">
            WARRANTY
          </span>
        </h1>
      </div>
      <div className="flex justify-center pb-6">
        <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl py-6">
          Interoral.ai provides peace of mind and a unique practice growth opportunity with a comprehensive Warranty Plans and Referal Program
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warrantyCards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2"
            >

              {/* Left - Image */}
              <div className="w-full h-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full sm:w-[200px] md:w-[290px] lg:w-[300px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[288px] m-2 sm:m-4 rounded-lg object-cover" />

              </div>

              {/* Right - Content */}
              <div className="flex flex-col justify-between p-6 ">
                <div>
                  <h3 className="text-primaryText text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-secondaryBrand text-lg font-bold mb-4">
                    {card.subtitle}
                  </p>

                  <ul className="space-y-2">
                    {card.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2 items-center text-sm text-[#757575]"
                      >
                        <CircleIcon className="text-secondaryBrand w-4 h-4" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-6 text-white bg-secondaryBrand text-sm font-semibold capitalize py-3 px-6 rounded-md self-start hover:bg-secondaryBrand/90 transition">
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Warranty;
