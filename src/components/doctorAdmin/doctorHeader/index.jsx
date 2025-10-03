import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { BellIcon } from "../../../icon/Bell";
import { LogoutIcon } from "../../../icon/LogoutIcon";
import usePageTitle from "../../../Hooks/usePageTitle";
import { useSelector } from "react-redux";

const DoctorHeader = ({ title, subTitle, role }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pageTitle = usePageTitle();
  const displayTitle = pageTitle?.toLowerCase().includes("dashboard");


  const roleLink =
    role === "doctor"
      ? "/doctor-admin/profile"
      : "/patient-admin/profile-settings";
  const profileImage = useSelector((state) => state.profile?.profileImage);
  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          <h1 className="text-primaryText font-poppins text-lg md:text-2xl capitalize font-bold">
            {displayTitle
              ? `Welcome back ${doctorProfile?.firstName || ""} ${doctorProfile?.lastName || ""}`
              : pageTitle}
          </h1>
          <p className="text-secondaryText text-sm  font-normal font-poppins">You have <span className="text-secondaryBrand font-normal ">2 Unread</span>  Notifications </p>
        </div>




        <div className="hidden md:flex flex-1"></div>
        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full gap-3">
          <img
            src={
              profileImage || profileData?.profileImage || "/default-avatar.png"
            }
            alt="userImg"
            className="w-10 h-10 rounded-full"
          />
          <NavLink to={roleLink} className="flex flex-col justify-center">
            <p className="text-sm font-semibold">
              {profileData &&
                `${profileData.firstName} ${profileData.lastName}`}
            </p>
            <p className="text-xs text-gray-500">{profileData?.email}</p>
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
