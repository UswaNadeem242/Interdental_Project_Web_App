import React from "react";

function UserDetailsCard({ fullName, email, contactNumber, shippingAddress }) {
  return (
    <div className="bg-[#FFFFFF] p-4 rounded-2xl font-poppins">
      <h2 className="text-lg font-semibold mb-4">Buyer’s Details</h2>

      {/* Full Name */}
      <div className="mb-6">
        <p className="text-xs font-normal text-[#949494]">Full name</p>
        <p className="font-normal text-sm text-[#434343] mt-3">{fullName}</p>
      </div>

      {/* Email */}
      <div className="mb-6">
        <p className="text-xs font-normal text-[#949494]">E-mail address</p>
        <p className="font-normal text-sm text-[#434343] mt-3">{email}</p>
      </div>

      {/* Contact Number */}
      <div className="mb-6">
        <p className="text-xs font-normal text-[#949494]">Contact number</p>
        <p className=" text-sm text-[#434343] mt-3">{contactNumber}</p>
      </div>

      {/* Shipping Address */}
      <div>
        <p className="text-xs font-normal text-[#949494]">Shipping Address</p>
        <p className=" text-sm text-[#434343] mt-3">{shippingAddress}</p>
      </div>
    </div>
  );
}

export default UserDetailsCard;
