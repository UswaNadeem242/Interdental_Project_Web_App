import React from "react";

const GraphStatuses = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <span className="text-sm font-medium text-gray-600">Pending</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-sm font-medium text-gray-600">In Progress</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm font-medium text-gray-600">Completed</span>
      </div>
    </div>
  );
};

export default GraphStatuses;
