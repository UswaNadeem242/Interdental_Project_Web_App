import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../config";
import Toast from "../components/Toast";
import YearlyPlanModel from "../modals/yearly-plan";
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
    <div className="flex flex-col lg:flex-row justify-start items-center gap-6 lg:gap-24 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] ">
      {/* Image section - hidden on mobile */}

      <div className="hidden lg:flex flex-col items-start justify-start -space-y-9">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w- 5 h-5" />
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <img
          className="mt-2 ml-12"
          src="/assets/loginrectangle.png"
          alt="login rectangle image"
        />
      </div>

      {/* Signup form */}
      <div className="flex flex-col justify-center   items-center gap-6 lg:gap-8">
        {/*  w-full lg:w-[494px] h-auto lg:h-[581px] */}

        <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[103px] gap-4 lg:gap-[32px]">
          <img src="/assets/logo.png" alt="logo" className="block lg:hidden" />
          <h1 className="font-poppins font-bold text-3xl lg:text-[44px] leading-[66px] text-secondaryBrand">
            Sign Up
          </h1>
          <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#949494] text-center">
            Sign up to unlock all features and benefits.
          </p>
        </div>

        <div className="">
          <Stepper
            steps={step}
            className="md:w-[100%]"
            selectedColor="bg-fouthBrand text-white "
          />
        </div>
      </div>

      {/* Modal and Toast components */}
    </div>
  );
};

export default Signup;
