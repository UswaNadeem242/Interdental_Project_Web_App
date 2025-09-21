import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
// import Group from "../assets/Group.png";

const FeedbackModal = ({ isModalOpen, setIsModalOpen, isItemId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

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
    addRating();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  const addRating = async () => {
    try {
      const payload = {
        accommodationId: isItemId, // pass actual ID
        rating: rating, // 1–5 stars
        review: review,
      };

       const response = await axios.post(`${BASE_URL}/api/ratings/add`, payload, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

     } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-[311px] h-[373.21px] gap-[18px]">
        <div className="flex flex-col justify-center items-center  bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[375px] h-[437px] relative">
          <div className="flex flex-col justify-center items-center mb-8 w-[311px] h-[307.21px] px-[16px] gap-[30px]">
            <h1 className="font-poppins font-bold text-[24px] leading-[36px] text-[#434343]">
              How was the Service
            </h1>
            <p className="font-poppins font-normal text-center text-[14px] w-[324px] leading-[21px] text-[#949494]">
              Your opinion is very helpful for us. Help us be better by giving
              us an honest score below{hoverRating}/{rating}
            </p>
            <div className="flex justify-start items-center gap-[5px] w-[251px] h-[46px]">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer"
                >
                  {hoverRating > index || rating > index
                    ? filledStar
                    : unfilledStar}
                </div>
              ))}
            </div>
            <div className="w-[311px] h-[123px] rounded-[12px] flex flex-col justify-start items-start space-y-[8px]">
              <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                Please share your experience
              </p>
              <div className="w-[311px] h-[94px] px-4 py-2 bg-[#FFFFFF] border-[1px] border-[#624C7926] rounded-[12px]">
                <input
                  type="text"
                  placeholder="Enter your openion"
                  className="outline-none w-full"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <button
          onClick={handleCloseModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button> */}
          <div className="flex justify-center items-center w-[311px] h-[48px] gap-[8px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[151.5px] h-[48px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px]"
            >
              Maybe Later
            </button>
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[151.5px] h-[48px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
