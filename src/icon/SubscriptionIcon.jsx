import React from "react";

function SubscriptionIcon({ color = "#949494", className = "", ...props }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M13.9167 15.8168H6.08338C5.73338 15.8168 5.34171 15.5418 5.22504 15.2085L1.77504 5.55846C1.28338 4.17513 1.85838 3.75013 3.04171 4.60013L6.29171 6.92513C6.83338 7.30013 7.45004 7.10846 7.68338 6.50013L9.15004 2.5918C9.61671 1.3418 10.3917 1.3418 10.8584 2.5918L12.325 6.50013C12.5584 7.10846 13.175 7.30013 13.7084 6.92513L16.7584 4.75013C18.0584 3.8168 18.6834 4.2918 18.15 5.80013L14.7834 15.2251C14.6584 15.5418 14.2667 15.8168 13.9167 15.8168Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.41663 18.3335H14.5833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91663 11.6665H12.0833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SubscriptionIcon;
