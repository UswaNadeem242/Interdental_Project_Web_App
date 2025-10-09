import React, { useEffect, useMemo, useState } from "react";
import Drawers from "../../../Common/Drawers";
import { PrimaryButtonUI } from "../../../Common/Button";
import AddPatientForm from "./AddPatientForm";
import TableComponent from "../../../Common/Table";
import {
  data,
  dataPatient,
  headings,
  headingsPateint,
} from "../../../Constant";
import SearchBar from "../../../Common/SearchBar";
import { getDoctorPatients } from "../../../api/doctorDasboard";
import SecondTable from "../../../Common/second-table-component";

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [patients, setPatients] = useState([]);

  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    return apiData.map((order) => ({
      name: `${order?.firstName || "-"} ${order?.lastName || "-"}`,
      email: order?.email,
      status: order?.status,
      linkName: "View Detail",
      phone: order?.phoneNumber,
      address: order?.address || "abc....",
      profileURL: order?.profileURL,
    }));
  };
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getDoctorPatients();

        if (response.status === 200) {
          setPatients(transformPatientsData(response.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = patients;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = Object.values(a)[0]?.toString().toLowerCase() || "";
        const bVal = Object.values(b)[0]?.toString().toLowerCase() || "";

        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }
    return filtered;
  }, [searchQuery, sortOrder, patients]);

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 px-6">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3">
          <div className="md:flex-1 ">
            <SearchBar
              title="Sort By"
              onSearch={setSearchQuery}
              onSort={setSortOrder}
            />
          </div>

          <div className="flex flex-col  md:flex-row items-start md:items-center gap-2 ">
            <div className="md:block hidden">
              <PrimaryButtonUI
                title="Add New Patient"
                onClick={() => setIsOpen(true)}
                className="rounded-md px-8 py-3  font-semibold "
              />
            </div>
            <div className="md:hidden block w-full">
              <PrimaryButtonUI
                title="Add New Patient"
                onClick={() => setIsOpen(true)}
                className="rounded-md px-8 py-3 w-full font-semibold "
              />
            </div>

            <div>
              <Drawers
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Add New User"
                Content={
                  <AddPatientForm
                  // onClose={() => setIsOpen(false)}
                  // imgUpload="hidden"
                  // skipImageValidation={true}
                  />
                }
              />
            </div>
          </div>
        </div>
        {/* <TableComponent headings={headingsPateint} data={filteredData} /> */}
        <SecondTable
          headings={headingsPateint}
          data={filteredData}
          actionButton="active"
        />
      </div>
    </div>
  );
};

export default PatientPage;
