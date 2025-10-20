import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../auth/AuthContext";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import GoogleIcon from "../../icon/google";
import FacebookIcon from "../../icon/facebookIcon";
import { showToast } from "../../store/toast-slice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import LoginWithGoogle from "../../Common/google-login";

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(1, "Password is required")
      .required("Password is required"),
  });

  const validateForm = async () => {
    const formData = { email, password };
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return null;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
      return Object.values(errors)[0];
    }
  };

  const handleLogin = async () => {
    const error = await validateForm();
    if (error) {
      return; // Field-level errors are shown instead of toast
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
  };

  return (
    <div className="pt-5">
      {/* Login form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[494px] gap-6 lg:gap-8">
        <div className="flex flex-col justify-center items-center w-full px-4 lg:w-[494px] gap-4 lg:gap-4">
          <div className="relative w-full lg:w-[494px]">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear error when user starts typing
                if (validationErrors.email) {
                  setValidationErrors((prev) => ({
                    ...prev,
                    email: undefined,
                  }));
                }
              }}
              placeholder=" "
              className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none border ${
                validationErrors.email
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
            {validationErrors.email && (
              <div className="text-red-600 text-xs mt-1">
                {validationErrors.email}
              </div>
            )}
          </div>

          <div className="relative w-full lg:w-[494px]">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear error when user starts typing
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({
                    ...prev,
                    password: undefined,
                  }));
                }
              }}
              placeholder=" "
              className={`peer w-full rounded-md py-3 px-4 pr-12 text-textFieldHeading outline-none border ${
                validationErrors.password
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
                  <path d="M1 1l22 22" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </div>
            {validationErrors.password && (
              <div className="text-red-600 text-xs mt-1">
                {validationErrors.password}
              </div>
            )}
          </div>

          <p
            onClick={() => {
              if (email && email.trim() !== "") {
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
            onClick={() => handleLogin()}
            disabled={loading}
            className={`w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px] ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex flex-row justify-center items-center w-full lg:w-[494px] h-auto lg:h-[56px] gap-4 lg:gap-[16px]">
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center cursor-pointer hover:shadow-md transition-shadow">
              {/* <GoogleIcon className="w-5 h-6" />
              <h1 className="hidden lg:block text-sm font-poppins">
                Login with Google
              </h1> */}
              <LoginWithGoogle />
            </div>
            <div className="flex w-full lg:w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center cursor-pointer hover:shadow-md transition-shadow">
              <FacebookIcon className="w-5 h-5 text-[#1976D2]" />
              <h1 className="hidden lg:block text-sm font-poppins">
                Login with Facebook
              </h1>
            </div>
          </div>

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
