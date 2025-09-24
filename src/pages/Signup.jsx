import React, { useState } from "react";
// import loginrectangle from "../assets/loginrectangle.png";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";
import MaterialDropdown from "../components/doctorAdmin/CommonLabel/selectInputLabel";

const Signup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [license, setLicense] = useState("");
  const [officeRef, setOfficeRef] = useState("");

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [selectedValue, setSelectedValue] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !phone || !cPassword) {
      setToastMessage("Please fill all the fields !");
      setToastType("error");
      setToastVisible(true);
      return;
    }
    if (password != cPassword) {
      setToastMessage("Passwords are not same !");
      setToastType("error");
      setToastVisible(true);
      return;
    }
    if (!firstName || !lastName || !email || !password || !phone || !cPassword) {
      setToastMessage("Please fill in all the fields!");
      setToastType("error");
      setToastVisible(true);
      return;
    }

    // Validate First Name & Last Name (only letters, min 2 chars)
    const nameRegex = /^[A-Za-z]{2,}$/;
    if (!nameRegex.test(firstName)) {
      setToastMessage("Enter a valid First Name (letters only)");
      setToastType("error");
      setToastVisible(true);
      return;
    }
    if (!nameRegex.test(lastName)) {
      setToastMessage("Enter a valid Last Name (letters only)");
      setToastType("error");
      setToastVisible(true);
      return;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage("Enter a valid Email Address");
      setToastType("error");
      setToastVisible(true);
      return;
    }

    // Validate Password Strength (min 8 chars, at least one letter & one number)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setToastMessage(
        "Password must be at least 8 characters long and include letters & numbers"
      );
      setToastType("error");
      setToastVisible(true);
      return;
    }

    // Confirm Password
    if (password !== cPassword) {
      setToastMessage("Passwords do not match!");
      setToastType("error");
      setToastVisible(true);
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/sign-up?email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      setToastMessage("User Registered Successfully !");
      setToastType("success");
      setToastVisible(true);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setToastMessage(`Error: ${error}`);
      setToastType("success");
      setToastVisible(true);
    }
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start items-center gap-6 lg:gap-24 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] min-h-screen">
      {/* Image section - hidden on mobile */}
      <div className="hidden lg:flex flex-col items-start justify-start -space-y-12">
        <img src="/assets/logo.png" alt="logo" />
        <img
          className="w-[777px] h-[874px] rounded-[124px]"
          src="/assets/loginrectangle.png"
          alt="login rectangle image"
        />
        <svg
          width="157"
          height="141"
          viewBox="0 0 157 141"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex w-full justify-end pl-[620px]"
        >
          {/* SVG content remains the same */}
        </svg>
      </div>

      {/* Signup form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[581px] gap-6 lg:gap-[32px]">
        <img src="/assets/logo.png" alt="logo" className="block lg:hidden" />
        <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[103px] gap-4 lg:gap-[32px]">
          <h1 className="font-poppins font-bold text-3xl lg:text-[44px] leading-[66px] text-secondaryBrand">
            Sign Up
          </h1>
          <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#949494] text-center">
            Sign up to unlock all features and benefits.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-[494px] gap-8">


          {/* Form */}
          <div className="w-full space-y-4">
            {/* Full width */}
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 py-3 px-4 text-textFieldHeading"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            {/* Email + Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 py-3 outline-none  px-4 text-textFieldHeading"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 py-3  outline-none px-4 text-textFieldHeading"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Address */}
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 py-3  outline-none px-4 text-textFieldHeading"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* City + Zip */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full rounded-md border  py-3  outline-none px-4 text-textFieldHeading"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                className="w-full rounded-md border  py-3 outline-none  px-4 text-textFieldHeading"
                placeholder="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>

            {/* License + Office Ref */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full rounded-md border  py-3 outline-none  px-4 text-textFieldHeading"
                placeholder="Doctor's License Number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
              <input
                type="text"
                className="w-full rounded-md border  py-3  outline-none px-4 text-textFieldHeading"
                placeholder="Office Reference Number"
                value={officeRef}
                onChange={(e) => setOfficeRef(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border  py-3 outline-none  px-4 text-textFieldHeading"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Eye icon same as before */}
                {showPassword ? (<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                ) : (
                  // Eye Closed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#808080"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7" />
                    <path d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7" />
                    <path d="M1 1l22 22" /> {/* diagonal line crossing the eye */}
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}

              </div>
            </div>

            {/* Dropdown */}
            <MaterialDropdown
              options={[
                { label: "Dental Lab", value: "1" },
                { label: "Dentist", value: "2" },
              ]}
              value={selectedValue}
              onChange={(val) => setSelectedValue(val)}
              label="Select Laboratory"
              className="w-full bg-white border   px-4 py-3 rounded-md text-textFieldHeading"
            />
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
    </div>
  );
};

export default Signup;
