import Footer from "../../components/Footer";
import Header from "./header";

const doctorPlans = [
  {
    id: 1,
    title: "STANDARD",
    bgColor: "bg-blue-900 text-white",
    content: [
      "Standard Plan",
      "3 Month Trial",
      "10 Patients Per Month",
      "Silver Plan - 20 Patients Per Month",
      "Gold Plan - Unlimited Patients Per Month",
      "50-70% Discount On All Laboratory Fees (Implant Parts Not Included).",
      "Laboratory Pricing Schedule - Please Email Request.",
    ],
  },
  {
    id: 2,
    title: "REFERRAL",
    bgColor: "bg-blue-300 text-white",
    content: [
      "The Patient Is Enrolled Through Our Marketing Efforts Into MMS Warranty Program.",
      "We Refer The Patient To You.",
      "We Will List Your Office On Our Website As A Participating Professional.",
      "$125.00 Per Month.",
      "Cancel Anytime.",
      "Coming Soon!",
    ],
  },
  {
    id: 3,
    title: "PROCEDURE",
    bgColor: "bg-blue-500 text-white",
    content: [
      "To Register, Fill Out The Office Information Including Participating Doctor.",
      "Read And Initial The Patients Terms And Conditions.",
      "Choose The Right Plan For You.",
      "Submit Your Payment Through Our Portal. You Will Receive An Email With An Office-Specific Reference Number.",
    ],
  },
];

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
// const Doctor = ({ isLanding }) => {
//   return (
//     <div className="bg-gradient-to-b from-[#f7fefc] to-[#e2f7fb]">
//       {!isLanding && <Header />}
//       <section className="bg-[#F9FCFF] py-16 px-8 flex flex-col md:flex-row items-center justify-between">
//         {/* Left Side: Image */}
//         <div className="relative w-full md:w-1/2 flex justify-center items-center">
//           {/* Circular Image */}
//           <img
//             src={
//               isLanding
//                 ? "/assets/landing-page/doctor-image.png"
//                 : "/assets/landing-page/doctor-image-3.png"
//             }
//             alt="Doctor"
//             className="w-124 h-124 object-cover"
//           />
//           {/* Small Circle */}
//         </div>

//         {/* Right Side: Text */}
//         <div className="mt-8 md:mt-0 md:ml-16 w-full md:w-1/2 text-gray-800">
//           <h3 className="text-4xl font-bold text-blue-900">DOCTOR</h3>
//           <p className="mt-4 text-gray-600">
//             Our team of experienced technicians uses the latest technology and
//             highest quality materials to ensure the best results for your
//             patients.
//           </p>
//           <button className="mt-6 px-6 py-3 rounded-full border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition  transition-all duration-300 flex items-center group">
//             <span className="mr-4">Register</span>
//             <span className="w-8 h-8 bg-[#001d58] text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#001d58] transition-all duration-300">
//               <svg
//                 width="39"
//                 height="39"
//                 viewBox="0 0 39 39"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <rect
//                   x="0.970001"
//                   y="0.63623"
//                   width="37.7273"
//                   height="37.7273"
//                   rx="18.8636"
//                   fill="#001D58"
//                 />
//                 <path
//                   d="M21.1641 16.3588C20.899 16.0936 20.899 15.6637 21.1641 15.3986C21.4293 15.1334 21.8592 15.1334 22.1244 15.3986L25.7456 19.0198C26.0107 19.2849 26.0107 19.7148 25.7456 19.98L22.1244 23.6012C21.8592 23.8664 21.4293 23.8664 21.1641 23.6012C20.899 23.3361 20.899 22.9062 21.1641 22.641L23.6263 20.1789H14.8545C14.4795 20.1789 14.1755 19.8749 14.1755 19.4999C14.1755 19.1249 14.4795 18.8209 14.8545 18.8209H23.6263L21.1641 16.3588Z"
//                   fill="white"
//                 />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </section>

//       <section className="bg-[#F9FCFF] py-16 px-8">
//         {/* Section Header */}
//         <h2 className="text-xl font-bold text-blue-900 uppercase text-center">
//           DOCTOR ENROLLMENT
//         </h2>
//         <h3 className="text-3xl font-bold text-blue-300 text-center mt-2">
//           PRICING PLANS
//         </h3>
//         <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
//           "Interdental Lab" together with "Make Me Smile" a subscription bases
//           limited extended warranty program for both patients and dentists with
//           quarterly and monthly maintenance fees. By being a participating
//           enrolled doctor in the program, you are entitled to reduced laboratory
//           fees for products crafted by participating labs. Please see below for
//           a description of our services.
//         </p>

//         {/* Plans Grid */}
//         <div className="mx-32 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {doctorPlans.map((plan) => (
//             <div
//               key={plan.id}
//               className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition">
//               {/* Plan Header */}
//               <div
//                 className={`text-center py-4 font-bold text-2xl rounded ${plan.bgColor}`}>
//                 {plan.title}
//               </div>

//               {/* Plan Content */}
//               <ul className="mt-4 text-gray-600 space-y-2">
//                 {plan.content.map((item, index) => (
//                   <li key={index} className="flex items-start space-x-2">
//                     <span className="text-blue-500 font-bold">•</span>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="bg-[#F9FCFF] py-16 px-8">
//         {/* Section Header */}
//         <h2 className="text-3xl font-bold text-blue-300 uppercase text-center">
//           DOCTOR PRICING PLAN
//         </h2>
//         <p className="mt-6 text-gray-600 text-center max-w-3xl mx-auto">
//           If you do not see what you want, don't worry{" "}
//           <a
//             href="#"
//             className="text-blue-900 font-bold underline hover:text-blue-600">
//             Contact Us
//           </a>{" "}
//           and we will create a personalized proposal that fits your business
//           needs.
//         </p>

//         {/* Plans Grid */}
//         <div className="mx-32 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           {pricingPlans.map((plan) => (
//             <div
//               key={plan.id}
//               className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between">
//               {/* Card Content */}
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
//                 <p className="mt-4 text-3xl font-extrabold text-blue-900">
//                   {plan.price}
//                 </p>
//                 <p className="mt-2 text-blue-300 font-bold">{plan.duration}</p>
//                 <p className="mt-2 text-gray-500">{plan.enrollmentFee}</p>
//                 <ul className="mt-4 text-gray-600 space-y-2 flex flex-col items-center">
//                   {plan.description.map((item, index) => (
//                     <li key={index} className="flex items-center space-x-2">
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Button */}
//               <button
//                 className={`mt-12 px-6 py-3 w-full border transition rounded-lg ${plan.buttonStyle}`}>
//                 Select
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//       {!isLanding && (
//         <>
//           <div className="flex flex-col md:flex-row items-center justify-center py-16 px-4 md:px-16 lg:px-24 bg-gray-50">
//             {/* Left Section: Image */}
//             <div className="relative w-full md:w-1/2 flex justify-center items-center">
//               <img
//                 src="/assets/landing-page/doctor-image-2.png"
//                 alt="Doctor"
//                 className="w-96 h-96 object-cover"
//               />
//             </div>

//             {/* Right Section: Form */}
//             <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-12">
//               <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center md:text-left">
//                 Doctor Registration
//               </h2>
//               <form className="space-y-4">
//                 <div className="flex space-x-4">
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Company Name"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="flex space-x-4">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="flex space-x-4">
//                   <input
//                     type="text"
//                     placeholder="City"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="ZIP"
//                     className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Doctor's License Number"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Office Reference Number"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="mt-4">
//                   <h3 className="text-lg font-semibold text-blue-900 mb-2">
//                     Service Type
//                   </h3>
//                   <div className="flex flex-wrap space-x-4">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="serviceType"
//                         value="Trial 3 Months"
//                         className="form-checkbox text-blue-900"
//                       />
//                       <span>Trial 3 Months</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="serviceType"
//                         value="$175 Basic Plan"
//                         className="form-checkbox text-blue-900"
//                       />
//                       <span>$175 Basic Plan</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="serviceType"
//                         value="$275 Basic Plan"
//                         className="form-checkbox text-blue-900"
//                       />
//                       <span>$275 Basic Plan</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="serviceType"
//                         value="$475 Basic Plan"
//                         className="form-checkbox text-blue-900"
//                       />
//                       <span>$475 Basic Plan</span>
//                     </label>
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// };

// export default Doctor;

const Doctor = ({ isLanding }) => {
  return (
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
          <h3 className="text-sm md:text-lg font-bold text-blue-900">
            DOCTOR
          </h3>
          <p className="mt-4 text-sm md:text-lg text-gray-600">
            Our team of experienced technicians uses the latest technology and
            highest quality materials to ensure the best results for your
            patients.
          </p>
          <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition transition-all duration-300 flex items-center group text-sm sm:text-base">
            <span className="mr-2 sm:mr-4">Register</span>
            <span className="w-8 h-8 bg-[#001d58] text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#001d58] transition-all duration-300">
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.970001"
                  y="0.63623"
                  width="37.7273"
                  height="37.7273"
                  rx="18.8636"
                  fill="#001D58"
                />
                <path
                  d="M21.1641 16.3588C20.899 16.0936 20.899 15.6637 21.1641 15.3986C21.4293 15.1334 21.8592 15.1334 22.1244 15.3986L25.7456 19.0198C26.0107 19.2849 26.0107 19.7148 25.7456 19.98L22.1244 23.6012C21.8592 23.8664 21.4293 23.8664 21.1641 23.6012C20.899 23.3361 20.899 22.9062 21.1641 22.641L23.6263 20.1789H14.8545C14.4795 20.1789 14.1755 19.8749 14.1755 19.4999C14.1755 19.1249 14.4795 18.8209 14.8545 18.8209H23.6263L21.1641 16.3588Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <h2 className="text-sm md:text-2xl font-bold text-blue-900 uppercase text-center">
          DOCTOR ENROLLMENT
        </h2>
        <h3 className="text-sm md:text-2xl font-bold text-blue-300 text-center mt-2">
          PRICING PLANS
        </h3>
        <p className="mt-4 text-sm md:text-lg text-gray-600 text-center max-w-md sm:max-w-lg md:max-w-2xl   mx-auto">
          "Interdental Lab" together with "Make Me Smile" a subscription bases
          limited extended warranty program for both patients and dentists with
          quarterly and monthly maintenance fees. By being a participating
          enrolled doctor in the program, you are entitled to reduced laboratory
          fees for products crafted by participating labs. Please see below for
          a description of our services.
        </p>

        {/* Plans Grid */}
        <div className="mx-auto mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl">
          {doctorPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition"
            >
              {/* Plan Header */}
              <div
                className={`text-center py-3 sm:py-4 font-bold text-sm md:text-lg rounded ${plan.bgColor}`}
              >
                {plan.title}
              </div>

              {/* Plan Content */}
              <ul className="mt-4 text-gray-600 space-y-2 text-sm md:text-lg">
                {plan.content.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F9FCFF] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <h2 className="text-sm md:text-lg font-bold text-blue-300 uppercase text-center">
          DOCTOR PRICING PLAN
        </h2>
        <p className="mt-4 sm:mt-6 text-sm md:text-base text-gray-600 text-center max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
          If you do not see what you want, don't worry{" "}
          <a
            href="#"
            className="text-blue-900 font-bold underline hover:text-blue-600"
          >
            Contact Us
          </a>{" "}
          and we will create a personalized proposal that fits your business
          needs.
        </p>

        {/* Plans Grid */}
        <div className="mx-auto mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl text-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Card Content */}
              <div>
                <h3 className="text-sm md:text-xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm md:text-xl font-extrabold text-blue-900">
                  {plan.price}
                </p>
                <p className="mt-2 text-sm sm:text-xl font-bold text-blue-300">
                  {plan.duration}
                </p>
                <p className="mt-2 text-sm sm:text-sm text-gray-500">
                  {plan.enrollmentFee}
                </p>
                <ul className="mt-4 text-gray-600 space-y-2 flex flex-col items-center text-sm sm:text-sm">
                  {plan.description.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                className={`mt-8 sm:mt-12 px-4 sm:px-6 py-2 sm:py-3 w-full border transition rounded-lg ${plan.buttonStyle} text-sm sm:text-base`}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </section>
      {!isLanding && (
        <>
          <div className="flex flex-col md:flex-row items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center">
              <img
                src="/assets/landing-page/doctor-image-2.png"
                alt="Doctor"
                className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[384px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[384px] object-cover"
              />
            </div>

            {/* Right Section: Form */}
            <div className="w-full md:w-1/2 mt-6 sm:mt-8 md:mt-0 md:ml-8 lg:ml-12">
              <h2 className="text-sm md:text-lg font-bold text-blue-900 mb-4 sm:mb-6 text-center md:text-left">
                Doctor Registration
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                />
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="w-full sm:w-1/2 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Doctor's License Number"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-sm"
                />
                <input
                  type="text"
                  placeholder="Office Reference Number"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-sm"
                />
                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                    Service Type
                  </h3>
                  <div className="flex flex-wrap space-x-2 sm:space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="serviceType"
                        value="Trial 3 Months"
                        className="form-checkbox text-blue-900"
                      />
                      <span className="text-sm md:text-base">
                        Trial 3 Months
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="serviceType"
                        value="$175 Basic Plan"
                        className="form-checkbox text-blue-900"
                      />
                      <span className="text-sm md:text-base">
                        $175 Basic Plan
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="serviceType"
                        value="$275 Basic Plan"
                        className="form-checkbox text-blue-900"
                      />
                      <span className="text-sm md:text-base">
                        $275 Basic Plan
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="serviceType"
                        value="$475 Basic Plan"
                        className="form-checkbox text-blue-900"
                      />
                      <span className="text-sm md:text-base">
                        $475 Basic Plan
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Doctor;
