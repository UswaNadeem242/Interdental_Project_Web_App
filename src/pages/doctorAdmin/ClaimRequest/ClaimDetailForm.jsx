import React from "react";
import FileIcon from "../../../icon/FileIcon";

export default function ClaimDetailForm() {
  return (
    <div>
      <div>
        <p className="text-black font-poppins">
          Claim ID:{" "}
          <span className="text-xs font-poppins font-bold">#12345</span>{" "}
        </p>
      </div>
      <div className="grid grid-cols-12 mt-6">
        <div className="col-span-12 space-y-2  pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Product name</p>
          <p className="text-sm font-semibold font-poppins">Varga Dóra</p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Patient Email Address</p>
          <p className="text-sm font-semibold font-poppins">
            VargaDóra123@gmail.com
          </p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Product Name</p>
          <p className="text-sm font-semibold font-poppins">Dental Crown</p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Quantity</p>
          <p className="text-sm font-semibold font-poppins">2</p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Purchase Date</p>
          <p className="text-sm font-semibold font-poppins">10 Mar 2025</p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Claim Submitted On</p>
          <p className="text-sm font-semibold font-poppins">12 Mar 2025</p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Claim Reason</p>
          <p className="text-sm font-semibold font-poppins">
            Defective product
          </p>
        </div>
        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Additional Notes</p>
          <p className="text-sm font-normal font-poppins">
            "I noticed an issue with my product shortly after use. The fit is
            not as expected, and there seems to be a minor defect. I have
            attached images for review. Please let me know if any further
            details are needed.
          </p>
        </div>

        <div className="col-span-12 space-y-2 mt-3">
          <p className="text-secondaryText text-sm">Attached Document</p>
          <div>
            <FileIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
