import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Contact from "./contact";
import Header from "./header";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PrimaryButtonUI } from "../../Common/Button";
import CircleIcon from "../../icon/circle-icon";
import UpperFooter from "../../components/upper-footer";
import { concerns, plans, steps } from "../../Constant";

const Patients = ({ isLanding }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">

      {!isLanding && <Header />}
      <section className="py-8 sm:py-12 md:py-48 px-4 sm:px-6 md:px-8 lg:mx-12 xl:mx-24 2xl:mx-48 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h3 className="text-sm md:text-5xl font-bold text-secondaryBrand">
            Protect Your Smile with MakeMeSmile
          </h3>
          <p className="text-primaryText text-[10px] whitespace-nowrap font-normal font-poppins py-4">Extended warranties up to 9 years- simple, affordable, and trusted by your dentist</p>
          <p className="mt-4  text-secondaryText text-sm font-normal font-poppins">
            Your dental work is an investment in your health and your confidence. Life happens — crowns can chip, bridges may loosen, or implants may need attention. With MakeMeSmile, you don’t have to worry.
          </p>
          <ul className=" pt-5 list-disc pl-4 pb-6">
            <li className="text-secondaryText text-sm font-normal font-poppin">Peace of mind with coverage up to 9 years</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Fast, simple claims if something happens</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Trusted warranty lab: InterDentalUSA</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Your dentist stays by your side — and so do we</li>
          </ul>
          <button onClick={() => navigate("/signup")} className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
            <h1 className="font-poppins font-semibold text-base text-[#434343]">
              Register
            </h1>
            <div className="rounded-full bg-secondaryBrand text-white p-2">
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-6 sm:mt-8 md:mt-0">
          {/* Circular Image */}
          <img
            src="/assets/landing-page/patient-image.png"
            alt="Patient"
            className="w-64 sm:w-80 md:w-96 lg:w-124 h-64 sm:h-80 md:h-96 lg:h-124 object-cover"
          />
        </div>
      </section>
      <section>
        <div className="py-8 sm:py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-sm md:text-3xl font-bold font-poppins text-fouthBrand">
              Common Concerns
            </h2>
            <p className="text-sm md:text-xl text-primaryText mt-4 font-poppins">
              Our warranty gives you the comfort and reassurance you deserve
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
            {concerns.map((concern, index) => (
              <div
                key={index}
                className="bg-background p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-sm md:text-xl font-semibold text-secondaryBrand  mb-4">
                  {concern.title} - <span className="text-fouthBrand">
                    {concern?.subtitle}
                  </span>
                </h3>

                <p className="text-sm md:text-sm font-poppins  font-normal text-textColor">
                  {concern.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-8 sm:py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className=" text-sm md:text-2xl font-bold text-secondaryBrand">
            Get Started in 3 Easy Steps
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-4 sm:p-6   rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center w-28  h-28 sm:w-28 sm:h-28  text-5xl bg-background text-secondaryBrand font-bold rounded-full mx-auto mb-4 sm:mb-6">
                {/* w-10 sm:w-12 h-10 sm:h-12 */}
                {step.id}
              </div>
              <h3 className="text-sm md:text-2xl whitespace-nowrap  font-poppins font-bold text-center text-gray-800 mb-4">
                {step.title}
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm md:text-sm font-poppins space-y-2 pl-2">
                {step.description.map((desc, index) => (
                  <li key={index} className="text-[10px] ">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>




      <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-center">
        {/* Section Header */}
        <h2 className="text-sm md:text-3xl  font-normal text-primaryText uppercase">
          Choose Your <span className="text-sm md:text-3xl  font-bold text-secondaryBrand">
            Patient
          </span>  <span className="text-sm md:text-3xl  font-bold text-fouthBrand"> Warranty </span> <span className="text-sm md:text-3xl  font-bold text-primaryText"> Plan  </span>
        </h2>

        <p className="mt-4 md:mt-4 font-poppins font-normal text-sm  text-primaryText max-w-[900px] mx-auto text-center">
          Whether you're receiving a crown, bridge, denture, or implant, your smile deserves protection that lasts. Our Make Me Smile Warranty Program gives you long-term peace of mind—plus access to a network of trusted dentists and advanced dental labs.
        </p>

        {/* Plans Grid */}
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Title + Price */}
              <h3 className="text-lg md:text-2xl font-poppins font-semibold text-center text-primaryText mb-2 capitalize">
                {plan.title}
              </h3>
              <p className="text-center text-secondaryBrand text-3xl font-bold  mb-4">
                {plan.price}
              </p>

              {/* Description as bullet list */}
              <ul className="list-disc list-inside text-gray-600 text-start p-4 rounded-md bg-blue-300/10 text-sm md:text-base font-poppins space-y-2 pl-2 mb-6">
                {plan.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full py-2 px-4 rounded-md font-semibold transition   capitalize secondaryBrand  border border-secondaryBrand    `}
              >
                select
              </button>
            </div>
          ))}
        </div>
        <div>
          <p className="mt-4 md:mt-4 text-secondaryText font-normal font-poppins max-w-[900px] mx-auto text-center ">If You do not see what you want. Don’t worry <a href='/contact' className='text-secondaryBrand'> Contact Us
          </a> and we will create a personalized proposal that fit your business needs.</p>
        </div>
      </section>














      <div className="py-8 sm:py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className=" text-sm md:text-5xl font-semibold text-secondaryBrand">
            Need <span className="text-fouthBrand font-poppins font-bold"> Help
            </span>  Filling It Out?
          </h2>
        </div>
        <div>
          <p className="text-secondaryText font-normal text-xl text-center max-w-[900px]  mx-auto">Use our built-in Smart Assistant to walk you through the form. From tooth selections to warranty terms, our AI guide ensures every detail is right.</p>

          <p className="text-secondaryText font-normal text-xl text-center max-w-[700px]  mx-auto pt-11">Ask questions live, get file upload tips, and make confident choices.</p>
        </div>
        <div className="flex justify-center mt-7">
          <PrimaryButtonUI title='Launch Guided Help' className="px-20 py-5 rounded-full font-poppins  font-normal text-xs bg-secondaryBrand text-white  shadow "
          />
        </div>

      </div>

      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-16 ">
        <div className="grid md:grid-cols-12 grid-cols-6 gap-4 items-center">
          <div className="col-span-6  ">
            <h1 className="text-lg md:text-5xl font-poppins text-secondaryBrand">
              Patient eBook:{" "}
              <span className="font-bold text-lg md:text-5xl font-poppins text-secondaryBrand">Mastering</span> the{" "}
              <span className="font-bold text-lg md:text-5xl font-poppins text-secondaryBrand">Full Mouth</span>
            </h1>
            <p className="text-fouthBrand  text-3xl  font-poppins font-bold mt-5">$19.95</p>
            <p className="text-secondaryText  md:text-xl  text-base font-normal font-poppins pt-8 max-w-[500px] ">Packed with insights into restorative options, patient stories, and cost-saving tips, this guide helps you make smarter decisions for long-term dental care.</p>




            <h3 className="text-secondaryBrand md:text-xl  text-base py-8 font-poppins font-semibold ">Includes:</h3>
            <ul>
              <li className="flex gap-3 text-secondaryText text-base font-poppins font-medium">  <CircleIcon className="text-secondaryBrand w-4 h-4" /> Full overview of crowns, implants, veneers, and bridges</li>
              <li className="flex gap-3 text-secondaryText text-base font-poppins font-medium">  <CircleIcon className="text-secondaryBrand w-4 h-4" /> Tips on what to expect before and after treatment</li>
              <li className="flex gap-3 text-secondaryText text-base font-poppins font-medium">  <CircleIcon className="text-secondaryBrand w-4 h-4" /> Bonus chapter: Top Questions to Ask Before Starting</li>
            </ul>

          </div>




          <div className="col-span-6 flex justify-center">
            <img
              src="/assets/landing-page/book.png"
              alt="Patient"
              className="w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>



        </div>
      </div>



      <div className="px-5">

        <Contact />
      </div>
      <UpperFooter />
      <Footer />



    </div >
  );
};

export default Patients;
