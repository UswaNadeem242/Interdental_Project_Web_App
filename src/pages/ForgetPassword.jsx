import React, { useState } from "react";
// import loginrectangle from "../assets/loginrectangle.png";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import EmailConfirmation from "../modals/EmailConfirmationModal";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex justify-start items-center gap-24 p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600]">
      {/* <div className="flex flex-col items-start justify-start -space-y-12">
        <img src="/assets/logo.png" alt="logo" />
        <img
          className="  "
          src="/assets/loginrectangle.png"
          alt="locin rectangle image"
        />

      </div> */}
      <div className="hidden lg:flex flex-col items-start justify-start -space-y-9">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <img
          className="mt-2 ml-7"
          src="/assets/loginrectangle.png"
          alt="login rectangle image"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-[494px] h-[581px] gap-[32px] top-[172px] left-[908px]">
        <div className="flex flex-col justify-center items-center w-[494px] h-[103px] gap-[32px]">
          <h1 className="font-poppins font-bold text-[44px] leading-[66px] text-secondaryBrand">
            Forget Password
          </h1>
          <p className="text-center font-poppins font-normal text-[14px] leading-[21px] text-[#949494]">
            Please provide your registered email address to receive the
            verification email
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[494px] h-[51px] gap-[16px]">
          <input
            type="text"
            className="w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
            placeholder="Email Address"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col justify-center items-center w-[494px] h-[113px] gap-[32px]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
          >
            Check E-mail
          </button>
          <div className="flex justify-center items-center gap-[8px] w-[120px] h-[24px]">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M20.5 12.75C20.9142 12.75 21.25 12.4142 21.25 12C21.25 11.5858 20.9142 11.25 20.5 11.25V12.75ZM20.5 11.25H4.5V12.75H20.5V11.25Z"
                fill="#001D58"
              />
              <path
                d="M10.5 6L4.5 12L10.5 18"
                stroke="#001D58"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p
              onClick={() => navigate("/login")}
              className="font-poppins font-semibold text-[14px] leading-[21px] text-secondaryBrand"
            >
              Go back
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EmailConfirmation
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ForgetPassword;
