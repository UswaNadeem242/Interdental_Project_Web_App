import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { BellIconSVG } from "../../../icon/Bell";
import { LogoutIcon } from "../../../icon/LogoutIcon";
import usePageTitle from "../../../Hooks/usePageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";
import { setProfileData } from "../../../store/slices/profileData-slice";
import { getDoctorProfile } from "../../../api/doctorDasboard";
import NotificationsDropdown from "../../dropdowns/NotificationsDropdown";

// Constants
const ROLE_LINKS = {
  doctor: "/doctor-admin/profile",
  admin: "/admin-panel/profile",
  default: "/patient-admin/profile-settings",
};

const DoctorHeader = ({ title, subTitle, role }) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, unreadNotificationsCount, fetchUnreadNotificationsCount } =
    useAuth();
  const pageTitle = usePageTitle();

  // Redux selectors
  const profileImage = useSelector((state) => state.profile?.profileImage);
  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );

  // State
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);

  // Use Redux profileData when available, fallback to doctorProfile from state
  const currentProfile = profileData && Object.keys(profileData).length > 0 
    ? profileData 
    : doctorProfile;

  // Memoized values
  const user = useMemo(() => {
    const userData = localStorage.getItem("users");
    return userData ? JSON.parse(userData) : null;
  }, []);

  const roleLink = useMemo(() => {
    return ROLE_LINKS[role] || ROLE_LINKS.default;
  }, [role]);

  const displayTitle = useMemo(() => {
    return pageTitle?.toLowerCase().includes("dashboard");
  }, [pageTitle]);

  const displayName = useMemo(() => {
    if (displayTitle && currentProfile) {
      return `Welcome back ${currentProfile.firstName || ""} ${
        currentProfile.lastName || ""
      }`.trim();
    }
    return pageTitle;
  }, [displayTitle, currentProfile, pageTitle]);

  const profileInitials = useMemo(() => {
    if (!currentProfile) return "?";
    const first = currentProfile.firstName?.[0] || "";
    const last = currentProfile.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [currentProfile]);

  // Handlers
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleNotifications = useCallback(() => {
    if (user) {
      setNotificationsDropdown((prev) => !prev);
    }
  }, [user]);

  // Fetch doctor profile
  const fetchProfile = useCallback(
    async (userId) => {
      try {
        const response = await getDoctorProfile(userId);
        if (response.status === 200) {
          const profileData = response?.data?.data;
          dispatch(setProfileData(profileData));
          setDoctorProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    },
    [dispatch]
  );

  // Initialize profile on mount
  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  // Fetch notifications count on mount
  useEffect(() => {
    if (user) {
      fetchUnreadNotificationsCount();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex flex-1 items-center justify-between gap-2 lg:gap-4 min-w-0">
        {/* Page Title */}
        <div className="flex-1 min-w-0 lg:flex-none">
          <h1 className="text-primaryText font-poppins text-lg md:text-xl lg:text-2xl capitalize font-bold truncate">
            {displayName}
          </h1>
        </div>

        {/* Spacer - Only on large screens */}
        <div className="hidden lg:flex flex-1" />

        {/* Profile Section */}
        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full gap-3 flex-shrink-0">
          {/* Profile Image or Initials */}
          {profileImage || currentProfile?.profileImage ? (
            <img
              src={profileImage || currentProfile.profileImage}
              alt={
                currentProfile
                  ? `${currentProfile.firstName} ${currentProfile.lastName}`
                  : "User"
              }
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondaryBrand flex items-center justify-center text-white font-semibold">
              {profileInitials}
            </div>
          )}

          {/* Profile Info */}
          <NavLink to={roleLink} className="flex flex-col justify-center">
            <p className="text-sm font-semibold">
              {currentProfile &&
                `${currentProfile.firstName} ${currentProfile.lastName}`}
            </p>
            <p className="text-xs text-gray-500">{currentProfile?.email}</p>
          </NavLink>

          {/* Notifications */}
          <div className="relative">
            <button
              className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center"
              onClick={handleNotifications}
              data-bell-icon="true"
            >
              <BellIconSVG className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 text-xs font-bold text-white bg-secondaryBrand rounded-full flex items-center justify-center shadow-lg">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="hidden md:flex">
          <button
            className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {notificationsDropdown && (
        <div className="absolute right-16 top-20 mt-1 z-10">
          <NotificationsDropdown
            notificationsDropdown={notificationsDropdown}
            setNotificationsDropdown={setNotificationsDropdown}
          />
        </div>
      )}
    </>
  );
};

export default DoctorHeader;
