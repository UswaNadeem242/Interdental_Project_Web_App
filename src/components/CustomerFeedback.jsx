import React from "react";
import Icons from "./Icons";
import StarRating from "./StarRating";
import formatRelativeTime from "../services/utils/formatRelativeTime";

const CustomerFeedback = ({ item, isLast, isOnlyItem }) => {
  return (
    <div
      className={`flex flex-col justify-start items-start  min-h-[69.58px] ${!isOnlyItem && !isLast ? "border-b-[1px] border-[#0000000D]" : ""} space-y-[9.59px]`}
    >
      <div className="flex w-full items-start relative min-h-[33.99px]">
        {/* Avatar */}
        {item?.imageUrl ? (
          <img
            src={item?.imageUrl}
            alt="customer"
            className="w-[33.98px] h-[31.97px] rounded-full"
          />
        ) : (
          <Icons.UserAvatar />
        )}
        {/* Name & Rating */}
        <div className="flex flex-col justify-start items-start w-[198.96px] h-[33.99px] space-y-[1.6px] ml-[10px]">
          <h1 className="font-poppins font-medium text-[14px] text-[#1A1A1A]">
            {item?.name}
          </h1>
          <StarRating
            rating={item?.rating || 0}
            readOnly={true}
            size="w-4 h-4"
            maxRating={5}
          />
        </div>
        {/* createdAt right-top absolute */}
        {item?.createdAt && (
          <span className="absolute top-1 right-0 font-poppins text-xs text-gray-400">
            {formatRelativeTime(item.createdAt)}
          </span>
        )}
      </div>
      <h1 className="font-poppins mt-2 font-normal text-sm leading-[18px] text-[#808080]">
        {item?.review}
      </h1>
    </div>
  );
};

export default CustomerFeedback;
