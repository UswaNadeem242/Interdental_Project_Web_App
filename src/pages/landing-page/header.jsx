import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import ProfileDropdown from "../../components/dropdowns/ProfileDropdown";
import { navItems } from "../../Constant";
import { ChevronDownIcon, UsersIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "../../icon/ProfileIcon";
import { UserIcon } from "../../icon/UserIcon";

import ShoppingCart from "../../modals/ShoppingCartModal";
import NotificationsDropdown from "../../components/dropdowns/NotificationsDropdown";
import { BellIconSVG } from "../../icon/Bell";
import { showToast } from "../../store/toast-slice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlistCount, cartCount } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // const { user } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Retrieve user data from localStorage
  const userData = localStorage.getItem("users");
  const user = userData ? JSON.parse(userData) : null;

  // Debugging logs

  // Safely log firstName only if user exists
  if (user && user.firstName) {
    console.log(user.firstName);
  }

  const handleCart = () => {
    setIsModalOpen(true);
  };
  const handleWishlist = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      setIsActionModalOpen(true);
    }
  };
  const handleNotifications = () => {
    console.log("consle");

    if (user) {
      setNotificationsDropdown(!notificationsDropdown);
    } else {
      setIsActionModalOpen(true);
    }
  };
  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] md:w-[90%]">
        {/* pill container */}
        <div className="mx-auto flex items-center justify-between rounded-full bg-white/95  ring-1 ring-black/5 backdrop-blur px-3 sm:px-5 md:px-6 py-2.5">
          {/* Mobile menu button */}
          {/* shadow-lg */}
          <button
            className="inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition"
            aria-label="Open menu"
            onClick={toggleMobileMenu}
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path
                d="M1.62891 3.89404H20.3696M1.62891 10.0052H20.3696M1.62891 16.1163H20.3696"
                stroke="#434343"
                strokeWidth="1.83333"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                alt="Interdental Lab"
                className="h-5 w-auto sm:h-5 "
              />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[15px]">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "px-2.5 py-2 rounded-full transition text-sm whitespace-nowrap font-poppins",
                    "text-secondaryText ",
                    isActive ? "bg-background     font-semibold" : "",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => {
                  if (user && user?.email) {
                    handleCart();
                  } else {
                    dispatch(
                      showToast({
                        message: "Access denied! Please log in first",
                        type: "error",
                      }),
                    );
                  }
                }}
              >
                <path
                  d="M20.1654 17.2964H11.5597C10.7765 17.2908 10.018 17.022 9.40607 16.5333C8.79415 16.0445 8.36441 15.3641 8.18594 14.6015L6.81452 9.02667C6.68834 8.50903 6.68187 7.96943 6.7956 7.44891C6.90933 6.92839 7.14027 6.44066 7.47084 6.02282C7.80142 5.60497 8.22292 5.26802 8.70331 5.03757C9.18369 4.80713 9.7103 4.68927 10.2431 4.69295H21.5574C22.0902 4.68927 22.6168 4.80713 23.0972 5.03757C23.5775 5.26802 23.999 5.60497 24.3296 6.02282C24.6602 6.44066 24.8911 6.92839 25.0049 7.44891C25.1186 7.96943 25.1121 8.50903 24.9859 9.02667L23.6145 14.6152C23.4293 15.3873 22.9869 16.0734 22.3601 16.5606C21.7333 17.0479 20.9593 17.3074 20.1654 17.2964ZM10.2019 6.40724C9.9309 6.40807 9.66356 6.47021 9.41995 6.58902C9.17633 6.70782 8.96275 6.88021 8.79521 7.09326C8.62766 7.30632 8.5105 7.55452 8.45249 7.81929C8.39448 8.08405 8.39712 8.3585 8.46023 8.6221L9.83166 14.2107C9.92454 14.6023 10.1472 14.951 10.4634 15.2C10.7797 15.449 11.1709 15.5837 11.5734 15.5821H20.1654C20.5679 15.5837 20.9591 15.449 21.2753 15.2C21.5915 14.951 21.8142 14.6023 21.9071 14.2107L23.2785 8.6221C23.343 8.35839 23.3467 8.08347 23.2892 7.81815C23.2317 7.55282 23.1147 7.30405 22.9469 7.09065C22.7791 6.87725 22.5649 6.70483 22.3206 6.58643C22.0763 6.46803 21.8083 6.40675 21.5368 6.40724H10.2019Z"
                  fill="#434343"
                />
                <path
                  d="M7.82186 10.4877C7.62603 10.4854 7.4369 10.4161 7.28595 10.2913C7.13499 10.1665 7.0313 9.99385 6.99215 9.80196L5.76472 4.47396C5.65138 3.9886 5.37666 3.55608 4.98553 3.24716C4.59439 2.93823 4.10999 2.7712 3.61158 2.77339H2.49386C2.26653 2.77339 2.04852 2.68309 1.88777 2.52234C1.72702 2.36159 1.63672 2.14358 1.63672 1.91625C1.63672 1.68892 1.72702 1.4709 1.88777 1.31016C2.04852 1.14941 2.26653 1.05911 2.49386 1.05911H3.61158C4.49738 1.05601 5.35806 1.35338 6.05303 1.90263C6.748 2.45188 7.23619 3.22056 7.43786 4.08311L8.65843 9.41111C8.68485 9.52055 8.68927 9.63414 8.67144 9.74531C8.65361 9.85647 8.61387 9.96299 8.55455 10.0587C8.49522 10.1544 8.41748 10.2373 8.32585 10.3027C8.23421 10.3681 8.13049 10.4147 8.02072 10.4397C7.95629 10.4626 7.88964 10.4787 7.82186 10.4877ZM11.6961 24.7162C11.1537 24.7162 10.6234 24.5554 10.1723 24.254C9.72124 23.9526 9.36968 23.5242 9.16208 23.023C8.95448 22.5218 8.90016 21.9703 9.00599 21.4383C9.11183 20.9062 9.37306 20.4175 9.75666 20.0339C10.1403 19.6503 10.629 19.3891 11.161 19.2832C11.6931 19.1774 12.2446 19.2317 12.7458 19.4393C13.247 19.6469 13.6754 19.9985 13.9767 20.4495C14.2781 20.9006 14.439 21.4309 14.439 21.9734C14.439 22.7008 14.15 23.3985 13.6356 23.9129C13.1213 24.4273 12.4236 24.7162 11.6961 24.7162ZM11.6961 20.9174C11.49 20.9174 11.2885 20.9785 11.1171 21.093C10.9457 21.2076 10.8121 21.3704 10.7332 21.5608C10.6543 21.7513 10.6337 21.9608 10.6739 22.163C10.7141 22.3652 10.8134 22.5509 10.9591 22.6967C11.1049 22.8424 11.2906 22.9417 11.4928 22.9819C11.695 23.0222 11.9046 23.0015 12.095 22.9226C12.2855 22.8437 12.4482 22.7101 12.5628 22.5387C12.6773 22.3673 12.7384 22.1658 12.7384 21.9597C12.7384 21.6832 12.6286 21.4181 12.4332 21.2227C12.2377 21.0272 11.9726 20.9174 11.6961 20.9174ZM21.1727 24.7162C20.6302 24.7162 20.0999 24.5554 19.6489 24.254C19.1978 23.9526 18.8463 23.5242 18.6386 23.023C18.431 22.5218 18.3767 21.9703 18.4826 21.4383C18.5884 20.9062 18.8496 20.4175 19.2332 20.0339C19.6168 19.6503 20.1056 19.3891 20.6376 19.2832C21.1697 19.1774 21.7212 19.2317 22.2224 19.4393C22.7236 19.6469 23.1519 19.9985 23.4533 20.4495C23.7547 20.9006 23.9156 21.4309 23.9156 21.9734C23.9156 22.7008 23.6266 23.3985 23.1122 23.9129C22.5978 24.4273 21.9002 24.7162 21.1727 24.7162ZM21.1727 20.9174C20.9669 20.9187 20.766 20.981 20.5955 21.0964C20.425 21.2117 20.2925 21.375 20.2147 21.5655C20.1368 21.7561 20.1172 21.9655 20.1582 22.1672C20.1991 22.3689 20.299 22.554 20.445 22.6991C20.591 22.8442 20.7768 22.9427 20.9787 22.9824C21.1807 23.0221 21.39 23.001 21.58 22.9219C21.7701 22.8429 21.9324 22.7093 22.0467 22.538C22.1609 22.3668 22.2219 22.1655 22.2219 21.9597C22.2219 21.8222 22.1947 21.6861 22.1419 21.5592C22.0891 21.4323 22.0117 21.3171 21.9142 21.2202C21.8167 21.1234 21.7009 21.0467 21.5737 20.9948C21.4464 20.9428 21.3102 20.9165 21.1727 20.9174Z"
                  fill="#434343"
                />
                <path
                  d="M21.1735 20.9174H9.74946C9.04201 20.9174 8.36354 20.6363 7.8633 20.1361C7.36306 19.6359 7.08203 18.9574 7.08203 18.2499C7.08203 17.5425 7.36306 16.864 7.8633 16.3638C8.36354 15.8636 9.04201 15.5825 9.74946 15.5825H11.5666C11.7939 15.5825 12.0119 15.6728 12.1727 15.8336C12.3334 15.9943 12.4237 16.2123 12.4237 16.4397C12.4237 16.667 12.3334 16.885 12.1727 17.0458C12.0119 17.2065 11.7939 17.2968 11.5666 17.2968H9.74946C9.49667 17.2968 9.25424 17.3972 9.07549 17.576C8.89674 17.7547 8.79632 17.9972 8.79632 18.2499C8.79632 18.5027 8.89674 18.7452 9.07549 18.9239C9.25424 19.1027 9.49667 19.2031 9.74946 19.2031H21.1735C21.4008 19.2031 21.6188 19.2934 21.7796 19.4541C21.9403 19.6149 22.0306 19.8329 22.0306 20.0602C22.0306 20.2876 21.9403 20.5056 21.7796 20.6663C21.6188 20.8271 21.4008 20.9174 21.1735 20.9174Z"
                  fill="#434343"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 text-xs font-bold text-white bg-secondaryBrand rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <div className="relative">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => {
                  if (user && user?.email) {
                    handleWishlist();
                  } else {
                    dispatch(
                      showToast({
                        message: `Access denied! Please log in first`,
                        type: "error",
                      }),
                    );
                  }
                }}
              >
                <path
                  d="M12.8407 21.6973C12.5007 21.8173 11.9407 21.8173 11.6007 21.6973C8.7007 20.7073 2.2207 16.5773 2.2207 9.5773C2.2207 6.4873 4.7107 3.9873 7.7807 3.9873C9.6007 3.9873 11.2107 4.8673 12.2207 6.2273C13.2307 4.8673 14.8507 3.9873 16.6607 3.9873C19.7307 3.9873 22.2207 6.4873 22.2207 9.5773C22.2207 16.5773 15.7407 20.7073 12.8407 21.6973Z"
                  stroke={wishlistCount ? "#FF0000" : "#292D32"} // outline color
                  fill={wishlistCount ? "#FF0000" : "none"} // fill when active
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col relative">
              <button onClick={() => handleNotifications()}>
                {" "}
                <BellIconSVG />
              </button>

              {notificationsDropdown && (
                <div className="absolute right-0 top-12 mt-1 z-10">
                  <NotificationsDropdown
                    setNotificationsDropdown={setNotificationsDropdown}
                  />
                </div>
              )}
            </div>
            {user && user?.email ? (
              <div className="flex flex-col relative">
                <div
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex justify-between items-center cursor-pointer w-[154px] h-[46px] border-[1px] border-[#0000000D] rounded-[35px] py-[4px] px-[2px] gap-2"
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="38" height="38" rx="19" fill="#F8F8F8" />
                    <ellipse
                      cx="18.9997"
                      cy="14.2502"
                      rx="3.16667"
                      ry="3.16667"
                      stroke="#001D58"
                      stroke-width="1.1875"
                    />
                    <ellipse
                      cx="18.9997"
                      cy="22.9582"
                      rx="5.54167"
                      ry="3.16667"
                      stroke="#001D58"
                      stroke-width="1.1875"
                    />
                  </svg>
                  <p className="font-poppins font-normal text-[14px]  leading-[21px] text-[#393A44]">
                    {user?.email.split("@")[0].charAt(0).toUpperCase() +
                      user.email.split("@")[0].slice(1)}
                  </p>
                  <ChevronDownIcon className="w-5 h-5 pr-2" />
                </div>
                {profileDropdown && (
                  <div className="absolute right-0 top-12 mt-2 z-10">
                    <ProfileDropdown
                      isModalOpen={profileDropdown}
                      setIsModalOpen={setProfileDropdown}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => navigate("/login")}
                  // className="px-4 py-2 rounded-full bg-gray-100 text-secondaryText text-sm whitespace-nowrap font-semibold"
                  className="px-4 py-2 rounded-full bg-secondaryBrand text-white  whitespace-nowrap 800 text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  // className="px-4 py-2 rounded-full bg-secondaryBrand text-white  whitespace-nowrap 800 text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]"
                  className="x-4 py-2 rounded-full   text-black text-sm whitespace-nowrap font-semibold"
                >
                  sign up
                </button>
              </>
            )}
          </div>

          {/* Spacer to keep layout balanced on desktop when center nav grows */}
          <div className="w-10 lg:hidden" />
        </div>

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src="/assets/logo.png"
                  alt="Interdental Lab"
                  className="h-5 w-auto"
                />
              </NavLink>
              <button
                onClick={toggleMobileMenu}
                className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3 w-full h-screen  bg-white">
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-blue-900 text-white font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full  text-black font-semibold"
                >
                  sign up
                </button>
              </div>

              <nav className="space-y-2 ">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "block w-full px-4 py-3 rounded-xl border text-left",
                        "border-gray-200 hover:bg-gray-50",
                        isActive
                          ? "bg-gray-50 text-blue-700 font-semibold"
                          : "text-gray-700",
                      ].join(" ")
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
      {isModalOpen && (
        <ShoppingCart
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default Header;
