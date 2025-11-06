import React from "react";
import { SecondaryButton } from "../../../Common/Button";

function ClaimDetailAdminPanel() {
  const doctorClaimReqData = [
    { key: "Patient name", data: "Varga Dora" },
    { key: "Patient Email Address", data: "VargaDora123@gmail.com" },
    { key: "Claim Submitted On", data: "12 Mar 2025" },
  ];

  const warrantyOptions = [
    { label: "Crown and Bridges, Onlays/Inlays & Veneers", teeth: [2, 3] },
    { label: "Implant Related Crown & Bridges", teeth: [2, 3] },
  ];

  return (
    <div className="font-poppins">
      {/* Claim ID */}
      <p className="text-black">
        Claim ID: <span className="text-xs font-bold">#12345</span>
      </p>

      {/* Claim Info */}
      <div className="grid grid-cols-12 mt-6">
        {doctorClaimReqData.map(({ key, data }, index) => (
          <div
            key={index}
            className="col-span-12 pb-2 mb-4 border-b border-borderPrimary space-y-2"
          >
            <p className="text-secondaryText text-sm">{key}</p>
            <p className="text-sm font-semibold text-[#434343]">{data}</p>
          </div>
        ))}

        {/* Warranty Section */}
        <div className="col-span-12 pb-2 mb-4  border-borderPrimary">
          <p className="text-secondaryText text-sm pb-1">Warranty Options</p>

          {warrantyOptions.map(({ label, teeth }, i) => (
            <div key={i} className="mt-4 border-b pb-8">
              <p className="text-sm font-semibold text-[#434343]">{label}:</p>
              <div className="flex gap-2 pt-3">
                {teeth.map((tooth, idx) => (
                  <span
                    key={idx}
                    className="bg-[#94D3DD] text-xs font-medium px-5 py-3  rounded-xl text-[#001D58]"
                  >
                    {tooth}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 mt-5 mb-8">
          <div className="flex justify-center gap-4">
            <SecondaryButton
              title="Reject"
              className="text-[#434343] text-sm font-semibold px-14 py-4 bg-[#F8F8F8] w-full rounded-full"
            />
            <SecondaryButton
              title="Accept"
              className="text-[#F8F8F8] text-sm font-semibold px-14 py-4 bg-[#001D58] w-full rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailAdminPanel;
