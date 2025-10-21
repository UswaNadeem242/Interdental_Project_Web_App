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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

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

  // Validate alphabets only for names
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  // Check if all fields are filled and valid
  const isFormValid = useMemo(() => {
    return (
      formData.firstName.trim() !== "" &&
      formData.firstName.trim().length >= 2 &&
      formData.firstName.trim().length <= 25 &&
      isValidName(formData.firstName.trim()) &&
      formData.lastName.trim() !== "" &&
      formData.lastName.trim().length >= 2 &&
      formData.lastName.trim().length <= 25 &&
      isValidName(formData.lastName.trim()) &&
      formData.email.trim() !== "" &&
      isValidEmail(formData.email) &&
      formData.description.trim() !== "" &&
      formData.description.trim().length >= 10 &&
      formData.description.trim().length <= 500
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
    } else if (formData.firstName.trim().length > 25) {
      newErrors.firstName = "First name must not exceed 25 characters";
    } else if (!isValidName(formData.firstName.trim())) {
      newErrors.firstName = "First name can only contain letters and spaces";
    }

    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (formData.lastName.trim().length > 25) {
      newErrors.lastName = "Last name must not exceed 25 characters";
    } else if (!isValidName(formData.lastName.trim())) {
      newErrors.lastName = "Last name can only contain letters and spaces";
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
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "Message must not exceed 500 characters";
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
        // Store submitted data for confirmation screen
        setSubmittedData({ ...formData });
        // Show confirmation screen
        setShowConfirmation(true);
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

  const handleBackToHome = () => {
    setShowConfirmation(false);
    setSubmittedData({});
    if (isContactPage) {
      window.location.href = "/";
    }
  };

  const handleSubmitAnother = () => {
    setShowConfirmation(false);
    setSubmittedData({});
  };

  // Confirmation Modal Component
  const ConfirmationModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowConfirmation(false);
        }
      }}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={() => setShowConfirmation(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Message Sent Successfully!
          </h2>
          
          {/* Support Team Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2 font-poppins">
                  What's Next?
                </h3>
                <p className="text-blue-800 font-poppins leading-relaxed">
                  Our support team has received your message and will get back to you within 24–48 hours through your registered email address ({submittedData.email}). Please make sure to check your inbox and spam folder for our reply.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-secondaryBrand text-white rounded-lg hover:bg-secondaryBrand/90 transition-colors font-poppins font-medium"
            >
              Back to Home
            </button>
            <button
              onClick={handleSubmitAnother}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-poppins font-medium"
            >
              Submit Another Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name Field with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder=" "
                      maxLength={25}
                      className={`peer w-full rounded-lg py-3 px-4 text-textFieldHeading outline-none border ${
                        errors.firstName
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-secondaryBrand"
                      } focus:ring-2 focus:ring-secondaryBrand/20 transition-all`}
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                    >
                      First Name
                    </label>
                    {errors.firstName && (
                      <span className="text-red-500 text-xs mt-1 font-poppins block">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  {/* Last Name Field with Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder=" "
                      maxLength={25}
                      className={`peer w-full rounded-lg py-3 px-4 text-textFieldHeading outline-none border ${
                        errors.lastName
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-secondaryBrand"
                      } focus:ring-2 focus:ring-secondaryBrand/20 transition-all`}
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
                        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                    >
                      Last Name
                    </label>
                    {errors.lastName && (
                      <span className="text-red-500 text-xs mt-1 font-poppins block">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Field with Floating Label */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full rounded-lg py-3 px-4 text-textFieldHeading outline-none border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-secondaryBrand"
                    } focus:ring-2 focus:ring-secondaryBrand/20 transition-all`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
                      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
                      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                  >
                    E-Mail Address
                  </label>
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 font-poppins block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Field with Floating Label */}
                <div className="relative">
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder=" "
                    rows="5"
                    maxLength={500}
                    className={`peer w-full rounded-lg py-3 px-4 text-textFieldHeading outline-none border ${
                      errors.description
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-secondaryBrand"
                    } focus:ring-2 focus:ring-secondaryBrand/20 transition-all resize-none`}
                  ></textarea>
                  <label
                    htmlFor="description"
                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
                      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
                      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                  >
                    Message
                  </label>
                  {errors.description && (
                    <span className="text-red-500 text-xs mt-1 font-poppins block">
                      {errors.description}
                    </span>
                  )}
                  {/* Character count */}
                  <div className="text-right text-xs text-gray-400 mt-1 font-poppins">
                    {formData.description.length}/500 characters
                  </div>
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
                      Send Message
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
      
      {/* Confirmation Modal */}
      {showConfirmation && <ConfirmationModal />}
    </>
  );
};

export default Contact;
