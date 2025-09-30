import React from "react";
import { SecondaryButton } from "../Common/Button";
import Rating from "../icon/Rating";

function ProductDetailsCard({ data, className }) {
  return (
    <div className={`flex flex-col font-poppins bg-bgWhite p-2 ${className}`}>
      <div className="text-[#1A1A1A] text-2xl font-semibold">{data.title}</div>
      <div className="flex gap-2 items-center mt-4">
        <div>
          <Rating />
        </div>
        <span className="text-[#000000] text-base font-semibold">
          {data.rating}
        </span>
      </div>

      <div className=" font-semibold text-[#001D58] text-xl mt-4">
        ${data.price}
      </div>
      <div className="text-[#808080] text-xs font-normal mt-4 max-w-xl capitalize">
        {data.desc}
      </div>
      <div className="flex gap-8 mt-4  items-center">
        <div>
          <span className="flex flex-col gap-4 items-start">
            <div className="text-[#434343] font-normal text-sm">Sold</div>
            <div className="text-[#434343] text-lg font-semibold">
              {data.sold}
            </div>
          </span>
        </div>
        <div>
          <span className="flex flex-col gap-4 items-start">
            <div className="text-[#434343] font-normal text-sm">In stock</div>
            <div className="text-[#434343] text-lg font-semibold">
              {data.inStock}
            </div>
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <SecondaryButton
          title="Delete"
          className="bg-[#E134341A] text-[#E13434] text-sm font-semibold rounded-3xl py-3 px-10"
        />
        <SecondaryButton
          title="Edit"
          className=" text-[#013764] border border-[#013764] text-sm font-semibold rounded-3xl py-3 px-10"
        />
        <SecondaryButton
          title="Add Stock"
          className="bg-[#001D58] text-[#F8F8F8] text-sm font-semibold rounded-3xl py-3 px-10"
        />
      </div>
      <div className="mt-6 text-[#1A1A1A] text-xs font-medium">
        Category:{" "}
        <span className="text-[#808080] text-xs font-normal">
          {data.category}
        </span>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
