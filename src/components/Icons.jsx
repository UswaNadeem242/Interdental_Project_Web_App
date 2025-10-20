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
};

export default Icons;
