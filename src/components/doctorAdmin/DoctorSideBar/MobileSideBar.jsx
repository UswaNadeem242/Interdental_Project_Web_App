import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../../Constant";
import { Xmark } from "../../../icon/xmark";
import { Hamburger } from "../../../icon/hamburger";
import { LogoutIcon } from "../../../icon/LogoutIcon";
import { useAuth } from "../../../auth/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfile } from "../../../api/doctorDasboard";
import { setProfileData } from "../../../store/slices/profileData-slice";

const MobileSidebar = ({ items, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const profileImage = useSelector((state) => state.profile?.profileImage);
  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );

  const roleLink =
    role === "doctor"
      ? "/doctor-admin/profile"
      : role === "admin"
        ? "/admin-panel/profile-info"
        : "/patient-admin/profile-settings";

  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData?.id;

      const fetchDoctorProfile = async () => {
        const response = await getDoctorProfile(userId);

        if (response.status === 200) {
          dispatch(setProfileData(response?.data?.data));
        }
        setDoctorProfile(response?.data?.data);
      };
      fetchDoctorProfile();
    }
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>

      <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 text-black rounded-md flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <Xmark /> : <Hamburger />}
        </button>
      </div>
      <div
        className={`
          fixed top-0 left-0 h-screen w-[220px] bg-white rounded-r-2xl shadow-lg transition-transform duration-300 z-[999] lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div>
            <div className="w-full h-[72px] py-4 px-4 flex items-center justify-between border-b border-gray-200">
              <img src="/assets/logo.png" alt="logo" className="" />
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <Xmark /> : ""}
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <NavLink
              to={roleLink}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {profileImage || doctorProfile?.profileImage ? (
                <img
                  src={profileImage || doctorProfile?.profileImage}
                  alt={`${doctorProfile?.firstName || ""} ${doctorProfile?.lastName || ""}`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-secondaryBrand flex items-center justify-center text-white font-semibold">
                  {doctorProfile
                    ? `${doctorProfile.firstName?.[0] || ""}${doctorProfile.lastName?.[0] || ""}`.toUpperCase()
                    : "?"}
                </div>
              )}
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {doctorProfile &&
                    `${doctorProfile.firstName} ${doctorProfile.lastName}`}
                </p>
                <p className="text-xs text-gray-500 truncate">{doctorProfile?.email}</p>
              </div>
            </NavLink>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-4">
              {items?.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location.pathname.startsWith(item.path) ||
                  (item.name === "Orders" && location.pathname.includes("/order-details") || item.name === "Claim Requests" && location.pathname.includes("/patient-form") || item.name === "Claim Requests" && location.pathname.includes("/term-condition") || item.name === "Orders" && location.pathname.includes("/place-order"));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-3 h-[44px] rounded-lg text-sm font-poppins
                    ${isActive
                          ? "bg-secondaryBrand text-white"
                          : "text-[#949494] hover:bg-gray-100"
                        }`}
                    >
                      {Icon && <Icon color={isActive ? "white" : "#949494"} />}
                      {item.name}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 h-[44px] w-full rounded-lg text-sm font-poppins text-[#949494] hover:bg-gray-100 transition-colors"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MobileSidebar;
