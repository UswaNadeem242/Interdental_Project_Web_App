import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-sm p-4 h-[430px] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-[263px] h-[260px] bg-gray-200 rounded-lg"></div>

      {/* Text Content Skeleton */}
      <div className="text-center mt-3 flex flex-col flex-grow justify-between w-full">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Price and Rating Skeleton */}
        <div className="flex gap-2 justify-center items-center mt-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>

      {/* Button Section Skeleton */}
      <div className="flex items-center justify-center gap-3 mt-1 w-full mx-auto">
        <div className="w-[185.27px] h-[48px] bg-gray-200 rounded-[28px]"></div>
        <div className="w-[51.28px] h-[51.28px] bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
