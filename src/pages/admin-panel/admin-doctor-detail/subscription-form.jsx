import React from "react";

function SubscriptionForm({ title, para, text, number }) {
  return (
    <div className="col-span-4 mt-8">
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-black font-poppins font-semibold text-sm ">
          {title}
          <p className="text-xs font-poppins font-medium  pt-6 text-primaryText">
            {para}
          </p>
        </p>

        <div className=" pt-3 pb-3 pr-5">
          <div className="pb-4">
            <div className="w-full px-1 py-1  bg-bgWhite rounded-full  ">
              <div
                className="bg-secondaryBrand h-2.5 rounded-full "
                style={{ width: `65%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-bgWhite">
          <span className="text-xs text-primaryText font-poppins font-normal">
            {text}
          </span>
          <span className="text-xs font-medium text-secondaryBrand">{number}</span>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionForm;
