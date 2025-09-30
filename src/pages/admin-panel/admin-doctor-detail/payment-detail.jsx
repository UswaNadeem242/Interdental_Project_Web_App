import React from "react";

function PaymentDetail() {
  return (
    <div className=" mx-auto py-6 space-y-8 font-poppins">
      {/* Card Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#333333]">Card Info</h2>

        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">Card Number</p>
          <p className="text-secondaryText text-xs font-medium">glis bunny</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-[#0000001A] rounded-md">
            <p className="text-sm font-bold text-primaryText mb-1">
              Exp month and year
            </p>
            <p className="text-secondaryText text-xs font-medium">02/08</p>
          </div>
          <div className="p-4 border-2 border-[#0000001A] rounded-md">
            <p className="text-sm font-bold text-primaryText mb-1">
              Security Code
            </p>
            <p className="text-secondaryText text-xs font-medium">4567</p>
          </div>
        </div>
      </div>

      {/* Billing Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#333333]">Billing Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-[#0000001A] rounded-md">
            <p className="text-sm font-bold text-primaryText mb-1">
              First Name
            </p>
            <p className="text-secondaryText text-xs font-medium">glis</p>
          </div>
          <div className="p-4 border-2 border-[#0000001A] rounded-md">
            <p className="text-sm font-bold text-primaryText mb-1">
              Middle Name
            </p>
            <p className="text-secondaryText text-xs font-medium">bunny</p>
          </div>
          <div className="p-4 border-2 border-[#0000001A] rounded-md">
            <p className="text-sm font-bold text-primaryText mb-1">Last Name</p>
            <p className="text-secondaryText text-xs font-medium">glif</p>
          </div>
        </div>

        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">
            Phone Number
          </p>
          <p className="text-secondaryText text-xs font-medium">
            (+33)7 75 55 87 24
          </p>
        </div>

        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">
            Email Address
          </p>
          <p className="text-secondaryText text-xs font-medium">
            tienlapspktnd@gmail.com
          </p>
        </div>

        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">
            Street Address
          </p>
          <p className="text-secondaryText text-xs font-medium">
            0 / 77 Purdy Crescent, West Arthur
          </p>
        </div>

        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">City</p>
          <p className="text-secondaryText text-xs font-medium">Phone Number</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetail;
