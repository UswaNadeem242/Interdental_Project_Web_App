import { useNavigate } from "react-router-dom";
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
      <div className="grid grid-cols-12 items-center gap-2 py-3">

        <div className="col-span-12 md:col-span-4">
          <h1 className="text-[#1A2D33] font-poppins text-lg md:text-2xl capitalize font-bold">
            Place Order
          </h1>
        </div>
        <div className="hidden md:block col-span-4"></div>
        {/* <div className="hidden md:flex col-span-1 justify-center ">
          <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
             <BellIcon className="w-5 h-5" />
          </button>
        </div> */}
        <div className="col-span-12 md:col-span-3 hidden md:flex items-center justify-center bg-white px-4 py-4 rounded-full gap-3">
          <img src="/assets/user.png" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold">Bransim Hanry</p>
            <p className="text-xs text-gray-500">hanry463@gmail.com</p>
          </div>
           <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
            {/* Replace with your bell icon */}
            <BellIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden md:flex col-span-1 justify-center">
          <button className="text-gray-700 bg-white w-10 h-10 rounded-full text-center grid place-items-center">
            {/* Replace with your bell icon */}
            <LogoutIcon />
          </button>
        </div>
      </div>

    </>

  );
};

export default DoctorHeader;
