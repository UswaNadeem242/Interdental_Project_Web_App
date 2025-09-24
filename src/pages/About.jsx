import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { implantCards, prescriptionCards, warrantyCards } from "../Constant";
import Header from "./landing-page/header";
import CircleIcon from "../icon/circle-icon";
import FrequentlyAskedQuestion from "../components/frequently-asked-question";
import Contact from "./landing-page/contact";
import UpperFooter from "../components/upper-footer";
import Footer from "../components/Footer";
const About = ({ isLanding }) => {



  return (
    <div className="">
      {!isLanding && <Header />}
      <div className="flex flex-col justify-center items-center w-full h-full">
        {/* About Us Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[1511px] h-auto sm:h-[814px] border-t border-[#0000001A] bg-white py-8 sm:py-12 md:py-16 lg:py-[132px] px-4 sm:px-6 md:px-8 lg:px-[100px] gap-4 sm:gap-8 lg:gap-[120px]">
          {/* Image */}
          <img
            src="/assets/landing-page/about-us-1.png"
            alt="about us image"
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]"
          />

          {/* Text Content */}
          <div className="flex flex-col justify-start items-start w-full max-w-[575px] space-y-4 sm:space-y-[16px] px-4 sm:px-0">
            <h1 className="font-poppins font-bold text-lg sm:text-xl lg:text-lg text-[#949494]">
              About Us
            </h1>

            <div className="flex justify-start items-center gap-2 sm:gap-4 font-poppins font-bold sm:text-sm md:text-3xl lg:text-[40px]">
              <h1 className="text-secondaryBrand">Interoral.ai</h1>
            </div>

            <p className="w-full max-w-[500px] font-poppins font-normal text-sm md:text-lg text-[#949494] leading-6 lg:leading-[30px]">
              At Interoral.ai, we are more than a dental laboratory—we're your digital
              command center for smarter restorations and confident patient care.
            </p>

            <p className="w-full max-w-[500px] font-poppins font-normal text-sm md:text-lg text-[#949494] leading-6 lg:leading-[30px]">
              With over 15 years of expertise in advanced prosthetics and full-mouth
              reconstruction, we’ve built a powerful, tech-forward platform that
              connects dentists, labs, and implant companies like never before.
            </p>

            <p className=" w-full max-w-[500px] font-poppins font-normal text-sm md:text-lg text-[#949494] leading-6 lg:leading-[30px]">
              Every case begins with craftsmanship—and ends with peace of mind.
            </p>

            <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
              <h1 className="font-poppins font-semibold text-base text-[#434343]">
                View More
              </h1>
              <div className="rounded-full bg-secondaryBrand text-white p-2">
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Why Interdental.ai Section */}
        <div className="flex justify-center items-center w-full max-w-[1512px] h-auto sm:h-[818px] border-t border-[#0000001A] bg-[#F8F8F8] py-8 sm:py-12 md:py-16 lg:py-[124px] px-4 sm:px-6 md:px-8 lg:px-[100px] gap-4 sm:gap-6 lg:gap-[32px]">
          <div className="flex flex-col justify-start items-start w-full max-w-[1312px] gap-6 sm:gap-8 lg:gap-[64px]">
            <div className="flex justify-center items-center gap-2 sm:gap-4">
              <h1 className="font-poppins font-normal text-sm md:text-5xl">Why</h1>
              <h1 className="font-poppins font-bold text-sm md:text-5xl text-secondaryBrand">
                Interdental.ai
              </h1>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-[16px]">
              {/* Card 1 */}
              <div className="flex flex-col w-full rounded-[16px] border border-[#0000001A] space-y-4 p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold text-sm md:text-lg">
                  Encourage feedback
                </h1>
                <p className="font-poppins font-normal text-sm md:text-lg text-[#949494]">
                  “We encourage feedback” to ensure even higher standards.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col w-full rounded-[16px] border border-[#0000001A] space-y-4 p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold text-sm md:text-lg">
                  Quality services
                </h1>
                <p className="font-poppins font-normal text-sm md:text-lg text-[#949494]">
                  We are proud to provide quality services, high standard products at
                  realistic prices.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col w-full rounded-[16px] border border-[#0000001A] space-y-4 p-4 sm:p-6 lg:p-[24px]">
                <h1 className="text-[#434343] font-poppins font-bold text-sm md:text-lg">
                  Products support
                </h1>
                <p className="font-poppins font-normal text-sm md:text-lg text-[#949494]">
                  We always provide support to our products for customer’s convenience
                  by giving them a complete technical knowledge and practical
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <section className="container px-4 mx-auto py-28 border-b border-background ">
          <div className="flex justify-center">
            <h1 className="text-primaryText text-base md:text-3xl font-normal font-poppins capitalize">
              Built-In{" "}
              <span className="md:text-3xl font-bold font-poppins capitalize text-fouthBrand">
                Modules
              </span>{" "}
              Across Our{" "}
              <span className="md:text-3xl font-bold font-poppins text-secondaryBrand capitalize">
                Ecosystem
              </span>
            </h1>
          </div>

          <div className="flex justify-center pt-6">
            <p className="text-primaryText text-sm font-poppins text-center max-w-3xl">
              Whether you're receiving a crown, bridge, denture, or implant, your
              smile deserves protection that lasts. Our Make Me Smile Warranty Program
              gives you long-term peace of mind—plus access to a network of trusted
              dentists and advanced dental labs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-8 gap-4 pt-8">
            {prescriptionCards.map((card, index) => (
              <div
                key={index}
                className="col-span-8 md:col-span-4 bg-background p-8 rounded-lg"
              >
                <h3 className="text-secondaryBrand font-poppins text-xl font-semibold">
                  {card.title}
                </h3>
                <p className="text-primaryText font-semibold text-xs font-poppins py-3">
                  {card.subtitle}
                </p>

                {/* Check if it's the 5th card (index 4 since arrays start from 0) */}
                {index === 4 ? (
                  <>
                    {/* First line without bullet */}
                    <p className="text-textColor text-xs font-poppins font-normal">
                      {card.points[0]}
                    </p>

                    {/* Middle 3 with bullets */}
                    <ul className="list-disc list-inside space-y-2">
                      {card.points.slice(1, 4).map((point, i) => (
                        <li
                          key={i}
                          className="text-textColor text-xs font-poppins font-normal"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Last point without bullet */}
                    <p className="text-textColor text-xs font-poppins font-normal">
                      {card.points[4]}
                    </p>
                  </>
                ) : (
                  // Default for other cards
                  <div className="space-y-2">
                    {card.points.map((point, i) => (
                      <p
                        key={i}
                        className="text-textColor text-xs font-poppins font-normal"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}

          </div>
          <div className="flex justify-center pt-8">
            <p className="text-primaryText text-sm font-poppins text-center max-w-3xl"> Interoral.ai helps you simplify case management, reduce lab and implant costs, streamline communication, and increase patient trust—all from one connected platform.</p>
          </div>

        </section>



        <section className="container px-4 mx-auto py-28 ">
          <div className="flex justify-center ">
            <h1 className="text-primaryText text-base md:text-3xl font-normal font-poppins capitalize">
              Our

              <span className="md:text-3xl font-bold font-poppins text-secondaryBrand capitalize ml-2">
                SERVICES
              </span>
            </h1>
          </div>
          <div className="flex justify-center pb-6">
            <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl">
              Explore our top-rated selections crafted just for you!
            </p>
          </div>

          <div className="bg-background ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
              {/* Left Content */}
              <div className="flex justify-center">
                <div className="max-w-md">
                  <h4 className="text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-6">
                    Crown + Bridge
                  </h4>
                  <p className="font-poppins text-base md:text-lg text-[#808080]">
                    Interoral.ai uses 3shape cad cam systems a leader in the industry,
                    trusted, and AI driven program of "automate" Million units designed,
                    laboratories can feel confident when outsourcing their restoration
                    designs.
                  </p>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center">
                <img
                  src="/assets/landing-page/image 2.png"
                  alt="Crown + Bridge"
                  className="w-full max-w-sm md:max-w-md object-contain"
                />
              </div>
            </div>

          </div>

        </section>

        <section className="container px-4 mx-auto ">

          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Right Image */}
              <div className="flex justify-center">
                <img
                  src="/assets/landing-page/image 3.png"
                  alt="Crown + Bridge"
                  className="w-auto  h-auto object-contain "
                />
              </div>
              {/* Left Content */}
              <div className="flex justify-center">
                <div className="max-w-md">
                  <h4 className="text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-6">
                    Guided Implant Surgery
                  </h4>
                  <p className="font-poppins text-base md:text-lg text-[#808080]">
                    Service offers
                    implant planning and surgical guide designs. With
                    guided implant surgery, we will plan and design
                    your surgical guide from single units, bridges,
                    fully or pilot guided surgeries based on your
                    instructions and needs.
                  </p>
                </div>
              </div>


            </div>

          </div>

        </section>
        <section>
          <div className="flex justify-center py-20">
            <img
              src="/assets/landing-page/image 4.png"
              alt="Crown + Bridge"
              className="w-auto  h-auto object-contain "
            />
          </div>
        </section>

        <section className="container px-4 mx-auto py-28  border-b border-background">
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

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warrantyCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2"
                >

                  {/* Left - Image */}
                  <div className="w-full h-full">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full sm:w-[200px] md:w-[290px] lg:w-[300px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[288px] m-2 sm:m-4 rounded-lg object-cover" />

                  </div>

                  {/* Right - Content */}
                  <div className="flex flex-col justify-between p-6 ">
                    <div>
                      <h3 className="text-primaryText text-sm md:text-base font-semibold">
                        {card.title}
                      </h3>
                      <p className="text-secondaryBrand text-lg font-bold mb-4">
                        {card.subtitle}
                      </p>

                      <ul className="space-y-2">
                        {card.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex gap-2 items-center text-sm text-[#757575]"
                          >
                            <CircleIcon className="text-secondaryBrand w-4 h-4" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="mt-6 text-white bg-secondaryBrand text-sm font-semibold capitalize py-3 px-6 rounded-md self-start hover:bg-secondaryBrand/90 transition">
                      Learn more
                    </button>
                  </div>
                </div>



              ))}
            </div>
          </div>       
          
           </section>

        <section className="container px-4 mx-auto py-28 ">
          <div className="flex justify-center ">
            <h1 className="text-primaryText text-base md:text-3xl font-bold font-poppins capitalize ">
              Blog &

              <span className="md:text-3xl font-bold font-poppins text-fouthBrand capitalize ml-2">
                Articles
              </span>
            </h1>
          </div>
          <div className="flex justify-center pb-6">
            <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl">
              Read our interesting blog
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-6"> */}
          <div className="grid md:grid-cols-12 grid-cols-2   gap-8 justify-items-center max-w-6xl mx-auto">

            {implantCards?.map((card, index) => (
              <div key={index} className="col-span-4">
                <img src={card.img} alt={card.title || "Implant card"} className="" />

                {/* Show content only if available */}
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
              </div>
            ))}
          </div>


        </section>







      </div>

      <FrequentlyAskedQuestion />
      <Contact />
      <UpperFooter />
      <Footer />
    </div>


  );
};

export default About;

