export const CardComponet = ({ title, count, icon, fromDate, toDate }) => {
  return (
    <div className="bg-[#FFFFFF]  rounded-2xl">
      <div className="flex flex-row p-6">
        <div className="flex-col">
          <p className="font-poppins text-sm font-medium text-gray-500 ">
            {title}
          </p>
          <h2 className="font-poppins text-3xl font-bold text-[#001D58] pt-4">
            {count}
          </h2>
        </div>
        <div>
          <div className="bg-[#94D3DD1A] p-3 rounded-full ml-8 mt-6">
            {icon}
          </div>
        </div>
      </div>
      <hr className="border-gray-200 w-full" />
      <p className="font-poppins text-xs text-gray-400 mt-2 m-4 ">
        From {fromDate} {toDate}
      </p>
    </div>
  );
};
