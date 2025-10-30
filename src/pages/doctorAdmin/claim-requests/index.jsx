import TableComponent from "../../../Common/Table";
import { useEffect, useState, useCallback } from "react";
import { headings } from "../../../Constant";
import { SecondaryButton } from "../../../Common/Button";
import { PlusIcon } from "../../../icon/PlusIcon";
import { getClaims } from "../../../api/patient-dashaboard-api";
import Drawers from "../../../Common/Drawers";
import DocotrClaimForm from "./doctor-claim-form";
import { showToast } from "../../../store/toast-slice";
import { useDispatch } from "react-redux";
import ViewDetail from "../PatientDoctor/view-detail";

const DoctorClaimRequests = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("ALL");

  // const [showDetail, setShowDetail] = useState(false);
  const dispatch = useDispatch();

  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => {
      return {
        id: `#${order?.id}`,
        name: order?.patientName || "-",
        dName: order?.doctorName || "-",
        pEmail: order?.patientEmail || "-",
        submission: order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g,'-')
          : "-",
        status: order?.orderStatus?.toLowerCase() || "pending",
        // date: order?.ccExpiry || "-",
        action: "View Detail",
        originalData: order,
      };
    });
  };
  const fetchClaims = useCallback(
    async (page = 1, status = "ALL") => {
      setLoading(true);
      try {
        const response = await getClaims({
          status,
          page: page - 1, // Backend uses 0-based indexing
          size: 10,
          search: "",
        });

        if (response.status === 200) {
          const responseData = response.data.data;
          const content = responseData?.data ?? [];
          const totalRecord = responseData?.totalRecord ?? 0;
          const totalPages = responseData?.page ?? 0;

          const transformedData = transformPatientsData(content);
          setClaims(transformedData);
          setTotalPages(totalPages);
          setTotalRecords(totalRecord);
        }
      } catch (error) {
        console.log(error);
        dispatch(
          showToast({
            message: "Failed to fetch claims",
            type: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Initial load
  useEffect(() => {
    fetchClaims(1, currentStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle page changes
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchClaims(page, currentStatus);
    },
    [fetchClaims, currentStatus]
  );

  // Handle status changes
  const handleStatusChange = useCallback(
    (status) => {
      setCurrentStatus(status);
      setCurrentPage(1);
      fetchClaims(1, status);
    },
    [fetchClaims]
  );

  // Since filtering is now handled by the backend, we use claims directly
  const displayData = claims;

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // replace spaces with -
      .replace(/[^\w-]+/g, "");

  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];
  return (
    <div>
      <div className="bg-white rounded-2xl p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Status Filter Buttons */}
            <div className="flex gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium font-poppins transition-colors ${
                    currentStatus === option.value
                      ? "bg-[#F8F8F8] text-primaryText"
                      : "bg-white text-primaryText border border-borderPrimary hover:bg-[#F8F8F8]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <SecondaryButton
            title="Claim New Request"
            // icon={<PlusIcon className="w-4 h-4 text-white" />}
            href={`/doctor-admin/claim-request/${slugify("claim-request")}`}
            className="w-full md:w-auto rounded-lg px-6 py-3 font-poppins bg-secondaryBrand text-white"
          />
        </div>

        <TableComponent
          headings={headings}
          data={displayData}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalRecords}
          pageSize={10}
          onPageChange={handlePageChange}
          useBackendPagination={true}
          onActionClick={(row) => {
            setSelectedRow(row.originalData);
            setIsOpen(true);
          }}
          // onActionClickk={(row) => {
          //   setSelectedRow(row.originalData);
          //   setShowDetail(true);
          // }}
        />
      </div>

      <Drawers
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Claim Details"
        status={selectedRow?.status}
        Content={<DocotrClaimForm row={selectedRow} />}
      />

      {/* {showDetail && (
        <Drawers
          isOpen={showDetail}
          // initialData={selectedData
          title="Patient Details"
          onClose={() => setShowDetail(false)}
          Content={<ViewDetail userData={selectedRow} />}
        />
      )} */}
    </div>
  );
};

export default DoctorClaimRequests;
