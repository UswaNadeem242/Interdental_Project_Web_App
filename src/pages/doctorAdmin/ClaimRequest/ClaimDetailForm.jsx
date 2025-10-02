import { doctorClaimReqData } from "../../../Constant";
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
        {doctorClaimReqData.map((data, index) => (
          <div className="col-span-12 space-y-2  pb-2 border-b border-b-borderPrimary mb-4 font-poppins">
            <p className="text-secondaryText text-sm">{data.key}</p>
            <p className="text-sm font-semibold font-poppins text-[#434343]">
              {data.data}
            </p>
          </div>
        ))}

        <div className="col-span-12 space-y-2 mt-3 pb-2 border-b border-b-borderPrimary">
          <p className="text-secondaryText text-sm">Additional Notes</p>
          <p className="text-sm font-normal font-poppins">
            "I noticed an issue with my product shortly after use. The fit is
            not as expected, and there seems to be a minor defect. I have
            attached images for review. Please let me know if any further
            details are needed.
          </p>
        </div>

        <div className="col-span-12 space-y-2 mt-3 mb-8">
          <p className="text-secondaryText text-sm">Attached Document</p>
          <div>
            <FileIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
