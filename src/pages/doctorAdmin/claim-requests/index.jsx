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
import DocotrClaimForm from "./doctor-claim-form";

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
                submission: order?.createdAt
                    ? new Date(order.createdAt).toISOString().split("T")[0]
                    : "-",
                status: order?.orderStatus?.toLowerCase() || "pending",
                // date: order?.ccExpiry || "-",
                action: "View Detail",
                originalData: order,
            };
        });
    };
    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await getClaims();
                if (response.status === 200) {
                    setClaims(transformPatientsData(response.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchClaims();
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
                        setSelectedRow(row.originalData); // ✅ full data sent to Drawer
                        setIsOpen(true);
                    }}

                />
            ),
        },
        {
            name: "Accepted",
            content: (
                <TableComponent
                    headings={headings}
                    // data={claims}
                    data={getFilteredDataByStatus('accepted')}
                    onActionClick={(row) => {
                        setSelectedRow(row.originalData); // ✅ full data sent to Drawer
                        setIsOpen(true);
                    }}

                />
            ),
        },
        {
            name: "Pending",
            content: (
                <TableComponent
                    headings={headings}
                    // data={claims}
                    data={getFilteredDataByStatus('pending')}
                    onActionClick={(row) => {
                        setSelectedRow(row.originalData); // ✅ full data sent to Drawer
                        setIsOpen(true);
                    }}

                />
            ),
        },
        {
            name: "Rejected",
            content: (
                <TableComponent
                    headings={headings}
                    // data={claims}
                    data={getFilteredDataByStatus('rejected')}
                    onActionClick={(row) => {
                        setSelectedRow(row.originalData); // ✅ full data sent to Drawer
                        setIsOpen(true);
                    }}

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
                Content={<DocotrClaimForm row={selectedRow} />}
            />
        </div>
    );
};

export default DoctorClaimRequests;
