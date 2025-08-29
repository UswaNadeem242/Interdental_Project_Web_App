import React from "react";
// import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
 
const DoctorHeader = ({ title, subTitle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="w-[1108px] h-[60px] flex justify-between items-center ">
      <div className="w-[344px] h-[60px] flex flex-col justify-start items-start px-6 py-6">
        {title && !subTitle ? (
          <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#434343]">
            {title}
          </h1>
        ) : title && subTitle ? (
          <div className="flex flex-col justify-start items-start">
            <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
              {title}
            </p>
            <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#434343]">
              #{subTitle}
            </h1>
          </div>
        ) : (
          <>
            <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#434343]">
             Place Order
            </h1>
             
          </>
        )}
      </div>
     
      <div className="flex justify-start items-center gap-[8px]  px-6 py-6">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="56" height="56" rx="28" fill="white" />
          <path
            d="M20.6246 34.3217L20.6247 34.3217C21.3689 34.5247 22.1194 34.6963 22.8743 34.8368L23.1128 34.8812L23.1975 35.1085L23.1991 35.1128C23.9029 36.9908 25.7936 38.3215 28.0001 38.3215C30.2064 38.3215 32.0969 36.9911 32.8009 35.1134C32.801 35.1132 32.801 35.113 32.8011 35.1128L32.8028 35.1084L32.8875 34.8812L33.1259 34.8368C33.8808 34.6963 34.6314 34.5247 35.3756 34.3217L35.3757 34.3217C37.412 33.7663 38.3059 31.3792 37.135 29.6229L35.9864 27.9C35.9864 27.9 35.9864 27.9 35.9864 27.9C35.5529 27.2497 35.3216 26.4856 35.3216 25.7041V25C35.3216 20.9565 32.0436 17.6786 28.0001 17.6786C23.9566 17.6786 20.6787 20.9565 20.6787 25V25.7041C20.6787 26.4856 20.4474 27.2497 20.0139 27.9L20.6246 34.3217ZM20.6246 34.3217C18.5883 33.7663 17.6944 31.3792 18.8653 29.6229C18.8653 29.6229 18.8653 29.6229 18.8653 29.6229L20.0139 27.9L20.6246 34.3217ZM31.7283 35.7818L32.2736 34.9982L31.3257 35.1115C29.1166 35.3754 26.8836 35.3754 24.6745 35.1114L23.7265 34.9981L24.2718 35.7817C25.0632 36.9189 26.4314 37.6786 28.0001 37.6786C29.5687 37.6786 30.9369 36.9189 31.7283 35.7818ZM20.7938 33.7015L20.7938 33.7015C25.5119 34.9882 30.4885 34.9882 35.2065 33.7015C36.8196 33.2615 37.5276 31.3706 36.6001 29.9795C36.6001 29.9795 36.6001 29.9795 36.6001 29.9795L35.4515 28.2566C34.9476 27.5007 34.6787 26.6126 34.6787 25.7041V25C34.6787 21.3116 31.6886 18.3215 28.0001 18.3215C24.3117 18.3215 21.3216 21.3116 21.3216 25V25.7041C21.3216 26.6126 21.0527 27.5007 20.5488 28.2566L19.4002 29.9795C19.4002 29.9795 19.4002 29.9795 19.4002 29.9795C18.4727 31.3706 19.1808 33.2615 20.7938 33.7015Z"
            stroke="#434343"
            stroke-width="0.857143"
          />
        </svg>
        <div className="flex justify-start items-center w-[220px] h-[58px] gap-[8px] p-[8px] rounded-[32px] bg-white">
          <img
            src="/assets/user.png"
            alt="user"
            className="w-[40px] h-[40px] rounded-[32px]"
          />
          <div className="flex flex-col justify-start items-start w-[156px] h-[42px] gap-[3px] bg-white">
            <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#434343]">
              Brainsim Hanry
            </p>
            <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
              Hanry324@gmail.com
            </p>
          </div>
        </div>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => handleLogout()}
        >
          <rect width="56" height="56" rx="28" fill="white" />
          <path
            d="M30.4709 24.245C30.1738 20.795 28.4009 19.3862 24.5196 19.3862H24.395C20.1113 19.3862 18.3959 21.1016 18.3959 25.3854V31.6337C18.3959 35.9175 20.1113 37.6329 24.395 37.6329H24.5196C28.3721 37.6329 30.145 36.2433 30.4613 32.8508M24.625 28.5H35.5309M33.3938 25.2896L36.6042 28.5L33.3938 31.7104"
            stroke="#434343"
            stroke-width="1.4375"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {/* )} */}
    </div>
  );
};

export default DoctorHeader;
