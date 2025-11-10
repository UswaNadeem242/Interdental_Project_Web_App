import React from "react";

function BasicInfo({ doctorData }) {
  if (!doctorData) {
    return (
      <div className="mx-auto py-6 space-y-6 font-poppins">
        <p className="text-center text-secondaryText">Loading...</p>
      </div>
    );
  }

  const fullName =
    `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
    "N/A";
  const email = doctorData.email || "N/A";
  const phone = doctorData.phoneNumber || "N/A";
  const address = doctorData.address || "N/A";
  const licenseNo = doctorData.doctorLicenceNumber || "N/A";
  const officeRefNo = doctorData.officeRefNumber || "N/A";

  return (
    <div className="mx-auto py-6 space-y-6 font-poppins">
      {/* Name */}
      <div className="p-4 border border-[#0000001A] rounded-md font-poppins">
        <p className="text-sm font-semibold text-primaryText mb-1">Name</p>
        <p className="text-secondaryText text-xs font-medium ">{fullName}</p>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-[#0000001A] rounded-md">
          <p className="text-sm font-semibold text-primaryText mb-1">
            Email Address
          </p>
          <p className="text-secondaryText text-xs font-medium">{email}</p>
        </div>
        <div className="p-4 border border-[#0000001A] rounded-md">
          <p className="text-sm font-semibold text-primaryText mb-1">
            Phone Number
          </p>
          <p className="text-secondaryText text-xs font-medium">{phone}</p>
        </div>
      </div>

      {/* Address */}
      <div className="p-4 border border-[#0000001A] rounded-md">
        <p className="text-sm font-semibold text-primaryText mb-1">Address</p>
        <p className="text-secondaryText text-xs font-medium">{address}</p>
      </div>

      {/* License */}
      <div className="p-4 border border-[#0000001A] rounded-md">
        <p className="text-sm font-semibold text-primaryText mb-1">
          Doctor's License Number
        </p>
        <p className="text-secondaryText text-xs font-medium">{licenseNo}</p>
      </div>

      {/* Office Reference */}
      <div className="p-4 border border-[#0000001A] rounded-md">
        <p className="text-sm font-semibold text-primaryText mb-1">
          Office Reference Number
        </p>
        <p className="text-secondaryText text-xs font-medium">{officeRefNo}</p>
      </div>
    </div>
  );
}

export default BasicInfo;
