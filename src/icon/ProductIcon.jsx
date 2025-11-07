import React from "react";

function ProductIcon({ color = "#949494", ...props }) {
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M2.64172 6.2002L10.0001 10.4585L17.3084 6.2252"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18.0085V10.4502"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.27503 2.06658L3.82503 4.53324C2.8167 5.09158 1.9917 6.49158 1.9917 7.64158V12.3499C1.9917 13.4999 2.8167 14.8999 3.82503 15.4582L8.27503 17.9332C9.22503 18.4582 10.7834 18.4582 11.7334 17.9332L16.1834 15.4582C17.1917 14.8999 18.0167 13.4999 18.0167 12.3499V7.64158C18.0167 6.49158 17.1917 5.09158 16.1834 4.53324L11.7334 2.05824C10.775 1.53324 9.22503 1.53324 8.27503 2.06658Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default ProductIcon;
