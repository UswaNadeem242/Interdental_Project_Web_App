import React, { useEffect, useState } from "react";
import Group from "../assets/Group.png";

const AddBrandModal = ({ isModalOpen, setIsModalOpen }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const filledStar = (
    <svg
      width="48"
      height="47"
      viewBox="0 0 48 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_13864_19819)">
        <path
          d="M25.8268 6.91286L29.6586 15.0386C29.9475 15.6356 30.4867 16.0592 31.1413 16.1555L39.7293 17.4648C41.3274 17.7152 41.9821 19.7755 40.8075 20.9501L34.588 27.2851C34.1259 27.7473 33.9141 28.4404 34.0297 29.0951L35.493 38.0296C35.7626 39.7048 34.0874 40.9757 32.6433 40.1862L24.9603 35.9693C24.3827 35.6612 23.7087 35.6612 23.1311 35.9693L15.4481 40.1862C14.004 40.9757 12.3288 39.7048 12.5984 38.0296L14.0617 29.0951C14.1773 28.4404 13.9655 27.7473 13.5034 27.2851L7.28386 20.9501C6.12853 19.7755 6.76395 17.6959 8.36215 17.4648L16.9501 16.1555C17.5855 16.0592 18.1439 15.6356 18.4328 15.0386L22.2646 6.91286C22.977 5.39168 25.0566 5.39168 25.7691 6.91286H25.8268Z"
          fill="#F69B26"
          stroke="#F69B26"
          strokeWidth="3.03249"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_13864_19819">
          <rect
            width="46.213"
            height="46.213"
            fill="white"
            transform="translate(0.966797)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const unfilledStar = (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_13864_19824)">
        <path
          d="M25.2526 6.91286L29.0844 15.0386C29.3733 15.6356 29.9124 16.0592 30.5671 16.1555L39.155 17.4648C40.7532 17.7152 41.4079 19.7755 40.2333 20.9501L34.0138 27.2851C33.5517 27.7473 33.3399 28.4404 33.4554 29.0951L34.9188 38.0296C35.1884 39.7048 33.5132 40.9757 32.069 40.1862L24.3861 35.9693C23.8084 35.6612 23.1345 35.6612 22.5569 35.9693L14.8739 40.1862C13.4298 40.9757 11.7546 39.7048 12.0242 38.0296L13.4875 29.0951C13.6031 28.4404 13.3913 27.7473 12.9292 27.2851L6.70964 20.9501C5.55431 19.7755 6.18974 17.6959 7.78794 17.4648L16.3758 16.1555C17.0113 16.0592 17.5697 15.6356 17.8585 15.0386L21.6904 6.91286C22.4028 5.39168 24.4824 5.39168 25.1949 6.91286H25.2526Z"
          stroke="#F69B26"
          strokeWidth="3.03249"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_13864_19824">
          <rect
            width="46.213"
            height="46.213"
            fill="white"
            transform="translate(0.392578)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  // Handle mouse enter for hover effect
  const handleMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  // Handle mouse leave for hover effect
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Handle click to set the rating
  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[303px] h-[295px] gap-[16px]">
        <div className="flex flex-col justify-center items-center space-y-[16px]  bg-white py-[16px] rounded-[8px] shadow-lg w-[303px] h-[295px] relative">
          <div className="w-[114px] h-[121px] flex flex-col justify-center items-center space-y-[8px]">
            <svg
              width="95"
              height="95"
              viewBox="0 0 95 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_14178_12766)">
                <rect
                  width="95"
                  height="95"
                  rx="47.5"
                  fill="#EF6A1F"
                  fill-opacity="0.05"
                />
                <circle cx="47.5" cy="47.5" r="47.5" fill="#F8F8F8" />
                <path
                  d="M59.1245 51.3748V56.5414C59.1245 57.2266 58.8523 57.8836 58.3679 58.3681C57.8834 58.8526 57.2263 59.1248 56.5412 59.1248H38.4578C37.7727 59.1248 37.1156 58.8526 36.6312 58.3681C36.1467 57.8836 35.8745 57.2266 35.8745 56.5414V51.3748"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M53.9596 42.3328L47.5013 35.8745L41.043 42.3328"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M47.5 35.8745V51.3745"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_14178_12766">
                  <rect width="95" height="95" rx="47.5" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#001D58]">
              Upload Brand Logo
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter Brand Name"
            className="w-[271px] h-[53px] gap-[8px] rounded-[8px] border-[1px] border-[#E5E5E5] p-[16px] bg-white font-poppins font-normal text-[14px] leading-[21px] text-[#949494] outline-none "
          />
          <div className="flex justify-center items-center w-[271px] h-[57px] gap-[24px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Go Back
            </button>
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[123.5px] h-[56px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandModal;
