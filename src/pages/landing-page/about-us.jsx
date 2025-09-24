import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16 px-8 flex flex-col md:flex-row items-center justify-between">
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
        <h3 className="text-lg font-bold text-[#949494] ">About Us</h3>
        <h2 className="text-4xl font-bold text-secondaryBrand uppercase">
          InterOral <span className="text-fouthBrand">Ai</span>
        </h2>
        <p className="mt-4 text-gray-600 py-4 max-w-[560px]">
          At InterOral.ai, we believe dentistry deserves a smarter, more connected future.That’s why we built an integrated platform where dentists, labs, and implant suppliers all work together in one digital ecosystem.
        </p>



        <button onClick={() => navigate("/about-us")} className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
          <h1 className="font-poppins font-semibold text-base text-[#434343]">
            View More
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
