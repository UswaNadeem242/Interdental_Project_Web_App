import { Crown } from "../../icon/Crown";
import { DoctorIcon } from "../../icon/DoctorIcon";
import { Revenue } from "../../icon/Revenue";

export const CardComponet = ({ title, count, icon, fromDate, toDate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col flex-1">
      {/* Title */}
      <p className="font-poppins text-xs md:text-sm font-medium text-gray-500">
        {title}
      </p>

      {/* Count + Icon */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <h2 className="font-poppins text-2xl md:text-3xl font-bold text-[#001D58]">
          {count}
        </h2>
        <div className="bg-[#94D3DD1A] p-3 md:p-4 rounded-full flex items-center justify-center">
          {title === "totalDoctor" ? (
            <DoctorIcon />
          ) : title === "activeSubscription" ? (
            <Crown />
          ) : title === "totalRevenue" ? (
            <Revenue />
          ) : null}
        </div>
      </div>

      {/* <hr className="border-gray-200 w-full" /> */}

      {/* Date */}
      {/* <p
        className="font-poppins text-[10px] whitespace-nowrap  tracking-tight
 text-gray-400 mt-2"
      >
        From {fromDate}&emsp;{toDate}
      </p> */}
    </div>
  );
};
