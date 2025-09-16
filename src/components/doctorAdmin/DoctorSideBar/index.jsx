import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { menuItems } from "../../../Constant";
import { Xmark } from "../../../icon/xmark";
import { Hamburger } from "../../../icon/hamburger";

export default function DoctorSidebar({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  console.log('location:', location);


  return (
    <>
      <div
        className={`fixed top-0 left-0 bottom-3 h-[calc(100vh-30px)]  mt-4 mb-4 ml-4  w-56 bg-white rounded-2xl transition-transform duration-300 z-10  
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:block hidden`}
      >
        <div className="w-full h-[72px] py-4 px-6 flex items-center">
          <img src="/assets/logo.png" alt="logo" className="w-[180px]" />
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-4 p-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname.startsWith(item.path) ||
              (item.name === "Orders" && location.pathname.includes("/details") || item.name === "Claim Requests" && location.pathname.includes("/patient-form") || item.name === "Claim Requests" && location.pathname.includes("/term-condition"));
            console.log('isActive:', isActive);

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
