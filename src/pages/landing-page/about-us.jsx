const AboutUs = () => {
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
        <h2 className="text-4xl font-bold text-blue-900">
          INTERDENTAL <span className="text-blue-400">LAB</span>
        </h2>
        <p className="mt-4 text-gray-600">
          A full-service, aesthetic-driven prosthetic dental laboratory located
          in Miami, Florida. We specialize in full mouth reconstruction and
          combination cases involving dental implant zirconia crowns, bridges,
          Emax, and feldspathic laminate veneers. Working closely with dentists
          and their patients to create the highest quality work on both a
          functional and aesthetic level.
        </p>
        <button className="mt-6 inline-flex items-center px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
          <span className="mr-4">View More</span>
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
      </div>
    </section>
  );
};

export default AboutUs;
