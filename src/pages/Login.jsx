import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import AccountDeactivate from "../modals/AccountDeactivateModal";
import GoogleIcon from "../icon/google";
import FacebookIcon from "../icon/facebookIcon";
import { showToast } from "../store/toast-slice";
import { useDispatch } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Stepper from "../Common/TabsStepper/Stepper";
import PateintLogin from "../components/login-component/pateint-login";
import BuyerDoctorLogin from "../components/login-component/buyer-doctor-login";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
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
        dispatch(
          showToast({
            message: 'Invalid email or password. Please try again.',
            type: "error",
          })
        );
      }
      // { setIsModalOpen(true); }
      login(response?.data?.data?.users, response?.data?.data?.accessToken);
      if (response.data.data.users.roles[0] === "ADMIN") {
        navigate("/doctor-admin/dashboard");
      } else if (response.data.data.users.roles[0] === "PATIENT") {
        navigate("/patient-admin/dashboard");
      } else if (response.data.data.users.roles[0] === "DOCTOR") {
        navigate("/doctor-admin/dashboard");
      } else {
        dispatch(
          showToast({
            message: 'Login failed',
            type: "error",
          })
        );
      }
    } catch (error) {
      console.log(error);
      // alert("Wrong credentials");
      setLoading(false);
    }
  };

  const step = [
    {
      name: 'Buyer',
      content: <BuyerDoctorLogin />
    },
    {
      name: 'Doctor',
      content: <BuyerDoctorLogin />
    }, {
      name: 'Patient',
      content: <PateintLogin />
    }
  ]

  return (
    // <div className="flex    flex-col lg:flex-row justify-start items-center lg:gap-20 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] ">
    //    <div className="hidden lg:flex flex-col items-start justify-start -space-y-9">
    //     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} >

    //       <ArrowLeftIcon className="w- 5 h-5" />
    //       <img src="/assets/logo.png" alt="logo" />

    //     </div>        <img
    //       className="" src="/assets/loginrectangle.png"
    //       alt="login rectangle image"
    //     />


    //   </div>

    //   <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[581px] gap-6 lg:gap-[32px]">
    //     <img src="/assets/logo.png" alt="logo" className="block md:hidden" />
    //     <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[103px] gap-4 lg:gap-[32px]">
    //       <h1 className="font-poppins font-bold md:text-3xl text-sm leading-[66px] text-secondaryBrand ">
    //         Log in
    //       </h1>
    //       <p className="font-poppins font-normal text-sm md:text-xs leading-[21px] text-[#949494]">
    //         Welcome back! Please enter your credentials to continue.
    //       </p>
    //     </div>
    //     <div>
    //       <Stepper steps={step} className='md:w-[100%] ' selectedColor='bg-fouthBrand text-white ' />
    //     </div>


    //   </div>

    // </div>


    <div className="flex flex-col lg:flex-row justify-start items-center gap-6 lg:gap-24 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] ">
      {/* Image section - hidden on mobile */}

      <div className="hidden lg:flex flex-col items-start justify-start -space-y-9">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} >

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
            Log in
          </h1>
          <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#949494] text-center">
            Sign up to unlock all features and benefits.
          </p>
        </div>


        <div className="">
          <Stepper steps={step} className='md:w-[100%]' selectedColor='bg-fouthBrand text-white ' />
        </div>
      </div>

      {/* Modal and Toast components */}



    </div>
  );
};

export default Login;
