
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Stepper from "../Common/TabsStepper/Stepper";
import BuySignup from "../components/signup-component/buy-signup";
import DoctorSignup from "../components/signup-component/doctor-signup";

const Signup = () => {
  const navigate = useNavigate();

  const step = [
    {
      name: "Buyer",
      content: <BuySignup />,
    },
    {
      name: "Doctor",
      content: <DoctorSignup />,
    },
  ];

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 lg:gap-24 sm:px-32 sm:py-14 p-6 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] ">
      <div className="hidden col-span-1 xl:flex flex-col items-start justify-start -space-y-9">
        <div
          className="flex items-center z-10 gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div>
          <img
            className="mt-2 ml-12"
            src="/assets/loginrectangle.png"
            alt="login rectangleImg"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full  gap-6 lg:gap-8">
        <div className="lg:max-w-xl w-[100%]">
          <div className="flex flex-col justify-center items-center w-full  gap-4 lg:gap-[32px]">
                 <div
            className="flex gap-2 items-center justify-center mr-4 xl:hidden"
            onClick={() => navigate("/")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <img
              src="/assets/logo.png"
              alt="logo"
              className="block xl:hidden"
              onClick={() => navigate("/")}
            />
          </div>
            <h1 className="font-poppins font-bold text-3xl lg:text-[44px] leading-[66px] text-secondaryBrand">
              Sign Up
            </h1>
            <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#949494] text-center mb-5">
              Sign up to unlock all features and benefits.
            </p>
          </div>
          <div className="w-full">
            <Stepper
              steps={step}
              className=""
              selectedColor="bg-fouthBrand text-white "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
