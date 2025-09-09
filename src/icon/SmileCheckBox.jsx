import React from "react";

export const SmileCheckBox = ({ selected, design }) => {
  return (
    <svg
      className={`w-4 h-4 text-blue-600 ${
        selected.includes(design) ? "block" : "hidden"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};
