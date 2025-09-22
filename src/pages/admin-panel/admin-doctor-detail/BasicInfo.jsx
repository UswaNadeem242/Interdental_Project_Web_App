import React from "react";

function BasicInfo() {
  return (
    <div className=" mx-auto py-6 space-y-6 font-poppins ">
      {/* Name */}
      <div className="p-4 border-2 border-[#0000001A] rounded-md font-poppins">
        <p className="text-sm font-bold text-primaryText mb-1">Name</p>
        <p className="text-secondaryText text-xs font-medium">glis bunny</p>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">
            Email Address
          </p>
          <p className="text-secondaryText text-xs font-medium">
            glisbunnygin@gmail.com
          </p>
        </div>
        <div className="p-4 border-2 border-[#0000001A] rounded-md">
          <p className="text-sm font-bold text-primaryText mb-1">
            Phone Number
          </p>
          <p className="text-secondaryText text-xs font-medium">
            0987 635 45321
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="p-4 border-2 border-[#0000001A] rounded-md">
        <p className="text-sm font-bold text-primaryText mb-1">Address</p>
        <p className="text-secondaryText text-xs font-medium">
          2464 Royal Ln. Mesa, New Jersey 45463
        </p>
      </div>

      {/* License */}
      <div className="p-4 border-2 border-[#0000001A] rounded-md">
        <p className="text-sm font-bold text-primaryText mb-1">
          Doctor's License Number
        </p>
        <p className="text-secondaryText text-xs font-medium">
          67898 68578 00887
        </p>
      </div>

      {/* Office Reference */}
      <div className="p-4 border-2 border-[#0000001A] rounded-md">
        <p className="text-sm font-bold text-primaryText mb-1">
          Office Reference Number
        </p>
        <p className="text-secondaryText text-xs font-medium">
          578 654 4567865
        </p>
      </div>
    </div>
  );
}

export default BasicInfo;
