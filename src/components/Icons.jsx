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

  ArrowRight: ({ className = "w-6 h-6", fill = "currentColor", ...props }) => (
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
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Upload: ({ className = "w-10 h-10", fill = "#001D58", ...props }) => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="40" height="40" rx="8" fill={fill} fillOpacity="0.1" />
      <path
        d="M20 12V28M20 12L15 17M20 12L25 17"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  UploadIcon: ({ className = "w-4 h-4", stroke = "#001D58", ...props }) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12.5626 8.97363V11.3666C12.5626 11.6839 12.4366 11.9883 12.2122 12.2127C11.9878 12.437 11.6834 12.5631 11.3661 12.5631H2.99068C2.67335 12.5631 2.36902 12.437 2.14463 12.2127C1.92025 11.9883 1.79419 11.6839 1.79419 11.3666V8.97363"
        stroke={stroke}
        strokeWidth="1.19649"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1704 4.78517L7.17922 1.79395L4.18799 4.78517"
        stroke={stroke}
        strokeWidth="1.19649"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.17871 1.79395V8.97289"
        stroke={stroke}
        strokeWidth="1.19649"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  FileIcon: ({ className = "w-10 h-10", fill = "#001D58", ...props }) => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="40" height="40" rx="8" fill={fill} fillOpacity="0.1" />
      <path
        d="M20 12V28M20 12L15 17M20 12L25 17"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  ProfileAvatar: ({ className = "w-[124px] h-[124px]", ...props }) => (
    <svg
      width="124"
      height="124"
      viewBox="0 0 124 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="1.73226"
        y="1.73128"
        width="120.535"
        height="120.535"
        rx="60.2677"
        fill="white"
        stroke="#001D58"
        strokeWidth="1.53548"
      />
      <path
        d="M62 62.499C67.5228 62.499 72 58.0219 72 52.499C72 46.9762 67.5228 42.499 62 42.499C56.4772 42.499 52 46.9762 52 52.499C52 58.0219 56.4772 62.499 62 62.499Z"
        stroke="#001D58"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79.1803 82.499C79.1803 74.759 71.4803 68.499 62.0003 68.499C52.5203 68.499 44.8203 74.759 44.8203 82.499"
        stroke="#001D58"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="85" y="91.499" width="32" height="32" rx="16" fill="#001D58" />
      <path
        d="M108.151 111.08C108.151 111.364 108.038 111.636 107.838 111.836C107.637 112.037 107.365 112.15 107.082 112.15H94.2483C93.9646 112.15 93.6926 112.037 93.4921 111.836C93.2915 111.636 93.1788 111.364 93.1788 111.08V104.664C93.1788 104.38 93.2915 104.108 93.4921 103.907C93.6926 103.707 93.9646 103.594 94.2483 103.594H95.5017C96.3521 103.594 97.1676 103.255 97.7689 102.654L98.6565 101.769C98.8565 101.568 99.1276 101.456 99.4105 101.455H101.917C102.201 101.455 102.473 101.568 102.673 101.769L103.559 102.654C103.857 102.952 104.211 103.189 104.6 103.35C104.989 103.511 105.407 103.594 105.828 103.594H107.082C107.365 103.594 107.637 103.707 107.838 103.907C108.038 104.108 108.151 104.38 108.151 104.664V111.08ZM94.2483 102.525C93.681 102.525 93.137 102.75 92.7358 103.151C92.3347 103.552 92.1094 104.096 92.1094 104.664V111.08C92.1094 111.647 92.3347 112.191 92.7358 112.593C93.137 112.994 93.681 113.219 94.2483 113.219H107.082C107.649 113.219 108.193 112.994 108.594 112.593C108.995 112.191 109.22 111.647 109.22 111.08V104.664C109.22 104.096 108.995 103.552 108.594 103.151C108.193 102.75 107.649 102.525 107.082 102.525H105.828C105.261 102.525 104.717 102.299 104.316 101.898L103.431 101.012C103.029 100.611 102.486 100.386 101.918 100.386H99.4115C98.8443 100.386 98.3004 100.611 97.8993 101.012L97.0138 101.898C96.6128 102.299 96.0689 102.525 95.5017 102.525H94.2483Z"
        fill="white"
      />
      <path
        d="M100.667 110.012C99.9576 110.012 99.2775 109.731 98.7761 109.229C98.2747 108.728 97.9931 108.048 97.9931 107.339C97.9931 106.63 98.2747 105.95 98.7761 105.448C99.2775 104.947 99.9576 104.665 100.667 104.665C101.376 104.665 102.056 104.947 102.557 105.448C103.059 105.95 103.34 106.63 103.34 107.339C103.34 108.048 103.059 108.728 102.557 109.229C102.056 109.731 101.376 110.012 100.667 110.012ZM100.667 111.082C101.659 111.082 102.611 110.687 103.313 109.985C104.015 109.284 104.41 108.331 104.41 107.339C104.41 106.346 104.015 105.394 103.313 104.692C102.611 103.99 101.659 103.596 100.667 103.596C99.6739 103.596 98.7219 103.99 98.0199 104.692C97.318 105.394 96.9236 106.346 96.9236 107.339C96.9236 108.331 97.318 109.284 98.0199 109.985C98.7219 110.687 99.6739 111.082 100.667 111.082ZM95.3194 105.2C95.3194 105.342 95.2631 105.478 95.1628 105.578C95.0625 105.678 94.9265 105.735 94.7847 105.735C94.6429 105.735 94.5069 105.678 94.4066 105.578C94.3063 105.478 94.25 105.342 94.25 105.2C94.25 105.058 94.3063 104.922 94.4066 104.822C94.5069 104.721 94.6429 104.665 94.7847 104.665C94.9265 104.665 95.0625 104.721 95.1628 104.822C95.2631 104.922 95.3194 105.058 95.3194 105.2Z"
        fill="white"
      />
    </svg>
  ),

  MenuBars: ({
    className = "w-[22px] h-[20px]",
    fill = "#434343",
    ...props
  }) => (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1.62891 3.89404H20.3696M1.62891 10.0052H20.3696M1.62891 16.1163H20.3696"
        stroke={fill}
        strokeWidth="1.83333"
        strokeLinecap="round"
      />
    </svg>
  ),

  ShoppingCartIcon: ({
    className = "w-[26px] h-[25px]",
    fill = "#434343",
    ...props
  }) => (
    <svg
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M20.1654 17.2964H11.5597C10.7765 17.2908 10.018 17.022 9.40607 16.5333C8.79415 16.0445 8.36441 15.3641 8.18594 14.6015L6.81452 9.02667C6.68834 8.50903 6.68187 7.96943 6.7956 7.44891C6.90933 6.92839 7.14027 6.44066 7.47084 6.02282C7.80142 5.60497 8.22292 5.26802 8.70331 5.03757C9.18369 4.80713 9.7103 4.68927 10.2431 4.69295H21.5574C22.0902 4.68927 22.6168 4.80713 23.0972 5.03757C23.5775 5.26802 23.999 5.60497 24.3296 6.02282C24.6602 6.44066 24.8911 6.92839 25.0049 7.44891C25.1186 7.96943 25.1121 8.50903 24.9859 9.02667L23.6145 14.6152C23.4293 15.3873 22.9869 16.0734 22.3601 16.5606C21.7333 17.0479 20.9593 17.3074 20.1654 17.2964ZM10.2019 6.40724C9.9309 6.40807 9.66356 6.47021 9.41995 6.58902C9.17633 6.70782 8.96275 6.88021 8.79521 7.09326C8.62766 7.30632 8.5105 7.55452 8.45249 7.81929C8.39448 8.08405 8.39712 8.3585 8.46023 8.6221L9.83166 14.2107C9.92454 14.6023 10.1472 14.951 10.4634 15.2C10.7797 15.449 11.1709 15.5837 11.5734 15.5821H20.1654C20.5679 15.5837 20.9591 15.449 21.2753 15.2C21.5915 14.951 21.8142 14.6023 21.9071 14.2107L23.2785 8.6221C23.343 8.35839 23.3467 8.08347 23.2892 7.81815C23.2317 7.55282 23.1147 7.30405 22.9469 7.09065C22.7791 6.87725 22.5649 6.70483 22.3206 6.58643C22.0763 6.46803 21.8083 6.40675 21.5368 6.40724H10.2019Z"
        fill={fill}
      />
      <path
        d="M7.82186 10.4877C7.62603 10.4854 7.4369 10.4161 7.28595 10.2913C7.13499 10.1665 7.0313 9.99385 6.99215 9.80196L5.76472 4.47396C5.65138 3.9886 5.37666 3.55608 4.98553 3.24716C4.59439 2.93823 4.10999 2.7712 3.61158 2.77339H2.49386C2.26653 2.77339 2.04852 2.68309 1.88777 2.52234C1.72702 2.36159 1.63672 2.14358 1.63672 1.91625C1.63672 1.68892 1.72702 1.4709 1.88777 1.31016C2.04852 1.14941 2.26653 1.05911 2.49386 1.05911H3.61158C4.49738 1.05601 5.35806 1.35338 6.05303 1.90263C6.748 2.45188 7.23619 3.22056 7.43786 4.08311L8.65843 9.41111C8.68485 9.52055 8.68927 9.63414 8.67144 9.74531C8.65361 9.85647 8.61387 9.96299 8.55455 10.0587C8.49522 10.1544 8.41748 10.2373 8.32585 10.3027C8.23421 10.3681 8.13049 10.4147 8.02072 10.4397C7.95629 10.4626 7.88964 10.4787 7.82186 10.4877ZM11.6961 24.7162C11.1537 24.7162 10.6234 24.5554 10.1723 24.254C9.72124 23.9526 9.36968 23.5242 9.16208 23.023C8.95448 22.5218 8.90016 21.9703 9.00599 21.4383C9.11183 20.9062 9.37306 20.4175 9.75666 20.0339C10.1403 19.6503 10.629 19.3891 11.161 19.2832C11.6931 19.1774 12.2446 19.2317 12.7458 19.4393C13.247 19.6469 13.6754 19.9985 13.9767 20.4495C14.2781 20.9006 14.439 21.4309 14.439 21.9734C14.439 22.7008 14.15 23.3985 13.6356 23.9129C13.1213 24.4273 12.4236 24.7162 11.6961 24.7162ZM11.6961 20.9174C11.49 20.9174 11.2885 20.9785 11.1171 21.093C10.9457 21.2076 10.8121 21.3704 10.7332 21.5608C10.6543 21.7513 10.6337 21.9608 10.6739 22.163C10.7141 22.3652 10.8134 22.5509 10.9591 22.6967C11.1049 22.8424 11.2906 22.9417 11.4928 22.9819C11.695 23.0222 11.9046 23.0015 12.095 22.9226C12.2855 22.8437 12.4482 22.7101 12.5628 22.5387C12.6773 22.3673 12.7384 22.1658 12.7384 21.9597C12.7384 21.6832 12.6286 21.4181 12.4332 21.2227C12.2377 21.0272 11.9726 20.9174 11.6961 20.9174ZM21.1727 24.7162C20.6302 24.7162 20.0999 24.5554 19.6489 24.254C19.1978 23.9526 18.8463 23.5242 18.6386 23.023C18.431 22.5218 18.3767 21.9703 18.4826 21.4383C18.5884 20.9062 18.8496 20.4175 19.2332 20.0339C19.6168 19.6503 20.1056 19.3891 20.6376 19.2832C21.1697 19.1774 21.7212 19.2317 22.2224 19.4393C22.7236 19.6469 23.1519 19.9985 23.4533 20.4495C23.7547 20.9006 23.9156 21.4309 23.9156 21.9734C23.9156 22.7008 23.6266 23.3985 23.1122 23.9129C22.5978 24.4273 21.9002 24.7162 21.1727 24.7162ZM21.1727 20.9174C20.9669 20.9187 20.766 20.981 20.5955 21.0964C20.425 21.2117 20.2925 21.375 20.2147 21.5655C20.1368 21.7561 20.1172 21.9655 20.1582 22.1672C20.1991 22.3689 20.299 22.554 20.445 22.6991C20.591 22.8442 20.7768 22.9427 20.9787 22.9824C21.1807 23.0221 21.39 23.001 21.58 22.9219C21.7701 22.8429 21.9324 22.7093 22.0467 22.538C22.1609 22.3668 22.2219 22.1655 22.2219 21.9597C22.2219 21.8222 22.1947 21.6861 22.1419 21.5592C22.0891 21.4323 22.0117 21.3171 21.9142 21.2202C21.8167 21.1234 21.7009 21.0467 21.5737 20.9948C21.4464 20.9428 21.3102 20.9165 21.1727 20.9174Z"
        fill={fill}
      />
      <path
        d="M21.1735 20.9174H9.74946C9.04201 20.9174 8.36354 20.6363 7.8633 20.1361C7.36306 19.6359 7.08203 18.9574 7.08203 18.2499C7.08203 17.5425 7.36306 16.864 7.8633 16.3638C8.36354 15.8636 9.04201 15.5825 9.74946 15.5825H11.5666C11.7939 15.5825 12.0119 15.6728 12.1727 15.8336C12.3334 15.9943 12.4237 16.2123 12.4237 16.4397C12.4237 16.667 12.3334 16.885 12.1727 17.0458C12.0119 17.2065 11.7939 17.2968 11.5666 17.2968H9.74946C9.49667 17.2968 9.25424 17.3972 9.07549 17.576C8.89674 17.7547 8.79632 17.9972 8.79632 18.2499C8.79632 18.5027 8.89674 18.7452 9.07549 18.9239C9.25424 19.1027 9.49667 19.2031 9.74946 19.2031H21.1735C21.4008 19.2031 21.6188 19.2934 21.7796 19.4541C21.9403 19.6149 22.0306 19.8329 22.0306 20.0602C22.0306 20.2876 21.9403 20.5056 21.7796 20.6663C21.6188 20.8271 21.4008 20.9174 21.1735 20.9174Z"
        fill={fill}
      />
    </svg>
  ),

  WishlistHeart: ({
    className = "w-[25px] h-[25px]",
    stroke = "#292D32",
    fill = "none",
    ...props
  }) => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12.8407 21.6973C12.5007 21.8173 11.9407 21.8173 11.6007 21.6973C8.7007 20.7073 2.2207 16.5773 2.2207 9.5773C2.2207 6.4873 4.7107 3.9873 7.7807 3.9873C9.6007 3.9873 11.2107 4.8673 12.2207 6.2273C13.2307 4.8673 14.8507 3.9873 16.6607 3.9873C19.7307 3.9873 22.2207 6.4873 22.2207 9.5773C22.2207 16.5773 15.7407 20.7073 12.8407 21.6973Z"
        stroke={stroke}
        fill={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  UserAvatar: ({ className = "w-[38px] h-[38px]", ...props }) => (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="38" height="38" rx="19" fill="#F8F8F8" />
      <ellipse
        cx="18.9997"
        cy="14.2502"
        rx="3.16667"
        ry="3.16667"
        stroke="#001D58"
        strokeWidth="1.1875"
      />
      <ellipse
        cx="18.9997"
        cy="22.9582"
        rx="5.54167"
        ry="3.16667"
        stroke="#001D58"
        strokeWidth="1.1875"
      />
    </svg>
  ),

  // Wishlist Heart Icon
  WishlistHeart: ({ stroke = "#001D58", fill = "none", className = "" }) => (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5738 23.2431C-7.78248 11.4391 7.16722 -1.37494 13.5738 6.72787C19.9813 -1.37494 34.931 11.4391 13.5738 23.2431Z"
        stroke={stroke}
        strokeWidth="1.92211"
        fill={fill}
      />
    </svg>
  ),

  // No Reviews Chat Icon
  NoReviewsIcon: ({ className = "" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),

  // Order Status Check Circle
  OrderCheckIcon: ({ fill = "#94D3DD", className = "" }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.00214 5.34523e-06C11.3021 5.34523e-06 13.6021 0.878755 15.3624 2.63764C16.199 3.4724 16.8627 4.46397 17.3155 5.55558C17.7684 6.6472 18.0015 7.81742 18.0015 8.99924C18.0015 10.1811 17.7684 11.3513 17.3155 12.4429C16.8627 13.5345 16.199 14.5261 15.3624 15.3608C14.5276 16.1974 13.536 16.8612 12.4444 17.314C11.3528 17.7669 10.1826 18 9.00076 18C7.81894 18 6.64872 17.7669 5.5571 17.314C4.46549 16.8612 3.47392 16.1974 2.63916 15.3608C1.80257 14.5261 1.13884 13.5345 0.685971 12.4429C0.233106 11.3513 0 10.1811 0 8.99924C0 7.81742 0.233106 6.6472 0.685971 5.55558C1.13884 4.46397 1.80257 3.4724 2.63916 2.63764C3.47366 1.80042 4.46541 1.13639 5.55739 0.683736C6.64937 0.231078 7.82006 -0.00128506 9.00214 5.34523e-06ZM13.0984 6.23014C12.9674 6.24268 12.8426 6.29211 12.7386 6.37268L7.68194 10.1644L5.33907 7.82296C4.83119 7.29433 3.83066 8.29347 4.36068 8.80135L7.1284 11.5691C7.24838 11.6825 7.40392 11.751 7.56862 11.7628C7.73333 11.7747 7.89707 11.7292 8.03206 11.6341L13.5675 7.48253C14.0325 7.14349 13.746 6.23982 13.1703 6.23152C13.1468 6.23032 13.1233 6.23032 13.0997 6.23152L13.0984 6.23014Z"
        fill={fill}
      />
    </svg>
  ),

  // Order Status Check Circle (Variant for different positions)
  OrderCheckIconVariant: ({ fill = "#94D3DD", className = "" }) => (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.66816 5.34523e-06C11.9681 5.34523e-06 14.2681 0.878755 16.0284 2.63764C16.865 3.4724 17.5287 4.46397 17.9816 5.55558C18.4344 6.6472 18.6675 7.81742 18.6675 8.99924C18.6675 10.1811 18.4344 11.3513 17.9816 12.4429C17.5287 13.5345 16.865 14.5261 16.0284 15.3608C15.1936 16.1974 14.202 16.8612 13.1104 17.314C12.0188 17.7669 10.8486 18 9.66678 18C8.48495 18 7.31473 17.7669 6.22312 17.314C5.1315 16.8612 4.13993 16.1974 3.30518 15.3608C2.46858 14.5261 1.80485 13.5345 1.35199 12.4429C0.899121 11.3513 0.666016 10.1811 0.666016 8.99924C0.666016 7.81742 0.899121 6.6472 1.35199 5.55558C1.80485 4.46397 2.46858 3.4724 3.30518 2.63764C4.13968 1.80042 5.13142 1.13639 6.22341 0.683736C7.31539 0.231078 8.48607 -0.00128506 9.66816 5.34523e-06ZM13.7644 6.23014C13.6334 6.24268 13.5086 6.29211 13.4046 6.37268L8.34796 10.1644L6.00508 7.82296C5.49721 7.29433 4.49668 8.29347 5.0267 8.80135L7.79442 11.5691C7.9144 11.6825 8.06993 11.751 8.23464 11.7628C8.39934 11.7747 8.56308 11.7292 8.69807 11.6341L14.2335 7.48253C14.6985 7.14349 14.412 6.23982 13.8363 6.23152C13.8128 6.23032 13.7893 6.23032 13.7658 6.23152L13.7644 6.23014Z"
        fill={fill}
      />
    </svg>
  ),

  // Order Placed Icon
  OrderPlacedIcon: ({ stroke = "#94D3DD", className = "" }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask id="path-1-inside-1_order_placed" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 6.5C4 5.39543 4.89543 4.5 6 4.5H18C19.1046 4.5 20 5.39543 20 6.5V14.5C20 15.6046 19.1046 16.5 18 16.5H13L8 20.5V16.5H6C4.89543 16.5 4 15.6046 4 14.5V6.5Z"
        />
      </mask>
      <path
        d="M13 16.5V18.5H14.5858L15.5 17.5858L13 16.5ZM8 20.5L5.5 19.4142V24.9142L10.5 21.4142L8 20.5ZM8 16.5H6V18.5H8V16.5ZM6 6.5H18V2.5H6V6.5ZM18 6.5V14.5H22V6.5H18ZM18 14.5H13V18.5H18V14.5ZM15.5 17.5858L10.5 21.5858L5.5 19.4142L10.5 15.4142L15.5 17.5858ZM10 16.5V20.5H6V16.5H10ZM8 14.5H6V18.5H8V14.5ZM6 14.5V6.5H2V14.5H6Z"
        fill={stroke}
        mask="url(#path-1-inside-1_order_placed)"
      />
    </svg>
  ),

  // Order Shipped Icon
  OrderShippedIcon: ({ stroke = "#94D3DD", className = "" }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.5777 3.88197L17.5777 4.93152C19.7294 6.06066 20.8052 6.62523 21.4026 7.63974C22 8.65425 22 9.91667 22 12.4415V12.5585C22 15.0833 22 16.3458 21.4026 17.3603C20.8052 18.3748 19.7294 18.9393 17.5777 20.0685L15.5777 21.118C13.8221 22.0393 12.9443 22.5 12 22.5C11.0557 22.5 10.1779 22.0393 8.42229 21.118L6.42229 20.0685C4.27063 18.9393 3.19479 18.3748 2.5974 17.3603C2 16.3458 2 15.0833 2 12.5585V12.4415C2 9.91667 2 8.65425 2.5974 7.63974C3.19479 6.62523 4.27063 6.06066 6.42229 4.93152L8.42229 3.88197C10.1779 2.96066 11.0557 2.5 12 2.5C12.9443 2.5 13.8221 2.96066 15.5777 3.88197Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 8.5L12 13M12 13L3 8.5M12 13V21.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  // Order Out for Delivery Icon
  OrderDeliveryIcon: ({
    stroke = "#94D3DD",
    fill = "white",
    className = "",
  }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_order_delivery)">
        <path
          d="M22.0249 16.8555L22.0249 17.1412H22.0193M22.0249 16.8555H22.0134M22.0249 16.8555L22.0249 16.1412M22.0249 16.8555C22.1735 16.8555 22.3191 16.8266 22.4543 16.772C22.5929 16.7161 22.7205 16.633 22.829 16.5262C22.829 16.5262 22.829 16.5262 22.829 16.5262C22.8303 16.5249 22.8316 16.5236 22.8329 16.5223C22.9396 16.4163 23.0233 16.2914 23.0808 16.1555C23.1386 16.0187 23.1699 15.8706 23.1712 15.7193M22.0193 17.1412C22.0158 17.1412 22.0123 17.1411 22.0088 17.1411L22.0134 16.8555M22.0193 17.1412H21.8192C21.8571 17.1412 21.8934 17.1261 21.9202 17.0994C21.947 17.0726 21.9621 17.0362 21.9621 16.9983C21.9621 16.9604 21.947 16.9241 21.9202 16.8973C21.8934 16.8705 21.8571 16.8555 21.8192 16.8555H22.0134M22.0193 17.1412C22.0211 17.1412 22.023 17.1412 22.0249 17.1412V16.1412M22.0134 16.8555L22.0249 16.1412M22.0249 16.1412L23.3463 16.2667C23.4184 16.0944 23.456 15.9097 23.4569 15.7229M23.1712 15.7193V15.7229H23.4569M23.1712 15.7193C23.1712 15.7184 23.1712 15.7174 23.1712 15.7165L23.4569 15.7183M23.1712 15.7193V15.7161M23.4569 15.7229C23.4569 15.7214 23.4569 15.7199 23.4569 15.7183M23.4569 15.7229H24.1712L23.4569 15.7183M23.4569 15.7183C23.4569 15.7176 23.4569 15.7168 23.4569 15.7161H23.1712M23.1712 15.7161V15.716L23.4569 15.7159M23.1712 15.7161H22.4569L23.4569 15.7159M23.4569 15.7159V12.7812V12.7755L23.4569 12.7743L23.4569 12.7714C23.456 12.4658 23.3574 12.169 23.1761 11.924C23.1677 11.9126 23.1591 11.9013 23.1503 11.8901C22.969 11.6597 22.7219 11.4911 22.4427 11.4059C22.4374 11.4043 22.432 11.4027 22.4266 11.4011C22.4065 11.3953 22.3863 11.3898 22.3659 11.3848L22.3539 11.3819M23.4569 15.7159L22.4912 10.6761L22.3539 11.3819M22.3539 11.3819L22.3049 11.6334L22.3002 11.6576C22.2998 11.6576 22.2994 11.6575 22.299 11.6574C22.2827 11.6543 22.2663 11.6513 22.2499 11.6487L22.3539 11.3819Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="0.285714"
        />
        <path
          d="M6.85714 16.9286C7.86122 16.9286 8.67857 16.1112 8.67857 15.1071C8.67857 14.1031 7.86122 13.2857 6.85714 13.2857C5.85306 13.2857 5.03571 14.1031 5.03571 15.1071C5.03571 16.1112 5.85306 16.9286 6.85714 16.9286Z"
          stroke={stroke}
          strokeWidth="1.42857"
        />
        <path
          d="M16.1071 16.9286C17.1112 16.9286 17.9286 16.1112 17.9286 15.1071C17.9286 14.1031 17.1112 13.2857 16.1071 13.2857C15.1031 13.2857 14.2857 14.1031 14.2857 15.1071C14.2857 16.1112 15.1031 16.9286 16.1071 16.9286Z"
          stroke={stroke}
          strokeWidth="1.42857"
        />
        <path
          d="M14.2857 15.1071H8.67857M5.71429 15.1071H2.5M2.5 15.1071V4.28571M2.5 15.1071V11.5357M2.5 4.28571H13.3214M2.5 4.28571V8.21429M19.75 15.1071H21.25M13.3214 4.28571L16.5357 8.57143H19.75C20.4404 8.57143 21 9.13102 21 9.82143V15.1071M13.3214 4.28571V11.5357H2.5"
          stroke={stroke}
          strokeWidth="1.42857"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_order_delivery">
          <rect
            width="24"
            height="24"
            fill={fill}
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),

  // Order Delivered Icon
  OrderDeliveredIcon: ({ stroke = "#94D3DD", className = "" }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask id="path-1-inside-1_order_delivered" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 6.5C4 5.39543 4.89543 4.5 6 4.5H18C19.1046 4.5 20 5.39543 20 6.5V14.5C20 15.6046 19.1046 16.5 18 16.5H13L8 20.5V16.5H6C4.89543 16.5 4 15.6046 4 14.5V6.5Z"
        />
      </mask>
      <path
        d="M13 16.5V18.5H14.5858L15.5 17.5858L13 16.5ZM8 20.5L5.5 19.4142V24.9142L10.5 21.4142L8 20.5ZM8 16.5H6V18.5H8V16.5ZM6 6.5H18V2.5H6V6.5ZM18 6.5V14.5H22V6.5H18ZM18 14.5H13V18.5H18V14.5ZM15.5 17.5858L10.5 21.5858L5.5 19.4142L10.5 15.4142L15.5 17.5858ZM10 16.5V20.5H6V16.5H10ZM8 14.5H6V18.5H8V14.5ZM6 14.5V6.5H2V14.5H6Z"
        fill={stroke}
        mask="url(#path-1-inside-1_order_delivered)"
      />
      <path
        d="M8 10.5L10.5 13L16 7.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  OrderPlaced: ({ stroke = "#94D3DD", fill = "white", className }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_13854_18256" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.2507 6.875C17.2507 6.37772 17.0532 5.90081 16.7016 5.54917C16.3499 5.19754 15.873 5 15.3757 5H8.62575C8.37946 4.9999 8.13556 5.04833 7.90799 5.14251C7.68042 5.23669 7.47363 5.37479 7.29944 5.54891C7.12525 5.72303 6.98707 5.92976 6.8928 6.1573C6.79852 6.38483 6.75 6.62871 6.75 6.875V7.625C6.75 7.87123 6.7985 8.11505 6.89273 8.34253C6.98695 8.57002 7.12506 8.77672 7.29917 8.95083C7.65081 9.30246 8.12772 9.5 8.625 9.5H15.375C15.6212 9.5 15.865 9.4515 16.0925 9.35727C16.32 9.26305 16.5267 9.12494 16.7008 8.95083C16.8749 8.77672 17.013 8.57002 17.1073 8.34253C17.2015 8.11505 17.25 7.87123 17.25 7.625L17.2507 6.875ZM15.7507 6.875V7.625C15.7507 7.72446 15.7112 7.81984 15.6409 7.89017C15.5706 7.96049 15.4752 8 15.3757 8H8.62575C8.52642 7.9996 8.43126 7.95997 8.36102 7.88973C8.29078 7.81949 8.25115 7.72433 8.25075 7.625V6.875C8.25075 6.77554 8.29026 6.68016 8.36058 6.60983C8.43091 6.53951 8.52629 6.5 8.62575 6.5H15.3757C15.4751 6.5004 15.5702 6.54003 15.6405 6.61027C15.7107 6.68051 15.7504 6.77567 15.7507 6.875Z"
        />
      </mask>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.2507 6.875C17.2507 6.37772 17.0532 5.90081 16.7016 5.54917C16.3499 5.19754 15.873 5 15.3757 5H8.62575C8.37946 4.9999 8.13556 5.04833 7.90799 5.14251C7.68042 5.23669 7.47363 5.37479 7.29944 5.54891C7.12525 5.72303 6.98707 5.92976 6.8928 6.1573C6.79852 6.38483 6.75 6.62871 6.75 6.875V7.625C6.75 7.87123 6.7985 8.11505 6.89273 8.34253C6.98695 8.57002 7.12506 8.77672 7.29917 8.95083C7.65081 9.30246 8.12772 9.5 8.625 9.5H15.375C15.6212 9.5 15.865 9.4515 16.0925 9.35727C16.32 9.26305 16.5267 9.12494 16.7008 8.95083C16.8749 8.77672 17.013 8.57002 17.1073 8.34253C17.2015 8.11505 17.25 7.87123 17.25 7.625L17.2507 6.875ZM15.7507 6.875V7.625C15.7507 7.72446 15.7112 7.81984 15.6409 7.89017C15.5706 7.96049 15.4752 8 15.3757 8H8.62575C8.52642 7.9996 8.43126 7.95997 8.36102 7.88973C8.29078 7.81949 8.25115 7.72433 8.25075 7.625V6.875C8.25075 6.77554 8.29026 6.68016 8.36058 6.60983C8.43091 6.53951 8.52629 6.5 8.62575 6.5H15.3757C15.4751 6.5004 15.5702 6.54003 15.6405 6.61027C15.7107 6.68051 15.7504 6.77567 15.7507 6.875Z"
        fill="#94D3DD"
      />
      <path
        d="M17.2507 6.875L19.2507 6.877V6.875H17.2507ZM15.3757 5V3V5ZM8.62575 5L8.62495 7H8.62575V5ZM6.75 6.875L8.75 6.875V6.875L6.75 6.875ZM6.75 7.625H4.75H6.75ZM8.625 9.5V7.5V9.5ZM15.375 9.5V7.5V9.5ZM17.25 7.625L15.25 7.623V7.625H17.25ZM15.7507 6.875L17.7508 6.875L17.7507 6.86705L15.7507 6.875ZM8.62575 8L8.6178 10H8.62575V8ZM8.25075 7.625H6.25073L6.25077 7.63295L8.25075 7.625ZM15.3757 6.5L15.3837 4.5H15.3757V6.5ZM19.2507 6.875C19.2507 5.84729 18.8425 4.86166 18.1158 4.13496L15.2874 6.96339C15.2639 6.93995 15.2507 6.90815 15.2507 6.875H19.2507ZM18.1158 4.13496C17.3891 3.40826 16.4035 3 15.3757 3V7C15.3426 7 15.3108 6.98683 15.2874 6.96339L18.1158 4.13496ZM15.3757 3H8.62575V7H15.3757V3ZM8.62655 3C8.11755 2.9998 7.61349 3.09988 7.14318 3.29452L8.6728 6.9905C8.65763 6.99678 8.64137 7.00001 8.62495 7L8.62655 3ZM7.14318 3.29452C6.67286 3.48917 6.2455 3.77457 5.88551 4.13441L8.71337 6.96341C8.70176 6.97501 8.68797 6.98422 8.6728 6.9905L7.14318 3.29452ZM5.88551 4.13441C5.52552 4.49426 5.23995 4.92151 5.04512 5.39174L8.74048 6.92285C8.7342 6.93802 8.72498 6.9518 8.71337 6.96341L5.88551 4.13441ZM5.04512 5.39174C4.85028 5.86198 4.75 6.366 4.75 6.875L8.75 6.875C8.75 6.89142 8.74676 6.90768 8.74048 6.92285L5.04512 5.39174ZM4.75 6.875V7.625H8.75V6.875H4.75ZM4.75 7.625C4.75 8.13387 4.85023 8.63776 5.04497 9.1079L8.74048 7.57716C8.74677 7.59233 8.75 7.60859 8.75 7.625H4.75ZM5.04497 9.1079C5.2397 9.57804 5.52514 10.0052 5.88496 10.365L8.71339 7.53661C8.72499 7.54822 8.7342 7.562 8.74048 7.57716L5.04497 9.1079ZM5.88496 10.365C6.61166 11.0917 7.59729 11.5 8.625 11.5V7.5C8.65815 7.5 8.68995 7.51317 8.71339 7.53661L5.88496 10.365ZM8.625 11.5H15.375V7.5H8.625V11.5ZM15.375 11.5C15.8839 11.5 16.3878 11.3998 16.8579 11.205L15.3272 7.50952C15.3423 7.50323 15.3586 7.5 15.375 7.5V11.5ZM16.8579 11.205C17.328 11.0103 17.7552 10.7249 18.115 10.365L15.2866 7.53661C15.2982 7.52501 15.312 7.5158 15.3272 7.50952L16.8579 11.205ZM18.115 10.365C18.4749 10.0052 18.7603 9.57803 18.955 9.1079L15.2595 7.57716C15.2658 7.562 15.275 7.54822 15.2866 7.53661L18.115 10.365ZM18.955 9.1079C19.1498 8.63776 19.25 8.13388 19.25 7.625H15.25C15.25 7.60858 15.2532 7.59233 15.2595 7.57716L18.955 9.1079ZM19.25 7.627L19.2507 6.877L15.2508 6.873L15.25 7.623L19.25 7.627ZM13.7507 6.875V7.625H17.7507V6.875H13.7507ZM13.7507 7.625C13.7507 7.19403 13.922 6.7807 14.2267 6.47595L17.0551 9.30438C17.5005 8.85898 17.7507 8.25488 17.7507 7.625H13.7507ZM14.2267 6.47595C14.5315 6.1712 14.9448 6 15.3757 6V10C16.0056 10 16.6097 9.74978 17.0551 9.30438L14.2267 6.47595ZM15.3757 6H8.62575V10H15.3757V6ZM8.6337 6.00002C9.06203 6.00172 9.47234 6.17263 9.77523 6.47552L6.94681 9.30394C7.39018 9.74731 7.9908 9.99749 8.6178 9.99998L8.6337 6.00002ZM9.77523 6.47552C10.0781 6.7784 10.249 7.18872 10.2507 7.61705L6.25077 7.63295C6.25326 8.25995 6.50344 8.86057 6.94681 9.30394L9.77523 6.47552ZM10.2508 7.625V6.875H6.25075V7.625H10.2508ZM10.2508 6.875C10.2508 7.30597 10.0795 7.7193 9.7748 8.02405L6.94637 5.19562C6.50097 5.64102 6.25075 6.24512 6.25075 6.875H10.2508ZM9.7748 8.02405C9.47005 8.3288 9.05672 8.5 8.62575 8.5V4.5C7.99587 4.5 7.39177 4.75022 6.94637 5.19562L9.7748 8.02405ZM8.62575 8.5H15.3757V4.5H8.62575V8.5ZM15.3678 8.49998C14.9395 8.49828 14.5292 8.32737 14.2263 8.02448L17.0547 5.19606C16.6113 4.75269 16.0107 4.50251 15.3837 4.50002L15.3678 8.49998ZM14.2263 8.02448C13.9234 7.7216 13.7525 7.31129 13.7508 6.88295L17.7507 6.86705C17.7482 6.24005 17.4981 5.63943 17.0547 5.19606L14.2263 8.02448Z"
        fill="#94D3DD"
        mask="url(#path-1-inside-1_13854_18256)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 5.75V3.875C10.5 3.77525 10.5397 3.68 10.6095 3.6095C10.6801 3.53949 10.7755 3.50015 10.875 3.5H13.125C13.2248 3.5 13.32 3.53975 13.3905 3.6095C13.4605 3.68015 13.4999 3.77554 13.5 3.875V5.75C13.5 5.94891 13.579 6.13968 13.7197 6.28033C13.8603 6.42098 14.0511 6.5 14.25 6.5C14.4489 6.5 14.6397 6.42098 14.7803 6.28033C14.921 6.13968 15 5.94891 15 5.75V3.875C15 3.37772 14.8025 2.90081 14.4508 2.54917C14.0992 2.19754 13.6223 2 13.125 2H10.875C10.3777 2 9.90081 2.19754 9.54917 2.54917C9.19754 2.90081 9 3.37772 9 3.875V5.75C9 5.94891 9.07902 6.13968 9.21967 6.28033C9.36032 6.42098 9.55109 6.5 9.75 6.5C9.94891 6.5 10.1397 6.42098 10.2803 6.28033C10.421 6.13968 10.5 5.94891 10.5 5.75Z"
        fill="#94D3DD"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.461 7.99925L19.5 8H19.5015C19.9155 8 20.2507 8.33525 20.2507 8.7485V20.75C20.2507 20.9487 20.1713 21.14 20.0303 21.2803C19.9607 21.35 19.878 21.4053 19.787 21.443C19.6961 21.4807 19.5985 21.5001 19.5 21.5H4.5C4.4015 21.5001 4.30395 21.4807 4.21295 21.443C4.12195 21.4053 4.0393 21.35 3.96975 21.2803C3.9 21.2107 3.84468 21.128 3.80697 21.037C3.76926 20.9461 3.7499 20.8485 3.75 20.75V8.75C3.7497 8.65143 3.7689 8.55376 3.80649 8.46264C3.84407 8.37151 3.8993 8.28871 3.96901 8.21901C4.03871 8.14931 4.12151 8.09407 4.21264 8.05649C4.30377 8.0189 4.40143 7.9997 4.5 8C4.5 8 4.491 7.07 4.5 6.5C4.20447 6.4998 3.9118 6.55787 3.63873 6.67087C3.36566 6.78387 3.11754 6.9496 2.90857 7.15857C2.6996 7.36754 2.53387 7.61566 2.42087 7.88873C2.30787 8.1618 2.2498 8.45447 2.25 8.75V20.75C2.25 21.347 2.487 21.9193 2.91 22.3407C3.11875 22.5497 3.3666 22.7154 3.63942 22.8285C3.91224 22.9417 4.20466 22.9999 4.5 23H19.5C19.7955 23.0002 20.0882 22.9421 20.3613 22.8291C20.6343 22.7161 20.8825 22.5504 21.0914 22.3414C21.3004 22.1325 21.4661 21.8843 21.5791 21.6113C21.6921 21.3382 21.7502 21.0455 21.75 20.75V8.7485C21.75 8.15216 21.5131 7.58025 21.0914 7.15857C20.6698 6.7369 20.0978 6.5 19.5015 6.5C19.1265 6.5 19.0343 6.71225 19.0635 6.977C18.8737 6.77525 18.75 6.998 18.75 7.25C18.75 7.65125 19.0658 7.979 19.4625 7.99925H19.461Z"
        fill="#94D3DD"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.75 13.25H17.25C17.4489 13.25 17.6397 13.171 17.7803 13.0303C17.921 12.8897 18 12.6989 18 12.5C18 12.3011 17.921 12.1103 17.7803 11.9697C17.6397 11.829 17.4489 11.75 17.25 11.75H6.75C6.55109 11.75 6.36032 11.829 6.21967 11.9697C6.07902 12.1103 6 12.3011 6 12.5C6 12.6989 6.07902 12.8897 6.21967 13.0303C6.36032 13.171 6.55109 13.25 6.75 13.25ZM6.75 16.25H17.25C17.4489 16.25 17.6397 16.171 17.7803 16.0303C17.921 15.8897 18 15.6989 18 15.5C18 15.3011 17.921 15.1103 17.7803 14.9697C17.6397 14.829 17.4489 14.75 17.25 14.75H6.75C6.55109 14.75 6.36032 14.829 6.21967 14.9697C6.07902 15.1103 6 15.3011 6 15.5C6 15.6989 6.07902 15.8897 6.21967 16.0303C6.36032 16.171 6.55109 16.25 6.75 16.25ZM6.75 19.25H17.25C17.4489 19.25 17.6397 19.171 17.7803 19.0303C17.921 18.8897 18 18.6989 18 18.5C18 18.3011 17.921 18.1103 17.7803 17.9697C17.6397 17.829 17.4489 17.75 17.25 17.75H6.75C6.55109 17.75 6.36032 17.829 6.21967 17.9697C6.07902 18.1103 6 18.3011 6 18.5C6 18.6989 6.07902 18.8897 6.21967 19.0303C6.36032 19.171 6.55109 19.25 6.75 19.25Z"
        fill="#94D3DD"
      />
      <path
        d="M4.5 8C4.91421 8 5.25 7.66421 5.25 7.25C5.25 6.83579 4.91421 6.5 4.5 6.5C4.08579 6.5 3.75 6.83579 3.75 7.25C3.75 7.66421 4.08579 8 4.5 8Z"
        fill="#94D3DD"
      />
      <path
        d="M19.5 8C19.9142 8 20.25 7.66421 20.25 7.25C20.25 6.83579 19.9142 6.5 19.5 6.5C19.0858 6.5 18.75 6.83579 18.75 7.25C18.75 7.66421 19.0858 8 19.5 8Z"
        fill="#94D3DD"
      />
    </svg>
  ),

  OrderPending: ({ className = "w-6 h-6", fill = "#94D3DD", ...props }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask id="path-1-inside-1_13854_18256" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2507 6.875C17.2507 6.37772 17.0532 5.90081 16.7016 5.54917C16.3499 5.19754 15.873 5 15.3757 5H8.62575C8.37946 4.9999 8.13556 5.04833 7.90799 5.14251C7.68042 5.23669 7.47363 5.37479 7.29944 5.54891C7.12525 5.72303 6.98707 5.92976 6.8928 6.1573C6.79852 6.38483 6.75 6.62871 6.75 6.875V7.625C6.75 7.87123 6.7985 8.11505 6.89273 8.34253C6.98695 8.57002 7.12506 8.77672 7.29917 8.95083C7.65081 9.30246 8.12772 9.5 8.625 9.5H15.375C15.6212 9.5 15.865 9.4515 16.0925 9.35727C16.32 9.26305 16.5267 9.12494 16.7008 8.95083C16.8749 8.77672 17.013 8.57002 17.1073 8.34253C17.2015 8.11505 17.25 7.87123 17.25 7.625L17.2507 6.875ZM15.7507 6.875V7.625C15.7507 7.72446 15.7112 7.81984 15.6409 7.89017C15.5706 7.96049 15.4752 8 15.3757 8H8.62575C8.52642 7.9996 8.43126 7.95997 8.36102 7.88973C8.29078 7.81949 8.25115 7.72433 8.25075 7.625V6.875C8.25075 6.77554 8.29026 6.68016 8.36058 6.60983C8.43091 6.53951 8.52629 6.5 8.62575 6.5H15.3757C15.4751 6.5004 15.5702 6.54003 15.6405 6.61027C15.7107 6.68051 15.7504 6.77567 15.7507 6.875Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2507 6.875C17.2507 6.37772 17.0532 5.90081 16.7016 5.54917C16.3499 5.19754 15.873 5 15.3757 5H8.62575C8.37946 4.9999 8.13556 5.04833 7.90799 5.14251C7.68042 5.23669 7.47363 5.37479 7.29944 5.54891C7.12525 5.72303 6.98707 5.92976 6.8928 6.1573C6.79852 6.38483 6.75 6.62871 6.75 6.875V7.625C6.75 7.87123 6.7985 8.11505 6.89273 8.34253C6.98695 8.57002 7.12506 8.77672 7.29917 8.95083C7.65081 9.30246 8.12772 9.5 8.625 9.5H15.375C15.6212 9.5 15.865 9.4515 16.0925 9.35727C16.32 9.26305 16.5267 9.12494 16.7008 8.95083C16.8749 8.77672 17.013 8.57002 17.1073 8.34253C17.2015 8.11505 17.25 7.87123 17.25 7.625L17.2507 6.875ZM15.7507 6.875V7.625C15.7507 7.72446 15.7112 7.81984 15.6409 7.89017C15.5706 7.96049 15.4752 8 15.3757 8H8.62575C8.52642 7.9996 8.43126 7.95997 8.36102 7.88973C8.29078 7.81949 8.25115 7.72433 8.25075 7.625V6.875C8.25075 6.77554 8.29026 6.68016 8.36058 6.60983C8.43091 6.53951 8.52629 6.5 8.62575 6.5H15.3757C15.4751 6.5004 15.5702 6.54003 15.6405 6.61027C15.7107 6.68051 15.7504 6.77567 15.7507 6.875Z"
        fill={fill}
      />
      <path
        d="M17.2507 6.875L19.2507 6.877V6.875H17.2507ZM15.3757 5V3V5ZM8.62575 5L8.62495 7H8.62575V5ZM6.75 6.875L8.75 6.875V6.875L6.75 6.875ZM6.75 7.625H4.75H6.75ZM8.625 9.5V7.5V9.5ZM15.375 9.5V7.5V9.5ZM17.25 7.625L15.25 7.623V7.625H17.25ZM15.7507 6.875L17.7508 6.875L17.7507 6.86705L15.7507 6.875ZM8.62575 8L8.6178 10H8.62575V8ZM8.25075 7.625H6.25073L6.25077 7.63295L8.25075 7.625ZM15.3757 6.5L15.3837 4.5H15.3757V6.5ZM19.2507 6.875C19.2507 5.84729 18.8425 4.86166 18.1158 4.13496L15.2874 6.96339C15.2639 6.93995 15.2507 6.90815 15.2507 6.875H19.2507ZM18.1158 4.13496C17.3891 3.40826 16.4035 3 15.3757 3V7C15.3426 7 15.3108 6.98683 15.2874 6.96339L18.1158 4.13496ZM15.3757 3H8.62575V7H15.3757V3ZM8.62655 3C8.11755 2.9998 7.61349 3.09988 7.14318 3.29452L8.6728 6.9905C8.65763 6.99678 8.64137 7.00001 8.62495 7L8.62655 3ZM7.14318 3.29452C6.67286 3.48917 6.2455 3.77457 5.88551 4.13441L8.71337 6.96341C8.70176 6.97501 8.68797 6.98422 8.6728 6.9905L7.14318 3.29452ZM5.88551 4.13441C5.52552 4.49426 5.23995 4.92151 5.04512 5.39174L8.74048 6.92285C8.7342 6.93802 8.72498 6.9518 8.71337 6.96341L5.88551 4.13441ZM5.04512 5.39174C4.85028 5.86198 4.75 6.366 4.75 6.875L8.75 6.875C8.75 6.89142 8.74676 6.90768 8.74048 6.92285L5.04512 5.39174ZM4.75 6.875V7.625H8.75V6.875H4.75ZM4.75 7.625C4.75 8.13387 4.85023 8.63776 5.04497 9.1079L8.74048 7.57716C8.74677 7.59233 8.75 7.60859 8.75 7.625H4.75ZM5.04497 9.1079C5.2397 9.57804 5.52514 10.0052 5.88496 10.365L8.71339 7.53661C8.72499 7.54822 8.7342 7.562 8.74048 7.57716L5.04497 9.1079ZM5.88496 10.365C6.61166 11.0917 7.59729 11.5 8.625 11.5V7.5C8.65815 7.5 8.68995 7.51317 8.71339 7.53661L5.88496 10.365ZM8.625 11.5H15.375V7.5H8.625V11.5ZM15.375 11.5C15.8839 11.5 16.3878 11.3998 16.8579 11.205L15.3272 7.50952C15.3423 7.50323 15.3586 7.5 15.375 7.5V11.5ZM16.8579 11.205C17.328 11.0103 17.7552 10.7249 18.115 10.365L15.2866 7.53661C15.2982 7.52501 15.312 7.5158 15.3272 7.50952L16.8579 11.205ZM18.115 10.365C18.4749 10.0052 18.7603 9.57803 18.955 9.1079L15.2595 7.57716C15.2658 7.562 15.275 7.54822 15.2866 7.53661L18.115 10.365ZM18.955 9.1079C19.1498 8.63776 19.25 8.13388 19.25 7.625H15.25C15.25 7.60858 15.2532 7.59233 15.2595 7.57716L18.955 9.1079ZM19.25 7.627L19.2507 6.877L15.2508 6.873L15.25 7.623L19.25 7.627ZM13.7507 6.875V7.625H17.7507V6.875H13.7507ZM13.7507 7.625C13.7507 7.19403 13.922 6.7807 14.2267 6.47595L17.0551 9.30438C17.5005 8.85898 17.7507 8.25488 17.7507 7.625H13.7507ZM14.2267 6.47595C14.5315 6.1712 14.9448 6 15.3757 6V10C16.0056 10 16.6097 9.74978 17.0551 9.30438L14.2267 6.47595ZM15.3757 6H8.62575V10H15.3757V6ZM8.6337 6.00002C9.06203 6.00172 9.47234 6.17263 9.77523 6.47552L6.94681 9.30394C7.39018 9.74731 7.9908 9.99749 8.6178 9.99998L8.6337 6.00002ZM9.77523 6.47552C10.0781 6.7784 10.249 7.18872 10.2507 7.61705L6.25077 7.63295C6.25326 8.25995 6.50344 8.86057 6.94681 9.30394L9.77523 6.47552ZM10.2508 7.625V6.875H6.25075V7.625H10.2508ZM10.2508 6.875C10.2508 7.30597 10.0795 7.7193 9.7748 8.02405L6.94637 5.19562C6.50097 5.64102 6.25075 6.24512 6.25075 6.875H10.2508ZM9.7748 8.02405C9.47005 8.3288 9.05672 8.5 8.62575 8.5V4.5C7.99587 4.5 7.39177 4.75022 6.94637 5.19562L9.7748 8.02405ZM8.62575 8.5H15.3757V4.5H8.62575V8.5ZM15.3678 8.49998C14.9395 8.49828 14.5292 8.32737 14.2263 8.02448L17.0547 5.19606C16.6113 4.75269 16.0107 4.50251 15.3837 4.50002L15.3678 8.49998ZM14.2263 8.02448C13.9234 7.7216 13.7525 7.31129 13.7508 6.88295L17.7507 6.86705C17.7482 6.24005 17.4981 5.63943 17.0547 5.19606L14.2263 8.02448Z"
        fill={fill}
        mask="url(#path-1-inside-1_13854_18256)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 5.75V3.875C10.5 3.77525 10.5397 3.68 10.6095 3.6095C10.6801 3.53949 10.7755 3.50015 10.875 3.5H13.125C13.2248 3.5 13.32 3.53975 13.3905 3.6095C13.4605 3.68015 13.4999 3.77554 13.5 3.875V5.75C13.5 5.94891 13.579 6.13968 13.7197 6.28033C13.8603 6.42098 14.0511 6.5 14.25 6.5C14.4489 6.5 14.6397 6.42098 14.7803 6.28033C14.921 6.13968 15 5.94891 15 5.75V3.875C15 3.37772 14.8025 2.90081 14.4508 2.54917C14.0992 2.19754 13.6223 2 13.125 2H10.875C10.3777 2 9.90081 2.19754 9.54917 2.54917C9.19754 2.90081 9 3.37772 9 3.875V5.75C9 5.94891 9.07902 6.13968 9.21967 6.28033C9.36032 6.42098 9.55109 6.5 9.75 6.5C9.94891 6.5 10.1397 6.42098 10.2803 6.28033C10.421 6.13968 10.5 5.94891 10.5 5.75Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.461 7.99925L19.5 8H19.5015C19.9155 8 20.2507 8.33525 20.2507 8.7485V20.75C20.2507 20.9487 20.1713 21.14 20.0303 21.2803C19.9607 21.35 19.878 21.4053 19.787 21.443C19.6961 21.4807 19.5985 21.5001 19.5 21.5H4.5C4.4015 21.5001 4.30395 21.4807 4.21295 21.443C4.12195 21.4053 4.0393 21.35 3.96975 21.2803C3.9 21.2107 3.84468 21.128 3.80697 21.037C3.76926 20.9461 3.7499 20.8485 3.75 20.75V8.75C3.7497 8.65143 3.7689 8.55376 3.80649 8.46264C3.84407 8.37151 3.8993 8.28871 3.96901 8.21901C4.03871 8.14931 4.12151 8.09407 4.21264 8.05649C4.30377 8.0189 4.40143 7.9997 4.5 8C4.5 8 4.491 7.07 4.5 6.5C4.20447 6.4998 3.9118 6.55787 3.63873 6.67087C3.36566 6.78387 3.11754 6.9496 2.90857 7.15857C2.6996 7.36754 2.53387 7.61566 2.42087 7.88873C2.30787 8.1618 2.2498 8.45447 2.25 8.75V20.75C2.25 21.347 2.487 21.9193 2.91 22.3407C3.11875 22.5497 3.3666 22.7154 3.63942 22.8285C3.91224 22.9417 4.20466 22.9999 4.5 23H19.5C19.7955 23.0002 20.0882 22.9421 20.3613 22.8291C20.6343 22.7161 20.8825 22.5504 21.0914 22.3414C21.3004 22.1325 21.4661 21.8843 21.5791 21.6113C21.6921 21.3382 21.7502 21.0455 21.75 20.75V8.7485C21.75 8.15216 21.5131 7.58025 21.0914 7.15857C20.6698 6.7369 20.0978 6.5 19.5015 6.5C19.1265 6.5 19.0343 6.71225 19.0635 6.977C18.8737 6.77525 18.75 6.998 18.75 7.25C18.75 7.65125 19.0658 7.979 19.4625 7.99925H19.461Z"
        fill={fill}
      />
    </svg>
  ),

  OrderInProgress: ({
    className = "w-6 h-6",
    stroke = "#94D3DD",
    ...props
  }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M15.5777 3.88197L17.5777 4.93152C19.7294 6.06066 20.8052 6.62523 21.4026 7.63974C22 8.65425 22 9.91667 22 12.4415V12.5585C22 15.0833 22 16.3458 21.4026 17.3603C20.8052 18.3748 19.7294 18.9393 17.5777 20.0685L15.5777 21.118C13.8221 22.0393 12.9443 22.5 12 22.5C11.0557 22.5 10.1779 22.0393 8.42229 21.118L6.42229 20.0685C4.27063 18.9393 3.19479 18.3748 2.5974 17.3603C2 16.3458 2 15.0833 2 12.5585V12.4415C2 9.91667 2 8.65425 2.5974 7.63974C3.19479 6.62523 4.27063 6.06066 6.42229 4.93152L8.42229 3.88197C10.1779 2.96066 11.0557 2.5 12 2.5C12.9443 2.5 13.8221 2.96066 15.5777 3.88197Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 8L17 10M12 12.5L3 8M12 12.5V22M12 12.5C12 12.5 14.7426 11.1287 16.5 10.25C16.6953 10.1524 17 10 17 10M17 10V13.5M17 10L7.5 5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  OrderShipped: ({
    className = "w-6 h-6",
    fill = "#94D3DD",
    stroke = "#94D3DD",
    ...props
  }) => (

    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_17170_10690)">
        <mask id="path-1-inside-1_17170_10690" fill={fill}>
          <path d="M17.3072 17.3555H9.11978C8.89245 17.3555 8.67443 17.2652 8.51369 17.1044C8.35294 16.9437 8.26264 16.7257 8.26264 16.4983C8.26264 16.271 8.35294 16.053 8.51369 15.8922C8.67443 15.7315 8.89245 15.6412 9.11978 15.6412H17.3072C17.5345 15.6412 17.7526 15.7315 17.9133 15.8922C18.074 16.053 18.1644 16.271 18.1644 16.4983C18.1644 16.7257 18.074 16.9437 17.9133 17.1044C17.7526 17.2652 17.5345 17.3555 17.3072 17.3555ZM22.0249 17.3555H21.8192C21.5919 17.3555 21.3739 17.2652 21.2131 17.1044C21.0524 16.9437 20.9621 16.7257 20.9621 16.4983C20.9621 16.271 21.0524 16.053 21.2131 15.8922C21.3739 15.7315 21.5919 15.6412 21.8192 15.6412H22.0249C22.0813 15.6421 22.1374 15.6318 22.1897 15.6108C22.2421 15.5899 22.2898 15.5587 22.33 15.5191C22.3702 15.4796 22.4021 15.4324 22.4239 15.3803C22.4457 15.3283 22.4569 15.2725 22.4569 15.2161V12.2743C22.4566 12.1779 22.4241 12.0843 22.3644 12.0085C22.3048 11.9327 22.2215 11.879 22.1278 11.8561H17.0741C16.506 11.8561 15.9611 11.6309 15.5588 11.2298C15.1565 10.8288 14.9296 10.2847 14.9278 9.71663V5.12234C14.9287 5.06625 14.9183 5.01055 14.8973 4.95855C14.8763 4.90655 14.845 4.85932 14.8053 4.81965C14.7657 4.77999 14.7184 4.74871 14.6664 4.72767C14.6144 4.70663 14.5587 4.69627 14.5026 4.6972H4.40206C4.17474 4.6972 3.95672 4.60689 3.79597 4.44614C3.63523 4.2854 3.54492 4.06738 3.54492 3.84005C3.54492 3.61272 3.63523 3.39471 3.79597 3.23396C3.95672 3.07322 4.17474 2.98291 4.40206 2.98291H14.5026C14.7836 2.98291 15.0618 3.03825 15.3214 3.14576C15.5809 3.25328 15.8168 3.41087 16.0154 3.60953C16.2141 3.8082 16.3717 4.04405 16.4792 4.30362C16.5867 4.56318 16.6421 4.84139 16.6421 5.12234V9.70291C16.6421 9.75932 16.6533 9.81517 16.6751 9.86721C16.6969 9.91924 16.7288 9.96641 16.769 10.006C16.8092 10.0456 16.8569 10.0767 16.9093 10.0977C16.9616 10.1186 17.0177 10.129 17.0741 10.1281H22.0249C22.1815 10.1301 22.3375 10.1462 22.4912 10.1761L22.6421 10.2241C23.0861 10.3539 23.4756 10.625 23.7516 10.9962C24.0275 11.3675 24.1749 11.8186 24.1712 12.2812V15.2229C24.1676 15.7898 23.9399 16.3322 23.5377 16.7317C23.1356 17.1313 22.5918 17.3555 22.0249 17.3555Z" />
        </mask>
        <path d="M17.3072 17.3555H9.11978C8.89245 17.3555 8.67443 17.2652 8.51369 17.1044C8.35294 16.9437 8.26264 16.7257 8.26264 16.4983C8.26264 16.271 8.35294 16.053 8.51369 15.8922C8.67443 15.7315 8.89245 15.6412 9.11978 15.6412H17.3072C17.5345 15.6412 17.7526 15.7315 17.9133 15.8922C18.074 16.053 18.1644 16.271 18.1644 16.4983C18.1644 16.7257 18.074 16.9437 17.9133 17.1044C17.7526 17.2652 17.5345 17.3555 17.3072 17.3555ZM22.0249 17.3555H21.8192C21.5919 17.3555 21.3739 17.2652 21.2131 17.1044C21.0524 16.9437 20.9621 16.7257 20.9621 16.4983C20.9621 16.271 21.0524 16.053 21.2131 15.8922C21.3739 15.7315 21.5919 15.6412 21.8192 15.6412H22.0249C22.0813 15.6421 22.1374 15.6318 22.1897 15.6108C22.2421 15.5899 22.2898 15.5587 22.33 15.5191C22.3702 15.4796 22.4021 15.4324 22.4239 15.3803C22.4457 15.3283 22.4569 15.2725 22.4569 15.2161V12.2743C22.4566 12.1779 22.4241 12.0843 22.3644 12.0085C22.3048 11.9327 22.2215 11.879 22.1278 11.8561H17.0741C16.506 11.8561 15.9611 11.6309 15.5588 11.2298C15.1565 10.8288 14.9296 10.2847 14.9278 9.71663V5.12234C14.9287 5.06625 14.9183 5.01055 14.8973 4.95855C14.8763 4.90655 14.845 4.85932 14.8053 4.81965C14.7657 4.77999 14.7184 4.74871 14.6664 4.72767C14.6144 4.70663 14.5587 4.69627 14.5026 4.6972H4.40206C4.17474 4.6972 3.95672 4.60689 3.79597 4.44614C3.63523 4.2854 3.54492 4.06738 3.54492 3.84005C3.54492 3.61272 3.63523 3.39471 3.79597 3.23396C3.95672 3.07322 4.17474 2.98291 4.40206 2.98291H14.5026C14.7836 2.98291 15.0618 3.03825 15.3214 3.14576C15.5809 3.25328 15.8168 3.41087 16.0154 3.60953C16.2141 3.8082 16.3717 4.04405 16.4792 4.30362C16.5867 4.56318 16.6421 4.84139 16.6421 5.12234V9.70291C16.6421 9.75932 16.6533 9.81517 16.6751 9.86721C16.6969 9.91924 16.7288 9.96641 16.769 10.006C16.8092 10.0456 16.8569 10.0767 16.9093 10.0977C16.9616 10.1186 17.0177 10.129 17.0741 10.1281H22.0249C22.1815 10.1301 22.3375 10.1462 22.4912 10.1761L22.6421 10.2241C23.0861 10.3539 23.4756 10.625 23.7516 10.9962C24.0275 11.3675 24.1749 11.8186 24.1712 12.2812V15.2229C24.1676 15.7898 23.9399 16.3322 23.5377 16.7317C23.1356 17.1313 22.5918 17.3555 22.0249 17.3555Z" fill={fill} />
        <path d="M9.11978 17.3555V15.3555V17.3555ZM17.3072 15.6412V13.6412V15.6412ZM22.0249 17.3555L22.025 15.3555H22.0249V17.3555ZM21.8192 17.3555V15.3555V17.3555ZM22.0249 15.6412L22.0572 13.6415L22.0411 13.6412H22.0249V15.6412ZM22.4569 15.2161H20.4569V15.2163L22.4569 15.2161ZM22.4569 12.2743H24.4569L24.4569 12.2684L22.4569 12.2743ZM22.1278 11.8561L22.604 9.91357L22.3693 9.85605H22.1278V11.8561ZM17.0741 11.8561V9.85605H17.0741L17.0741 11.8561ZM14.9278 9.71663H12.9278L12.9278 9.72301L14.9278 9.71663ZM14.9278 5.12234L12.9281 5.08928L12.9278 5.10581V5.12234H14.9278ZM14.5026 4.6972V6.6972H14.5192L14.5357 6.69692L14.5026 4.6972ZM4.40206 4.6972V2.6972V4.6972ZM4.40206 2.98291V4.98291V2.98291ZM14.5026 2.98291V4.98291V2.98291ZM16.6421 9.70291L18.6421 9.70317V9.70291H16.6421ZM17.0741 10.1281V8.12805H17.0579L17.0418 8.12831L17.0741 10.1281ZM22.0249 10.1281L22.0509 8.12822L22.0379 8.12805H22.0249V10.1281ZM22.4912 10.1761L23.0976 8.2702L22.9871 8.23503L22.8732 8.21287L22.4912 10.1761ZM22.6421 10.2241L22.0357 12.1299L22.0582 12.1371L22.0808 12.1437L22.6421 10.2241ZM24.1712 12.2812L22.1713 12.2654L22.1712 12.2733V12.2812H24.1712ZM24.1712 15.2229L26.1712 15.2357V15.2229H24.1712ZM17.3072 15.3555H9.11978V19.3555H17.3072V15.3555ZM9.11978 15.3555C9.42288 15.3555 9.71357 15.4759 9.9279 15.6902L7.09947 18.5186C7.63529 19.0545 8.36202 19.3555 9.11978 19.3555V15.3555ZM9.9279 15.6902C10.1422 15.9045 10.2626 16.1952 10.2626 16.4983H6.26264C6.26264 17.2561 6.56365 17.9828 7.09947 18.5186L9.9279 15.6902ZM10.2626 16.4983C10.2626 16.8014 10.1422 17.0921 9.9279 17.3065L7.09947 14.478C6.56366 15.0139 6.26264 15.7406 6.26264 16.4983H10.2626ZM9.9279 17.3065C9.71358 17.5208 9.42289 17.6412 9.11978 17.6412V13.6412C8.36201 13.6412 7.63529 13.9422 7.09947 14.478L9.9279 17.3065ZM9.11978 17.6412H17.3072V13.6412H9.11978V17.6412ZM17.3072 17.6412C17.0041 17.6412 16.7134 17.5208 16.4991 17.3065L19.3275 14.478C18.7917 13.9422 18.065 13.6412 17.3072 13.6412V17.6412ZM16.4991 17.3065C16.2848 17.0921 16.1644 16.8014 16.1644 16.4983H20.1644C20.1644 15.7406 19.8633 15.0139 19.3275 14.478L16.4991 17.3065ZM16.1644 16.4983C16.1644 16.1952 16.2848 15.9045 16.4991 15.6902L19.3275 18.5186C19.8633 17.9828 20.1644 17.2561 20.1644 16.4983H16.1644ZM16.4991 15.6902C16.7134 15.4759 17.0041 15.3555 17.3072 15.3555V19.3555C18.065 19.3555 18.7917 19.0545 19.3275 18.5186L16.4991 15.6902ZM22.0249 15.3555H21.8192V19.3555H22.0249V15.3555ZM21.8192 15.3555C22.1223 15.3555 22.413 15.4759 22.6273 15.6902L19.7989 18.5186C20.3347 19.0545 21.0614 19.3555 21.8192 19.3555V15.3555ZM22.6273 15.6902C22.8417 15.9045 22.9621 16.1952 22.9621 16.4983H18.9621C18.9621 17.2561 19.2631 17.9828 19.7989 18.5186L22.6273 15.6902ZM22.9621 16.4983C22.9621 16.8014 22.8417 17.0921 22.6273 17.3065L19.7989 14.478C19.2631 15.0138 18.9621 15.7406 18.9621 16.4983H22.9621ZM22.6273 17.3065C22.413 17.5208 22.1223 17.6412 21.8192 17.6412V13.6412C21.0614 13.6412 20.3347 13.9422 19.7989 14.478L22.6273 17.3065ZM21.8192 17.6412H22.0249V13.6412H21.8192V17.6412ZM21.9927 17.6409C22.3144 17.6461 22.634 17.5872 22.9327 17.4677L21.4467 13.754C21.6407 13.6763 21.8483 13.6381 22.0572 13.6415L21.9927 17.6409ZM22.9327 17.4677C23.2315 17.3481 23.5035 17.1703 23.7328 16.9446L20.9271 14.0936C21.0761 13.9471 21.2527 13.8316 21.4467 13.754L22.9327 17.4677ZM23.7328 16.9446C23.9622 16.7189 24.1443 16.4498 24.2687 16.153L20.5792 14.6077C20.6599 14.415 20.7782 14.2402 20.9271 14.0936L23.7328 16.9446ZM24.2687 16.153C24.393 15.8562 24.457 15.5376 24.4569 15.2158L20.4569 15.2163C20.4569 15.0073 20.4985 14.8004 20.5792 14.6077L24.2687 16.153ZM24.4569 15.2161V12.2743H20.4569V15.2161H24.4569ZM24.4569 12.2684C24.4553 11.7253 24.272 11.1985 23.9362 10.7717L20.7927 13.2453C20.5762 12.9701 20.458 12.6304 20.4569 12.2803L24.4569 12.2684ZM23.9362 10.7717C23.6004 10.3449 23.1314 10.0429 22.604 9.91357L21.6516 13.7985C21.3116 13.7152 21.0092 13.5204 20.7927 13.2453L23.9362 10.7717ZM22.1278 9.85605H17.0741V13.8561H22.1278V9.85605ZM17.0741 9.85605C17.0353 9.85605 16.9982 9.84071 16.9708 9.81337L14.1469 12.6463C14.9241 13.421 15.9767 13.8561 17.0741 13.8561L17.0741 9.85605ZM16.9708 9.81337C16.9434 9.78604 16.9279 9.74895 16.9278 9.71024L12.9278 9.72301C12.9313 10.8204 13.3697 11.8716 14.1469 12.6463L16.9708 9.81337ZM16.9278 9.71663V5.12234H12.9278V9.71663H16.9278ZM16.9275 5.1554C16.9329 4.83112 16.8729 4.5091 16.7513 4.20849L13.0433 5.70862C12.9637 5.51201 12.9245 5.30139 12.9281 5.08928L16.9275 5.1554ZM16.7513 4.20849C16.6297 3.90787 16.4489 3.63477 16.2195 3.40544L13.3911 6.23387C13.2411 6.08386 13.1228 5.90523 13.0433 5.70862L16.7513 4.20849ZM16.2195 3.40544C15.9902 3.17612 15.7171 2.99527 15.4165 2.87365L13.9164 6.58169C13.7197 6.50214 13.5411 6.38385 13.3911 6.23387L16.2195 3.40544ZM15.4165 2.87365C15.1159 2.75202 14.7938 2.69211 14.4696 2.69747L14.5357 6.69692C14.3236 6.70043 14.113 6.66124 13.9164 6.58169L15.4165 2.87365ZM14.5026 2.6972H4.40206V6.6972H14.5026V2.6972ZM4.40206 2.6972C4.70517 2.6972 4.99586 2.8176 5.21019 3.03193L2.38176 5.86036C2.91758 6.39618 3.6443 6.6972 4.40206 6.6972V2.6972ZM5.21019 3.03193C5.42451 3.24626 5.54492 3.53695 5.54492 3.84005H1.54492C1.54492 4.59781 1.84594 5.32454 2.38176 5.86036L5.21019 3.03193ZM5.54492 3.84005C5.54492 4.14316 5.42451 4.43385 5.21019 4.64818L2.38176 1.81975C1.84594 2.35557 1.54492 3.08229 1.54492 3.84005H5.54492ZM5.21019 4.64818C4.99586 4.8625 4.70517 4.98291 4.40206 4.98291V0.98291C3.6443 0.98291 2.91758 1.28393 2.38176 1.81975L5.21019 4.64818ZM4.40206 4.98291H14.5026V0.98291H4.40206V4.98291ZM14.5026 4.98291C14.5209 4.98291 14.5391 4.98652 14.556 4.99352L16.0867 1.29801C15.5845 1.08998 15.0462 0.98291 14.5026 0.98291V4.98291ZM14.556 4.99352C14.5729 5.00053 14.5883 5.0108 14.6012 5.02375L17.4297 2.19532C17.0453 1.81094 16.5889 1.50603 16.0867 1.29801L14.556 4.99352ZM14.6012 5.02375C14.6142 5.0367 14.6244 5.05207 14.6315 5.06898L18.327 3.53825C18.1189 3.03603 17.814 2.5797 17.4297 2.19532L14.6012 5.02375ZM14.6315 5.06898C14.6385 5.0859 14.6421 5.10403 14.6421 5.12234H18.6421C18.6421 4.57874 18.535 4.04047 18.327 3.53825L14.6315 5.06898ZM14.6421 5.12234V9.70291H18.6421V5.12234H14.6421ZM14.6421 9.70265C14.642 10.0244 14.706 10.343 14.8303 10.6398L18.5198 9.09457C18.6005 9.28733 18.6421 9.49422 18.6421 9.70317L14.6421 9.70265ZM14.8303 10.6398C14.9547 10.9366 15.1368 11.2058 15.3661 11.4315L18.1719 8.5805C18.3208 8.72708 18.4391 8.90183 18.5198 9.09457L14.8303 10.6398ZM15.3661 11.4315C15.5955 11.6572 15.8675 11.835 16.1662 11.9545L17.6523 8.24082C17.8463 8.31846 18.0229 8.43393 18.1719 8.5805L15.3661 11.4315ZM16.1662 11.9545C16.465 12.0741 16.7846 12.133 17.1063 12.1278L17.0418 8.12831C17.2507 8.12494 17.4583 8.16319 17.6523 8.24082L16.1662 11.9545ZM17.0741 12.1281H22.0249V8.12805H17.0741V12.1281ZM21.999 12.1279C22.036 12.1284 22.0729 12.1322 22.1092 12.1392L22.8732 8.21287C22.6022 8.16014 22.327 8.13181 22.0509 8.12822L21.999 12.1279ZM21.8848 12.0819L22.0357 12.1299L23.2485 8.3182L23.0976 8.2702L21.8848 12.0819ZM22.0808 12.1437C22.1071 12.1514 22.1301 12.1674 22.1465 12.1894L25.3567 9.80308C24.8211 9.08253 24.065 8.55635 23.2033 8.30441L22.0808 12.1437ZM22.1465 12.1894C22.1628 12.2113 22.1715 12.238 22.1713 12.2654L26.1711 12.297C26.1783 11.3992 25.8923 10.5236 25.3567 9.80308L22.1465 12.1894ZM22.1712 12.2812V15.2229H26.1712V12.2812H22.1712ZM22.1712 15.2101C22.171 15.2488 22.1555 15.2857 22.1281 15.313L24.9474 18.1504C25.7242 17.3786 26.1642 16.3308 26.1712 15.2357L22.1712 15.2101ZM22.1281 15.313C22.1007 15.3402 22.0636 15.3555 22.025 15.3555L22.0249 19.3555C23.12 19.3555 24.1706 18.9223 24.9474 18.1504L22.1281 15.313Z" fill={fill} mask="url(#path-1-inside-1_17170_10690)" />
        <path d="M22.3202 11.8834C22.1439 11.8834 21.9721 11.8286 21.8284 11.7266C21.6846 11.6247 21.5761 11.4806 21.5179 11.3143L20.1465 7.50168C20.1095 7.45023 20.0613 7.408 20.0054 7.37827C19.9495 7.34853 19.8875 7.3321 19.8242 7.33025H15.7716C15.5443 7.33025 15.3262 7.23995 15.1655 7.0792C15.0048 6.91846 14.9144 6.70044 14.9144 6.47311C14.9144 6.24578 15.0048 6.02776 15.1655 5.86702C15.3262 5.70627 15.5443 5.61597 15.7716 5.61597H19.8242C20.2042 5.61745 20.5767 5.72142 20.9026 5.91693C21.2284 6.11243 21.4955 6.39223 21.6756 6.72682C21.6967 6.76665 21.715 6.80789 21.7305 6.85025L23.1019 10.7383C23.1769 10.9529 23.1642 11.1885 23.0666 11.3939C22.9691 11.5992 22.7945 11.7579 22.5807 11.8354C22.4962 11.8623 22.4087 11.8784 22.3202 11.8834ZM19.5636 21.0171C18.9465 21.0171 18.3433 20.8341 17.8302 20.4913C17.3171 20.1485 16.9172 19.6612 16.6811 19.0911C16.4449 18.521 16.3832 17.8936 16.5035 17.2884C16.6239 16.6832 16.9211 16.1273 17.3574 15.6909C17.7938 15.2546 18.3497 14.9574 18.9549 14.8371C19.5601 14.7167 20.1875 14.7785 20.7576 15.0146C21.3277 15.2508 21.8149 15.6506 22.1578 16.1637C22.5006 16.6768 22.6836 17.28 22.6836 17.8971C22.6836 18.7246 22.3549 19.5182 21.7698 20.1033C21.1847 20.6884 20.3911 21.0171 19.5636 21.0171ZM19.5636 16.4914C19.2842 16.4846 19.0091 16.5612 18.7735 16.7115C18.5379 16.8617 18.3524 17.0788 18.2407 17.335C18.129 17.5912 18.0962 17.8748 18.1466 18.1497C18.1969 18.4246 18.328 18.6783 18.5231 18.8783C18.7183 19.0784 18.9686 19.2157 19.2422 19.2728C19.5158 19.3299 19.8002 19.3041 20.059 19.1988C20.3179 19.0935 20.5395 18.9134 20.6955 18.6815C20.8516 18.4497 20.9349 18.1766 20.935 17.8971C20.9351 17.5302 20.7917 17.1777 20.5355 16.915C20.2792 16.6524 19.9304 16.5003 19.5636 16.4914ZM6.85731 21.0171C6.24023 21.0171 5.63701 20.8341 5.12393 20.4913C4.61085 20.1485 4.21095 19.6612 3.9748 19.0911C3.73866 18.521 3.67687 17.8936 3.79726 17.2884C3.91764 16.6832 4.21479 16.1273 4.65113 15.6909C5.08747 15.2546 5.6434 14.9574 6.24862 14.8371C6.85385 14.7167 7.48117 14.7785 8.05128 15.0146C8.62138 15.2508 9.10866 15.6506 9.45149 16.1637C9.79432 16.6768 9.97731 17.28 9.97731 17.8971C9.97731 18.7246 9.64859 19.5182 9.06348 20.1033C8.47837 20.6884 7.68478 21.0171 6.85731 21.0171ZM6.85731 16.4914C6.57928 16.4914 6.3075 16.5738 6.07633 16.7283C5.84516 16.8828 5.66499 17.1023 5.5586 17.3592C5.4522 17.616 5.42436 17.8987 5.4786 18.1714C5.53284 18.444 5.66672 18.6945 5.86332 18.8911C6.05991 19.0877 6.31038 19.2216 6.58307 19.2758C6.85575 19.3301 7.13839 19.3022 7.39525 19.1958C7.65211 19.0894 7.87165 18.9093 8.02612 18.6781C8.18058 18.4469 8.26302 18.1751 8.26302 17.8971C8.26302 17.5243 8.11492 17.1667 7.8513 16.9031C7.58767 16.6395 7.23013 16.4914 6.85731 16.4914Z" fill={fill} />
        <path d="M15.7713 17.3554C15.6585 17.3563 15.5466 17.3348 15.4422 17.292C15.3378 17.2492 15.243 17.1861 15.1632 17.1064C15.0834 17.0266 15.0203 16.9317 14.9775 16.8273C14.9348 16.7229 14.9132 16.6111 14.9142 16.4982V9.00339C14.9142 8.77606 15.0045 8.55804 15.1652 8.39729C15.326 8.23655 15.544 8.14624 15.7713 8.14624C15.9986 8.14624 16.2167 8.23655 16.3774 8.39729C16.5381 8.55804 16.6284 8.77606 16.6284 9.00339V16.4982C16.6294 16.6111 16.6078 16.7229 16.5651 16.8273C16.5223 16.9317 16.4592 17.0266 16.3794 17.1064C16.2997 17.1861 16.2048 17.2492 16.1004 17.292C15.996 17.3348 15.8841 17.3563 15.7713 17.3554ZM6.9873 9.03081H1.3713C1.14397 9.03081 0.925957 8.94051 0.765211 8.77976C0.604466 8.61902 0.51416 8.401 0.51416 8.17367C0.51416 7.94634 0.604466 7.72833 0.765211 7.56758C0.925957 7.40683 1.14397 7.31653 1.3713 7.31653H6.9873C7.21463 7.31653 7.43265 7.40683 7.59339 7.56758C7.75414 7.72833 7.84445 7.94634 7.84445 8.17367C7.84445 8.401 7.75414 8.61902 7.59339 8.77976C7.43265 8.94051 7.21463 9.03081 6.9873 9.03081ZM8.0433 12.8571H5.10845C4.88112 12.8571 4.6631 12.7668 4.50235 12.606C4.34161 12.4453 4.2513 12.2273 4.2513 12C4.2513 11.7726 4.34161 11.5546 4.50235 11.3939C4.6631 11.2331 4.88112 11.1428 5.10845 11.1428H8.0433C8.27063 11.1428 8.48865 11.2331 8.64939 11.3939C8.81014 11.5546 8.90045 11.7726 8.90045 12C8.90045 12.2273 8.81014 12.4453 8.64939 12.606C8.48865 12.7668 8.27063 12.8571 8.0433 12.8571Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_17170_10690">
          <rect width="24" height="24" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  ),

  OrderDelivered: ({ className = "w-6 h-6", fill = "#949494", ...props }) => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask id="path-1-inside-1_13854_18271" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.75 7.5C10.75 7.91421 10.4142 8.25 10 8.25H2C1.58579 8.25 1.25 7.91421 1.25 7.5C1.25 7.08579 1.58579 6.75 2 6.75H10C10.4142 6.75 10.75 7.08579 10.75 7.5ZM8.75 12.5C8.75 12.9142 8.41421 13.25 8 13.25H2C1.58579 13.25 1.25 12.9142 1.25 12.5C1.25 12.0858 1.58579 11.75 2 11.75H8C8.41421 11.75 8.75 12.0858 8.75 12.5ZM10.75 17.5C10.75 17.9142 10.4142 18.25 10 18.25H2C1.58579 18.25 1.25 17.9142 1.25 17.5C1.25 17.0858 1.58579 16.75 2 16.75H10C10.4142 16.75 10.75 17.0858 10.75 17.5ZM17 8.25C14.6528 8.25 12.75 10.1528 12.75 12.5C12.75 14.8472 14.6528 16.75 17 16.75C19.3472 16.75 21.25 14.8472 21.25 12.5C21.25 10.1528 19.3472 8.25 17 8.25ZM11.25 12.5C11.25 9.32436 13.8244 6.75 17 6.75C20.1756 6.75 22.75 9.32436 22.75 12.5C22.75 15.6756 20.1756 18.25 17 18.25C13.8244 18.25 11.25 15.6756 11.25 12.5Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.75 7.5C10.75 7.91421 10.4142 8.25 10 8.25H2C1.58579 8.25 1.25 7.91421 1.25 7.5C1.25 7.08579 1.58579 6.75 2 6.75H10C10.4142 6.75 10.75 7.08579 10.75 7.5ZM8.75 12.5C8.75 12.9142 8.41421 13.25 8 13.25H2C1.58579 13.25 1.25 12.9142 1.25 12.5C1.25 12.0858 1.58579 11.75 2 11.75H8C8.41421 11.75 8.75 12.0858 8.75 12.5ZM10.75 17.5C10.75 17.9142 10.4142 18.25 10 18.25H2C1.58579 18.25 1.25 17.9142 1.25 17.5C1.25 17.0858 1.58579 16.75 2 16.75H10C10.4142 16.75 10.75 17.0858 10.75 17.5ZM17 8.25C14.6528 8.25 12.75 10.1528 12.75 12.5C12.75 14.8472 14.6528 16.75 17 16.75C19.3472 16.75 21.25 14.8472 21.25 12.5C21.25 10.1528 19.3472 8.25 17 8.25ZM11.25 12.5C11.25 9.32436 13.8244 6.75 17 6.75C20.1756 6.75 22.75 9.32436 22.75 12.5C22.75 15.6756 20.1756 18.25 17 18.25C13.8244 18.25 11.25 15.6756 11.25 12.5Z"
        fill={fill}
      />
      <path
        d="M8.75 7.5C8.75 6.80962 9.30965 6.25 10 6.25V10.25C11.5188 10.25 12.75 9.0188 12.75 7.5H8.75ZM10 6.25H2V10.25H10V6.25ZM2 6.25C2.69036 6.25 3.25 6.80964 3.25 7.5H-0.75C-0.75 9.01878 0.48122 10.25 2 10.25V6.25ZM3.25 7.5C3.25 8.19036 2.69036 8.75 2 8.75V4.75C0.48122 4.75 -0.75 5.98122 -0.75 7.5H3.25ZM2 8.75H10V4.75H2V8.75ZM10 8.75C9.30965 8.75 8.75 8.19038 8.75 7.5H12.75C12.75 5.9812 11.5188 4.75 10 4.75V8.75ZM6.75 12.5C6.75 11.8096 7.30962 11.25 8 11.25V15.25C9.5188 15.25 10.75 14.0188 10.75 12.5H6.75ZM8 11.25H2V15.25H8V11.25ZM2 11.25C2.69038 11.25 3.25 11.8096 3.25 12.5H-0.75C-0.75 14.0188 0.481203 15.25 2 15.25V11.25ZM3.25 12.5C3.25 13.1904 2.69038 13.75 2 13.75V9.75C0.481203 9.75 -0.75 10.9812 -0.75 12.5H3.25ZM2 13.75H8V9.75H2V13.75ZM8 13.75C7.30962 13.75 6.75 13.1904 6.75 12.5H10.75C10.75 10.9812 9.5188 9.75 8 9.75V13.75ZM8.75 17.5C8.75 16.8096 9.30963 16.25 10 16.25V20.25C11.5188 20.25 12.75 19.0188 12.75 17.5H8.75ZM10 16.25H2V20.25H10V16.25ZM2 16.25C2.69038 16.25 3.25 16.8096 3.25 17.5H-0.75C-0.75 19.0188 0.481203 20.25 2 20.25V16.25ZM3.25 17.5C3.25 18.1904 2.69038 18.75 2 18.75V14.75C0.481203 14.75 -0.75 15.9812 -0.75 17.5H3.25ZM2 18.75H10V14.75H2V18.75ZM10 18.75C9.30963 18.75 8.75 18.1904 8.75 17.5H12.75C12.75 15.9812 11.5188 14.75 10 14.75V18.75ZM17 6.25C13.5482 6.25 10.75 9.04822 10.75 12.5H14.75C14.75 11.2574 15.7574 10.25 17 10.25V6.25ZM10.75 12.5C10.75 15.9518 13.5482 18.75 17 18.75V14.75C15.7574 14.75 14.75 13.7426 14.75 12.5H10.75ZM17 18.75C20.4518 18.75 23.25 15.9518 23.25 12.5H19.25C19.25 13.7426 18.2426 14.75 17 14.75V18.75ZM23.25 12.5C23.25 9.04822 20.4518 6.25 17 6.25V10.25C18.2426 10.25 19.25 11.2574 19.25 12.5H23.25ZM13.25 12.5C13.25 10.4289 14.929 8.75 17 8.75V4.75C12.7198 4.75 9.25 8.21978 9.25 12.5H13.25ZM17 8.75C19.071 8.75 20.75 10.4289 20.75 12.5H24.75C24.75 8.21978 21.2802 4.75 17 4.75V8.75ZM20.75 12.5C20.75 14.571 19.071 16.25 17 16.25V20.25C21.2802 20.25 24.75 16.7802 24.75 12.5H20.75ZM17 16.25C14.929 16.25 13.25 14.571 13.25 12.5H9.25C9.25 16.7802 12.7198 20.25 17 20.25V16.25Z"
        fill={fill}
        mask="url(#path-1-inside-1_13854_18271)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 9.75C17.4142 9.75 17.75 10.0858 17.75 10.5V12.0664L18.5668 13.0088C18.838 13.3218 18.8042 13.7955 18.4912 14.0668C18.1782 14.338 17.7045 14.3042 17.4332 13.9912L16.4332 12.8374C16.3151 12.701 16.25 12.5266 16.25 12.3462V10.5C16.25 10.0858 16.5858 9.75 17 9.75Z"
        fill={fill}
      />
    </svg>
  ),

  Filter: ({ className = "w-5 h-5", stroke = "#434343", ...props }) => (
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
        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  ArrowRightSmall: ({ className = "w-3 h-3", fill = "white", ...props }) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        opacity="0.5"
        d="M1.91675 5.21094C1.61903 5.21094 1.37769 5.45228 1.37769 5.75C1.37769 6.04772 1.61903 6.28906 1.91675 6.28906V5.75V5.21094ZM1.91675 5.75V6.28906H9.58341V5.75V5.21094H1.91675V5.75Z"
        fill={fill}
      />
      <path
        d="M6.70825 2.875L9.58325 5.75L6.70825 8.625"
        stroke={fill}
        strokeWidth="1.07812"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default Icons;
