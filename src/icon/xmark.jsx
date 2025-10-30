import React from "react";

export const Xmark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export const Xmark2 = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="8" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="35"
        rx="7.5"
        stroke="black"
        stroke-opacity="0.1"
      />
      <path
        d="M18 16.6669L22.6669 12L24 13.3331L19.3331 18L24 22.6669L22.6669 24L18 19.3331L13.3331 24L12 22.6669L16.6669 18L12 13.3331L13.3331 12L18 16.6669Z"
        fill="#4F4F4F"
      />
    </svg>
  );
};
