import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "./header";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import DotIcon from "../../icon/dotIcon";
import { Doctorsteps, steps } from "../../Constant";
import Contact from "./contact";
import { PrimaryButtonUI } from "../../Common/Button";



const pricingPlans = [
  {
    id: 1,
    name: "Diamond",
    price: "$175",
    duration: "Every Month",
    enrollmentFee: "+$125 enrollment fee",
    description: [
      "Not sure this is the right fit? Try it out one month at a time.",
      "Valid for 3 months.",
    ],
    buttonStyle:
      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
  {
    id: 2,
    name: "Silver",
    price: "$275",
    duration: "Every Month",
    enrollmentFee: "+$125 enrollment fee",
    description: ["12 months 20 patients per month.", "Valid for 3 months."],
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 3,
    name: "Silver",
    price: "$475",
    duration: "Every Month",
    enrollmentFee: "+$125 enrollment fee",
    description: ["Enroll unlimited patients.", "Valid for 3 months."],
    buttonStyle:
      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
];



const plans = [
  {
    id: "1",
    name: "Starter Plan",
    price: "$125",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Unlimited Patients/Month",
      "Full Lab Discounts",
      "Priority Case Handling",

      "Smart Assistant access included",
      "One-time setup fee: $125",
    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "2",
    name: "Growth Plan",
    price: "$125",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Streamline Workflows",
      "Add Warranties",
      "Receive Patient Referrals",
    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "3",
    name: "Pro Plan",
    price: "$125",
    duration: "Per Month",
    enrollmentFee: "One‑Time Setup Fee: $125",
    features: [
      "Unlimited Cases",
      "Priority Support",
      "Full Automation For DSOs",

    ],
    buttonStyle:
      "text-secondaryBrand border-secondaryBrand text-sm  font-semibold  font-popins",
  },
  {
    id: "4",
    name: "Referral Plan",
    price: null,
    duration: "Coming Soon",
    enrollmentFee: "",
    features: [
      "We refer patients to you",
      "Featured listing as a Participating Provider",
      "Great for practices looking to grow",
      "Cancel anytime",
      "Coming soon",
    ],
    isReferral: true,
  },
];



const Check = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    className={`h-4 w-4 flex-none ${props.className ?? ""}`}
  >
    <path
      d="M20 6L9 17l-5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Doctor = ({ isLanding }) => {
  const navigate = useNavigate();


  return (
    <>
      <div className="bg-gradient-to-b from-[#f7fefc] to-[#e2f7fb]">
        {!isLanding && <Header />}
        <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Left Side: Image */}
          <div className="relative w-full md:w-1/2 flex justify-center items-center">
            {/* Circular Image */}
            <img
              src={
                isLanding
                  ? "/assets/landing-page/doctor-image.png"
                  : "/assets/landing-page/doctor-image-3.png"
              }
              alt="Doctor"
              className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            {/* Small Circle */}
          </div>

          {/* Right Side: Text */}
          <div className="mt-6 sm:mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-1/2 text-gray-800">
            <h3 className="text-3xl md:text-5xl font-bold text-secondaryBrand">
              DOCTOR
            </h3>
            <p className="font-poppins capitalize text-base  font-medium py-4">Partner with InterOral.ai- Smplify, save, and grow</p>
            <p className="mt-4 text-sm md:text-lg text-secondaryText">
              Join our platform to access lab discounts, extended warranties, AI design tools, and patient referrals — all in one streamlined system. Your Practice Benefits:
            </p>
            <ul className="list-disc list-inside text-secondaryText text-start p-4 rounded-md  text-sm md:text-base font-poppins space-y-2 pl-2 mb-6">
              <li>Discounted lab fees through the Dental Lab Alliance</li>
              <li>Eligibility for 3–9 year patient warranties via MakeMeSmile</li>
              <li>Patient referrals from national marketing campaigns</li>
              <li>Increased visibility as a featured providere</li>
              <li>Case automation with our AI-powered Doctor Portal</li>
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
        </section>
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20">
          {/* Left column */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-poppins capitalize">
              DOCTOR{" "}
              <span className="text-secondaryBrand font-bold capitalize">
                ENROLLMENT
              </span>
            </h1>

            <p className="text-base font-medium font-poppins">
              Smart Subscription Plans That Bring You Patients, Peace of Mind, and Lab Savings
            </p>

            <p className="text-sm font-poppins text-secondaryText">
              Interoral.ai and Make Me Smile have teamed up to offer a subscription-based
              program designed to support your practice with lab discounts, patient referrals,
              and extended dental warranties.
            </p>

            <p className="text-sm font-poppins text-secondaryText">
              By enrolling, your office gains:
            </p>
            <ul className="flex flex-col space-y-3">
              <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium">
                <DotIcon className="w-5 h-5 shrink-0" />
                Discounted lab fees through our curated network of partner labs
              </li>
              <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium">
                <DotIcon className="w-5 h-5 shrink-0" />
                Eligibility for 3–9 year patient warranties, building long-term trust and confidence
              </li>
              <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium">
                <DotIcon className="w-5 h-5 shrink-0" />
                Referral patients from our national marketing campaigns
              </li>
              <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium">
                <DotIcon className="w-5 h-5 shrink-0" />
                Increased visibility through featured listings as a participating provider on our platform
              </li>

            </ul>
            <p className="text-sm font-poppins text-secondaryText space-y-3">Whether you're looking to grow your patient base, improve patient satisfaction, or reduce lab expenses, our plans offer a flexible way to streamline your operations and increase your revenue.</p>

          </div>
          <div className="flex justify-center">
            <img
              src="/assets/landing-page/doctor1.png"
              alt="Doctor Enrollment"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </section>


        <div className="py-8 sm:py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className=" text-sm md:text-3xl font-semibold text-secondaryBrand max-w-[600px] mx-auto text-center">
              Simplify Your <span className="text-fouthBrand">Practice</span>  with Our  <span className="text-secondaryBrand">Subscription Plans</span>
            </h2>
            <p className="text-secondaryText py-8 font-poppins text-sm  font-normal">Effortless Patient Management in Three Simple Steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative">
            {/* ✅ Dashed line only between first and last steps */}
            <div className="hidden md:block absolute top-6 left-[16.666%] w-[66.666%] border-t-2 border-dashed border-gray-300 z-0"></div>

            {Doctorsteps.map((step, idx) => (
              <div
                key={step.id}
                className="flex flex-col items-center   relative z-10"
              >
                {/* Step Circle */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-fouthBrand text-white text-xl font-bold mb-6">
                  {idx + 1}
                </div>


                <div className="mt-6 flex-1 w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-sm md:text-2xl font-poppins font-bold text-start text-secondaryBrand mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm font-poppins font-bold text-start text-secondaryBrand mb-4">
                    {step?.parag}
                  </p>
                  <ul className="text-gray-600 text-sm font-poppins space-y-2 pl-2">
                    {step.description.map((desc, index) => {
                      if (step.id === 1) {
                        const [firstWord, ...rest] = desc.split("–");
                        return (
                          <li
                            key={index}
                            className="text-xs font-poppins font-normal"
                          >
                            {/* First part */}
                            <span className="font-bold text-primaryText">
                              {firstWord.trim()}
                            </span>

                            {/* Rest part with different color */}
                            {rest.length > 0 && (
                              <span className="text-secondaryText font-normal">
                                {" – " + rest.join("–")}
                              </span>
                            )}
                          </li>
                        );
                      }
                      return <li key={index} className='text-xs font-poppins font-normal text-secondaryText'>{desc}</li>;
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>


        </div>

        <div className="py-8 sm:py-12 md:pb-40 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
          <div className="text-center mb-6 sm:mb-12">
            <h2 className=" text-sm md:text-3xl font-semibold text-secondaryBrand max-w-[600px] mx-auto text-center">
              Doctor <span className="text-secondaryBrand font-bold ">Portal</span> &  <span className=" text-fouthBrand font-bold">Plans</span>
            </h2>
            <p className="text-secondaryText py-8 font-poppins text-xl  font-bold">Precision Restorations. Smart Workflow. Smiling Patients.</p>
            <p className="text-primaryText py-8 font-poppins text-base   font-medium ">Welcome to the  Interoral.ai and Make Me Smile™ platform—where aesthetics, innovation, and automation come together to support your practice. </p>
            <p className="text-secondaryText max-w-[1033px]  text-center  mx-auto font-poppins text-sm  font-normal">Whether you're placing a single crown or managing full-arch restorations, our system ensures every case is accurate, streamlined, and protected.
              Smart Prescription Wizard + Guided Assistant Need help filling out your case forms? Our AI-powered Prescription Wizard makes it simple to:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Top 3 Divs */}
            <div className="bg-background p-4 rounded col-span-4">
              <p className="flex gap-4 text-primaryText font-medium font-poppins capitalize"><DotIcon className="w-5 h-5 shrink-0" /> Select teeth, materials, and shades</p>
            </div>
            <div className="bg-background p-4 rounded col-span-4">


              <p className="flex gap-4 text-primaryText font-medium font-poppins capitalize"><DotIcon className="w-5 h-5 shrink-0" /> Upload STL, DICOM, or PLY files</p>

            </div>
            <div className="bg-background p-4 rounded col-span-4"><p className="flex gap-4 text-primaryText font-medium font-poppins capitalize"><DotIcon className="w-5 h-5 shrink-0" />Auto-match compatible implant parts</p></div>

            {/* Bottom 2 Divs (span across 3 columns) */}
            <div className="col-span-6 bg-background p-4 rounded text-center"><p className="flex gap-4 text-primaryText font-medium font-poppins capitalize"><DotIcon className="w-5 h-5 shrink-0" />Generate prescription sheets and FedEx labels</p></div>
            <div className="col-span-6 bg-background p-4 rounded text-center"><p className="flex gap-4 text-primaryText font-medium font-poppins capitalize"><DotIcon className="w-5 h-5 shrink-0" />Route your files directly to design and production labs</p></div>
          </div>
          <p className="text-sm font-poppins font-normal">Bonus: Our built-in ChatGPT Assistant can guide you through the form step-by-step to prevent errors, answer questions, and ensure your cases are processed without delays.</p>
        </div>
        <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
          {/* Header */}
          <h2 className="text-base md:text-3xl font-bold text-primaryText uppercase text-center tracking-wide">
            DOCTOR <span className="font-bold text-3xl font-poppins uppercase">ENROLLMENT</span> <span className="text-3xl font-bold font-poppins uppercase ">PLANS </span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm md:text-base text-gray-600 text-center max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
            If you do not see what you want, don&apos;t worry{' '}
            <a
              href="/contact-us"
              className="text-secondaryBrand font-bold underline hover:text-blue-600"
            >
              Contact Us
            </a>{' '}
            and we will create a personalized proposal that fits your business needs.
          </p>
          {/* Plans Grid */}
          <div className="mx-auto mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-full  ">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white border rounded-xl  p-4 sm:p-6 flex flex-col justify-between hover:shadow-md transition shadow-md`}
              >
                {/* Card content */}
                <div>
                  {plan.isReferral ? (
                    <div className="bg-secondaryBrand text-white rounded-lg p-4 text-center">
                      <p className="text-2xl  sm:text-xl font-bold font-poppins capitalize ">{plan.name}</p>
                      <p className="text-base font-bold font-poppins ">{plan.duration}</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-base sm:text-xl font-semibold font-poppins capitalize text-center">
                        {plan.name}
                      </h3>
                      <p className="mt-4 ext-3xl font-bold font-poppins text-secondaryBrand text-center">
                        {plan.price}
                      </p>

                    </>
                  )}
                  <ul className="mt-4 list-disc list-inside  bg-blue-300/10 p-2 text-gray-700 space-y-2 text-sm sm:text-base mx-auto max-w-[20rem]">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-1 ${plan.isReferral ? "text-blue-900" : "text-blue-400"}`}>
                          <Check />
                        </span>
                        <span className={`${plan.isReferral ? "text-gray-700" : ""}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>


                {/* Button */}
                <button
                  disabled={plan.isReferral}
                  className={
                    plan.isReferral
                      ? "mt-6 sm:mt-8 w-full rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed py-2"
                      : `mt-8 sm:mt-12 px-4 sm:px-6 py-2 sm:py-3 w-full border rounded-lg ${plan.buttonStyle}`
                  }
                  aria-label={plan.isReferral ? "Coming soon" : `Select ${plan.name}`}
                >
                  {plan.isReferral ? "Coming Soon" : "Select"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div >


      <Contact />
      <section className="container mx-auto px-4 my-16">
        <div className="flex justify-center">
          <h3 className="text-secondaryBrand text-5xl font-normal font-poppins">Need a <span className="text-secondaryBrand text-5xl   font-bold font-poppins ">Custom Plan?</span></h3>

        </div>
        <p className="text-xl font-normal font-poppins text-secondaryText max-w-[600px] mx-auto text-center py-8">
          We’re happy to build a tailored solution for your team. Just Contact Us and let us know what you need.
        </p>
        <div className="flex justify-center">
          <PrimaryButtonUI
            title="Contact Us"
            className="px-20 py-5 rounded-full font-poppins  font-normal text-xs bg-secondaryBrand text-white  shadow "
          />
        </div>


      </section>
      <Footer />

    </>
  );
};

export default Doctor;
