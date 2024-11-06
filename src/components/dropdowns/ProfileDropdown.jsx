import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationSettingsModal from "../../modals/NotificationSettingsModals";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isNotficationsOpen, setisNotificationsOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center w-[303px] h-[286px] rounded-[12px] p-[16px] gap-[16px] bg-[#FFFFFF] absolute right-0 top-[4px] z-10  shadow-[0_0_10px_#00000017]">
      <div className="flex flex-col justify-start items-start w-[271px] h-[214px] rounded-[16px] gap-[2px] py-[8px] shadow-[0_0_10px_#04060F0D]">
        <div className="flex justify-between items-center w-[271px] h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4426 16.5C14.4426 13.5975 11.5551 11.25 8.00012 11.25C4.44512 11.25 1.55762 13.5975 1.55762 16.5M8.00012 9C8.99468 9 9.94851 8.60491 10.6518 7.90165C11.355 7.19839 11.7501 6.24456 11.7501 5.25C11.7501 4.25544 11.355 3.30161 10.6518 2.59835C9.94851 1.89509 8.99468 1.5 8.00012 1.5C7.00556 1.5 6.05173 1.89509 5.34847 2.59835C4.64521 3.30161 4.25012 4.25544 4.25012 5.25C4.25012 6.24456 4.64521 7.19839 5.34847 7.90165C6.05173 8.60491 7.00556 9 8.00012 9V9Z"
              stroke="#434343"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="w-[181px] h-[17px] font-inter font-normal text-[14px] text-[#434343] leading-[16.94px]">
            Profile
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99978 13.2802L10.3464 8.93355C10.8598 8.42021 10.8598 7.58022 10.3464 7.06688L5.99978 2.72021"
              stroke="#6D6D6D"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          onClick={() => navigate("/orders")}
          className="flex justify-between items-center w-[271px] h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.37695 5.58008L8.99945 9.41258L15.577 5.60258M8.99945 16.2076V9.40508"
              stroke="#434343"
              stroke-width="1.3125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.44699 1.85997L3.44199 4.07997C2.53449 4.58247 1.79199 5.84247 1.79199 6.87747V11.115C1.79199 12.15 2.53449 13.41 3.44199 13.9125L7.44699 16.14C8.30199 16.6125 9.70449 16.6125 10.5595 16.14L14.5645 13.9125C15.472 13.41 16.2145 12.15 16.2145 11.115V6.87747C16.2145 5.84247 15.472 4.58247 14.5645 4.07997L10.5595 1.85247C9.69699 1.37997 8.30199 1.37997 7.44699 1.85997V1.85997Z"
              stroke="#434343"
              stroke-width="1.3125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="w-[181px] h-[17px] font-inter font-normal text-[#434343] text-[14px] leading-[16.94px]">
            My Orders
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99978 13.2802L10.3464 8.93355C10.8598 8.42021 10.8598 7.58022 10.3464 7.06688L5.99978 2.72021"
              stroke="#6D6D6D"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          onClick={() => setisNotificationsOpen(true)}
          className="flex justify-between items-center w-[271px] h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 11.25C9.59674 11.25 10.169 11.0129 10.591 10.591C11.0129 10.169 11.25 9.59674 11.25 9C11.25 8.40326 11.0129 7.83097 10.591 7.40901C10.169 6.98705 9.59674 6.75 9 6.75C8.40326 6.75 7.83097 6.98705 7.40901 7.40901C6.98705 7.83097 6.75 8.40326 6.75 9C6.75 9.59674 6.98705 10.169 7.40901 10.591C7.83097 11.0129 8.40326 11.25 9 11.25V11.25Z"
              stroke="#434343"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.5 9.66007V8.34007C1.5 7.56007 2.1375 6.91507 2.925 6.91507C4.2825 6.91507 4.8375 5.95507 4.155 4.77757C3.765 4.10257 3.9975 3.22507 4.68 2.83507L5.9775 2.09257C6.57 1.74007 7.335 1.95007 7.6875 2.54257L7.77 2.68507C8.445 3.86257 9.555 3.86257 10.2375 2.68507L10.32 2.54257C10.6725 1.95007 11.4375 1.74007 12.03 2.09257L13.3275 2.83507C14.01 3.22507 14.2425 4.10257 13.8525 4.77757C13.17 5.95507 13.725 6.91507 15.0825 6.91507C15.8625 6.91507 16.5075 7.55257 16.5075 8.34007V9.66007C16.5075 10.4401 15.87 11.0851 15.0825 11.0851C13.725 11.0851 13.17 12.0451 13.8525 13.2226C14.2425 13.9051 14.01 14.7751 13.3275 15.1651L12.03 15.9076C11.4375 16.2601 10.6725 16.0501 10.32 15.4576L10.2375 15.3151C9.5625 14.1376 8.4525 14.1376 7.77 15.3151L7.6875 15.4576C7.335 16.0501 6.57 16.2601 5.9775 15.9076L4.68 15.1651C4.35307 14.9768 4.11419 14.6666 4.01576 14.3024C3.91733 13.9382 3.96741 13.5499 4.155 13.2226C4.8375 12.0451 4.2825 11.0851 2.925 11.0851C2.1375 11.0851 1.5 10.4401 1.5 9.66007V9.66007Z"
              stroke="#434343"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="w-[181px] h-[17px] font-inter font-normal text-[#434343] text-[14px] leading-[16.94px]">
            Notification Settings
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99978 13.2802L10.3464 8.93355C10.8598 8.42021 10.8598 7.58022 10.3464 7.06688L5.99978 2.72021"
              stroke="#6D6D6D"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex justify-between items-center w-[271px] h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_13800_9444)">
              <path
                d="M4.5 7.5V6C4.5 3.5175 5.25 1.5 9 1.5C12.75 1.5 13.5 3.5175 13.5 6V7.5M12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V11.25C1.5 8.25 2.25 7.5 5.25 7.5H12.75C15.75 7.5 16.5 8.25 16.5 11.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5Z"
                stroke="#434343"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9968 12H12.0043M8.99609 12H9.00359M5.99609 12H6.00209"
                stroke="#434343"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_13800_9444">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p className="w-[181px] h-[17px] font-inter font-normal text-[#434343] text-[14px] leading-[16.94px]">
            Change Password
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99978 13.2802L10.3464 8.93355C10.8598 8.42021 10.8598 7.58022 10.3464 7.06688L5.99978 2.72021"
              stroke="#6D6D6D"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center w-[99px] h-[24px] gap-[8px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4697 8.46967C10.1768 8.76256 10.1768 9.23744 10.4697 9.53033L12.1893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H12.1893L10.4697 14.4697C10.1768 14.7626 10.1768 15.2374 10.4697 15.5303C10.7626 15.8232 11.2374 15.8232 11.5303 15.5303L14.5303 12.5303C14.8232 12.2374 14.8232 11.7626 14.5303 11.4697L11.5303 8.46967C11.2374 8.17678 10.7626 8.17678 10.4697 8.46967Z"
            fill="#434343"
          />
          <path
            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4"
            stroke="#434343"
          />
        </svg>

        <h1 className="font-poppins font-normal text-[14px] text-[#434343] leading-[21px]">
          Sign Out
        </h1>
      </div>

      {isNotficationsOpen && (
        <NotificationSettingsModal
          isModalOpen={isNotficationsOpen}
          setIsModalOpen={setisNotificationsOpen}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;
