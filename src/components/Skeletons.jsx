import React from "react";

// Product Skeleton Component
export const ProductSkeleton = () => (
  <div className="flex flex-col lg:flex-row justify-center items-center w-full min-h-[500px] gap-6 lg:gap-8 rounded-2xl bg-white p-4 md:p-6 lg:p-8">
    {/* Image Skeleton */}
    <div className="w-full lg:w-[437px] h-[300px] sm:h-[400px] lg:h-[501px] flex-shrink-0">
      <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
    </div>
    
    {/* Content Skeleton */}
    <div className="flex flex-col justify-start items-start flex-1 w-full space-y-4 md:space-y-6">
      <div className="flex flex-col justify-start items-start w-full border-b border-gray-200 pb-4 md:pb-6 space-y-3 md:space-y-4">
        {/* Title Skeleton */}
        <div className="flex items-center gap-2 md:gap-4 w-full">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
        </div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-8"></div>
        </div>
        
        {/* Price Skeleton */}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
      </div>
      
      {/* Description Skeleton */}
      <div className="w-full space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
      
      {/* Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full">
        <div className="h-12 bg-gray-200 rounded-full animate-pulse w-full sm:w-auto sm:flex-1 max-w-[200px]"></div>
        <div className="h-12 bg-gray-200 rounded-full animate-pulse w-full sm:w-auto sm:flex-1 max-w-[200px]"></div>
        <div className="w-[51.28px] h-[51.28px] bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      
      {/* Category Skeleton */}
      <div className="flex items-center gap-2 w-full pt-2 md:pt-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
    </div>
  </div>
);

// Single Notification Skeleton Component
export const NotificationSkeleton = () => (
  <div className="flex justify-center items-center w-[335px] min-h-[95px] py-[10px] border-b-[1px] border-[#0000000D]">
    <div className="flex justify-start items-start w-[335px] gap-[5px]">
      {/* Skeleton for icon */}
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      
      <div className="flex flex-col w-[293px] space-y-[4px]">
        {/* Skeleton for title */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
        </div>
        
        {/* Skeleton for message */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        
        {/* Skeleton for timestamp and button */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  </div>
);

// Multiple Notifications Skeleton Component
export const NotificationsSkeleton = ({ count = 3 }) => (
  <div className="p-4 space-y-3">
    {Array.from({ length: count }, (_, index) => (
      <NotificationSkeleton key={index} />
    ))}
  </div>
);

// Generic Card Skeleton Component
export const CardSkeleton = ({ className = "" }) => (
  <div className={`bg-white rounded-lg p-4 animate-pulse ${className}`}>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Table Row Skeleton Component
export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }, (_, index) => (
      <td key={index} className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

// List Item Skeleton Component
export const ListItemSkeleton = () => (
  <div className="flex items-center space-x-3 p-3 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// Form Field Skeleton Component
export const FormFieldSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
);

// Button Skeleton Component
export const ButtonSkeleton = ({ width = "w-24", height = "h-10" }) => (
  <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`}></div>
);

// Image Skeleton Component
export const ImageSkeleton = ({ width = "w-full", height = "h-48", rounded = "rounded-lg" }) => (
  <div className={`${width} ${height} ${rounded} bg-gray-200 animate-pulse`}></div>
);

// Text Skeleton Component
export const TextSkeleton = ({ lines = 1, width = "w-full" }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, index) => (
      <div
        key={index}
        className={`h-4 bg-gray-200 rounded animate-pulse ${width} ${
          index === lines - 1 ? "w-3/4" : "w-full"
        }`}
      ></div>
    ))}
  </div>
);

// Grid Skeleton Component
export const GridSkeleton = ({ items = 6, columns = 3 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
    {Array.from({ length: items }, (_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

export default {
  ProductSkeleton,
  NotificationSkeleton,
  NotificationsSkeleton,
  CardSkeleton,
  TableRowSkeleton,
  ListItemSkeleton,
  FormFieldSkeleton,
  ButtonSkeleton,
  ImageSkeleton,
  TextSkeleton,
  GridSkeleton,
};
