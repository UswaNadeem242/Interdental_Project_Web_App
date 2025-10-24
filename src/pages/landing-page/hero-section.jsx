import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButtonUI } from "../../Common/Button";
export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#e2f7fb] to-[#f7fefc] flex flex-col md:flex-row items-center justify-between min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-20 mt-6 md:mt-0">
      {/* Left Section: Text Content */}
      <sectzion className="flex-1 text-left space-y-6">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-poppins font-normal text-gray-900 leading-tight">
          <span className="block text-primaryText">Discover a New</span>
          <span className="font-bold text-fouthBrand">
            Pathway <span className="font-normal text-primaryText">in</span>{" "}
            <span className="text-secondaryBrand font-bold">Dentistry</span>
          </span>
        </h2>
        {/* <p className="text-sm sm:text-base text-primaryText max-w-xl leading-relaxed sm:leading-7">At InterOral.ai, we’re simplifying the way you connect with <br className="hidden md:block" /> labs, implant companies, and patients. With our Wizard intake <br className="hidden md:block" />system, you can submit cases, <br className="hidden md:block" />  generate  prescriptions, and track everything in one flow.</p> */}
        <>
          <p className="text-sm sm:text-base text-primaryText   text-left font-poppins">
            At InterOral.ai, we’re simplifying the way you connect with
          </p>

          <p className="text-sm sm:text-base text-primaryText   tracking-wide   text-left font-poppins !mt-0">
            labs, implant companies, and patients. With our Wizard
          </p>
          <p className="text-sm sm:text-base text-primaryText  tracking-widest text-left font-poppins !mt-0">
            Intake system, you &nbsp; can submit cases,&nbsp;generate
          </p>

          <p className="text-sm sm:text-base text-primaryText   text-left font-poppins !mt-0">
            prescriptions, and track everything in one flow.
          </p>
        </>
        <p className="text-sm sm:text-base text-primaryText max-w-xl leading-6 sm:leading-7">
          Behind the scenes, our patented Routing &nbsp; AI matches you
        </p>
        <p className="text-sm sm:text-base text-primaryText tracking-wide leading-6 sm:leading-7 !mt-0">
          with the right Dental &nbsp; Lab Alliance partner—so you &nbsp; get{" "}
        </p>{" "}
        <p className="text-sm sm:text-base text-primaryText tracking-wide leading-6 sm:leading-7 !mt-0">
          faster turnaround, &nbsp; consistent quality, and &nbsp; nationwide{" "}
          <br className="hidden md:block" /> access.
        </p>
        {/* CTA Button */}
        <div className="flex justify-center md:justify-start mt-6">
          <PrimaryButtonUI
            title="Enroll now"
            onClick={() => navigate("/shop")}
            className="px-10 py-5 rounded-full font-poppins font-normal text-xs bg-secondaryBrand text-white shadow"
          />
        </div>
      </sectzion>

      {/* Right Section: Images */}
      <section className="flex-1 flex justify-center items-center mt-10 md:mt-0">
        <img
          src="/assets/landing-page/hero-image.png"
          alt="Patient 1"
          className="w-[400px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
      </section>
    </div>
  );
};
