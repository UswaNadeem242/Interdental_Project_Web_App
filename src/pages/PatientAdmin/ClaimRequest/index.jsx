import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
// import { data, headings } from "../../../Constant";
import Drawers from "../../../Common/Drawers";
import { useState } from "react";
import ClaimDetailForm from "../../doctorAdmin/ClaimRequest/ClaimDetailForm";
import {
  headingsPatientClaimReq,
  PatientClaimReqData,
} from "../../../Constant";
import { PrimaryButtonUI } from "../../../Common/Button";
import PatientClaimForm from "./PatientClaimForm";
const PatientClaimrequests = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      name: "All",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={PatientClaimReqData}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
        />
      ),
    },
    {
      name: "Active",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={PatientClaimReqData}
        />
      ),
    },
    // {
    //   name: "Expired",
    //   content: (
    //     <TableComponent
    //       headings={headingsPatientClaimReq}
    //       data={PatientClaimReqData}
    //     />
    //   ),
    // },
  ];
  return (
    <div>
      <div className="bg-white rounded-2xl p-6">
        <TabsStepper
          steps={steps}
          newClaimBtn={
            <PrimaryButtonUI
              title="New Claim Request"
              // onClick={() => setIsOpen(true)}
              className=" w-full md:w-auto rounded-md px-6 py-3  font-poppins"
            />
          }
        />

        <Drawers
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Claim Submissionn Form"
          status={selectedRow?.status}
          Content={<PatientClaimForm row={selectedRow} />}
        />
      </div>
    </div>
  );
};

export default PatientClaimrequests;
