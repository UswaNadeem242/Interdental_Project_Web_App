import React from "react";
import { Doctorsteps } from "../../Constant";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ThirdButtonUI } from "../../Common/Button";
function DoctorComponent() {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <img
            src={"/assets/landing-page/doctor-image.png"}
            alt="Doctor"
            className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
        <div className="mt-6 sm:mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-1/2 text-gray-800">
          <h3 className="text-3xl md:text-5xl font-bold text-secondaryBrand">
            DOCTOR
          </h3>
          <p className="mt-4 text-sm md:text-xl font-normal text-secondaryText">
            Join a network of providers who trust Interoral.ai and Make Me Smile
            &nbsp; to &nbsp; deliver exceptional &nbsp; restorations,
            streamlined &nbsp;&nbsp;&nbsp; workflows, &nbsp;&nbsp;and
            &nbsp;&nbsp;long-term &nbsp;&nbsp; &nbsp; patient &nbsp;
            satisfaction.
          </p>
          <p className="mt-4 text-sm md:text-xl font-normal text-secondaryText tracking-wide">
            Our &nbsp; technicians &nbsp; combine &nbsp; advanced &nbsp; CAD/CAM
            technology with artistic &nbsp; craftsmanship to &nbsp; ensure every
            case &nbsp; supports your &nbsp; reputation—and &nbsp; your bottom
            line.
          </p>
          <p className="mt-4 text-sm md:text-xl font-normal text-secondaryText pb-4">
            Register &nbsp; Now &nbsp; to &nbsp;unlock &nbsp; lab
            &nbsp;discounts, &nbsp;extended warranties, and new patient
            referrals.
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
      </section>
      <div className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="text-center">
          <h2 className=" text-sm md:text-3xl font-semibold text-secondaryBrand max-w-[600px] mx-auto text-center">
            Simplify Your <span className="text-fouthBrand">Practice</span> with
            Our <span className="text-secondaryBrand">Subscription Plans</span>
          </h2>
          <p className="text-secondaryText py-8 font-poppins text-sm  font-normal">
            Effortless Patient Management in Three Simple Steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative">
          <div className="hidden md:block absolute top-6 left-[16.666%] w-[66.666%] border-t-2 border-dashed border-gray-300 z-0"></div>{" "}
          {Doctorsteps.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
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
        <div className="mt-5 flex justify-center">
          <ThirdButtonUI title="enroll the office" />
        </div>
        <div className="mt-2 flex justify-center">
          <p className="text-sm font-normal font-poppins text-secondaryText">
            We’re HIPAA compliant
          </p>
        </div>
      </div>
    </>
  );
}

export default DoctorComponent;
