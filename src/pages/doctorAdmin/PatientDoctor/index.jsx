import React, { useEffect, useMemo, useState, useCallback } from "react";
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
import { useDebounce } from "../../../Hooks/useDebounce";

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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const dispatch = useDispatch();

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
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

  const fetchPatients = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await getDoctorPatients({
        status: "ALL",
        page: page - 1, // Backend uses 0-based indexing
        size: 10,
        search: debouncedSearchQuery
      });
      
      const responseData = response.data.data;
      const content = responseData?.data ?? [];
      const totalRecord = responseData?.totalRecord ?? 0;
      const totalPages = responseData?.page ?? 0;

      const transformedData = transformPatientsData(content);
      setPatients(transformedData);
      setTotalPages(totalPages);
      setTotalRecords(totalRecord);

    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          message: "Failed to fetch patients",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery, dispatch]);
  // Initial load
  useEffect(() => {
    fetchPatients(1);
  }, []);

  // Handle search changes
  useEffect(() => {
    setCurrentPage(1);
    fetchPatients(1);
  }, [debouncedSearchQuery]);

  // Handle page changes
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    fetchPatients(page);
  }, [fetchPatients]);

  // Since filtering is now handled by the backend, we use patients directly
  const filteredData = patients;

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
          loading={loading}
          // Pagination props
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalRecords}
          pageSize={10}
          onPageChange={handlePageChange}
          useBackendPagination={true}
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
