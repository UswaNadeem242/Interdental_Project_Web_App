import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
import {
  headingsPatientDashboardTable
} from "../../../Constant";
import Drawers from "../../../Common/Drawers";
import { useEffect, useState } from "react";
import PatientDetailForm from "./PatientDetailForm";
import { getWarrantiesPatients } from "../../../api/patient-dashaboard-api";
import { useSelector } from "react-redux";

const PatientDashboardPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [warranties, setWarranties] = useState([]);

  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );
  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    return apiData.map((order) => ({
      id: `#${order?.id}`,
      dName: `${order?.doctorFirstName || "-"} ${order?.doctorLastName || "-"}`,
      pName: `${order?.patientFirstName || "-"} ${order?.patientLastName || "-"}`,
      tAmount: order?.totalAmount,
      status: order?.orderStatus,
      linkName: "View Detail",
      ShoppingDate: order?.expectedDeliveryDate?.split("T")[0],
      // address: order?.address || "abc....",
      // profileURL: order?.profileURL,
      action: "View Detail",
      rewarrently: order?.remainingWarrenty,

    }));
  };
  const getFilteredDataByStatus = (status) => {
    if (status === "all") {
      return warranties;
    }
    const filtered = warranties.filter((order) => order.status === status);

    return filtered;
  };
  const steps = [
    {
      name: "All",
      content: (
        <TableComponent
          headings={headingsPatientDashboardTable}
          data={getFilteredDataByStatus('all')}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
        />
      ),
    },
    {
      name: "Pending",
      content: (
        <TableComponent
          headings={headingsPatientDashboardTable}
          data={getFilteredDataByStatus('PENDING')}
        />
      ),
    },
    {
      name: "Expired",
      content: (
        <TableComponent
          headings={headingsPatientDashboardTable}
          data={getFilteredDataByStatus('EXPIRED')}
        />
      ),
    },
  ];
  useEffect(() => {
    const fetchOrderByID = async () => {
      const response = await getWarrantiesPatients(123);

      if (response.status === 200) {
        setWarranties(response.data.data);
        setWarranties(transformPatientsData(response.data.data));
      }
    };
    fetchOrderByID();
  }, [profileData?.id]);


  return (
    <div>
      <div className="bg-white rounded-2xl p-6">
        <h1 className="mb-4 text-secondaryBrand font-poppins font-bold text-lg">
          Warranties
        </h1>
        <TabsStepper steps={steps} />
        <Drawers
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Warranty Detail"
          status={selectedRow?.status}
          Content={<PatientDetailForm row={selectedRow} warranties={warranties} />}
        />
      </div>
    </div>
  );
};

export default PatientDashboardPage;
