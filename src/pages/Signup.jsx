import React, { useState } from "react";
// import loginrectangle from "../assets/loginrectangle.png";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";

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

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !cPassword) {
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
    if (!firstName || !lastName || !email || !password || !cPassword) {
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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
      console.log("response", response);
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

        <div className="px-3 flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[252px] gap-4 lg:gap-[16px]">
          {/* Name fields - stack vertically on mobile */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4 lg:gap-0 h-auto lg:h-[51px]">
            <input
              type="text"
              className="w-full lg:w-[239px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="w-full lg:w-[239px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            className="w-full lg:w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full lg:w-[494px]">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full lg:w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Password visibility toggle icon */}
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                // Eye Open
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

          <div className="relative w-full lg:w-[494px]">
            <input
              type={showCPassword ? "text" : "password"}
              className="w-full lg:w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
              placeholder="Confirm Password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCPassword(!showCPassword)} // ✅ fix here
            >  {showCPassword ? (
              // Eye Open
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
            )}</div>
            {/* Confirm password visibility toggle icon */}

          </div>
        </div>

        <div className="px-4 flex flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 lg:gap-[32px]">
          <button
            onClick={() => handleSignup()}
            className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px]"
          >
            Sign Up
          </button>

          {/* Social login buttons - stack vertically on mobile */}
          <div className="flex flex-row justify-center items-center w-full gap-4 lg:gap-[16px] h-auto lg:h-[56px]">
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center items-center cursor-pointer">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_13834_3306)">
                  <path
                    d="M24.2663 12.2764C24.2663 11.4606 24.2001 10.6405 24.059 9.83801H12.7402V14.459H19.222C18.953 15.9493 18.0888 17.2677 16.8233 18.1055V21.1039H20.6903C22.9611 19.0138 24.2663 15.9273 24.2663 12.2764Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.7401 24.0008C15.9766 24.0008 18.7059 22.9382 20.6945 21.1039L16.8276 18.1055C15.7517 18.8375 14.3627 19.252 12.7445 19.252C9.61388 19.252 6.95946 17.1399 6.00705 14.3003H2.0166V17.3912C4.05371 21.4434 8.2029 24.0008 12.7401 24.0008Z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.00277 14.3003C5.50011 12.81 5.50011 11.1962 6.00277 9.70581V6.61487H2.01674C0.314734 10.0056 0.314734 14.0005 2.01674 17.3913L6.00277 14.3003Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M12.7401 4.74966C14.4509 4.7232 16.1044 5.36697 17.3434 6.54867L20.7695 3.12262C18.6001 1.0855 15.7208 -0.034466 12.7401 0.000808666C8.2029 0.000808666 4.05371 2.55822 2.0166 6.61481L6.00264 9.70575C6.95064 6.86173 9.60947 4.74966 12.7401 4.74966Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13834_3306">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <h1 className="hidden lg:block">Login with Google</h1>
            </div>
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center items-center cursor-pointer">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.5 8.25H14V5.25C14 4.85218 14.158 4.47064 14.4393 4.18934C14.7206 3.90804 15.1022 3.75 15.5 3.75H17V0H14C12.8065 0 11.6619 0.474106 10.818 1.31802C9.97411 2.16193 9.5 3.30653 9.5 4.5V8.25H6.5V12H9.5V24H14V12H17L18.5 8.25Z"
                  fill="#1976D2"
                />
              </svg>
              <h1 className="hidden lg:block">Log in with Facebook</h1>
            </div>
          </div>

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
