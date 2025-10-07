import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
// import { data, headings } from "../../../Constant";
import Drawers from "../../../Common/Drawers";
import { useEffect, useState } from "react";
import ClaimDetailForm from "../../doctorAdmin/ClaimRequest/ClaimDetailForm";
import {
  headingsPatientClaimReq,
  PatientClaimReqData,
} from "../../../Constant";
import { SecondaryButton } from "../../../Common/Button";
import PatientClaimForm from "./PatientClaimForm";
import { PlusIcon } from "../../../icon/PlusIcon";
import { getClaims } from "../../../api/patient-dashaboard-api";

const PatientClaimrequests = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [claims, setClaims] = useState([]);

  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => {
      return {
        id: `#${order?.id}`,
        pName: order?.patientName || "-",
        dName: order?.doctorName || "-",
        pEmail: order?.patientEmail || "-",
        dEmail: order?.doctorEmail || "-",
        // date: order?.ccExpiry || "-",
        action: "View Detail",
      };
    });
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getClaims();
 
        if (response.status === 200) {
          setClaims(transformPatientsData(response.data.data));

        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);

  const steps = [
    {
      name: "All",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={claims}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
        />
      ),
    },
    {
      name: "Accepted",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={PatientClaimReqData}
        />
      ),
    },
    {
      name: "Pending",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={PatientClaimReqData}
        />
      ),
    },
    {
      name: "Rejected",
      content: (
        <TableComponent
          headings={headingsPatientClaimReq}
          data={PatientClaimReqData}
        />
      ),
    },
  ];
  return (
    <div>
      <div className="bg-white rounded-2xl p-6">
        <TabsStepper
          steps={steps}
          newClaimBtn={
            <SecondaryButton
              title="New Claim Request"
              icon={<PlusIcon />}
              // onClick={() => setIsOpen(true)}
              href="/patient-admin/patient-form"
              className="w-full md:w-auto rounded-md px-6 py-3 mb-5 font-poppins bg-[#F8F8F8] text-primaryText"
            />
          }
        />

        {/* <Drawers
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Claim Submission Form"
          status={selectedRow?.status}
          Content={<PatientClaimForm row={selectedRow} />}
        /> */}
      </div>
    </div>
  );
};

export default PatientClaimrequests;
