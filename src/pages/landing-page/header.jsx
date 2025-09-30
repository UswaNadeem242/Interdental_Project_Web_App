import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import ProfileDropdown from "../../components/dropdowns/ProfileDropdown";
import { navItems } from "../../Constant";
import { ChevronDownIcon, UsersIcon } from "@heroicons/react/24/outline";
import ProfileIcon from "../../icon/ProfileIcon";
import { UserIcon } from "../../icon/UserIcon";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    console.log(user.firstName, "sarhey de oghai");
  }

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
                    "px-3.5 py-2 rounded-full transition text-sm whitespace-nowrap font-poppins",
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
            {user && user?.email ? (
              <div className="flex flex-col relative">
                <div
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex justify-center items-center cursor-pointer w-[154px] h-[46px] border-[1px] border-[#0000000D] rounded-[35px] py-[4px] px-[2px] gap-2"
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
                  <ChevronDownIcon className="w-5 h-5" />
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
                  className="px-4 py-2 rounded-full bg-gray-100 text-secondaryText text-sm whitespace-nowrap font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-full bg-secondaryBrand text-white  whitespace-nowrap 800 text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]"
                >
                  Register Now
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
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <img src="/assets/logo.png" alt="Interdental Lab" className="h-5 w-auto" />
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
                  className="flex-1 py-2.5 rounded-full bg-gray-100 text-gray-700 font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-blue-900 text-white font-semibold"
                >
                  Register Now
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
                        isActive ? "bg-gray-50 text-blue-700 font-semibold" : "text-gray-700",
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
    </>
  );
};

export default Header;
