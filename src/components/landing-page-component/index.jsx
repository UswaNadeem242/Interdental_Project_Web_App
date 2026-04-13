import React from "react";
import { Doctorsteps } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ThirdButtonUI } from "../../Common/Button";
import Slider from "react-slick";

function DoctorComponent() {
  const navigate = useNavigate();

  // Carousel settings for subscription plans on mobile/tablet
  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: false,
    swipeToSlide: true,
    cssEase: "ease",
  };

  return (
    <>
      <section className="bg-[#F9FCFF] py-12 md:py-16">
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 flex justify-center lg:justify-start">
              <img
                src={"/assets/landing-page/doctor-image.png"}
                alt="Doctor"
                className="w-full max-w-lg h-auto object-cover"
              />
            </div>
            <div className="flex-1 space-y-4 text-gray-800">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondaryBrand">
                DOCTOR
              </h3>
              <p className="mt-4 text-sm md:text-base font-normal text-secondaryText">
              Join a network of providers who trust Interoral.ai and Make Me Smile
              to deliver exceptional restorations,
              streamlined workflows, and
              long-term patient satisfaction.
              </p>
              <p className="mt-4 text-sm md:text-base font-normal text-secondaryText tracking-wide">
                Our technicians combine advanced CAD/CAM technology with artistic craftsmanship to ensure every case supports your reputation—and your bottom line.
              </p>
              <p className="mt-4 text-sm md:text-base font-normal text-secondaryText pb-4">
              Register Now to unlock lab discounts, extended warranties, and new patient referrals.
            </p>

            <button
              onClick={() => navigate("/doctor")}
              className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2"
            >
              <h1 className="font-poppins font-semibold text-sm md:text-base text-[#434343]">
                Learn more
              </h1>
              <div className="rounded-full bg-secondaryBrand text-white p-2">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
          </div>
        </div>
      </section>
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondaryBrand max-w-[600px] mx-auto text-center">
                Simplify Your <span className="text-fouthBrand">Practice</span> with
                Our <span className="text-secondaryBrand">Subscription Plans</span>
              </h2>
              <p className="text-secondaryText py-6 font-poppins text-sm md:text-base font-normal">
                Effortless Patient Management in Three Simple Steps
              </p>
            </div>

          <style>{`
            .subscription-carousel .slick-dots { bottom: -40px !important; }
            .subscription-carousel .slick-dots li button:before { font-size: 11px; color: #9ca3af; opacity: .6; }
            .subscription-carousel .slick-dots li.slick-active button:before { color: #001D58; opacity: 1; }
          `}</style>

          {/* Desktop Grid View (hidden on mobile/tablet) */}
          <div className="hidden lg:block">
            <div className="flex flex-wrap justify-center gap-8 relative">
              <div className="hidden md:block absolute top-6 left-[16.666%] w-[66.666%] border-t-2 border-dashed border-gray-300 z-0"></div>
              {Doctorsteps.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10 flex-1 min-w-[280px] max-w-[360px]"
            >
              {/* Step Circle */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-fouthBrand text-white text-xl font-bold mb-6">
                {idx + 1}
              </div>

              {/* Step Content */}
              <div className="mt-6 flex-1 w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-sm md:text-2xl font-poppins font-bold text-start text-secondaryBrand mb-4">
                  {step.title}
                </h3>

                <p className="text-sm font-poppins font-bold text-start text-secondaryBrand mb-4">
                  {step?.parag}
                </p>

                {/* Description Section */}
                <div className="text-xs font-poppins font-normal text-secondaryText space-y-2 ">
                  {step.id === 1 ? (
                    // ✅ Step 1 (custom text format)
                    <ul className="space-y-2">
                      {step.description.map((desc, index) => {
                        const [firstWord, ...rest] = desc.split("–");
                        return (
                          <li key={index}>
                            <span className="font-bold text-primaryText">
                              {firstWord.trim()}
                            </span>
                            {rest.length > 0 && (
                              <span className="text-secondaryText font-normal">
                                {" – " + rest.join("–")}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : step.id === 2 ? (
                    // ✅ Step 2 (one paragraph + bullet list)
                    <>
                      <p className="text-secondaryText">
                        {step.description[0]} {/* first line as paragraph */}
                      </p>
                      <ul className="list-disc pl-3 space-y-1">
                        {step.description.slice(1).map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </>
                  ) : step.id === 3 ? (
                    // ✅ Step 3 (numbered list)
                    <ul className="list-decimal pl-6 space-y-3">
                      {step.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    // ✅ Default (plain text)
                    <ul className="space-y-1">
                      {step.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
            </div>
          </div>

          {/* Mobile/Tablet Carousel View (visible only on mobile/tablet) */}
          <div className="lg:hidden subscription-carousel pb-12">
            <Slider {...carouselSettings}>
              {Doctorsteps.map((step, idx) => (
                <div key={step.id} className="px-2">
                  <div className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-fouthBrand text-white text-xl font-bold mb-6">
                      {idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="w-full bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg md:text-2xl font-poppins font-bold text-start text-secondaryBrand mb-4">
                        {step.title}
                      </h3>

                      <p className="text-sm font-poppins font-bold text-start text-secondaryBrand mb-4">
                        {step?.parag}
                      </p>

                      {/* Description Section */}
                      <div className="text-xs font-poppins font-normal text-secondaryText space-y-2">
                        {step.id === 1 ? (
                          <ul className="space-y-2">
                            {step.description.map((desc, index) => {
                              const [firstWord, ...rest] = desc.split("–");
                              return (
                                <li key={index}>
                                  <span className="font-bold text-primaryText">
                                    {firstWord.trim()}
                                  </span>
                                  {rest.length > 0 && (
                                    <span className="text-secondaryText font-normal">
                                      {" – " + rest.join("–")}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : step.id === 2 ? (
                          <>
                            <p className="text-secondaryText">
                              {step.description[0]}
                            </p>
                            <ul className="list-disc pl-3 space-y-1">
                              {step.description.slice(1).map((desc, index) => (
                                <li key={index}>{desc}</li>
                              ))}
                            </ul>
                          </>
                        ) : step.id === 3 ? (
                          <ul className="list-decimal pl-6 space-y-3">
                            {step.description.map((desc, index) => (
                              <li key={index}>{desc}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="space-y-1">
                            {step.description.map((desc, index) => (
                              <li key={index}>{desc}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

            <div className="mt-8 flex flex-col items-center gap-2">
              <ThirdButtonUI title="Enroll in the office" href="/signup?role=doctor" />
              <p className="text-sm font-normal font-poppins text-secondaryText">
                We're HIPAA compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorComponent;
