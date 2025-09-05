export const CardComponet = ({ title, count, icon, fromDate, toDate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col">
      {/* Title */}
      <p className="font-poppins text-sm md:text-base font-medium text-gray-500">
        {title}
      </p>

      {/* Count + Icon */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <h2 className="font-poppins text-2xl md:text-3xl font-bold text-[#001D58]">
          {count}
        </h2>
        <div className="bg-[#94D3DD1A] p-3 md:p-4 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>

      <hr className="border-gray-200 w-full" />

      {/* Date */}
      <p className="font-poppins text-xs md:text-sm text-gray-400 mt-2">
        From {fromDate} {toDate}
      </p>
    </div>
  );
};
