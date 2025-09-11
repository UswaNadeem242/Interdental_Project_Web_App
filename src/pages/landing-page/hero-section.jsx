import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#e2f7fb] to-[#f7fefc] flex flex-col md:flex-row justify-around items-center h-auto sm:h-screen min-h-[600px] py-8 sm:py-12 md:py-16">
      {/* Left Section: Text Content */}
      <section className="text-left md:text-left px-4 sm:px-8 md:px-12 lg:px-16 mt-9">
        <h2 className="md:text-4xl mb-8 text-base  font-normal text-gray-900 leading-tight space-y-2 sm:space-y-3 md:space-y-4">
          <span className="block font-normal">
            Crafting
            <span className="text-gray-600 font-bold"> Smiles</span>
          </span>
          <span className="block font-normal">
            with <span className="text-blue-900 font-bold">Innovation</span>
          </span>
          <span className="block font-normal">
            and
            <span className="text-blue-400 font-bold"> Artistry</span>
          </span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm   md:text-base text-gray-700 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
          Blending cutting-edge technology with expert craftsmanship, we create
          durable and aesthetically refined dental solutions that are built to
          last.
        </p>
        <div className="mr-20 w-auto h-auto flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto mt-3 sm:mt-0 px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full border-2 border-[#78c3d8] text-[#494949] hover:bg-[#78c3d8] hover:text-white flex items-center justify-center text-sm sm:text-base"
          >
            <span className="mr-2 sm:mr-4">Explore Our Solutions</span>
            <span className="w-6 sm:w-8 h-6 sm:h-8 bg-[#001d58] text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#001d58] transition-all duration-300">
              <svg
                width="30"
                height="30"
                viewBox="0 0 39 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[24px] sm:w-[30px] h-[24px] sm:h-[30px]"
              >
                <rect
                  x="0.970001"
                  width="37.7273"
                  height="37.7273"
                  rx="18.8636"
                  fill="#001D58"
                />
                <path
                  d="M21.1641 15.7226C20.899 15.4574 20.899 15.0275 21.1641 14.7623C21.4293 14.4972 21.8592 14.4972 22.1244 14.7623L25.7456 18.3836C26.0107 18.6487 26.0107 19.0786 25.7456 19.3438L22.1244 22.965C21.8592 23.2301 21.4293 23.2301 21.1641 22.965C20.899 22.6998 20.899 22.2699 21.1641 22.0048L23.6263 19.5426H14.8545C14.4795 19.5426 14.1755 19.2387 14.1755 18.8637C14.1755 18.4887 14.4795 18.1847 14.8545 18.1847H23.6263L21.1641 15.7226Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto mt-3 sm:mt-0 px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full border-2 bg-[#001D58] text-white text-center hover:bg-[#78c3d8] hover:text-white flex justify-center items-center text-sm sm:text-base"
          >
            <span className="h-6 sm:h-8 pt-1">Buy Now</span>
          </button>
        </div>
      </section>

      {/* Right Section: Images */}
      <section className="flex justify-center items-center mt-8 sm:mt-10 md:mt-12 lg:mt-0 space-x-4 sm:space-x-6 md:space-x-8">
        <img
          src="/assets/landing-page/hero-image.png"
          alt="Patient 1"
          className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
        {/* First Image */}
        {/* <div className="w-24 sm:w-28 md:w-36 lg:w-40 h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
          <img
            src="/assets/landing-page/hero-image-1.jpeg"
            alt="Patient 1"
            className="w-full h-full object-cover"
          />
        </div> */}
        {/* Second Image */}
        {/* <div className="w-24 sm:w-28 md:w-36 lg:w-40 h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
          <img
            src="/assets/landing-page/hero-image-2.jpeg"
            alt="Patient 2"
            className="w-full h-full object-cover"
          />
        </div> */}
        {/* Third Image */}
        {/* <div className="w-24 sm:w-28 md:w-36 lg:w-40 h-32 sm:h-40 md:h-48 lg:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
          <img
            src="/assets/landing-page/hero-image-3.jpeg"
            alt="Patient 3"
            className="w-full h-full object-cover"
          />
        </div> */}
      </section>
    </div>
  );
};

export default HeroSection;
