import React, { useEffect, useMemo, useState } from "react";
import Drawers from "../../../Common/Drawers";
import { PrimaryButtonUI, SecondaryButton } from "../../../Common/Button";
import AddPatientForm from "./AddPatientForm";
import TableComponent from "../../../Common/Table";
import {
  data,
  dataPatient,
  headings,
  headingsPateint,
} from "../../../Constant";
import SearchBar from "../../../Common/SearchBar";
import { deletePatientUser, getDoctorPatients } from "../../../api/doctorDasboard";
import SecondTable from "../../../Common/second-table-component";
import { EditDeleteDropdownMenu } from "../../../Common/DropDown/edit-delete";
import AddNoteForm from "./AddNoteForm";
import AreYouSureModel from "../../../modals/AreYouSureModel";
import DeleteModel from "../../../modals/delete-model";
import EditPatientForm from "./edit-pateint";

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenForm = (rowData) => {
    setSelectedData(rowData);
    setShowForm(true);
  };


  const handleOpenDelete = async (row) => {
    console.log('row delete:', row);


    const confirmDelete = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (!confirmDelete) return;

    try {
      const response = await deletePatientUser(row.id);

      console.log(response);
      if (response.success) {

        // showToast("User deleted successfully!", "success");

        // ✅ Update table instantly without reload
        // setFilteredData((prev) => prev.filter((user) => user.id !== row.id));
         setSelectedItem(item);
    setShowDeleteModal(true);
      } else {
        showToast("Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      // showToast("Something went wrong!", "error");
    }
  };


  // const handleOpenDelete = (item) => {
  //   setSelectedItem(item);
  //   setShowDeleteModal(true);
  // };

  const handleConfirmDelete = () => {
    console.log("Deleting item:", selectedItem);
    // Add your delete logic here (API call, state update, etc.)
    setShowDeleteModal(false);
  };
  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    return apiData.map((order) => ({
      id: order?.id,
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

          <div className="flex flex-col  md:flex-row  md:items-center gap-2  ">
            <div className=" w-full">
              <SecondaryButton
                title={"Add Note"}
                onClick={() => setIsNoteOpen(true)}
                className="text-sm font-semibold text-[#001D58] px-4 py-2   border-2 border-[#001D58] rounded-md   text-center w-full"
              />
            </div>
            <div className="w-full">
              <PrimaryButtonUI
                title="Add New Patient"
                onClick={() => setIsOpen(true)}
                className="rounded-md px-8 py-3  font-semibold w-full "
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

              <Drawers
                isOpen={isNoteOpen}
                onClose={() => setIsNoteOpen(false)}
                title="Add Note"
                Content={<AddNoteForm />}
              />
            </div>
          </div>
        </div>
        {/* <TableComponent headings={headingsPateint} data={filteredData} /> */}
        <SecondTable
          headings={headingsPateint}
          data={filteredData}
          actionButton="active"
          DropdownComponent={EditDeleteDropdownMenu}
          onEdit={handleOpenForm}
          onDelete={handleOpenDelete}
        />

        {showForm && (
          <Drawers
            isOpen={showForm}
            // initialData={selectedData
            title="Update Patient"
            onClose={() => setShowForm(false)}
            Content={<EditPatientForm userData={selectedData} />}

          />
        )}

        {showDeleteModal && (
          <DeleteModel
            title='Are you sure ? '
            desc='This action cannot be undone. Once deleted, all related data will be permanently removed from the system.
Please confirm if you still want to proceed. '
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
};

export default PatientPage;
