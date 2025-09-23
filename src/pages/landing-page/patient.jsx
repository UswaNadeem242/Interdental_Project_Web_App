import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Contact from "./contact";
import Header from "./header";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    id: 1,
    title: "3 YEAR PLAN",
    duration: "3 Years (36 Months)",
    price: "$99 Enrollment",
    description: "Up to 10 Crowns, Bridges and Veneers",
    buttonStyle:
      "border-blue-500 text-blue-900 hover:bg-blue-800 hover:text-white",
  },
  {
    id: 2,
    title: "6 YEAR PLAN",
    duration: "6 Years (72 Months)",
    price: "$199 Enrollment",
    description: "Up to 20 Crowns, Bridges and Veneers",
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 3,
    title: "6 YEAR PLAN",
    duration: "9 Years (108 Months)",
    price: "$299 Enrollment",
    description: "Including Implant Crowns, not related Implant Parts",
    buttonStyle:
      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
];

const concerns = [
  {
    title: "Chipped Crowns",
    description:
      "Crowns made of all porcelain can occasionally chip. If the chipping is extensive the crown may need to be replaced. We will re-make it at no charge.",
  },
  {
    title: "Loose Crowns",
    description:
      "The crown naturally may become loose through wear and tear, when this open bacteria can seep in, causing decay and infection. If your crown feels loose, contact your dental office. We can replace it for free.",
  },
  {
    title: "Crown Displacement",
    description:
      "If your crown or bridge is displaced, this may be due to an improper fit or lack of cement. If this happens, contact your doctor's office immediately. The restoration may need to be recemented or replaced.",
  },
  {
    title: "Allergic Reaction",
    description:
      "In the case of porcelain fused to metal crown or bridge, on rare occasions patients have had allergic reactions due to the fact that crown restorations are made using a mixture of metals reactions may occur, but extremely rare.",
  },
];

const steps = [
  {
    id: 1,
    title: "REGISTER",
    description: [
      "Register first by filling out patient information including participating dentist/doctor.",
      "Read and initial terms and conditions.",
      "If your dentist is not a participating dentist, we will find one for you.",
      "Select the date to submit payment for your subscription. The date will automatically charge your credit card every month on that date.",
      "Submit Payment.",
      "You will receive an email from us with a reference number. This number is for the next set of instructions.",
    ],
  },
  {
    id: 2,
    title: "CLAIM REQUEST FORM",
    description: [
      "Go to your patient’s page and log in.",
      "Download the claim request and fill out all of your information including the reference number provided by your welcome email.",
      "Log into this website on the portal page and fill out the claim request form with your dentist also using your reference number.",
      "Your dentist will indicate the number of years you want 'Make Me Smile' to extend the warranty.",
      "Pick the number of years you want to extend this service.",
      "The system will generate your monthly dues depending on your choice of coverage.",
    ],
  },
  {
    id: 3,
    title: "ALL DONE",
    description: [
      "You should now have a copy of your contract with Make Me Smile and Interdental Lab. You can download a copy on your page.",
      "Any questions, come to your page log in and submit an email regarding your concerns.",
    ],
  },
];

const Patients = ({ isLanding }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-[#e2f7fb] to-[#f7fefc]">
      {!isLanding && <Header />}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:mx-12 xl:mx-24 2xl:mx-48 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Text */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h3 className="text-sm md:text-5xl font-bold text-secondaryBrand">
            Protect Your Smile with MakeMeSmile
          </h3>
          <p className="text-secondaryText text-sm font-normal font-poppins py-4">Extended warranties up to 9 years- simple, affordable, and trusted by your dentist</p>
          <p className="mt-4  text-secondaryText text-sm font-normal font-poppins">
            Your dental work is an investment in your health and your confidence. Life happens — crowns can chip, bridges may loosen, or implants may need attention. With MakeMeSmile, you don’t have to worry.
          </p>
          <ul className=" pt-5 list-disc pl-4 pb-6">
            <li className="text-secondaryText text-sm font-normal font-poppin">Peace of mind with coverage up to 9 years</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Fast, simple claims if something happens</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Trusted warranty lab: InterDentalUSA</li>
            <li className="text-secondaryText text-sm font-normal font-poppin">Your dentist stays by your side — and so do we</li>
          </ul>
          <button  onClick={() => navigate("/signup")} className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
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

      <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-center">
        {/* Section Header */}
        <h2 className="text-sm md:text-lg font-bold text-blue-400">
          PATIENT YEARLY PLAN
        </h2>
        <p className="mt-4 md:mt-4 text-sm  text-gray-600">
          Our warranty gives you the comfort and reassurance you deserve
        </p>

        {/* Plans Grid */}
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="text-lg md:text-xl font-bold text-blue-900">
                {plan.title}
              </h3>
              <p className="mt-2 text-sm md:text-lg text-blue-400 font-semibold">
                {plan.duration}
              </p>
              <p className="mt-2 sm:mt-4 text-sm md:text-lg text-gray-800 font-bold">
                {plan.price}
              </p>
              <p className="mt-2 text-sm md:text-lg text-gray-600">
                {plan.description}
              </p>
              <button
                className={`mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 py-2 sm:py-3 w-full border transition rounded-lg text-sm md:text-lg ${plan.buttonStyle}`}
              >
                GET IT NOW
              </button>
            </div>
          ))}
        </div>
      </section>
      {!isLanding && (
        <>
          <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-sm md:text-2xl font-semibold text-blue-900">
                Common Concerns
              </h2>
              <p className="text-sm md:text-xl text-gray-600 mt-4">
                Our warranty gives you the comfort and reassurance you deserve
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
              {concerns.map((concern, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-sm md:text-lg font-semibold text-blue-800 mb-4">
                    {concern.title}
                  </h3>
                  <p className="text-sm md:text-sm text-gray-600">
                    {concern.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className=" text-sm md:text-2xl font-semibold text-blue-900">
                Get Started
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 text-blue-900 font-bold rounded-full mx-auto mb-4 sm:mb-6">
                    {step.id}
                  </div>
                  <h3 className="text-sm md:text-lg font-poppins font-bold text-center text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm md:text-sm font-poppins space-y-2">
                    {step.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center">
              <img
                src="/assets/landing-page/patient-image-2.png"
                alt="Patient"
                className="w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>

            {/* Right Section: Form */}
            <div className="w-full md:w-1/2 mt-6 sm:mt-8 md:mt-0 md:ml-6 lg:ml-12">
              <h2 className=" text-xl md:text-2xl font-poppins font-bold text-blue-900 mb-6 text-center md:text-left">
                Patient Registration
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                />
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="w-full sm:w-1/2 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-poppins"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <Contact />
        </>
      )}
    </div>
  );
};

export default Patients;
