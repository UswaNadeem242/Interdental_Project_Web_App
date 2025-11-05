import React from "react";

function SubscriptionForm({ title, para, text, number, percentage = 65 }) {
  return (
    <div className="bg-card p-6 rounded-2xl">
      <div className="flex flex-col gap-4">
        {/* Title and Expiration */}
        <div>
          <p className="text-black font-poppins font-semibold text-sm">
            {title}
          </p>
          <p className="text-xs font-poppins font-medium pt-2 text-primaryText">
            {para}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="">
          <div className="w-full px-1 py-1 bg-bgWhite rounded-full">
            <div
              className="bg-secondaryBrand h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Patient Count */}
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-bgWhite">
          <span className="text-xs text-primaryText font-poppins font-normal">
            {text}
          </span>
          <span className="text-xs font-medium text-secondaryBrand">
            {number}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionForm;
