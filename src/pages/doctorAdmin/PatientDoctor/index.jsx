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
import {
  deletePatientUser,
  getDoctorPatients,
} from "../../../api/doctorDasboard";
import SecondTable from "../../../Common/second-table-component";
import { EditDeleteDropdownMenu } from "../../../Common/DropDown/edit-delete";
import AddNoteForm from "./AddNoteForm";
import AreYouSureModel from "../../../modals/AreYouSureModel";
import DeleteModel from "../../../modals/delete-model";
import EditPatientForm from "./edit-pateint";
import { showToast } from "../../../store/toast-slice";
import { useDispatch } from "react-redux";
import ViewDetail from "./view-detail";

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [deleteLoading,setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const handleOpenForm = (rowData) => {
    setSelectedData(rowData);
    setShowForm(true);
  };

  //
  const handleOpenViewDetail = (rowData) => {
    setSelectedData(rowData);
    setShowDetail(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };
  // Step 2: When user confirms in modal — perform actual delete API call
  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    try {
      setDeleteLoading(true);
      const response = await deletePatientUser(selectedItem.id);

      if (response.success) {
        setShowDeleteModal(false);
        fetchPatients();
      } else {
        dispatch(
          showToast({
            message: `Failed to delete user`,
            type: "error",
          })
        );
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
    }
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
  useEffect(() => {
  

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
                title="Add New Patient"
                Content={
                  <AddPatientForm

                    onClose={() => setIsOpen(false)}
                    fetchPatients={fetchPatients}
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
        <SecondTable
          headings={headingsPateint}
          data={filteredData}
          actionButton="active"
          DropdownComponent={EditDeleteDropdownMenu}
          onEdit={handleOpenForm}
          OnViewDetail={handleOpenViewDetail}
          onDelete={handleOpenDelete}
        />
        {showForm && (
          <Drawers
            isOpen={showForm}
            // initialData={selectedData
            title="Edit Patient Details"
            onClose={() => setShowForm(false)}
            Content={<EditPatientForm userData={selectedData} />}
          />
        )}

        {/*  */}
        {showDetail && (
          <Drawers
            isOpen={showDetail}
            // initialData={selectedData
            title="Patient Details"
            onClose={() => setShowDetail(false)}
            Content={<ViewDetail userData={selectedData} />}
          />
        )}

        {showDeleteModal && (
          <DeleteModel
            isLoading={deleteLoading}
            title="Are you sure ? "
            desc="You can not undo the action once you delete the patient."
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
