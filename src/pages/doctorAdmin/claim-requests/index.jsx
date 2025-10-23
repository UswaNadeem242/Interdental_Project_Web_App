import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
import { useEffect, useState } from "react";
import {
    headings,
    headingsPatientClaimReq,
} from "../../../Constant";
import { SecondaryButton } from "../../../Common/Button";
import { PlusIcon } from "../../../icon/PlusIcon";
import { getClaims } from "../../../api/patient-dashaboard-api";
import Drawers from "../../../Common/Drawers";
import PatientClaimForm from "../../PatientAdmin/ClaimRequest/PatientClaimForm";

const DoctorClaimRequests = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [claims, setClaims] = useState([]);

    const transformPatientsData = (apiData) => {
        if (!apiData || !Array.isArray(apiData)) return [];

        return apiData.map((order) => {
            return {
                id: `#${order?.id}`,
                name: order?.patientName || "-",
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

    const getFilteredDataByStatus = (status) => {
        if (status === "all") {
            return claims;
        }
        const filtered = claims.filter((order) => order.status === status);

        return filtered;
    };


    const steps = [
        {
            name: "All",
            content: (
                <TableComponent
                    headings={headings}
                    // data={claims}
                    data={getFilteredDataByStatus('all')}
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
                    data={getFilteredDataByStatus("accepted")}
                />
            ),
        },
        {
            name: "Pending",
            content: (
                <TableComponent
                    headings={headingsPatientClaimReq}
                    data={getFilteredDataByStatus("pending")}
                />
            ),
        },
        {
            name: "Rejected",
            content: (
                <TableComponent
                    headings={headingsPatientClaimReq}
                    data={getFilteredDataByStatus("rejected")}
                />
            ),
        },
    ];
    const slugify = (text) =>
        text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")      // replace spaces with -
            .replace(/[^\w-]+/g, "");


    console.log('claims', claims);

    return (
        <div>

            <div className="bg-white rounded-2xl p-6">
                <TabsStepper
                    steps={steps}
                    newClaimBtn={
                        <SecondaryButton
                            title="New Claim Request"
                            icon={<PlusIcon />}
                            href={`/doctor-admin/claim-request/${slugify("claim-request")}`}
                            className="w-full md:w-auto rounded-md px-6 py-3 mb-5 font-poppins bg-[#F8F8F8] text-primaryText"
                        />
                    }
                />

            </div>


            <Drawers
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Claim Details"
                status={selectedRow?.status}
                Content={<PatientClaimForm row={selectedRow} />}
            />
        </div>
    );
};

export default DoctorClaimRequests;
