import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../auth/AuthContext";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import { showToast } from "../../store/toast-slice";
import { useDispatch } from "react-redux";
import { loginValidationSchema } from "../../services/utils/validationSchemas";
import { useFormik } from "formik";
import LoginWithGoogle from "../../Common/google-login";
import Icons from "../Icons";

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,  
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/users/sign-in`,
          {
            email: values.email,
            password: values.password,
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
              message: "Invalid email or password. Please try again.",
              type: "error",
            })
          );
          return;
        }

        login(response?.data?.data?.users, response?.data?.data?.accessToken);

        // Navigate based on user role
        const userRole = response.data.data.users.roles[0];
        if (userRole === "PATIENT") {
          navigate("/patient-admin/dashboard");
        } else if (userRole === "DOCTOR") {
          navigate("/doctor-admin/dashboard");
        } else if (userRole === "ADMIN") {
          navigate("/admin-panel/dashboard");
        } else if (userRole === "CUSTOMER") {
          navigate("/");
        } else {
          dispatch(
            showToast({
              message: "Login failed",
              type: "error",
            })
          );
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        dispatch(
          showToast({
            message: "Invalid email or password. Please try again.",
            type: "error",
          })
        );
      }
    },
  });

  return (
    <div className="pt-5">
      {/* Login form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[494px] gap-6 lg:gap-8">
        <div className="flex flex-col justify-center items-center w-full px-4 lg:w-[494px] gap-4 lg:gap-4">
          <div className="relative w-full lg:w-[494px]">
            <input
              type="email"
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
peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="relative w-full lg:w-[494px]">
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
peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
              >
                Password
              </label>

              {/* Eye Icon */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye Open
                  <Icons.Eye.Open />
                ) : (
                  // Eye Closed
                  <Icons.Eye.Closed />
                )}
              </div>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-600 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <p
            onClick={() => {
              if (formik.values.email && formik.values.email.trim() !== "") {
                navigate("/forgot-password");
              } else {
                dispatch(
                  showToast({
                    message: "Please Add the Email First",
                    type: "error",
                  })
                );
              }
            }}
            className="flex justify-end w-full font-poppins font-normal cursor-pointer text-xs lg:text-[12px] leading-[18px] text-secondaryBrand"
          >
            Forgot Password ?
          </p>
        </div>

        <div className="flex items-center flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 px-6 lg:gap-[32px]">
          <button
            onClick={() => formik.handleSubmit()}
            disabled={loading}
            className={`w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px] ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex flex-row justify-center items-center w-full lg:w-[494px] h-auto lg:h-[56px] gap-4 lg:gap-[16px]">
            <div className="flex w-full h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center cursor-pointer hover:shadow-md transition-shadow">
              {/* <GoogleIcon className="w-5 h-6" />
              <h1 className="hidden lg:block text-sm font-poppins">
                Login with Google
              </h1> */}
              <LoginWithGoogle />
            </div>
          </div>{" "}
          <div className="flex flex-col justify-center items-center w-full h-auto lg:h-[93px] space-y-4 lg:space-y-[16px]">
            <p className="font-poppins font-normal text-sm leading-[21px] text-[#808080]">
              Don't Have account
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] font-poppins font-semibold border-[1px] border-[#013764] text-secondaryBrand text-sm lg:text-[14px] leading-[21px] hover:bg-secondaryBrand hover:text-white transition-colors"
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

export default UnifiedLogin;
