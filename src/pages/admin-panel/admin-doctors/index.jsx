import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainTable from "../../../Common/MainTable";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useDebounce } from "../../../Hooks/useDebounce";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toast-slice";
import { EyeOpenIcon } from "../../../icon/EyeIcon";
import Activate from "../../../icon/Activate";
import DeActivate from "../../../icon/DeActivate";

const DoctorsAdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Desc");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  // Active tab filter
  const [activeTab, setActiveTab] = useState("All");

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Map tab names to status values
  const getStatusFromTab = (tabName) => {
    const statusMap = {
      All: "ALL",
      Active: "ACTIVE",
      Inactive: "INACTIVE",
      Expired: "EXPIRED",
    };
    return statusMap[tabName] || "ALL";
  };

  // Fetch doctors from backend
  const fetchDoctors = useCallback(
    async (page = 1, status = "ALL", search = "", sort = "desc") => {
      setLoading(true);
      try {
        const statusParam = getStatusFromTab(status);
        const sortParam = sort === "asc" ? "createdDateAsc" : "createdDateDesc";

        const response = await axios.get(
          `${BASE_URL}/api/users/getUserByRole`,
          {
            params: {
              page: page - 1, // Backend uses 0-based indexing
              size: 10,
              search: search || undefined,
              status: statusParam,
              user: "DOCTOR",
              sort: sortParam,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const responseData = response?.data?.data;
        const content = responseData?.data || [];
        const totalRecord = responseData?.totalRecord || 0;
        const totalPagesCount = responseData?.page || 0;

        setDoctors(content);
        setTotalPages(totalPagesCount);
        setTotalRecords(totalRecord);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
        setTotalPages(0);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Single useEffect to handle all fetch triggers (tab, search, sort, initial load)
  useEffect(() => {
    setCurrentPage(1);
    fetchDoctors(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchDoctors(page, activeTab, debouncedSearchQuery, sortOrder);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, debouncedSearchQuery, sortOrder]
  );

  // Handle tab change
  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  // Handle search change
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  // Handle sort change
  const handleSort = useCallback((order) => {
    setSortOrder(order);
    setSortLabel(order === "asc" ? "Asc" : "Desc");
  }, []);

  const handleOpenViewDetail = (rowData) => {
    // Navigate to doctor detail page with ID
    navigate(`/admin-panel/doctor-detail?id=${rowData.id}`);
  };

  // Handle status change (activate/deactivate)
  const handleStatusChange = useCallback(
    async (userId, currentStatus) => {
      if (statusChanging) return;

      setStatusChanging(true);
      try {
        // Determine new status: if active, deactivate (false), if inactive/deactivated, activate (true)
        const isActive = currentStatus?.toLowerCase() === "active";
        const newStatus = !isActive; // true to activate, false to deactivate

        const response = await axios.put(
          `${BASE_URL}/api/admin/users/changeuserstatus`,
          {
            userId: userId,
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.data?.success) {
          dispatch(
            showToast({
              message: `Doctor account ${
                newStatus ? "activated" : "deactivated"
              } successfully`,
              type: "success",
            })
          );
          // Refetch data to show updated status
          await fetchDoctors(
            currentPage,
            activeTab,
            debouncedSearchQuery,
            sortOrder
          );
        } else {
          throw new Error("Failed to change status");
        }
      } catch (error) {
        console.error("Error changing user status:", error);
        dispatch(
          showToast({
            message:
              error.response?.data?.message ||
              "Failed to change account status",
            type: "error",
          })
        );
      } finally {
        setStatusChanging(false);
      }
    },
    [
      statusChanging,
      currentPage,
      activeTab,
      debouncedSearchQuery,
      sortOrder,
      dispatch,
      // fetchDoctors is stable (empty deps), so it's safe to omit
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ]
  );

  // Define columns for MainTable
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value, item) => {
        const fullName =
          `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
          value ||
          "-";
        return (
          <div className="flex items-center gap-2">
            <img
              src={item.profileURL || item.image || "/assets/user.png"}
              alt={fullName}
              className="w-9 h-9 rounded-full object-cover border border-[#285772]"
            />
            <span className="font-semibold">{fullName}</span>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "drLicenseNo",
      label: "License Number",
    },
    {
      key: "status",
      label: "Account Status",
      render: (value) => {
        const statusConfig = {
          active: {
            className: "bg-[#4ECC530D] text-[#4ECC53]",
          },
          inactive: {
            className: "bg-[#FFE30D1A] text-[#D4BE16] rounded-none",
          },
          expired: {
            className: "bg-[#FF57570D] text-[#FF5757]",
          },
          pending: {
            className: "bg-[#FF57570D] text-[#FF5757]",
          },
        };

        const statusLower = value?.toLowerCase() || "";
        const config = statusConfig[statusLower] || statusConfig.pending;
        // const label= value?.toLowerCase() === "active" ? "Active" : value?.toLowerCase() === "inactive" ? "Deactivated" : value?.toLowerCase() === "expired" ? "Expired" : "Pending";
        return (
          <span
            className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${config.className}`}
          >
            {value || "-"}
          </span>
        );
      },
    },
    {
      key: "subStatus",
      label: "Subscription status",
      render: (value) => {
        if (!value) return "-";
        return (
          <span className="px-3 py-2 rounded-md text-xs font-semibold capitalize text-[#FF1D1D] border-2 border-[#F44336]">
            {value}
          </span>
        );
      },
    },
  ];

  // Define action menu items
  const actionMenuItems = useMemo(
    () => [
      {
        label: "View Details",
        onClick: (item) => {
          handleOpenViewDetail(item);
        },
        icon: <EyeOpenIcon />,
      },
      {
        label: (item) => {
          const isActive = item.status?.toLowerCase() === "active";
          return isActive ? "Deactivate account" : "Activate";
        },
        onClick: (item) => {
          handleStatusChange(item.id, item.status);
        },
        icon: (item) => {
          const isActive = item.status?.toLowerCase() === "active";
          return isActive ? <DeActivate /> : <Activate />;
        },
        textColor: (item) => {
          const isActive = item.status?.toLowerCase() === "active";
          // Green for activate, yellow/orange for deactivate
          return isActive ? "text-[#D4BE17]" : "text-[#1E7C79]";
        },
        iconColor: (item) => {
          const isActive = item.status?.toLowerCase() === "active";
          // Green for activate, yellow/orange for deactivate
          return isActive ? "text-[#D4BE17]" : "text-[#1E7C79]";
        },
      },
    ],
    [handleStatusChange, handleOpenViewDetail]
  );

  // Define tabs configuration
  const tabs = [
    { name: "All" },
    { name: "Active" },
    { name: "Inactive" },
    { name: "Expired" },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 px-6">
      <MainTable
          columns={columns}
          data={doctors}
          actionMenuItems={actionMenuItems}
          loading={loading}
          // Search props
          showSearch={true}
          searchPlaceholder="Search doctors..."
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
      </div>
    </div>
  );
};

export default DoctorsAdminPanel;
