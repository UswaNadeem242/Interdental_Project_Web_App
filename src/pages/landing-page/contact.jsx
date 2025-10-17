import { useState } from "react";
import Header from "./header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Twitter from "../../icon/twitter";
import FacebookIcon from "../../icon/facebookIcon";
import Instgram from "../../icon/instgram";
import Linkedln from "../../icon/linkedln";

const Contact = ({ isLanding }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const socialIcons = [
    { id: 1, icon: <Twitter className="w-5 h-5 text-black" /> },
    { id: 2, icon: <FacebookIcon className="w-5 h-5 text-black" /> },
    { id: 3, icon: <Instgram className="w-5 h-5 text-black" /> },
    { id: 4, icon: <Linkedln className="w-5 h-5 text-black" /> },
  ];

  const isContactPage = location.pathname === "/contact-us";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:8080/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer dDBlL3U1UFJCVEZRaVNLbWVyM2pTci9welBYUUJZQzVJbmVZU2dsS0ZPd3lnbGpLU3ZlMUxHREdZSG42eXluOEpLMnV1OWtZajcvbzZjSmxMRjB4MHcvUzZYUDJyZnBYQVMzTFczNTRhYTNpWnpybnp6eFRMTkdZK0tadWVHK3p4d1R6ZUJwWGppdzFEdTU3ckdpUFA1TzR2VlJlc1RkZm1vTVFuWDVWMzUzb2tDNnV5ZjBSRmdyb0RMVFlLckhzSGtGMFkyVXZDVW15UWlZclJoL1N6eEpnTWtsTGJUY24zRGhhRnhtYyswZHlsL2diZTNwOHhkdkJhcE84YktXSDlndzcxRlNmV285QjBoWm80aGJhM1E9PX50cnVl",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Message sent successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
        });
      } else {
        setMessage({
          type: "error",
          text: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={isContactPage ? "pb-0 md:pb-20" : "pb-0 md:pb-0"}>
        {!isLanding && <Header />}
      </div>
      <div className={isContactPage ? "mx-4 md:mx-8" : ""}>
        <section
          className={`bg-white px-4 md:px-8 shadow-lg border rounded-xl w-full max-w-7xl mx-auto container py-8 md:py-16 ${
            isContactPage ? "" : ""
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Details */}
            <div className="p-2 md:p-4 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-extrabold text-black mb-4 font-poppins tracking-wide">
                CONTACT US
              </h3>
              <p className="text-[#87909D] text-sm md:text-base mb-8 font-poppins leading-relaxed">
                Contact us by email, phone, or simply drop your message here.
                Let us know if you have any questions.
              </p>

              <div className="space-y-4 md:space-y-5">
                {/* Phone Section - Static Display */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 md:py-4 shadow-sm">
                  <div className="p-3 bg-secondaryBrand rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 text-white stroke-white stroke-2" />
                  </div>
                  <span className="ml-4 text-[#4A5568] text-sm md:text-base font-poppins font-medium">
                    +92 345 346 543
                  </span>
                </div>

                {/* Email Section - Static Display */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 md:py-4 shadow-sm">
                  <div className="p-3 bg-secondaryBrand rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <EnvelopeIcon className="w-5 h-5 stroke-white stroke-2" />
                  </div>
                  <span className="ml-4 text-[#4A5568] text-sm md:text-base font-poppins font-medium">
                    eventfulcae@gmail.com
                  </span>
                </div>

                {/* Social Media */}
                <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
                  {socialIcons.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer"
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-2 md:p-4 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="border border-gray-300 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryBrand/50 focus:border-secondaryBrand outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="border border-gray-300 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryBrand/50 focus:border-secondaryBrand outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-Mail Address"
                  required
                  className="w-full border border-gray-300 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryBrand/50 focus:border-secondaryBrand outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="5"
                  required
                  className="w-full border border-gray-300 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryBrand/50 focus:border-secondaryBrand outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins resize-none transition-all"
                ></textarea>

                {message.text && (
                  <div
                    className={`p-3 rounded-lg text-sm font-poppins ${
                      message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto mt-4 bg-secondaryBrand text-white px-8 py-3 md:py-3.5 rounded-lg hover:bg-secondaryBrand/90 transition-all flex items-center justify-center gap-2 font-poppins capitalize disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? "Sending..." : "Send"}
                  <PaperAirplaneIcon className="w-5 h-5 stroke-white stroke-2" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {isContactPage ? <Footer /> : null}
    </>
  );
};

export default Contact;
