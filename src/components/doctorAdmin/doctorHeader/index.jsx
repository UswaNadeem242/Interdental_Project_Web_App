import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { BellIcon } from "../../../icon/Bell";
import { LogoutIcon } from "../../../icon/LogoutIcon";
import usePageTitle from "../../../Hooks/usePageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setProfileData } from "../../../store/slices/profileData-slice";
import { getDoctorProfile } from "../../../api/doctorDasboard";

const DoctorHeader = ({ title, subTitle, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [doctorProfile, setDoctorProfile] = useState(null);
  const pageTitle = usePageTitle();
  const displayTitle = pageTitle?.toLowerCase().includes("dashboard");

  const roleLink =
    // role === "doctor"
    //   ? "/doctor-admin/profile"
    //   : "/patient-admin/profile-settings";
    role === "doctor"
      ? "/doctor-admin/profile"
      : role === "admin"
      ? "/admin-panel/profile-info "
      : "/patient-admin/profile-settings";
  const profileImage = useSelector((state) => state.profile?.profileImage);
  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );

  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      const fetchDoctorProfile = async () => {
        const response = await getDoctorProfile(userId);

        if (response.status === 200) {
          dispatch(setProfileData(response.data.data));
        }
        setDoctorProfile(response.data.data);
      };
      fetchDoctorProfile();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          <h1 className="text-primaryText font-poppins text-lg md:text-2xl capitalize font-bold">
            {displayTitle
              ? `Welcome back ${doctorProfile?.firstName || ""} ${
                  doctorProfile?.lastName || ""
                }`
              : pageTitle}
          </h1>
          {location.pathname !== "/patient-admin/profile-settings" &&
            location.pathname !== "/patient-admin/term-condition" &&
            location.pathname !== "/patient-admin/claim-request" &&
            location.pathname !==
              "/patient-admin/claim-request/claim-request" && (
              <p className="text-secondaryText text-sm font-normal font-poppins">
                You have{" "}
                <span className="text-secondaryBrand font-normal">
                  2 Unread
                </span>{" "}
                Notifications
              </p>
            )}{" "}
        </div>
        <div className="hidden md:flex flex-1"></div>
        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full gap-3">
          {/* <img
            src={
              profileImage ||
              doctorProfile?.profileImage ||
              "/default-avatar.png"
            }
            alt="userImg"
            className="w-10 h-10 rounded-full"
          /> */}

          {/*  */}
          {profileImage || doctorProfile?.profileImage ? (
            <img
              src={profileImage || doctorProfile?.profileImage}
              alt={`${doctorProfile?.firstName || ""} ${
                doctorProfile?.lastName || ""
              }`}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondaryBrand flex items-center justify-center text-white font-semibold">
              {doctorProfile
                ? `${doctorProfile.firstName?.[0] || ""}${
                    doctorProfile.lastName?.[0] || ""
                  }`.toUpperCase()
                : "?"}
            </div>
          )}

          {/*  */}
          <NavLink to={roleLink} className="flex flex-col justify-center">
            <p className="text-sm font-semibold">
              {doctorProfile &&
                `${doctorProfile.firstName} ${doctorProfile.lastName}`}
            </p>
            <p className="text-xs text-gray-500">{doctorProfile?.email}</p>
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
