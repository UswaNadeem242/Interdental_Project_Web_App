import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../../config";
import Toast from "../../components/Toast";
import YearlyPlanModel from "../../modals/yearly-plan";
import Icons from "../../components/Icons";
import * as Yup from "yup";
import useFieldValidation from "../../Hooks/useFieldValidation";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [drLicenseNo, setdrLicense] = useState("");
  const [officeRefNo, setofficeRefNo] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [yearly, setYearly] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(25, "First name must not exceed 25 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "First name must contain only letters and spaces",
      )
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(25, "Last name must not exceed 25 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Last name must contain only letters and spaces",
      )
      .required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
      .required("Phone number is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .max(25, "City must not exceed 25 characters")
      .matches(/^[a-zA-Z\s]+$/, "City must contain only letters and spaces")
      .required("City is required"),
    zip: Yup.string()
      .matches(/^\d{5,9}$/, "ZIP code must be 5-9 digits")
      .required("Zip code is required"),
    drLicenseNo: Yup.string()
      .required("Doctor's License Number is required")
      .min(5, "Must be at least 5 characters")
      .max(15, "Must not exceed 15 characters")
      .matches(/^[A-Z]+-[0-9]+$/, "Format: LETTERS-hyphen-numbers (e.g., PMC-12345)"),
    officeRefNo: Yup.string()
      .required("Office Reference Number is required")
      .min(6, "Must be at least 6 characters")
      .max(15, "Must not exceed 15 characters")
      .matches(/^[A-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores allowed")
      .test(
        "different-from-license",
        "Cannot be same as License Number",
        function (value) {
          const licenseValue = this.parent.drLicenseNo;
          if (!value || !licenseValue) return true;
          return value !== licenseValue;
        },
      ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",<.>\/?\\|`~]).{8,}$/,
        "Must contain uppercase, lowercase, number, and special character"
      )
      .test(
        "special-char-limit",
        "Maximum 8 special characters allowed",
        function (value) {
          if (!value) return true;
          const specialCharCount = (value.match(/[!@#$%^&*()\-_=+\[\]{};:'",<.>\/?\\|`~]/g) || []).length;
          return specialCharCount <= 8;
        }
      )
      .required("Password is required"),
  });

  const {
    validationErrors,
    validateField,
    clearFieldError,
    validateAllFields,
  } = useFieldValidation(validationSchema);

  const getFormData = () => ({
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    zip,
    drLicenseNo,
    officeRefNo,
    password,
  });

  const handleFieldChange = async (fieldName, value, setter) => {
    setter(value);

    // Clear error immediately when user starts typing
    if (validationErrors[fieldName]) {
      clearFieldError(fieldName);
    }
  };

  const handleFieldBlur = async (fieldName, value) => {
    // Validate field when user leaves it
    if (value.trim()) {
      await validateField(fieldName, value, getFormData());
    }
  };

  const handleSignup = async () => {
    const error = await validateAllFields(getFormData());
    if (error) {
      return; // Field-level errors are shown instead of toast
    }

    const payload = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      city,
      zip,
      drLicenseNo,
      officeRefNo,
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
                  value={firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value, setFirstName)
                  }
                  onBlur={(e) => handleFieldBlur("firstName", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.firstName
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
                {validationErrors.firstName && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.firstName}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value, setLastName)
                  }
                  onBlur={(e) => handleFieldBlur("lastName", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.lastName
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
                {validationErrors.lastName && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) =>
                    handleFieldChange("email", e.target.value, setEmail)
                  }
                  onBlur={(e) => handleFieldBlur("email", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.email
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
                {validationErrors.email && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.email}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) =>
                    handleFieldChange("phoneNumber", e.target.value, setPhone)
                  }
                  onBlur={(e) => handleFieldBlur("phoneNumber", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.phoneNumber
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
                {validationErrors.phoneNumber && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.phoneNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="relative w-full">
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) =>
                  handleFieldChange("address", e.target.value, setAddress)
                }
                onBlur={(e) => handleFieldBlur("address", e.target.value)}
                placeholder=" "
                className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.address
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
              {validationErrors.address && (
                <div className="text-red-600 text-xs mt-1">
                  {validationErrors.address}
                </div>
              )}
            </div>

            {/* City + Zip */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) =>
                    handleFieldChange("city", e.target.value, setCity)
                  }
                  onBlur={(e) => handleFieldBlur("city", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.city
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
                {validationErrors.city && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.city}
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) =>
                    handleFieldChange("zip", e.target.value, setZip)
                  }
                  onBlur={(e) => handleFieldBlur("zip", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.zip
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
                {validationErrors.zip && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.zip}
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
                  value={drLicenseNo}
                  onChange={(e) =>
                    handleFieldChange(
                      "drLicenseNo",
                      e.target.value.toUpperCase(),
                      setdrLicense,
                    )
                  }
                  onBlur={(e) => handleFieldBlur("drLicenseNo", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.drLicenseNo
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
                {validationErrors.drLicenseNo && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.drLicenseNo}
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="officeRefNo"
                  value={officeRefNo}
                  onChange={(e) =>
                    handleFieldChange(
                      "officeRefNo",
                      e.target.value.toUpperCase(),
                      setofficeRefNo,
                    )
                  }
                  onBlur={(e) => handleFieldBlur("officeRefNo", e.target.value)}
                  placeholder=" "
                  className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${validationErrors.officeRefNo
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
                {validationErrors.officeRefNo && (
                  <div className="text-red-600 text-xs mt-1">
                    {validationErrors.officeRefNo}
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) =>
                  handleFieldChange("password", e.target.value, setPassword)
                }
                onBlur={(e) => handleFieldBlur("password", e.target.value)}
                placeholder=" "
                className={`peer w-full rounded-md py-3 px-4 pr-12 text-textFieldHeading outline-none border ${validationErrors.password
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
              {validationErrors.password && (
                <div className="text-red-600 text-xs mt-1">
                  {validationErrors.password}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4  items-center flex flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 lg:gap-[32px]">
          <button
            onClick={() => handleSignup()}
            className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px]"
          >
            Sign Up
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
