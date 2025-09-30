import React from "react";

import FiveStarRating from "../icon/FiveStarRating";

function CustomerFeedback({ title, className, data }) {
  return (
    <div className={`bg-bgWhite rounded-xl p-6 font-poppins ${className}`}>
      <h2 className="text-lg font-semibold mb-4 text-[#434343]">{title}</h2>
      <div className="space-y-6">
        {data.map((data, key) => (
          <div
            key={key}
            className="flex flex-col border-b pb-4 last:border-none"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 ">
                {/* <AvatarIcon /> */}

                {/* <ProfileIcon /> */}
                <img
                  src="/assets/user01.png"
                  className="w-10 h-10"
                  alt="userImg"
                />
                <div>
                  <p className="font-medium text-[#1A1A1A] text-xs">
                    {data.name}
                  </p>
                  <div className="flex space-x-1">
                    <FiveStarRating />
                  </div>
                </div>
              </div>
              <span className="text-[#999999] text-xs font-normal">
                {data.time}
              </span>
            </div>
            <p className="text-[#808080] font-normal mt-2 text-xs">
              {data.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerFeedback;
