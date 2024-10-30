import React from "react";

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 1,
      Status: "Order Confirmation",
      Description:
        "Thank you for your purchase! Your order #6674 is confirmed. Track it in My Orders.",
      Time: "15 May 2020 9:00 am",
    },
    {
      id: 2,
      Status: "Order Confirmation",
      Description:
        "Thank you for your purchase! Your order #6674 is confirmed. Track it in My Orders.",
      Time: "15 May 2020 9:00 am",
    },
    {
      id: 3,
      Status: "Order Confirmation",
      Description:
        "Thank you for your purchase! Your order #6674 is confirmed. Track it in My Orders.",
      Time: "15 May 2020 9:00 am",
    },
  ];
  return (
    <div className="w-[367px] h-[368px] bg-white rounded-[8px] border-[1px] space-y-[10px] p-[16px] border-[#0000000D] shadow-[0_0_0_1px_#0000000D]">
      <p className="font-poppins font-semibold text-[14px] leading-[21px] text-[#000000]">
        Notifications
      </p>
      {notifications.map((notification) => (
        <div className="flex justify-center items-center w-[335px] h-[95px] py-[10px] border-b-[1px] border-[#0000000D] space-y-[10px]">
          <div className="flex justify-start items-start w-[335px] h-[75px] gap-[10px]">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32.525" rx="16" fill="white" />
              <path
                d="M20.4994 14.6853V14.2002C20.4994 11.5364 18.485 9.37695 16 9.37695C13.515 9.37695 11.5006 11.5364 11.5006 14.2002V14.6853C11.5006 15.2675 11.3398 15.8367 11.0385 16.3212L10.3002 17.5083C9.62588 18.5926 10.1407 20.0665 11.3136 20.4094C14.3818 21.3064 17.6182 21.3064 20.6864 20.4094C21.8593 20.0665 22.3741 18.5926 21.6998 17.5083L20.9615 16.3212C20.6602 15.8367 20.4994 15.2675 20.4994 14.6853Z"
                stroke="#434343"
                stroke-width="0.8"
              />
              <path
                d="M13 21.0823C13.4367 22.2857 14.615 23.1479 16 23.1479C17.385 23.1479 18.5633 22.2857 19 21.0823"
                stroke="#434343"
                stroke-width="0.8"
                stroke-linecap="round"
              />
              <path
                d="M16 12.1313V14.8855"
                stroke="#434343"
                stroke-width="0.8"
              />
            </svg>
            <div className="flex flex-col w-[293px] h-[75px] space-y-[4px]">
              <p className="font-poppins font-medium text-[12px] leading-[18px] text-[#434343]">
                {notification.Status}
              </p>
              <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#949494]">
                {notification.Description}
              </p>
              <p className="font-outfit font-normal text-[10px] leading-[12.6px] text-[#949494]">
                {notification.Time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsDropdown;
