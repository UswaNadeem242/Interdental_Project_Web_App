import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../../Constant";

export default function DoctorSidebar() {
    const [isOpen, setIsOpen] = useState(false);

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

                <div className="flex flex-col gap-4 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 h-11  rounded-lg text-sm font-poppins ${isActive
                                        ? "bg-secondaryBrand text-white font-semibold"
                                        : "text-[#949494] hover:bg-gray-100 font-normal"
                                    }`
                                }
                            >
                                {Icon && <Icon color={({ isActive }) => (isActive ? "white" : "#949494")} />}
                                {item.name}
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
}
