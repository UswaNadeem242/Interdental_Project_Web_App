import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
import {
  headingsPatientDashboardTable,
  PatientDashTabledata,
} from "../../../Constant";
import Drawers from "../../../Common/Drawers";
import { useEffect, useState } from "react";
import PatientDetailForm from "./PatientDetailForm";
import { getWarrantiesPatients, getWarrtieByID } from "../../../api/patient-dashaboard-api";
import { useSelector } from "react-redux";

const PatientDashboardPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [warranties, setWarranties] = useState([]);

  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );
  console.log('profileData', profileData?.id);



  const steps = [
    {
      name: "All",
      content: (
        <TableComponent
          headings={headingsPatientDashboardTable}
          data={PatientDashTabledata}
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
          headings={headingsPatientDashboardTable}
          data={PatientDashTabledata}
        />
      ),
    },
    {
      name: "Expired",
      content: (
        <TableComponent
          headings={headingsPatientDashboardTable}
          data={PatientDashTabledata}
        />
      ),
    },
  ];
  useEffect(() => {
    const fetchOrderByID = async () => {
      const response = await getWarrantiesPatients(profileData?.id);
      console.log('repsone api', response);
      if (response.status === 200) {
        setWarranties(response.data.data);
      }
    };
    fetchOrderByID();
  }, [profileData?.id]);

  console.log('warranties', warranties);

  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const response = await getWarrantiesPatients();
  //       console.log('patiten dashbaird:', response);

  //       if (response.status === 200) {
  //         setWarranties(transformPatientsData(response.data.data));

  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchPatients();
  // }, []);
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
          Content={<PatientDetailForm row={selectedRow} />}
        />
      </div>
    </div>
  );
};

export default PatientDashboardPage;
