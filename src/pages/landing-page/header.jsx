import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import ProfileDropdown from "../../components/dropdowns/ProfileDropdown";
import { navItems } from "../../Constant";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import ShoppingCart from "../../modals/ShoppingCartModal";
import NotificationsDropdown from "../../components/dropdowns/NotificationsDropdown";
import { BellIconSVG } from "../../icon/Bell";
import { showToast } from "../../store/toast-slice";
import { useDispatch } from "react-redux";
import Icons from "../../components/Icons";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);
  const { wishlistCount, cartCount, fetchWishlistCount, fetchCartCount, unreadNotificationsCount, fetchUnreadNotificationsCount } =
    useAuth();
  const [setIsActionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Get user from AuthContext instead of localStorage
  const { user } = useAuth();

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
  const handleNotifications = (e) => {
    e.stopPropagation();
    setNotificationsDropdown(!notificationsDropdown);
  };

  useEffect(() => {
    if (user) {
      // Don't fetch cart/wishlist/notifications for doctors (they have their own dashboard)
      if (user?.roles?.[0] === "DOCTOR") {
        return;
      }
      fetchWishlistCount();
      fetchCartCount();
      fetchUnreadNotificationsCount();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "top-0 w-full" : "top-4 w-[95%] sm:w-[92%] lg:w-[90%] max-w-screen-2xl mx-auto"
          }`}
      >
        {/* pill container */}
        <div
          className={`mx-auto flex items-center justify-between bg-white/95 ring-1 ring-black/5 backdrop-blur px-3 sm:px-5 md:px-6 py-2.5 transition-all duration-300 ${isScrolled ? "rounded-none" : "rounded-full"
            }`}
        >
          {/* Mobile menu button */}
          {/* shadow-lg */}
          <button
            className="inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition"
            aria-label="Open menu"
            onClick={toggleMobileMenu}
          >
            <Icons.MenuBars />
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
          <div className="hidden lg:flex items-center gap-4">
            {/* Show Dashboard button for logged-in doctors */}
            {user && user?.email && user?.roles[0] === "DOCTOR" ? (
              <button
                onClick={() => navigate("/doctor-admin/dashboard")}
                className="px-6 py-2.5 rounded-full bg-secondaryBrand text-white text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)] hover:bg-opacity-90 transition-colors"
              >
                Dashboard
              </button>
            ) : (
              <>
                {/* Cart Icon */}
                <div className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Icons.ShoppingCartIcon
                    className="cursor-pointer w-6 h-6"
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
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 text-xs font-bold text-white bg-secondaryBrand rounded-full flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>

                {/* Wishlist Icon */}
                <div
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
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Icons.WishlistHeart
                    className="w-6 h-6"
                    stroke={wishlistCount ? "#FF0000" : "#292D32"}
                    fill={wishlistCount ? "#FF0000" : "none"}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 text-xs font-bold text-white bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                      {wishlistCount}
                    </span>
                  )}
                </div>

                {/* Notifications Icon */}
                <div className="relative">
                  <button
                    onClick={handleNotifications}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                    data-bell-icon="true"
                  >
                    <BellIconSVG className="w-6 h-6 cursor-pointer" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 text-xs font-bold text-white bg-secondaryBrand rounded-full flex items-center justify-center shadow-lg">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>

                  {notificationsDropdown && (
                    <div className="absolute right-0 top-12 z-[100]">
                      <NotificationsDropdown
                        notificationsDropdown={notificationsDropdown}
                        setNotificationsDropdown={setNotificationsDropdown}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {/* Show profile dropdown only for non-doctors */}
            {user && user?.email && user?.roles[0] !== "DOCTOR" ? (
              <div className="flex flex-col relative">
                <div
                  data-profile-trigger="true"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex justify-between z-[100] items-center cursor-pointer w-[154px] h-[46px] border-[1px] border-[#0000000D] rounded-[35px] py-[4px] px-[2px] gap-2"
                >
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      alt="User Avatar"
                      className="w-8 h-8 shrink-0 rounded-full"
                    />
                  ) : (
                    <Icons.UserAvatar />
                  )}
                  <p className="font-poppins font-normal line-clamp-1 text-[14px]  leading-[21px] text-[#393A44]">
                    {user?.firstName} {user?.lastName}
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
            ) : null}
            {/* Show login/signup buttons only for non-authenticated users */}
            {!user || !user?.email ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-full bg-secondaryBrand text-white  whitespace-nowrap 800 text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="x-4 py-2 rounded-full   text-black text-sm whitespace-nowrap font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : null}
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
