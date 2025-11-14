import React, { useCallback, useEffect, useMemo, useState } from "react";
import Drawers from "../../../Common/Drawers";
import ClaimDetailAdminPanel from "./claim-detail-form";
import { getClaimRequests } from "../../../services/claim-requests";
import MainTable from "../../../Common/MainTable";
import { useDebounce } from "../../../Hooks/useDebounce";
import { formatDate } from "../../../services/utils/formatTime";

const AdminClaimRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Desc");
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [activeTab, setActiveTab] = useState("All");


  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  const getStatusFromTab = (tabName) => {
    const statusMap = {
      All: "all",
      Accepted: "ACCEPTED",
      Pending: "PENDING",
      Rejected: "REJECTED",
    };
    return statusMap[tabName] || "all";
  };


  const [claimRequests, setClaimRequests] = useState([]);

  const fetchClaims = useCallback(
    async (page = 1, status = "All", search = "", sort = "desc") => {
      setLoading(true);
      try {
        const statusParam = getStatusFromTab(status);
        const sortParam = sort === "asc" ? "createdDateAsc" : "createdDateDesc";
        const params = new URLSearchParams();
        params.set("page", String(page - 1));
        params.set("size", "10");
        params.set("status", statusParam);
        params.set("sort", sortParam);
        if (search) params.set("search", search);
        const query = `?${params.toString()}`;
        const res = await getClaimRequests(query);
        const responseData = res?.data?.data;
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

  useEffect(() => {
    setCurrentPage(1);
    fetchClaims(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchClaims(page, activeTab, debouncedSearchQuery, sortOrder);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, debouncedSearchQuery, sortOrder]
  );

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

  const columns = [
    {
      key: "id",
      label: "Claim ID",
      
      render: (v, item) => {
        const id = item?.id || item?.claimId;
        return id ? (
          <span className="font-bold text-primaryText">#{id}</span>
        ) : (
          "-"
        );
      },
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
      key: "patientName",
      label: "Patient Name",
      render: (v, item) =>
        <span className="capitalize">{item?.patientName || "-"}</span>
       
    },
    {
      key: "submissionDate",
      label: "Submission Date",
      
      render: (v, item) => {
        const dateValue = item?.submissionDate || item?.createdDate || item?.createdAt;
        return dateValue ? formatDate(dateValue) : "-";
      },
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
          <span
            className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${cls}`}
          >
            {value || "-"}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "",
      align: "left",
      render: (value, item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRow(item);
            setIsOpen(true);
          }}
          className="text-secondaryText hover:text-secondaryText/80 text-sm px-3 py-1 rounded transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  const actionMenuItems = useMemo(() => [], []);

  const tabs = [{ name: "All" }, { name: "Pending" }, { name: "Accepted" }, { name: "Rejected" }];

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 px-6">

        <MainTable
          columns={columns}
          data={claimRequests}
          actionMenuItems={actionMenuItems}
          loading={loading}
          showSearch={true}
          searchPlaceholder="Search claim requests..."
          onSearch={handleSearch}
          searchValue={searchQuery}
          showSort={true}
          sortLabel={sortLabel}
          onSort={handleSort}
          sortOrder={sortOrder}
          tabs={tabs}
          onTabChange={handleTabChange}
          activeTabIndex={tabs.findIndex((tab) => tab.name === activeTab)}
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
              onClose={() => setIsOpen(false)}
              getClaimRequestData={fetchClaims}
            />
          }
        />
      </div>
    </div>
  );
};

export default AdminClaimRequest;
