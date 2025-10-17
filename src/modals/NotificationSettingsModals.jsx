import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import FiveStarRating from "../icon/FiveStarRating";
import StarIcon from "../icon/StarIcon";
// import Group from "../assets/Group.png";

const NotifcationSettingsModal = ({ isModalOpen, setIsModalOpen }) => {
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
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className="fixed -left-[63px] top-0 right-0 w-screen  h-screen flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-[9999]"
      onClick={(e) => {
        // Close only when clicking on the backdrop
        if (e.target === e.currentTarget) {
          setIsModalOpen(false);
        }
      }}
    >
      <div className=" rounded-md">
        <div className="flex flex-col justify-center items-center bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg   gap-[23.06px] relative">
          <div className=" ">
            <h1 className="font-poppins font-bold text-2xl w-full  text-primaryText text-center pb-4">
              How was the service
            </h1>
            <p className="text-sm font-poppins font-normal text-secondaryText max-w-80 text-center ">
              Your opinion is very helpful for us. Help us be better by giving
              us an honest score below
            </p>
            <div className="flex gap-2 justify-center py-3">
              {[1, 2, 3, 4, 5]?.map((item) => (
                <StarIcon />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <p className="text-sm font-normal font-poppins mb-2 pl-8">
              Please Share Your Experience
            </p>

            <form className="w-full flex justify-center">
              <textarea
                maxLength={300}
                className="w-[300px] rouneded-md h-[100px] border-2 border-background outline-none rounded-md p-2 resize-none"
                placeholder="Enter your opinion"
              />
            </form>
          </div>

          <div className="flex justify-between">
            <div>
              <button
                onClick={() => handleCloseModal()}
                className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] bg-background    gap-2 sm:gap-4 p-2 font-poppins font-semibold text-base text-primaryText capitalize"
              >
                may be later{" "}
              </button>
            </div>
            <div>
              <button className="flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px]   bg-secondaryBrand  gap-2 sm:gap-4 p-2 font-poppins font-semibold text-base text-white">
                Submit review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifcationSettingsModal;
