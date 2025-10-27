import Footer from "../../components/Footer";
import Header from "./header";
import { HeroSection } from "./hero-section";
import AboutUs from "./about-us";
import DoctorComponent from "../../components/landing-page-component";
import CircleIcon from "../../icon/circle-icon";
import { accordionData, implantCards } from "../../Constant";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import OurModules from "../../components/landing-page-component/our-modules";
import MakeSmile from "../../components/landing-page-component/make-smile";
import ImplantInterfeace from "../../components/landing-page-component/implant-interface";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import UpperFooter from "../../components/upper-footer";
import FeaturedProducts from "../../components/landing-page-component/featured-product";
import { ThirdButtonUI } from "../../Common/Button";
import Contact from "./contact";
import Accordion from "../../Common/accordion";
import ContactFooter from "../../components/contact-footer";

const LandingPage = () => {
  const navigate = useNavigate();
  const warrantyCard = [
    {
      title: "WARRANTY DASHBOARD",
      subtitle: "PATIENT",
      img: "/assets/landing-page/card 2.png",
      points: [
        "Easy online activation",
        "Downloadable warranty certificate",
        "Direct access to our support team",
      ],
    },
  ];
  const slugify = (s) =>
    s
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  return (
    <>
      <div>{<Header />} </div>
      <div className="font-poppins min-h-screen text-gray-800">
        <HeroSection />

        {/* About Us Section */}
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full">
            <AboutUs />
          </div>
        </div>

        {/* Our Modules Section Header */}
        <div className="w-full flex justify-center px-4 py-8">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-poppins capitalize text-center">
              our
              <span className="text-secondaryBrand font-bold capitalize ml-2">
                Modules
              </span>
            </h1>
            <p className="text-secondaryText text-sm md:text-base font-poppins text-center max-w-xl py-4">
              Explore our top-rated selections crafted just for you!
            </p>
          </div>
        </div>

        {/* MakeSmile Section */}
        <div className="w-full flex justify-center px-4">
          <div className="max-w-7xl w-full">
            <MakeSmile />
          </div>
        </div>

        {/* Our Modules Cards Section */}
        <div className="w-full flex justify-center bg-[#F7FCFC] px-4">
          <div className="max-w-7xl w-full">
            <OurModules />
          </div>
        </div>

        {/* Implant Interface Section */}
        <div className="w-full flex justify-center px-4 bg-textField">
          <div className="max-w-7xl w-full">
            <ImplantInterfeace />
          </div>
        </div>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* InterOral.ai Info Section */}
        <div className="w-full flex justify-center px-4 py-8 md:py-12 bg-blue-300/5">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-center  py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 rounded-2xl">
              {/* Text Content */}
              <div className="flex-1 space-y-4 flex flex-col justify-center">
                <h1 className="text-secondaryBrand text-2xl md:text-3xl lg:text-4xl font-poppins font-semibold">
                  InterOral.ai
                </h1>
                <p className="font-poppins font-normal text-sm md:text-base text-[#949494] leading-6 md:leading-7">
                  InterOral.ai is an AI-driven platform that seamlessly connects dentists, dental labs, and patients under one secure system. Dentists can submit digital prescriptions, upload scans, and order implant parts, while labs efficiently receive and manage cases. Patients gain added value through extended warranty coverage, ensuring a smooth, connected, and compliant workflow for all.
                </p>
                <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                  <h1
                    className="font-poppins font-semibold text-base text-[#434343]"
                    onClick={() => navigate("/about-us")}
                  >
                    View More
                  </h1>
                  <div className="rounded-full bg-secondaryBrand text-white p-2">
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </button>
              </div>
              {/* Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src="/assets/landing-page/about-us-1.png"
                  alt="about us image"
                  className="w-full max-w-[500px] h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Component */}
        <DoctorComponent />

        {/* Warranty Section */}
        {/* <div className="w-full flex justify-center px-4 py-12 md:py-16">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <h1 className="text-primaryText text-2xl md:text-3xl lg:text-4xl font-normal font-poppins capitalize text-center">
              THE
              <span className="font-bold font-poppins text-secondaryBrand capitalize ml-2">
                WARRANTY
              </span>
            </h1>
            <p className="text-secondaryText text-sm md:text-base font-poppins text-center max-w-3xl py-4">
              Interoral.ai provides peace of mind and a unique practice growth
              opportunity with a comprehensive Warranty Plans and Referal
              Program
            </p>
            <div className="w-full flex justify-center mt-6">
              {warrantyCard.map((card, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col sm:flex-row max-w-3xl w-full"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full sm:w-[250px] md:w-[300px] h-[200px] sm:h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 p-6 flex-1">
                    <div>
                      <h3 className="text-primaryText text-sm md:text-base font-semibold">
                        {card.title}
                      </h3>
                      <p className="text-fouthBrand text-lg font-bold mb-4">
                        {card.subtitle}
                      </p>

                      <ul className="space-y-2">
                        {card.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex gap-2 items-center text-sm text-secondaryText"
                          >
                            <CircleIcon className="text-secondaryBrand w-4 h-4 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="text-white bg-secondaryBrand text-sm font-semibold capitalize py-3 px-6 rounded-md self-start hover:bg-secondaryBrand/90 transition">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Blog & Articles Section */}
        <section className="w-full flex justify-center px-4 py-16 md:py-28">
          <div className="max-w-7xl w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-primaryText text-xl md:text-3xl font-bold font-poppins capitalize">
                Blog &
                <span className="text-xl md:text-3xl font-bold font-poppins text-fouthBrand capitalize ml-2">
                  Articles
                </span>
              </h1>
              <ThirdButtonUI title="View more" href="/blog" />
            </div>
            <p className="text-primaryText text-sm font-poppins mb-8">
              Read our interesting blog
            </p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {implantCards?.map((card, index) => (
                <div key={index} className="flex-1 min-w-[280px] max-w-[360px]">
                  <Link to={card?.href}>
                    <img
                      src={card.img}
                      alt={card.title || "Implant card"}
                      className="w-full h-auto rounded-lg"
                    />
                    {card.title && (
                      <>
                        <h3 className="text-xs font-medium font-poppins uppercase text-fouthBrand pt-5">
                          {card.title}
                        </h3>
                        <p className="text-lg md:text-xl font-normal font-poppins capitalize py-4 line-clamp-2">
                          {card.subtitle}
                        </p>
                        <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                          <h1 className="font-poppins font-semibold text-sm md:text-base text-[#434343]">
                            {card.button}
                          </h1>
                          <div className="rounded-full bg-secondaryBrand text-white p-2">
                            <ArrowRightIcon className="w-4 h-4" />
                          </div>
                        </button>
                      </>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & Contact */}
        <FrequentlyAskedQuestion />
        <ContactFooter className="bg-background" />
      </div>
    </>
  );
};

export default LandingPage;
