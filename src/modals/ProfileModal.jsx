import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const ProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user } = useAuth();
  console.log("profile", user);

  const [name, setName] = useState(user?.firstName + " " + user?.lastName);
  const [email, setEmail] = useState(user?.email);

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
      <div className="w-[532px] h-[571px] gap-[8px] p-[32px] rounded-[30px]">
        <div className="flex flex-col justify-center items-center  bg-white py-[32px] px-[24px] rounded-[24px] shadow-lg w-[449px] h-[530px] gap-[23.06px] relative">
          <div className="flex justify-center items-center w-[402.91px] h-[30px] gap-[49.01px]">
            <h1 className="font-poppins font-bold text-[24px] w-full leading-[36px] text-[#434343]">
              Your Account
            </h1>
            <button
              onClick={handleCloseModal}
              className="bg-[#E5E5E5] w-[24px] h-[24px] text-[10px] rounded-[29px] p-[4px] gap-[10px] text-[#4F4F4F]"
            >
              ✕
            </button>
          </div>
          <div className="w-full border-[1px] border-[#0000001A]"></div>
          <div className="w-[468px] h-[187px] flex justify-center items-center gap-[24px]">
            <svg
              width="124"
              height="124"
              viewBox="0 0 124 124"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.73226"
                y="1.73128"
                width="120.535"
                height="120.535"
                rx="60.2677"
                fill="white"
                stroke="#001D58"
                stroke-width="1.53548"
              />
              <path
                d="M62 62.499C67.5228 62.499 72 58.0219 72 52.499C72 46.9762 67.5228 42.499 62 42.499C56.4772 42.499 52 46.9762 52 52.499C52 58.0219 56.4772 62.499 62 62.499Z"
                stroke="#001D58"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M79.1803 82.499C79.1803 74.759 71.4803 68.499 62.0003 68.499C52.5203 68.499 44.8203 74.759 44.8203 82.499"
                stroke="#001D58"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="85"
                y="91.499"
                width="32"
                height="32"
                rx="16"
                fill="#001D58"
              />
              <path
                d="M108.151 111.08C108.151 111.364 108.038 111.636 107.838 111.836C107.637 112.037 107.365 112.15 107.082 112.15H94.2483C93.9646 112.15 93.6926 112.037 93.4921 111.836C93.2915 111.636 93.1788 111.364 93.1788 111.08V104.664C93.1788 104.38 93.2915 104.108 93.4921 103.907C93.6926 103.707 93.9646 103.594 94.2483 103.594H95.5017C96.3521 103.594 97.1676 103.255 97.7689 102.654L98.6565 101.769C98.8565 101.568 99.1276 101.456 99.4105 101.455H101.917C102.201 101.455 102.473 101.568 102.673 101.769L103.559 102.654C103.857 102.952 104.211 103.189 104.6 103.35C104.989 103.511 105.407 103.594 105.828 103.594H107.082C107.365 103.594 107.637 103.707 107.838 103.907C108.038 104.108 108.151 104.38 108.151 104.664V111.08ZM94.2483 102.525C93.681 102.525 93.137 102.75 92.7358 103.151C92.3347 103.552 92.1094 104.096 92.1094 104.664V111.08C92.1094 111.647 92.3347 112.191 92.7358 112.593C93.137 112.994 93.681 113.219 94.2483 113.219H107.082C107.649 113.219 108.193 112.994 108.594 112.593C108.995 112.191 109.22 111.647 109.22 111.08V104.664C109.22 104.096 108.995 103.552 108.594 103.151C108.193 102.75 107.649 102.525 107.082 102.525H105.828C105.261 102.525 104.717 102.299 104.316 101.898L103.431 101.012C103.029 100.611 102.486 100.386 101.918 100.386H99.4115C98.8443 100.386 98.3004 100.611 97.8993 101.012L97.0138 101.898C96.6128 102.299 96.0689 102.525 95.5017 102.525H94.2483Z"
                fill="white"
              />
              <path
                d="M100.667 110.012C99.9576 110.012 99.2775 109.731 98.7761 109.229C98.2747 108.728 97.9931 108.048 97.9931 107.339C97.9931 106.63 98.2747 105.95 98.7761 105.448C99.2775 104.947 99.9576 104.665 100.667 104.665C101.376 104.665 102.056 104.947 102.557 105.448C103.059 105.95 103.34 106.63 103.34 107.339C103.34 108.048 103.059 108.728 102.557 109.229C102.056 109.731 101.376 110.012 100.667 110.012ZM100.667 111.082C101.659 111.082 102.611 110.687 103.313 109.985C104.015 109.284 104.41 108.331 104.41 107.339C104.41 106.346 104.015 105.394 103.313 104.692C102.611 103.99 101.659 103.596 100.667 103.596C99.6739 103.596 98.7219 103.99 98.0199 104.692C97.318 105.394 96.9236 106.346 96.9236 107.339C96.9236 108.331 97.318 109.284 98.0199 109.985C98.7219 110.687 99.6739 111.082 100.667 111.082ZM95.3194 105.2C95.3194 105.342 95.2631 105.478 95.1628 105.578C95.0625 105.678 94.9265 105.735 94.7847 105.735C94.6429 105.735 94.5069 105.678 94.4066 105.578C94.3063 105.478 94.25 105.342 94.25 105.2C94.25 105.058 94.3063 104.922 94.4066 104.822C94.5069 104.721 94.6429 104.665 94.7847 104.665C94.9265 104.665 95.0625 104.721 95.1628 104.822C95.2631 104.922 95.3194 105.058 95.3194 105.2Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="w-[468px] h-[187px] flex flex-col justify-start items-start mx-auto space-y-[24px]">
            <div className="flex flex-col justify-start items-start w-[468px] h-[82px] space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494]"
              >
                Name
              </label>
              <input
                type="text"
                name=""
                id=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] w-[408px] h-[53px] outline-none border-[1px] border-[#0000000D] rounded-[32px] py-[16px] px-[24px]"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-[468px] h-[82px] space-y-[8px]">
              <label
                htmlFor=""
                className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494]"
              >
                E-mail Address
              </label>
              <input
                type="text"
                name=""
                id=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-poppins font-normal text-[14px] leading-[21px] text-[#949494] w-[408px] h-[53px] outline-none border-[1px] border-[#0000000D] rounded-[32px] py-[16px] px-[24px]"
              />
            </div>
          </div>

          <div className="flex justify-center items-center  w-[402.91px] h-[57px] gap-[8px]">
            <button
              onClick={handleCloseModal}
              className="flex justify-center items-center w-[402.91px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-[89px] bg-[#001D58] font-poppins font-semibold text-white text-[14px] leading-[21px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
