import React, { useCallback, useEffect, useMemo, useState } from "react";
import Drawers from "../../../Common/Drawers";
import ClaimDetailAdminPanel from "./claim-detail-form";
import { getClaimRequests } from "../../../services/claim-requests";
import MainTable from "../../../Common/MainTable";
import { useDebounce } from "../../../Hooks/useDebounce";

const AdminClaimRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Desc");
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  // Active tab filter
  const [activeTab, setActiveTab] = useState("All");

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Map tab names to status values for backend
  const getStatusFromTab = (tabName) => {
    const statusMap = {
      All: "all",
      Pending: "PENDING",
      "In Progress": "IN_PROGRESS",
      Completed: "COMPLETED",
      Rejected: "REJECTED",
    };
    return statusMap[tabName] || "all";
  };

  // (legacy local table and stepper removed in favor of MainTable pattern)

  const [claimRequests, setClaimRequests] = useState([]);

  // Fetch claims from backend
  const fetchClaims = useCallback(
    async (page = 1, status = "All", search = "", sort = "desc") => {
      setLoading(true);
      try {
        const statusParam = getStatusFromTab(status);
        const params = new URLSearchParams();
        params.set("page", String(page - 1));
        params.set("size", "10");
        params.set("status", statusParam);
        if (search) params.set("search", search);
        // Optional: backend may support sort
        const query = `?${params.toString()}`;
        const res = await getClaimRequests(query);
        const responseData = res?.data?.data;
        // Attempt to normalize common pagination shapes
        const content =
          responseData?.data ||
          responseData?.content ||
          responseData?.items ||
          responseData ||
          [];
        const totalRecord =
          responseData?.totalRecord ??
          responseData?.totalElements ??
          content.length ??
          0;
        const totalPagesCount =
          responseData?.pageCount ??
          responseData?.totalPages ??
          Math.ceil(totalRecord / 10) ??
          0;
        setClaimRequests(content);
        setTotalPages(totalPagesCount);
        setTotalRecords(totalRecord);
      } catch (error) {
        console.error("Error fetching claim requests:", error);
        setClaimRequests([]);
        setTotalPages(0);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Sync fetch on tab/search/sort
  useEffect(() => {
    setCurrentPage(1);
    fetchClaims(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchClaims(page, activeTab, debouncedSearchQuery, sortOrder);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, debouncedSearchQuery, sortOrder]
  );

  // Handlers
  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);
  const handleSort = useCallback((order) => {
    setSortOrder(order);
    setSortLabel(order === "asc" ? "Asc" : "Desc");
  }, []);

  // Define columns for MainTable
  const columns = [
    { key: "id", label: "Claim ID", render: (v, item) => item?.id || item?.claimId || "-" },
    {
      key: "patientName",
      label: "Patient Name",
      render: (v, item) =>
        item?.patientName ||
        item?.patient?.name ||
        `${item?.patientFirstName || ""} ${item?.patientLastName || ""}`.trim() ||
        "-",
    },
    {
      key: "doctorName",
      label: "Doctor Name",
      render: (v, item) =>
        item?.doctorName ||
        item?.doctor?.name ||
        `${item?.doctorFirstName || ""} ${item?.doctorLastName || ""}`.trim() ||
        "-",
    },
    {
      key: "submissionDate",
      label: "Submission Date",
      render: (v, item) =>
        item?.submissionDate || item?.createdDate || item?.createdAt || "-",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const statusLower = (value || "").toString().toLowerCase();
        const statusConfig = {
          pending: "bg-[#FFE30D1A] text-[#D4BE16]",
          "in progress": "bg-[#4ECC530D] text-[#4ECC53]",
          in_progress: "bg-[#4ECC530D] text-[#4ECC53]",
          completed: "bg-[#4ECC530D] text-[#4ECC53]",
          accepted: "bg-[#4ECC530D] text-[#4ECC53]",
          rejected: "bg-[#FF57570D] text-[#FF5757]",
        };
        const cls =
          statusConfig[statusLower] ||
          statusConfig[value?.toLowerCase?.() || "pending"] ||
          "bg-[#FF57570D] text-[#FF5757]";
        return (
          <span className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${cls}`}>
            {value || "-"}
          </span>
        );
      },
    },
  ];

  // Action menu: open drawer with details
  const actionMenuItems = useMemo(
    () => [
      {
        label: "View Details",
        onClick: (item) => {
          setSelectedRow(item);
          setIsOpen(true);
        },
      },
    ],
    []
  );

  // Tabs for claims
  const tabs = [
    { name: "All" },
    { name: "Pending" },
    { name: "In Progress" },
    { name: "Completed" },
    { name: "Rejected" },
  ];

  return (
    <div>
      <MainTable
        columns={columns}
        data={claimRequests}
        actionMenuItems={actionMenuItems}
        loading={loading}
        // Search props
        showSearch={true}
        searchPlaceholder="Search claim requests..."
        onSearch={handleSearch}
        searchValue={searchQuery}
        // Sort props
        showSort={true}
        sortLabel={sortLabel}
        onSort={handleSort}
        sortOrder={sortOrder}
        // Tabs props
        tabs={tabs}
        onTabChange={handleTabChange}
        activeTabIndex={tabs.findIndex((tab) => tab.name === activeTab)}
        // Pagination props
        useBackendPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalRecords}
        pageSize={10}
        onPageChange={handlePageChange}
      />
      <Drawers
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Claim Details"
        status={selectedRow?.status}
        Content={
          <ClaimDetailAdminPanel
            claimId={selectedRow?.id || selectedRow?.claimId}
          />
        }
      />
    </div>
  );
};

export default AdminClaimRequest;
