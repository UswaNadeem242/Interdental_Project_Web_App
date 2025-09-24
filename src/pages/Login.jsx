import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import AccountDeactivate from "../modals/AccountDeactivateModal";
import GoogleIcon from "../icon/google";
import FacebookIcon from "../icon/facebookIcon";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/sign-in`,
        {
          email: email,
          password: password,
          fcmToken: "",
          gmailToken: "",
          facebookToken: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      setLoading(false);
      if (
        response.data.responseCode === "003" ||
        response.data.responseMessage === "User is not active"
      ) {
        setIsModalOpen(true);
      }
      login(response.data.data.users, response.data.data.accessToken);
      console.log("test", response);
      if (response.data.data.users.roles[0] === "ADMIN") {
        navigate("/doctor-admin/dashboard");
      } else if (response.data.data.users.roles[0] === "PATIENT") {
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
      // alert("Wrong credentials");
      setLoading(false);
    }
  };

  return (
    <div className="flex    flex-col lg:flex-row justify-start items-center lg:gap-20 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] min-h-screen">
      {/* Image div - hidden on mobile, shown on lg screens and above */}
      <div className="hidden lg:flex flex-col items-start justify-start -space-y-12">
        <img src="/assets/logo.png" alt="logo" />
        <img
          className="w-[777px] h-[874px] rounded-[124px]" src="/assets/loginrectangle.png"
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
          <g filter="url(#filter0_d_13132_1113)">
            <rect
              x="12"
              y="12"
              width="116.093"
              height="117"
              rx="58.0465"
              fill="#94D3DD"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_13132_1113"
              x="0"
              y="0"
              width="156.093"
              height="157"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="8" dy="8" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.686275 0 0 0 0 0.854902 0 0 0 0 0.882353 0 0 0 0.2 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_13132_1113"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_13132_1113"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Login form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[581px] gap-6 lg:gap-[32px]">
        <img src="/assets/logo.png" alt="logo" className="block md:hidden" />
        <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[103px] gap-4 lg:gap-[32px]">
          <h1 className="font-poppins font-bold md:text-3xl text-sm leading-[66px] text-secondaryBrand ">
            Log in
          </h1>
          <p className="font-poppins font-normal text-sm md:text-xs leading-[21px] text-[#949494]">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-full px-4 lg:w-[494px] h-auto lg:h-[144px] gap-4 lg:gap-[16px]">
          <input
            type="text"
            className="w-full lg:w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px] placeholder:text-sm  placeholder:font-poppins"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-full lg:w-[494px]">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-[51px] rounded-[32px] border border-[#FFFFFF] px-[24px] py-[17px] pr-12 outline-none  placeholder:text-sm placeholder:font-poppins"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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


          <p
            onClick={() => navigate("/forgot-password")}
            className="flex justify-end w-full font-poppins font-normal cursor-pointer text-xs lg:text-[12px] leading-[18px] text-secondaryBrand"
          >
            Forgot Password ?
          </p>
        </div>

        <div className="flex items-center flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 px-6 lg:gap-[32px]">
          <button
            onClick={() => handleLogin()}
            disabled={loading}
            className={`w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4  lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px] ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            Login
          </button>

          <div className="flex flex-row justify-center items-center w-full lg:w-[494px] h-auto lg:h-[56px] gap-4 lg:gap-[16px]">
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center">


              <GoogleIcon className='w-5 h-6 ' />
              <h1 className="hidden lg:block text-sm font-poppins">Login with Google</h1>
            </div>
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center">

              <FacebookIcon className="w-5 h-5 text-[#1976D2]" />
              <h1 className="hidden lg:block text-sm font-poppins">Login with Facebook</h1>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-auto lg:h-[93px] space-y-4 lg:space-y-[16px]">
            <p className="font-poppins font-normal text-sm leading-[21px] text-[#808080]">
              Don't Have account
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] font-poppins font-semibold border-[1px] border-[#013764] text-secondaryBrand text-sm lg:text-[14px] leading-[21px]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AccountDeactivate
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Login;
