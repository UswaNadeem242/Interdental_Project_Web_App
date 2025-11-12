import React, { useEffect, useState } from "react";
import { SecondaryButton } from "../../../Common/Button";
import {
  getClaimRequestsById,
  putClaimRequests,
} from "../../../services/claim-requests";

function ClaimDetailAdminPanel({ claimId }) {
  // Data will be populated from API; fallback placeholders shown until loaded

  const warrantyOptions = [
    { label: "Crown and Bridges, Onlays/Inlays & Veneers", teeth: [2, 3] },
    { label: "Implant Related Crown & Bridges", teeth: [2, 3] },
  ];

  const [claimRequest, setClaimRequest] = useState(null);

  const patientName =
    claimRequest?.patientName ||
    claimRequest?.patient?.name ||
    "—";
  const patientEmail =
    claimRequest?.patientEmail ||
    claimRequest?.patient?.email ||
    "—";
  const submittedOn =
    claimRequest?.submissionDate ||
    claimRequest?.createdDate ||
    claimRequest?.createdAt ||
    "—";

  const doctorClaimReqData = [
    { key: "Patient name", data: patientName },
    { key: "Patient Email Address", data: patientEmail },
    { key: "Claim Submitted On", data: submittedOn },
  ];

  useEffect(() => {
    getClaimRequest();

  }, []);

  const getClaimRequest = async () => {
    if (!claimId) return;
    getClaimRequestsById(claimId)
      .then((res) => {
        setClaimRequest(res.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching claim detail:", error);
      });
  };


  const updateClaimRequest = async ({id, status}) => {
    await putClaimRequests({
      id: id,
      status: status,
    })
      .then((res) => {
        getClaimRequest();
        console.log("===--=-=-=-=-==--=res=-=--=-=", res.data);
      })
      .catch((error) => {
        console.error("Error putting claim request:", error);
      });
  };




  return (
    <div className="font-poppins">
      {/* Claim ID */}
      <p className="text-black">
        Claim ID:{" "}
        <span className="text-xs font-bold">
          {claimId ? `#${claimId}` : "#—"}
        </span>
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

          
         {claimRequest?.crownTeeth && <div className="mt-4 border-b pb-8">
              <p className="text-sm font-semibold text-[#434343]">Crown and Bridges, Onlays/Inlays & Veneers:</p>
              <div className="flex gap-2 pt-3">
                {claimRequest?.crownTeeth?.split(',').map((tooth, idx) => (
                  <span
                    key={idx}
                    className="bg-[#94D3DD] text-xs font-medium px-5 py-3  rounded-xl text-[#001D58]"
                  >
                    {tooth}
                  </span>
                ))}
              </div>
            </div>}
       


         {claimRequest?.implantTeeth && <div className="mt-4 border-b pb-8">
              <p className="text-sm font-semibold text-[#434343]">Implant Related Crown & Bridges:</p>
              <div className="flex gap-2 pt-3">
                {claimRequest?.implantTeeth?.split(',').map((tooth, idx) => (
                  <span
                    key={idx}
                    className="bg-[#94D3DD] text-xs font-medium px-5 py-3  rounded-xl text-[#001D58]"
                  >
                    {tooth}
                  </span>
                ))}
              </div>
            </div>
            }
        </div>

        {/* Action Buttons */}
        <div className="col-span-12 mt-7 ">
          <div className="flex justify-center gap-4">
            <SecondaryButton
              title="Reject"
              className="text-[#434343] text-sm font-semibold px-14 py-4 bg-[#F8F8F8] w-full rounded-full"
              onClick={() => updateClaimRequest({id: claimId, status: "REJECTED"})}
            />
            <SecondaryButton
              title="Accept"
              className="text-[#F8F8F8] text-sm font-semibold px-14 py-4 bg-[#001D58] w-full rounded-full"
              onClick={() => updateClaimRequest({id: claimId, status: "ACCEPTED"})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaimDetailAdminPanel;
