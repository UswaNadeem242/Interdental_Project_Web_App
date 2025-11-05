import React from "react";
import { SecondaryButton } from "../../../Common/Button";

function ClaimDetailAdminPanel() {
  const doctorClaimReqData = [
    { key: "Patient name", data: "vagra Dora" },
    { key: "Patient Email Address", data: "VargaDóra123@gmail.com" },
    { key: "Claim Submitted On", data: "12 Mar 2025" },
    // { key: "Doctor Name", data: "Varga Dóra" },
    // { key: "Product name", data: "Dental Crown" },
    // { key: "Quantity", data: "2" },
    // { key: "Purchase Date", data: "10 March,2025" },
    // { key: "Claim Reason", data: "Defective product" },
  ];

  return (
    <div>
      <div>
        <p className="text-black font-poppins">
          Claim ID:{" "}
          <span className="text-xs font-poppins font-bold">#12345</span>{" "}
        </p>
      </div>
      <div className="grid grid-cols-12 mt-6">
        {doctorClaimReqData.map((data, index) => (
          <div className="col-span-12 space-y-2  pb-2 border-b border-b-borderPrimary mb-4 font-poppins">
            <p className="text-secondaryText text-sm">{data.key}</p>
            <p className="text-sm font-semibold font-poppins text-[#434343]">
              {data.data}
            </p>
          </div>
        ))}
        <div className="col-span-12 space-y-2  pb-2 border-b border-b-borderPrimary mb-4 font-poppins">
          <p className="text-secondaryText text-sm">Warranty Options</p>
          <p className="text-sm font-semibold font-poppins text-[#434343]">
            Crown and Bridges, Onlays/Inlays & Veneers
          </p>
          <p className="text-sm font-semibold font-poppins text-[#434343]">
            Implant Related Crown & Bridges:
          </p>
        </div>

        {/* <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Additional Notes</p>
          <p className="text-sm font-normal font-poppins">
            I noticed an issue with my product shortly after use. The fit is not
            as expected, and there seems to be a minor defect. I have attached
            images for review. Please let me know if any further details are
            needed.
          </p>
        </div> */}

        <div className="col-span-12 space-y-2  mb-8 mt-6 font-poppins ">
          <span className="flex flex-row gap-4 items-center justify-center">
            <SecondaryButton
              title="Reject"
              className="text-[#434343] text-sm font-semibold px-14 py-4 bg-[#F8F8F8] w-full rounded-full"
            />

            <SecondaryButton
              title="Accept"
              className="text-[#F8F8F8] text-sm font-semibold px-14 py-4 bg-[#001D58] w-full rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailAdminPanel;
