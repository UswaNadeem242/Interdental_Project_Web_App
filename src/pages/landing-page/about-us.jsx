import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-12 md:py-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      {/* Left Side: Image */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <img
          src="/assets/landing-page/about-us.png"
          alt="Dentist"
          className="w-full max-w-lg h-auto object-cover"
        />
      </div>

      {/* Right Side: Text */}
      <div className="flex-1 space-y-4 text-gray-800">
        <h3 className="text-base md:text-lg font-bold text-secondaryText pb-4">About Us</h3>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondaryBrand uppercase">
          InterOral. <span className="text-fouthBrand">Ai</span>
        </h2>
        <p className="mt-4 text-gray-600 tracking-wide">
          At InterOral.ai, we believe dentistry deserves &nbsp; more{" "}
          <br className="hidden md:block" /> than patchwork solutions.
        </p>
        <p className="mt-4 text-gray-600 tracking-wide">
          We're building an integrated digital platform where{" "}
          <br className="hidden md:block" /> dentists, labs, and implant &nbsp;
          suppliers work together <br className="hidden md:block" />{" "}
          seamlessly—powered by AI and data-driven design.{" "}
        </p>

        <p className="mt-4 text-gray-600 pb-6 tracking-wide">
          Our mission is simple: to cut complexity,&nbsp;
          reduce  <br className="hidden md:block" /> costs and give every patient
          access to smarter dentistry.{" "}
        </p>

        <button
          onClick={() => navigate("/about-us")}
          className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2 "
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
  );
};

export default AboutUs;
