import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { BellIcon } from "../../../icon/Bell";
import { LogoutIcon } from "../../../icon/LogoutIcon";
import usePageTitle from "../../../Hooks/usePageTitle";
import { useState, useEffect } from "react";

const DoctorHeader = ({ title, subTitle, role }) => {
  const navigate = useNavigate();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);

        if (parsedUserData) {
          setDoctorProfile(parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (doctorProfile) {
      console.log("doctorProfile", doctorProfile);
    }
  }, [doctorProfile]);

  const pageTitle = usePageTitle();
  const roleLink =
    role === "doctor"
      ? "/doctor-admin/profile"
      : "/patient-admin/profile-settings";

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h1 className="text-[#1A2D33] font-poppins text-lg md:text-2xl capitalize font-bold">
          {pageTitle}
        </h1>
        <div className="hidden md:flex flex-1"></div>
        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full gap-3">
          <img
            src={doctorProfile?.profileImage}
            alt="userImg"
            className="w-10 h-10 rounded-full"
          />
          <NavLink to={roleLink} className="flex flex-col justify-center">
            <p className="text-sm font-semibold">
              {doctorProfile &&
                `${doctorProfile.firstName} ${doctorProfile.lastName}`}
            </p>
            <p className="text-xs text-gray-500">
              {doctorProfile && `${doctorProfile.email}`}
            </p>
          </NavLink>
          <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
            <BellIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex">
          <button
            className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center"
            onClick={() => handleLogout()}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorHeader;
