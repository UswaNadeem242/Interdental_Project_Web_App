import React from "react";
import Icons from "../Icons";

const ContributeBlogSection = ({ onOpenModal }) => {
  return (
    <section className="bg-[#EAF6F8] py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8">
          <div className="flex flex-col gap-4 flex-1">
            {/* Heading */}
            <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#0F153E]">
              Contribute to Our Blog
            </h2>

            {/* Description */}
            <p className="font-poppins font-normal text-sm md:text-base text-[#7C7C7C] leading-relaxed max-w-3xl">
              InterOral.ai wants to collaborate with dental experts to share
              their experiences, case studies, and knowledge to help others in
              the field.
            </p>
          </div>
          {/* CTA Button */}
          <div className="flex-1">
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 bg-white text-[#001D58] hover:text-white border-2 border-[#94D3DD] rounded-full px-6 md:px-8 py-3 md:py-4 transition-all duration-300 shadow-lg hover:shadow-xl w-full lg:w-auto justify-center lg:justify-start"
            >
              <span className="font-poppins text-[#434343] font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap">
                Become A Contributing Doctor
              </span>
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[#001D58]">
                <Icons.ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Benefits List - Below Button */}
            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-6 md:mt-8 max-w-4xl w-full">
              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#94D3DD] flex items-center justify-center mt-0.5">
                  <Icons.Check className="w-3 h-3" fill="#94D3DD" />
                </div>
                <p className="font-poppins text-sm md:text-base text-[#434343]">
                  They will get author credit on the blog.
                </p>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#94D3DD] flex items-center justify-center mt-0.5">
                  <Icons.Check className="w-3 h-3" fill="#94D3DD" />
                </div>
                <p className="font-poppins text-sm md:text-base text-[#434343]">
                  Their practice will get backlinks (SEO benefit).
                </p>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#94D3DD] flex items-center justify-center mt-0.5">
                  <Icons.Check className="w-3 h-3" fill="#94D3DD" />
                </div>
                <p className="font-poppins text-sm md:text-base text-[#434343]">
                  They'll be featured in the InterOral newsletter.
                </p>
              </div>

              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#94D3DD] flex items-center justify-center mt-0.5">
                  <Icons.Check className="w-3 h-3" fill="#94D3DD" />
                </div>
                <p className="font-poppins text-sm md:text-base text-[#434343]">
                  Sharing experiences helps educate peers and build trust among
                  patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeBlogSection;
