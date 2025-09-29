import Footer from "../../components/Footer";
import Header from "./header";
import {HeroSection} from "./hero-section";
import AboutUs from "./about-us";
import DoctorComponent from "../../components/landing-page-component";
import CircleIcon from "../../icon/circle-icon";
import { implantCards } from "../../Constant";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import OurModules from "../../components/landing-page-component/our-modules";
import MakeSmile from "../../components/landing-page-component/make-smile";
import ImplantInterfeace from "../../components/landing-page-component/implant-interface";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import UpperFooter from "../../components/upper-footer";
import FeaturedProducts from "../../components/landing-page-component/featured-product";

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
    },]
  const slugify = (s) =>
    s?.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  return (
    <>
      {/* <div>{<Header />} </div> */}
      <div className="  font-poppins min-h-screen text-gray-800">
        <HeroSection />
        <AboutUs />
        <div>
          <div className="flex justify-center  pt-10">
            <h1 className="text-3xl lg:text-4xl font-poppins capitalize">
              our
              <span className="text-secondaryBrand font-bold capitalize ml-2">
                Modules
              </span>
            </h1>
          </div>
          <div className="flex justify-center pb-6">
            <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl py-6">
              Explore our top-rated selections crafted just for you!
            </p>
          </div>
        </div>
        <MakeSmile />
        <OurModules />
        <ImplantInterfeace />
        <FeaturedProducts />
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[1511px] h-auto sm:h-[814px]   bg-blue-300/5 py-8 sm:py-12 md:py-16 lg:py-[132px] px-4 sm:px-6 md:px-8 lg:px-[100px] gap-4   ">
          {/* Text Content */}
          <div className="flex flex-col justify-start items-start w-full  space-y-4 sm:space-y-[16px] px-4 sm:px-0">
            {/* max-w-[575px] */}
            <div className="flex justify-start items-center gap-2 sm:gap-4 font-poppins font-bold sm:text-sm md:text-3xl lg:text-[40px]">
              <h1 className="text-secondaryBrand  text-5xl font-poppins font-semibold">InterOral.ai</h1>
            </div>
            <p className="w-full max-w-[500px] font-poppins font-normal text-sm md:text-lg text-[#949494] leading-6 md:leading-[30px]">
              InterOral.ai is an AI-driven platform that
              <span className="hidden md:inline"><br /></span> seamlessly connects dentists, dental labs, and
              <span className="hidden md:inline"><br /></span> patients under one secure system. Dentists can
              <span className="hidden md:inline"><br /></span> submit digital prescriptions, upload scans, and
              <span className="hidden md:inline"><br /></span> order implant parts, while labs efficiently receive
              <span className="hidden md:inline"><br /></span> and manage cases. Patients gain added value
              <span className="hidden md:inline"><br /></span> through extended warranty coverage, ensuring a
              smooth, connected, and compliant workflow for  <span className="hidden md:inline"><br /></span> all.
            </p>
            <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
              <h1 className="font-poppins font-semibold text-base text-[#434343]" onClick={() => navigate("/about-us")}>
                View More
              </h1>
              <div className="rounded-full bg-secondaryBrand text-white p-2">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
          {/* Image */}
          <img
            src="/assets/landing-page/about-us-1.png"
            alt="about us image"
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]"
          />
        </div>
        <DoctorComponent />
        <div className="container mx-auto px-3 w-full py-28">

          <div className="flex justify-center ">
            <h1 className="text-primaryText text-base md:text-3xl font-normal font-poppins capitalize">
              THE

              <span className="md:text-3xl font-bold font-poppins text-secondaryBrand capitalize ml-2">
                WARRANTY
              </span>
            </h1>
          </div>
          <div className="flex justify-center pb-6">
            <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl py-6">
              Interoral.ai provides peace of mind and a unique practice growth opportunity with a comprehensive Warranty Plans and Referal Program
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-6 justify-items-center">
            {warrantyCard.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2"
              >
                <div className="w-full h-full">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full sm:w-[200px] md:w-[290px] lg:w-[300px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[237px] m-2 sm:m-4 rounded-lg object-fit"
                  />
                </div>
                <div className="flex flex-col gap-5 p-4 ">
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
                          <CircleIcon className="text-secondaryBrand w-4 h-4" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className=" text-white bg-secondaryBrand text-sm font-semibold capitalize py-3 px-6 rounded-md self-start hover:bg-secondaryBrand/90 transition" onClick={() => navigate("/patient")}>
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bloags */}
        <section className="container md:px-8 px-4 mx-auto py-28 ">
          <div className="flex justify-between ">
            <h1 className="text-primaryText text-base md:text-3xl font-bold font-poppins capitalize ">
              Blog &

              <span className="md:text-3xl font-bold font-poppins text-fouthBrand capitalize ml-2">
                Articles
              </span>
            </h1>

            <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2" onClick={() => navigate("/blog")}>
              <h1 className="font-poppins font-semibold text-base text-primaryText capitalize">
                View more
              </h1>
              <div className="rounded-full bg-secondaryBrand text-white p-2">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
          <div className="flex justify-start pb-6">
            <p className="text-primaryText text-sm font-poppins text-center max-w-3xl">
              Read our interesting blog
            </p>
          </div>
          <div className="grid md:grid-cols-12 grid-cols-2   gap-8 justify-items-center  ">

            {implantCards?.map((card, index) => (
              <div key={index} className="col-span-4">
                <Link key={index}
                  to={card?.href}>
                  <img src={card.img} alt={card.title || "Implant card"} className="" />
                  {card.title && (
                    <>
                      <h3 className="text-xs font-medium font-poppins uppercase text-fouthBrand pt-5">
                        {card.title}
                      </h3>
                      <p className="text-xl font-normal font-poppins capitalize w-3/4 py-5">
                        {card.subtitle}
                      </p>
                      <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                        <h1 className="font-poppins font-semibold text-base text-[#434343]">
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
        </section>
        <FrequentlyAskedQuestion />
        <UpperFooter />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
