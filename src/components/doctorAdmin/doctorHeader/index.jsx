import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { BellIcon } from "../../../icon/Bell";
import { LogoutIcon } from "../../../icon/LogoutIcon";

const DoctorHeader = ({ title, subTitle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <h1 className="text-[#1A2D33] font-poppins text-lg md:text-2xl capitalize font-bold">
          Place Order
        </h1>
        <div className="hidden md:flex flex-1"></div>
        <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full gap-3">
          <img src="/assets/user.png" className="w-10 h-10 rounded-full" />
          <NavLink to="/doctorAdmin/profile" className="flex flex-col justify-center">
            <p className="text-sm font-semibold">Bransim Hanry</p>
            <p className="text-xs text-gray-500">hanry463@gmail.com</p>
          </NavLink>
          <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
            <BellIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex">
          <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
            <LogoutIcon />
          </button>
        </div>
      </div>


    </>

  );
};

export default DoctorHeader;
