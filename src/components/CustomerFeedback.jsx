import React from "react";

const CustomerFeedback = ({ item }) => {
  return (
    <div className="flex flex-col justify-start items-start w-[92%] h-[69.58px] border-b-[1px] border-[#0000000D] space-y-[9.59px]">
      <div className="flex gap-[10px] w-full h-[33.99px]">
        <img
          src="/assets/customer.png"
          alt="customer image"
          className="w-[33.98px] h-[31.97px]"
        />
        <div className="flex flex-col justify-start items-start w-[198.96px] h-[33.99px] space-y-[1.6px]">
          <h1>{item.name}</h1>
          <div className="flex w-fit h-[12.79px]">
            {[...Array(item.rating)].map((_, index) => (
              <img
                key={index}
                src={
                  index < item.rating
                    ? "/assets/star-filled.png"
                    : "/assets/star-empty.png"
                }
                alt={index < item.rating ? "star filled" : "star empty"}
                className="w-[12.79px] h-[12.79px]"
              />
            ))}
          </div>
        </div>
      </div>
      <h1 className="font-poppins font-normal text-[12px] leading-[18px] text-[#808080]">
        {item.review}
      </h1>
    </div>
  );
};

export default CustomerFeedback;
