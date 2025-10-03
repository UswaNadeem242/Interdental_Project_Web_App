import React from "react";

const GraphStatuses = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#00A5FF]"></div>
        <span className="text-sm font-medium text-primaryText">Pending</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#435058]"></div>
        <span className="text-sm font-medium text-primaryText">In Progress</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#00AF10]"></div>
        <span className="text-sm font-medium text-primaryText">Completed</span>
      </div>
    </div>
  );
};

export default GraphStatuses;
