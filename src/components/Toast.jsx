import React, { useEffect } from "react";

const Toast = ({ message, isVisible, onClose, type }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "error":
        return "bg-white border-l-[1px] border-[#E13434]";
      case "warning":
        return "bg-white border-l-[1px] border-yellow-400";
      default:
        return "bg-white border-l-[1px] border-[#4FAD2E]";
    }
  };

  return (
    isVisible && (
      <div
        className={`flex justify-start items-center fixed z-[9999999999999] top-5 left-1/2 transform -translate-x-1/2 w-[447px] min-h-[100px]  gap-[10px] p-[10px] bg-[#FFFFFF] shadow-lg ${getToastStyles()} transition-opacity duration-300 ease-in-out`}
      >
        {type === "success" && (
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="32" height="32" rx="16" fill="#4FAD2E" />
            <path
              d="M10.7383 16.4998L14.2429 19.8682L21.2646 13.1313"
              stroke="white"
              stroke-width="1.68421"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
        {type === "error" && (
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="32" height="32" rx="16" fill="#E13434" />
            <path
              d="M11.0503 11.5503L20.9497 21.4498M11.0503 21.4498L20.9497 11.5503"
              stroke="white"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
        <div className="flex flex-col justify-start items-start w-[359px] h-[43px]">
          <h1
            className={`font-poppins font-semibold text-[14px] leading-[21px] ${
              type === "success" ? "text-[#4FAD2E]" : "text-[#E13434]"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h1>
          <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#8E8E8E]">
            {message}
          </p>
        </div>
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => onClose()}
        >
          <path
            d="M1 1.5L9 9.5M1 9.5L9 1.5"
            stroke="#434343"
            stroke-width="1.13137"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    )
  );
};

export default Toast;
