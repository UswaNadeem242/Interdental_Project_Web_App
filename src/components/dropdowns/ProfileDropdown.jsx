import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import ProfileModal from "../../modals/ProfileModal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ProfileChangePasswordModel from "../../modals/profile-change-password";
import UserdropdownIcon from "../../icon/userdropdownIcon";
import BoxdropdownIcon from "../../icon/boxdropdownIcon";
import LockIocn from "../../icon/lockIocn";

const ProfileDropdown = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordProfile, setIsPasswordProfile] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    if (!isModalOpen) return;

    const handleOutsideClick = (event) => {
      // Don't close if clicking on the profile trigger area
      if (event.target.closest('[data-profile-trigger="true"]')) {
        return;
      }

      // Don't close if clicking on modal elements (modals have their own outside click handlers)
      if (event.target.closest('[role="dialog"]') || 
          event.target.closest('.modal') ||
          event.target.closest('[data-modal="true"]')) {
        return;
      }

      // Don't close if any modal is open
      if (isProfileOpen || isPasswordProfile) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, setIsModalOpen, isProfileOpen, isPasswordProfile]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col justify-center items-center w-[303px] h-fit rounded-[12px] p-[16px] gap-[16px] bg-[#FFFFFF] absolute right-0 top-[4px] z-0  shadow-[0_0_10px_#00000017]"
    >
      <div className="w-64 rounded-[16px] gap-[2px] py-[8px] shadow-[0_0_10px_#04060F0D]">
        {/* flex flex-col justify-start items-start  w-[271px] */}
        <div
          onClick={() => setIsProfileOpen(true)}
          className="flex  justify-between items-center cursor-pointer   h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]"
        >
          <div className="flex items-center gap-4">
            <UserdropdownIcon />

            <p className=" font-inter font-normal text-[14px] text-primaryText leading-[16.94px]">
              Profile
            </p>
          </div>{" "}
          <ChevronRightIcon className="w-4 h-4" />
        </div>
        <div
          onClick={() => {
            navigate("/orders");
            setIsModalOpen(false);
          }}
          className="flex justify-between items-center cursor-pointer h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]"
        >
          <div className="flex items-center gap-4">
            <BoxdropdownIcon />

            <p className="font-inter font-normal text-primaryText text-[14px] leading-[16.94px]">
              My Orders
            </p>
          </div>
          <ChevronRightIcon className="w-4 h-4" />
        </div>
       
        <div
          onClick={() => setIsPasswordProfile(true)}
          className="flex justify-between items-center cursor-pointer   h-[48px] rounded-[10px] gap-[14px] py-[15px] px-[14px]"
        >
          <div className="flex items-center  gap-4">
            <LockIocn />

            <p className="   font-inter font-normal text-primaryText text-[14px] leading-[16.94px]">
              Change Password
            </p>
          </div>

          <ChevronRightIcon className="w-4 h-4" />
        </div>
      </div>
      <div
        onClick={() => handleLogout()}
        className="flex justify-center items-center cursor-pointer w-[99px] h-[24px] gap-[8px]"
      >
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

        <h1 className="font-poppins font-normal text-[14px] text-primaryText leading-[21px]">
          Sign Out
        </h1>
      </div>

      {/* {isNotficationsOpen && (
        <NotificationSettingsModal
          isModalOpen={isNotficationsOpen}
          setIsModalOpen={setisNotificationsOpen}
        />
      )}*/}
      {isProfileOpen && (
        <ProfileModal
          isModalOpen={isProfileOpen}
          setIsModalOpen={setIsProfileOpen}
        />
      )}
      {isPasswordProfile && (
        <ProfileChangePasswordModel
          isPasswordProfile={isPasswordProfile}
          setIsPasswordProfile={setIsPasswordProfile}
        />
      )}
    </div>
  );
};

export default ProfileDropdown;
