import React from "react";

const Icons = {
  ChevronDown: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
        fill={fill}
      />
    </svg>
  ),

  Close: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Success: ({ className = "w-8 h-8", fill = "white", ...props }) => (
    <svg
      width="34"
      height="24"
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2.52539 12L12.1632 21.2631L31.4728 2.73682"
        stroke={fill}
        strokeWidth="4.63158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Plus: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
        d="M10 4V16M4 10H16"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Minus: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
        d="M4 10H16"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Delete: ({ className = "w-5 h-5", fill = "#ef4444", ...props }) => (
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
        d="M7.5 2.5H12.5M2.5 5H17.5M15.833 5L15.273 14.025C15.213 15.183 15.183 15.762 14.929 16.190C14.704 16.571 14.363 16.873 13.953 17.055C13.493 17.258 12.912 17.258 11.752 17.258H8.248C7.088 17.258 6.508 17.258 6.047 17.055C5.637 16.873 5.296 16.571 5.071 16.190C4.817 15.762 4.787 15.183 4.727 14.025L4.167 5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Edit: ({ className = "w-5 h-5", fill = "#6b7280", ...props }) => (
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
        d="M14.166 2.5C14.416 2.25 14.756 2.109 15.116 2.109C15.476 2.109 15.816 2.25 16.066 2.5C16.316 2.75 16.457 3.09 16.457 3.45C16.457 3.81 16.316 4.15 16.066 4.4L5.833 14.633L2.5 15.5L3.366 12.167L14.166 2.5Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Cart: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  User: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21M16 7C16 9.2 14.2 11 12 11S8 9.2 8 7 9.8 3 12 3 16 4.8 16 7Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Email: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points="22,6 12,13 2,6" stroke={fill} strokeWidth="2" />
    </svg>
  ),

  Phone: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M22 16.92V19.92C22 20.52 21.39 20.99 20.83 20.92C13.1 20.16 6.84 13.9 6.08 6.17C6.01 5.61 6.48 5 7.08 5H10.08C10.6 5 11 5.4 11 5.92C11 7.57 11.26 9.15 11.72 10.63C11.86 11.06 11.74 11.54 11.41 11.86L9.9 13.37C11.07 15.61 12.39 16.93 14.63 18.1L16.14 16.59C16.46 16.26 16.94 16.14 17.37 16.28C18.85 16.74 20.43 17 22.08 17C22.6 17 23 17.4 23 17.92Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Location: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61 4.79 5.79 7.17 5.79C9.04 5.79 10.71 6.88 12 8.14C13.29 6.88 14.96 5.79 16.83 5.79C19.21 5.79 21 7.61 21 10Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C13.66 13 15 11.66 15 10S13.66 7 12 7 9 8.34 9 10 10.34 13 12 13Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  CreditCard: ({ className = "w-6 h-6", fill = "#4B4B4B", ...props }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="1"
        y="4"
        width="22"
        height="16"
        rx="2"
        ry="2"
        stroke={fill}
        strokeWidth="2"
      />
      <line x1="1" y1="10" x2="23" y2="10" stroke={fill} strokeWidth="2" />
    </svg>
  ),

  Check: ({ className = "w-5 h-5", fill = "#10b981", ...props }) => (
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
        d="M16.67 6.25L8.33 14.58L4.17 10.42"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Warning: ({ className = "w-5 h-5", fill = "#f59e0b", ...props }) => (
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
        d="M8.485 2.495C9.084 1.424 10.916 1.424 11.515 2.495L18.326 14.497C18.884 15.49 18.16 16.75 17.01 16.75H3.99C2.84 16.75 2.116 15.49 2.674 14.497L8.485 2.495Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.5V10.833M10 14.167H10.008"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Error: ({ className = "w-5 h-5", fill = "#ef4444", ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="10" cy="10" r="8" stroke={fill} strokeWidth="1.5" />
      <path
        d="M12 8L8 12M8 8L12 12"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Info: ({ className = "w-5 h-5", fill = "#3b82f6", ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="10" cy="10" r="8" stroke={fill} strokeWidth="1.5" />
      <path
        d="M10 13.333V10M10 6.667H10.008"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Loading: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} animate-spin`}
      {...props}
    >
      <path
        d="M10 2V6M10 14V18M18 10H14M6 10H2M15.657 4.343L12.828 7.172M7.172 12.828L4.343 15.657M15.657 15.657L12.828 12.828M7.172 7.172L4.343 4.343"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Eye: {
    Open: ({ className = "w-5 h-5", fill = "#808080", ...props }) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Closed: ({ className = "w-5 h-5", fill = "#808080", ...props }) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <path
          d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="1"
          y1="1"
          x2="23"
          y2="23"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  Arrow: {
    Up: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
          d="M15 12.5L10 7.5L5 12.5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Down: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
          d="M5 7.5L10 12.5L15 7.5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Left: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
          d="M12.5 15L7.5 10L12.5 5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Right: ({ className = "w-5 h-5", fill = "#4B4B4B", ...props }) => (
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
          d="M7.5 5L12.5 10L7.5 15"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export default Icons;
