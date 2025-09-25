import { useNavigate } from "react-router-dom";
import { PrimaryButtonUI } from "../../Common/Button";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#e2f7fb] to-[#f7fefc] flex flex-col md:flex-row justify-around items-center h-auto sm:h-screen min-h-[600px] py-8 sm:py-12 md:py-16">
      {/* Left Section: Text Content */}
      <section className="text-left md:text-left px-4 sm:px-8 md:px-12 lg:px-16 mt-9">
        <h2 className="md:text-4xl mb-8 text-base  font-normal text-gray-900 leading-tight space-y-2 sm:space-y-3 md:space-y-4">
          <span className="block font-normal text-5xl  font-poppins text-primaryText">
            Discover a New

          </span>
          <span className="font-bold text-fouthBrand text-5xl">
            Pathway <span className="text-5xl font-normal  font-poppins text-primaryText">in</span> <span className="text-5xl text-secondaryBrand  font-bold">  Dentistry</span>
          </span>

        </h2>
        <p className="mt-3 sm:mt-4 text-sm   md:text-base text-primaryText max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
          At InterOral.ai, we’ve reimagined the way practices connect to labs, implants, and patients. It starts with our Wizard intake system — a smarter way to submit cases, generate prescriptions, and route everything in one seamless workflow.
        </p>



        <p className="mt-3 sm:mt-4 text-sm   md:text-base text-primaryText max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
          Behind the scenes, our patented Routing AI connects your cases to the right Dental Lab Alliance partner, giving you nationwide access and three tiers of quality to choose from.
        </p>
        <div className="mr-20 w-auto h-auto flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
          <PrimaryButtonUI title='Enroll now' onClick={() => navigate("/shop")} className="px-10 py-5 rounded-full font-poppins  font-normal text-xs bg-secondaryBrand text-white  shadow "
          />

        </div>
      </section>

      {/* Right Section: Images */}
      <section className="flex justify-center items-center mt-8 sm:mt-10 md:mt-12 lg:mt-0 space-x-4 sm:space-x-6 md:space-x-8">
        <img
          src="/assets/landing-page/hero-image.png"
          alt="Patient 1"
          className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
      </section>
    </div>
  );
};

export default HeroSection;
