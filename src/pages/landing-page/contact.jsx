import Header from "./header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Instgram from "../../icon/instgram";
import Birbble from "../../icon/birbble";
import Twitter from "../../icon/twitter";
import Youtube from "../../icon/youtube";
import FacebookIcon from "../../icon/facebookIcon";
import Linkedln from "../../icon/linkedln";

const Contact = ({ isLanding }) => {
  const location = useLocation();
  const socialIcons = [
    { id: 1, icon: <Twitter className="w-5 h-5 text-black" /> },
    { id: 2, icon: <FacebookIcon className="w-5 h-5 text-black" /> },
    { id: 3, icon: <Instgram className="w-5 h-5 text-black" /> },
    { id: 4, icon: <Linkedln className="w-5 h-5 text-black" /> },
  ];
  const isContactPage = location.pathname === "/contact";
  return (
    <>
      {/* <div className='md:pb-20 pb-0'>{!isLanding && <Header />} </div> */}
      <div className={isContactPage ? "pb-0 md:pb-20" : "pb-0 md:pb-0"}>
        {!isLanding && <Header />}
      </div>
      <section
        className={`bg-white px-4 md:px-8 shadow-lg rounded-xl w-full max-w-7xl mx-auto  py-8 md:py-16
        ${isContactPage ? " my-6 md:my-20" : "py-0 my-28"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact Details */}
          <div className="p-6 md:p-8 rounded-lg">
            <h3 className="text-2xl font-extrabold text-black mb-4 font-poppins">CONTACT US</h3>
            <p className="text-[#87909D] text-sm mb-6 font-poppins">
              Contact us by email, phone, or simply drop your message here. Let us know if you have any questions.
            </p>

            <div className="space-y-4">
              {/* Phone Section */}
              <div className="flex items-center bg-gray-100 rounded-full p-3 md:p-4 shadow-md">
                <div className=" p-3  bg-secondaryBrand rounded-full flex items-center justify-center shadow-lg">
                  {/* Phone SVG */}
                  <PhoneIcon className="w-5 h-5 text-white stroke-white" />
                </div>
                <input
                  type="number"
                  placeholder="+92 345 346 543"
                  className="ml-3 md:ml-4 h-10 w-full text-textFieldHeading placeholder-gray-500 bg-gray-100 border-none focus:outline-none placeholder:text-sm"
                />
              </div>

              {/* Email Section */}
              <div className="flex items-center bg-gray-100 rounded-full p-3 md:p-4 shadow-md">
                <div className="p-3  bg-secondaryBrand rounded-full flex items-center justify-center shadow-lg">
                  {/* Email SVG */}
                  <EnvelopeIcon className="w-5 h-5 stroke-white" />
                </div>
                <input
                  type="email"
                  placeholder="eventfulcae@gmail.com"
                  className="ml-3 md:ml-4 h-10 w-full text-textFieldHeading placeholder-gray-500 bg-gray-100 border-none focus:outline-none placeholder:text-sm"
                />
              </div>

              {/* Social Media */}
              <div className="flex flex-wrap gap-3 mt-2">
                {socialIcons.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background w-10 h-10 rounded-full shadow-2xl flex items-center justify-center"
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg ">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none outline-none placeholder:text-sm placeholder:font-poppins"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none outline-none placeholder:text-sm placeholder:font-poppins"
                />
              </div>

              <input
                type="email"
                placeholder="E-Mail Address"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none outline-none placeholder:text-sm placeholder:font-poppins"
              />

              <textarea
                placeholder="Message"
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none outline-none placeholder:text-sm placeholder:font-poppins"
              ></textarea>

              <button
                type="submit"
                className="w-full md:w-auto mt-4 bg-secondaryBrand text-white px-6 py-3 rounded-lg   transition flex items-center justify-center gap-2 font-poppins  capitalize"
              >
                Send  <PaperAirplaneIcon className="w-5 h-5  stroke-white" />
                {/* Send SVG */}
              </button>
            </form>
          </div>

        </div>
      </section>

      {isContactPage ? <Footer /> : null}

    </>
  );
};

export default Contact;
