import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16 px-8 flex flex-col md:flex-row items-center justify-between  ">
      {/* Left Side: Image */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        {/* Tooth-shaped container */}
        <img
          src="/assets/landing-page/about-us.png"
          alt="Dentist"
          className="w-124 h-124 object-cover"
        />
      </div>

      {/* Right Side: Text */}
      <div className="mt-8 md:mt-0 md:ml-16 w-full md:w-1/2 text-gray-800">
        <h3 className="text-lg font-bold text-secondaryText pb-4 ">About Us</h3>
        <h2 className="text-4xl font-bold text-secondaryBrand uppercase">
          InterOral. <span className="text-fouthBrand">Ai</span>
        </h2>
        <p className="mt-4 text-gray-600  max-w-[560px] tracking-wide">
          At InterOral.ai, we believe dentistry deserves &nbsp; more{" "}
          <br className="hidden md:block" /> than patchwork solutions.
        </p>
        <p className="mt-4 text-gray-600 max-w-[560px] tracking-wide">
          We’re building an integrated digital platform where{" "}
          <br className="hidden md:block" /> dentists, labs, and implant &nbsp;
          suppliers work together <br className="hidden md:block" />{" "}
          seamlessly—powered by AI and data-driven design.{" "}
        </p>

        <p className="mt-4 text-gray-600  max-w-[560px] pb-6 tracking-wide">
          Our &nbsp; mission &nbsp; is simple: to cut &nbsp; complexity,&nbsp;
          reduce <br className="hidden md:block" /> and give every patient
          access to smarter dentistry.{" "}
        </p>

        <button
          onClick={() => navigate("/about-us")}
          className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2 "
        >
          <h1 className="font-poppins font-semibold text-base text-[#434343]">
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
