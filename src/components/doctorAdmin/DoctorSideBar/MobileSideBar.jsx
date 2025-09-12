import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { menuItems } from "../../../Constant";
import { Xmark } from "../../../icon/xmark";
import { Hamburger } from "../../../icon/hamburger";

const MobileSidebar = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-5 text-black rounded-md"
        >
          {isOpen ? "" : <Hamburger />}
        </button>
      </div>

      {/* Mobile Side Panel */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[220px] bg-white  rounded-r-2xl shadow-lg transition-transform duration-300 z-40 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div>
          <div className="w-full h-[72px] py-4 px-4 flex items-center justify-between">
            <img src="/assets/logo.png" alt="logo" className="w-[150px]" />
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <Xmark /> : ""}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 p-4">
          {items?.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname.startsWith(item.path) ||
              (item.name === "Orders" && location.pathname.includes("/Details"));
            console.log('isActive:', isActive);
            return (
              // <NavLink
              //   key={item.path}
              //   to={item.path}
              //   onClick={() => setIsOpen(false)}
              // >
              //   {({ isActive }) => (
              //     <div
              //       className={`
              //         flex items-center gap-3 px-3 h-[44px] rounded-lg text-sm font-poppins
              //         ${isActive
              //           ? "bg-secondaryBrand text-white"
              //           : "text-[#949494] hover:bg-gray-100"
              //         }
              //       `}
              //     >
              //       {Icon && <Icon color={isActive ? "white" : "#949494"} />}
              //       {item.name}
              //     </div>
              //   )}
              // </NavLink>
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

      {/* Overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
