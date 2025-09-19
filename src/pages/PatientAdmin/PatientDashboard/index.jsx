import TabsStepper from "../../../Common/TabsStepper";
import TableComponent from "../../../Common/Table";
import {
  headingsPatientDashboardTable,
  PatientDashTabledata,
} from "../../../Constant";
import Drawers from "../../../Common/Drawers";
import { useState } from "react";
import ClaimDetailForm from "../../doctorAdmin/ClaimRequest/ClaimDetailForm";
import PatientDetailForm from "./PatientDetailForm";

const PatientDashboardPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
