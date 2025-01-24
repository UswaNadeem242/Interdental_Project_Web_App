import React, { useState } from "react";
// import loginrectangle from "../assets/loginrectangle.png";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/interdentallab/api/users/sign-in`,
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
      login(response.data.data.users, response.data.data.accessToken);
      console.log("test", response);
      // localStorage.setItem("token", response.data.data.accessToken);
      if (response.data.data.users.roles[0] === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (response.data.data.users.roles[0] === "PATIENT") {
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong credentials");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-start items-center gap-24 p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600]">
      <div className="flex flex-col items-start justify-start -space-y-12">
        <img src="/build/assets/logo.png" alt="logo" />
        <img
          className="w-[777px] h-[874px] rounded-[124px] "
          src="/build/assets/loginrectangle.png"
          alt="locin rectangle image"
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
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
      <div className="flex flex-col justify-center items-center w-[494px] h-[581px] gap-[32px] top-[172px] left-[908px]">
        <div className="flex flex-col justify-center items-center w-[494px] h-[103px] gap-[32px]">
          <h1 className="font-poppins font-bold text-[44px] leading-[66px] text-secondaryBrand">
            Log in
          </h1>
          <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494]">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[494px] h-[144px] gap-[16px]">
          <input
            type="text"
            className="w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name=""
            id=""
          />
          <div className="relative w-[494px]">
            <input
              type={showPassword ? "text" : "password"}
              className="w-[494px] h-[51px] rounded-[32px] outline-none border-[1px] border-[#FFFFFF] gap-[8px] py-[17px] px-[24px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
            />
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.3131 0.914813C14.5328 1.13456 14.5328 1.49081 14.3131 1.71056L2.48255 13.5403C2.37305 13.6506 2.22905 13.7053 2.08505 13.7053C1.94105 13.7053 1.79705 13.6506 1.68755 13.5403C1.4678 13.3206 1.4678 12.9651 1.68755 12.7453L3.16651 11.2673C2.10615 10.2974 1.20666 8.98997 0.546125 7.45046C0.484625 7.30796 0.484625 7.14746 0.546125 7.00571C1.31188 5.23271 2.39037 3.76496 3.66537 2.76221C6.135 0.807749 9.38173 0.704006 11.9515 2.48121L13.5181 0.914813C13.7378 0.695063 14.0933 0.695063 14.3131 0.914813ZM14.0354 4.53056C14.5784 5.25131 15.0554 6.08456 15.4536 7.00406C15.5159 7.14656 15.5159 7.30856 15.4536 7.45031C13.8816 11.0931 11.0954 13.2673 8.00015 13.2673C7.2974 13.2673 6.5984 13.1533 5.9234 12.9291C5.62865 12.8308 5.4689 12.5121 5.56715 12.2173C5.6654 11.9218 5.98265 11.7651 6.2789 11.8611C6.83915 12.0478 7.41815 12.1423 8.00015 12.1423C10.5711 12.1423 12.9209 10.3108 14.3227 7.22756C13.9807 6.47831 13.5824 5.79956 13.1369 5.20706C12.9501 4.95881 12.9997 4.60556 13.2479 4.41881C13.4954 4.23206 13.8486 4.28306 14.0354 4.53056ZM4.36212 3.64571C3.28513 4.49321 2.36038 5.72771 1.67788 7.22921C2.27296 8.54355 3.05474 9.65198 3.96279 10.4705L5.56614 8.86734C5.23995 8.38739 5.06442 7.82152 5.06442 7.22891C5.06442 5.60891 6.38142 4.29116 7.99992 4.29116C8.58716 4.29116 9.16159 4.46997 9.63985 4.79314L11.141 3.29209C9.00137 1.90892 6.39724 2.0351 4.36212 3.64571ZM10.4281 7.09616C10.7341 7.15091 10.9374 7.44341 10.8826 7.74941C10.6674 8.94416 9.72087 9.89216 8.52688 10.1097C8.49313 10.1157 8.45863 10.1187 8.42562 10.1187C8.15938 10.1187 7.92237 9.92816 7.87287 9.65666C7.81737 9.35141 8.01987 9.05816 8.32587 9.00266C9.06087 8.86916 9.64287 8.28566 9.77487 7.54991C9.83037 7.24466 10.1229 7.04366 10.4281 7.09616ZM7.99992 5.41616C7.00168 5.41616 6.18942 6.22916 6.18942 7.22891C6.18942 7.51795 6.25747 7.79695 6.38574 8.04751L8.81997 5.61299C8.56936 5.48528 8.28748 5.41616 7.99992 5.41616Z"
                fill="#808080"
              />
            </svg>
          </div>
          <p
            onClick={() => navigate("/forgot-password")}
            className="flex justify-end w-full font-poppins font-normal cursor-pointer text-[12px] leading-[18px] text-secondaryBrand"
          >
            Forgot Password ?
          </p>
        </div>
        <div className="flex flex-col w-[494px] h-[270px] gap-[32px]">
          <button
            onClick={() => handleLogin()}
            disabled={loading}
            className={`w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px] ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Login
          </button>
          <div className="flex justify-center items-center w-[494px] h-[56px] gap-[16px]">
            <div className="flex w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF]">
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
              <h1>Login with Google</h1>
            </div>
            <div className="flex w-[239px] h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF]">
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
              <h1>Log in with Facebook</h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-[93px] space-y-[16px]">
            <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#808080]">
              Don’t Have account
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[129px] font-poppins font-semibold border-[1px] border-[#013764] text-secondaryBrand text-[14px] leading-[21px]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
