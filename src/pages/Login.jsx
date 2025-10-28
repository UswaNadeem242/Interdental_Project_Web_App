import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import UnifiedLogin from "../components/login-component/UnifiedLogin";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 justify-start items-center gap-6 lg:gap-24 p-4   lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] min-h-screen ">
      {/* Image section - hidden on mobile */}
      <div className="hidden xl:flex flex-col  items-start justify-start -space-y-9 ">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <img
          className="mt-2 ml-12"
          src="/assets/loginrectangle.png"
          alt="login rectangle"
        />
      </div>

      {/* Login form */}
      <div className="flex flex-col justify-center items-center gap-6 lg:gap-8 mt-3 ">
        <div className="flex flex-col justify-center items-center w-full  lg:w-[494px] h-auto lg:h-[103px] gap-4 lg:gap-[32px]">
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
            Log in
          </h1>
          <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#949494] text-center">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>

        <UnifiedLogin />
      </div>
    </div>
  );
};

export default Login;
