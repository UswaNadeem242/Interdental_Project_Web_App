import { Crown } from "../../icon/Crown";
import { DoctorIcon } from "../../icon/DoctorIcon";
import { Revenue } from "../../icon/Revenue";

export const CardComponet = ({ title, count, icon,p }) => {

  console.log("title", title);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col flex-1">
      <p className="font-poppins text-xs md:text-sm font-semibold text-gray-400">
        {title}
      </p>

      <div className="flex items-center justify-between mt-4 mb-4">
        <h2 className="font-poppins text-2xl md:text-3xl font-bold text-[#001D58]">
          {count}
        </h2>
        <div className="bg-[#94D3DD1A] p-3 md:p-4 rounded-full flex items-center justify-center">
          {icon}
          {/* {title === "Registered Doctors" ? (
            <DoctorIcon />
          ) : title === "Active Subscriptions" ? (
            <Crown />
          ) : title === "Revenue" ? (
            <Revenue />
          ) : null} */}
        </div>
      </div>

    </div>
  );
};
