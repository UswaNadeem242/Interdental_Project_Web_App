import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import ProfileDropdown from "../../components/dropdowns/ProfileDropdown";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { user } = useAuth();
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <header className="sticky top-4 sm:top-6 md:top-8 z-50 w-full max-w-[95%] sm:max-w-[90%] mx-auto rounded-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white shadow-md">
      {/* Hamburger menu for mobile */}
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex lg:hidden cursor-pointer"
        onClick={toggleMobileMenu}
      >
        <path
          d="M1.62891 3.89404H20.3696M1.62891 10.0052H20.3696M1.62891 16.1163H20.3696"
          stroke="#434343"
          strokeWidth="1.83333"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </svg>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <NavLink
          to="/"
          className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900"
        >
          Interdental <span className="text-blue-300">Lab</span>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4 lg:space-x-6 text-base lg:text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/patient"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          Patient
        </NavLink>
        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          Doctor
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
              : "hover:text-blue-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-full"
          }
        >
          Contact Us
        </NavLink>
      </nav>

      {/* Desktop buttons */}
      <div className="hidden lg:flex space-x-3 lg:space-x-4">
        {user && user?.email ? (
          <div className="flex flex-col relative">
            <div
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex justify-center items-center cursor-pointer w-[154px] h-[46px] border-[1px] border-[#0000000D] rounded-[35px] py-[4px] px-[2px] gap-[4px]"
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

              <p className="font-poppins font-normal text-[14px] w-[80px] leading-[21px] text-[#393A44]">
                {user?.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
              </p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 6L7.99967 10L12.6663 6"
                  stroke="#001D58"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-block px-3 sm:px-4 py-1 sm:py-2 font-semibold border bg-gray-100 text-gray-500 rounded-full border-2 hover:bg-blue-100 text-sm sm:text-base"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-600 text-sm sm:text-base"
            >
              Register Now
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-0 w-full h-screen bg-white shadow-md lg:hidden flex flex-col py-6 px-6 space-y-4 ">
          {/* Logo & Close */}
          <div className="flex justify-between items-center mb-4  ">
            <NavLink
              to="/"
              className="text-lg font-bold text-blue-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Interdental <span className="text-blue-300">Lab</span>
            </NavLink>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Auth buttons */}
          <div className="flex w-full justify-between mb-6">
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className=" w-[48%] py-2 bg-blue-900 text-white rounded-full font-semibold"
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setIsMobileMenuOpen(false);
              }}
              className="w-[48%] py-2 border border-gray-300 rounded-full font-semibold text-gray-600 hover:bg-gray-100"
            >
              Sign Up
            </button>
          </div>

          {/* Menu links */}
          <NavLink
            to="/"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/patient"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Patient
          </NavLink>
          <NavLink
            to="/doctor"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Doctor
          </NavLink>
          <NavLink
            to="/about-us"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className="w-full py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 pl-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
