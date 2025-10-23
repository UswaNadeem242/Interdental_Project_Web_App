import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../../config";
import Toast from "../../components/Toast";
import YearlyPlanModel from "../../modals/yearly-plan";
import Icons from "../../components/Icons";
import { doctorSignupValidationSchema } from "../../services/utils/validationSchemas";
import { useFormik } from "formik";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [yearly, setYearly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Formik setup with real-time validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      zip: "",
      drLicenseNo: "",
      officeRefNo: "",
      password: "",
    },
    validationSchema: doctorSignupValidationSchema,
    validateOnChange: true, // Real-time validation as user types
    validateOnBlur: true,   // Validate when user leaves field
    onSubmit: async (values) => {
      await handleSignup(values);
    },
  });

  const handleSignup = async (values) => {
    setIsSubmitting(true);
    const payload = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      city: values.city,
      zip: values.zip,
      drLicenseNo: values.drLicenseNo,
      officeRefNo: values.officeRefNo,
      role: "DOCTOR",
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/sign-up`,
        payload,
        {
          headers: {
            Accept: "*/*",
          },
        },
      );
      setToastMessage("User Registered Successfully!");
      setToastType("success");
      setToastVisible(true);

      const { data } = response;

      // Add delay before navigation to ensure toast is visible
      setTimeout(() => {
        navigate(`/login?role=${data.roles[0]?.name?.toLowerCase()}`);
      }, 2000);
    } catch (error) {
      console.log("Signup error:", error);
      setToastMessage(
        `Error: ${error.response?.data?.responseDesc || error.responseDesc}`,
      );
      setToastType("error");
      setToastVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto  gap-6 lg:gap-[32px]">
        <div className="flex flex-col justify-center items-center w-full lg:w-[494px] gap-8">
          {/* Form */}
          <div className="w-full space-y-4">
            {/* Full width */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.firstName && formik.touched.firstName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
       peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  First Name
                </label>
                {formik.errors.firstName && formik.touched.firstName && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.lastName && formik.touched.lastName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Last Name
                </label>
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Email
                </label>
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.phoneNumber && formik.touched.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Phone
                </label>
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="relative w-full">
              <input
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.address && formik.touched.address
                  ? "border-red-500"
                  : "border-gray-300 focus:border-secondaryBrand"
                  }`}
              />
              <label
                htmlFor="address"
                className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
              >
                Address
              </label>
              {formik.errors.address && formik.touched.address && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.address}
                </div>
              )}
            </div>

            {/* City + Zip */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.city && formik.touched.city
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="city"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  City
                </label>
                {formik.errors.city && formik.touched.city && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.city}
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.zip && formik.touched.zip
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="zip"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Zip
                </label>
                {formik.errors.zip && formik.touched.zip && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.zip}
                  </div>
                )}
              </div>
            </div>

            {/* License + Office Ref */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="drLicenseNo"
                  name="drLicenseNo"
                  value={formik.values.drLicenseNo}
                  onChange={(e) => {
                    formik.setFieldValue("drLicenseNo", e.target.value.toUpperCase());
                  }}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.drLicenseNo && formik.touched.drLicenseNo
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="drLicenseNo"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Doctor's License Number
                </label>
                {formik.errors.drLicenseNo && formik.touched.drLicenseNo && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.drLicenseNo}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="officeRefNo"
                  name="officeRefNo"
                  value={formik.values.officeRefNo}
                  onChange={(e) => {
                    formik.setFieldValue("officeRefNo", e.target.value.toUpperCase());
                  }}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${formik.errors.officeRefNo && formik.touched.officeRefNo
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="officeRefNo"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Office Reference Number
                </label>
                {formik.errors.officeRefNo && formik.touched.officeRefNo && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.officeRefNo}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 pr-12 text-textFieldHeading outline-none border ${formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-secondaryBrand"
                    }`}
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-3 text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                >
                  Password
                </label>

                {/* Eye Icon */}
                <div
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Icons.Eye.Open /> : <Icons.Eye.Closed />}
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4  items-center flex flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 lg:gap-[32px]">
          <button
            type="button"
            onClick={() => formik.handleSubmit()}
            disabled={isSubmitting}
            className={`w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px] transition-all duration-200 ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondaryBrand hover:bg-blue-800"
              }`}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="flex flex-col justify-center items-center w-full h-auto lg:h-[93px] space-y-4 lg:space-y-[16px]">
            <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#808080]">
              Already have an account
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] font-poppins font-semibold border-[1px] border-[#013764] text-secondaryBrand text-sm lg:text-[14px] leading-[21px]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Modal and Toast components */}
      {isModalOpen && (
        <AccountDeactivate
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
      {yearly && <YearlyPlanModel yearly={yearly} setYearly={setYearly} />}
    </div>
  );
};

export default DoctorSignup;
