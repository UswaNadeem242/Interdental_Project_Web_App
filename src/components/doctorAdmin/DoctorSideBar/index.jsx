import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../../Constant";
import { Xmark } from "../../../icon/xmark";
import { Hamburger } from "../../../icon/hamburger";

export default function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (sm & md only) */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg "
          onClick={() => setIsOpen(true)}
        >
          <Hamburger className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 bottom-3 h-[calc(100vh-30px)] mt-4 mb-4 lg:ml-4 w-56 bg-white rounded-2xl transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Logo + Close button for sm & md */}
        <div className="w-full h-[72px] py-4 px-6 flex items-center relative">
          <img src="/assets/logo.png" alt="logo" className="w-[180px]" />
          <button
            className="lg:hidden p-2 absolute right-4"
            onClick={() => setIsOpen(false)}
          >
            <Xmark className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-4 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-poppins ${
                    isActive
                      ? "bg-secondaryBrand text-white font-semibold"
                      : "text-[#949494] hover:bg-gray-100 font-normal"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {Icon && (
                  <Icon
                    color={({ isActive }) => (isActive ? "white" : "#949494")}
                  />
                )}
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Overlay for sm & md */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
