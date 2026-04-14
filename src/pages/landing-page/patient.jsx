 
import Footer from "../../components/Footer";
import Contact from "./contact";
import Header from "./header";
import { PrimaryButtonUI, ThirdButtonUI } from "../../Common/Button";
import { concerns, plans, steps } from "../../Constant";
import UpperFooter from "../../components/upper-footer";
import CircleIcon from "../../icon/circle-icon";
import { useState, useEffect } from "react";
import api from "../../api/intercepter";

const Patients = ({isLanding}) => {
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(null);
  return (
    <div className="bg-gray-50">
      {!isLanding && <Header />}

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24 mt-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Side: Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondaryBrand leading-tight">
                Protect Your Smile with
                <span className="text-[#94D3DD]"> MakeMeSmile</span>
              </h1>

              <p className="text-primaryText text-sm md:text-base font-normal font-poppins">
                Extended warranties up to 9 years - simple, affordable, and
                trusted by your dentist
              </p>

              <p className="text-secondaryText text-sm md:text-base font-normal font-poppins leading-relaxed">
                Your dental work is an investment in your health and your
                confidence. Life happens — crowns can chip, bridges may loosen,
                or implants may need attention. With MakeMeSmile, you don't have
                to worry.
              </p>

              <ul className="space-y-3 pl-5 list-disc">
                <li className="text-secondaryText text-sm md:text-base font-normal font-poppins">
                  Peace of mind with coverage up to 9 years
                </li>
                <li className="text-secondaryText text-sm md:text-base font-normal font-poppins">
                  Fast, simple claims if something happens
                </li>
                <li className="text-secondaryText text-sm md:text-base font-normal font-poppins">
                  Trusted warranty lab: InterDentalUSA
                </li>
                <li className="text-secondaryText text-sm md:text-base font-normal font-poppins">
                  Your dentist stays by your side — and so do we
                </li>
              </ul>

              <div className="pt-4">
                <ThirdButtonUI title="Register" href="/signup" />
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src="/assets/landing-page/patient-image.png"
                alt="Patient"
                className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Concerns Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-fouthBrand mb-4">
              Common Concerns
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-primaryText font-poppins max-w-3xl mx-auto">
              Our warranty gives you the comfort and reassurance you deserve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {concerns.map((concern, index) => (
              <div
                key={index}
                className="bg-background p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-secondaryBrand mb-3">
                  {concern.title} -{" "}
                  <span className="text-fouthBrand">{concern?.subtitle}</span>
                </h3>
                <p className="text-sm md:text-base font-poppins font-normal text-textColor leading-relaxed">
                  {concern.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started in 3 Easy Steps */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondaryBrand">
              Get Started in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-4xl md:text-5xl bg-background text-secondaryBrand font-bold rounded-full mx-auto mb-6">
                  {step.id}
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-poppins font-bold text-center text-gray-800 mb-4">
                  {step.title}
                </h3>
                <ul className="list-disc custom-list list-inside text-gray-600 font-poppins space-y-2 pl-2">
                  {step.description.map((desc, index) => (
                    <li key={index} className="text-sm md:text-base">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10 md:mt-12">
            <ThirdButtonUI title="Register" href="/signup" />
          </div>
        </div>
      </section>

      {/* Warranty Plans Section */}
      <section className="bg-[#F9FCFF] py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-primaryText uppercase mb-4">
              Choose Your{" "}
              <span className="font-bold text-secondaryBrand">Patient</span>{" "}
              <span className="font-bold text-fouthBrand">Warranty</span>{" "}
              <span className="font-bold text-primaryText">Plan</span>
            </h2>

            <p className="mt-6 font-poppins font-normal text-sm md:text-base lg:text-lg text-primaryText max-w-4xl mx-auto leading-relaxed">
              Whether you're receiving a crown, bridge, denture, or implant,
              your smile deserves protection that lasts. Our Make Me Smile
              Warranty Program gives you long-term peace of mind—plus access to
              a network of trusted dentists and advanced dental labs.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Title + Price */}
                <h3 className="text-xl md:text-2xl font-poppins font-semibold text-center text-primaryText mb-3 capitalize">
                  {plan.title}
                </h3>
                <p className="text-center text-secondaryBrand text-3xl md:text-4xl font-bold mb-6">
                  {plan.price}
                </p>

                {/* Description as bullet list */}
                <ul className="list-disc custom-list list-inside text-secondaryBrand text-start p-4 rounded-md bg-blue-300/10 text-sm md:text-base font-poppins space-y-2 pl-2 mb-6">
                  {plan.description.map((desc, index) => (
                    <li key={index} className="text-sm md:text-base">
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="w-full py-3 px-4 rounded-md font-semibold transition hover:bg-secondaryBrand hover:text-white capitalize text-secondaryBrand border border-secondaryBrand">
                  Select
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm md:text-base text-secondaryText font-normal font-poppins max-w-4xl mx-auto">
              If you do not see what you want, don't worry.{" "}
              <a
                href="/contact"
                className="text-secondaryBrand font-semibold hover:underline"
              >
                Contact Us
              </a>{" "}
              and we will create a personalized proposal that fits your business
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Assistant Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-secondaryBrand mb-6">
            Need{" "}
            <span className="text-fouthBrand font-poppins font-bold">Help</span>{" "}
            Filling It Out?
          </h2>

          <p className="text-secondaryText font-normal text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
            Use our built-in Smart Assistant to walk you through the form. From
            tooth selections to warranty terms, our AI guide ensures every
            detail is right.
          </p>

          <p className="text-secondaryText font-normal text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Ask questions live, get file upload tips, and make confident
            choices.
          </p>

          <div className="flex justify-center">
            <PrimaryButtonUI
              title="Launch Guided Help"
              className="px-12 md:px-20 py-4 md:py-5 rounded-full font-poppins font-normal text-sm md:text-base bg-secondaryBrand text-white shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* eBook Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side: Content */}
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins text-secondaryBrand leading-tight">
                Patient eBook: <span className="font-bold">Mastering</span> the{" "}
                <span className="font-bold">Full Mouth</span>
              </h2>

              <p className="text-fouthBrand text-3xl md:text-4xl font-poppins font-bold">
                $5.99
              </p>

              <p className="text-secondaryText text-base md:text-lg lg:text-xl font-normal font-poppins leading-relaxed">
                Packed with insights into restorative options, patient stories,
                and cost-saving tips, this guide helps you make smarter
                decisions for long-term dental care.
              </p>

              <div className="space-y-4">
                <h3 className="text-secondaryBrand text-lg md:text-xl font-poppins font-semibold">
                  Includes:
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-secondaryText text-sm md:text-base font-poppins font-medium">
                    <CircleIcon className="text-secondaryBrand w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Full overview of crowns, implants, veneers, and bridges
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-secondaryText text-sm md:text-base font-poppins font-medium">
                    <CircleIcon className="text-secondaryBrand w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Tips on what to expect before and after treatment
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-secondaryText text-sm md:text-base font-poppins font-medium">
                    <CircleIcon className="text-secondaryBrand w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Bonus chapter: Top Questions to Ask Before Starting
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <PrimaryButtonUI
                  title="Order the eBook Now"
                  className="px-12 md:px-20 py-4 md:py-5 rounded-full font-poppins font-normal text-sm md:text-base bg-secondaryBrand text-white shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src="/assets/landing-page/ebook-cover.png"
                alt="eBook Cover - Mastering the Full Mouth"
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <Contact isLanding={true} />
        </div>
      </section>

      <UpperFooter />
      <Footer />
    </div>
  );
};

export default Patients;
