import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
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
import { BASE_URL } from "../../config";
import { showToast } from "../../store/toast-slice";

const Contact = ({ isLanding }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const socialIcons = [
    { id: 1, icon: <Twitter className="w-5 h-5 text-black" /> },
    { id: 2, icon: <FacebookIcon className="w-5 h-5 text-black" /> },
    { id: 3, icon: <Instgram className="w-5 h-5 text-black" /> },
    { id: 4, icon: <Linkedln className="w-5 h-5 text-black" /> },
  ];

  const isContactPage = location.pathname === "/contact-us";

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if all fields are filled and valid
  const isFormValid = useMemo(() => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      isValidEmail(formData.email) &&
      formData.description.trim() !== ""
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate Message
    if (!formData.description.trim()) {
      newErrors.description = "Message is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      dispatch(
        showToast({
          message: "Please fill in all required fields correctly",
          type: "error",
        }),
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(
          showToast({
            message: "Message sent successfully! We'll get back to you soon.",
            type: "success",
          }),
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
        });
        setErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        dispatch(
          showToast({
            message:
              errorData.message ||
              "Failed to send message. Please try again later.",
            type: "error",
          }),
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          message:
            "Network error occurred. Please check your connection and try again.",
          type: "error",
        }),
      );
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
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={`border ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-secondaryBrand/50 focus:border-secondaryBrand"
                      } p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all`}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-xs mt-1 font-poppins">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className={`border ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-secondaryBrand/50 focus:border-secondaryBrand"
                      } p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all`}
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-xs mt-1 font-poppins">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-Mail Address"
                    className={`w-full border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-secondaryBrand/50 focus:border-secondaryBrand"
                    } p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins transition-all`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 font-poppins">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="5"
                    className={`w-full border ${
                      errors.description
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-secondaryBrand/50 focus:border-secondaryBrand"
                    } p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 outline-none placeholder:text-sm md:placeholder:text-base placeholder:font-poppins placeholder:text-gray-400 font-poppins resize-none transition-all`}
                  ></textarea>
                  {errors.description && (
                    <span className="text-red-500 text-xs mt-1 font-poppins">
                      {errors.description}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`w-full sm:w-auto mt-4 px-8 py-3 md:py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 font-poppins capitalize shadow-md ${
                    loading || !isFormValid
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "bg-secondaryBrand hover:bg-secondaryBrand/90 hover:shadow-lg"
                  } text-white`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send
                      <PaperAirplaneIcon className="w-5 h-5 stroke-white stroke-2" />
                    </>
                  )}
                </button>

                {!isFormValid && (
                  <p className="text-xs text-gray-500 font-poppins mt-2">
                    Please fill in all fields to enable the submit button
                  </p>
                )}
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
