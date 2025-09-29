import React from "react";

const DurationSelection = ({ selectedTimePeriod, onTimePeriodChange }) => {
  return (
    <div className="flex flex-col items-end justify-start">
      <div className="bg-white border border-gray-300 rounded-lg p-3 min-w-[140px]">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="timePeriod"
              value="week"
              checked={selectedTimePeriod === "week"}
              onChange={(e) => onTimePeriodChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Weekly</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="timePeriod"
              value="month"
              checked={selectedTimePeriod === "month"}
              onChange={(e) => onTimePeriodChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Monthly</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="timePeriod"
              value="year"
              checked={selectedTimePeriod === "year"}
              onChange={(e) => onTimePeriodChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Yearly</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DurationSelection;
