const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#e2f7fb] to-[#f7fefc] flex flex-col md:flex-row justify-around items-center h-screen">
      {/* Left Section: Text Content */}
      <section className="text-center md:text-left px-8 md:px-16">
        <h2 className="text-xs md:text-5xl font-normal text-gray-900 leading-tight space-y-4">
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
        <p className="mt-4 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
          Blending cutting-edge technology with expert craftsmanship, we create
          durable and aesthetically refined dental solutions that are built to
          last.
        </p>
        <button className="mt-6 px-6 py-3 rounded-full border-2 border-[#78c3d8] text-[#494949] hover:bg-[#78c3d8] hover:text-white flex items-center ">
          <span className="mr-4">Explore Our Solutions</span>
          <span className="w-8 h-8 bg-[#001d58] text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#001d58] transition-all duration-300">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
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
      </section>

      {/* Right Section: Images */}
      <section className="flex justify-center items-center mt-12 md:mt-0 space-x-6">
        <img
          src="/assets/landing-page/hero-image.png"
          alt="Patient 1"
          className="w-full h-full object-cover"
        />
        {/* First Image */}
        {/* <div className="w-36 h-48 md:w-40 md:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
          <img
            src="/assets/landing-page/hero-image-1.jpeg"
            alt="Patient 1"
            className="w-full h-full object-cover"
          />
        </div> */}
        {/* Second Image */}
        {/* <div className="w-36 h-48 md:w-40 md:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
          <img
            src="/assets/landing-page/hero-image-2.jpeg"
            alt="Patient 2"
            className="w-full h-full object-cover"
          />
        </div> */}
        {/* Third Image */}
        {/* <div className="w-36 h-48 md:w-40 md:h-56 bg-gray-300 rounded-full overflow-hidden shadow-lg">
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
