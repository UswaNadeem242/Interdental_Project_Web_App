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
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [activeTab, setActiveTab] = useState("All");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  const getStatusFromTab = (tabName) => {
    const statusMap = {
      All: "ALL",
      Active: "ACTIVE",
      Inactive: "INACTIVE",
      Expired: "EXPIRED",
    };
    return statusMap[tabName] || "ALL";
  };

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
              page: page - 1, 
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

  useEffect(() => {
    setCurrentPage(1);
    fetchDoctors(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchDoctors(page, activeTab, debouncedSearchQuery, sortOrder);
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

  const handleOpenViewDetail = (rowData) => {
    navigate(`/admin-panel/doctor-detail?id=${rowData.id}`);
  };

  const handleStatusChange = useCallback(
    async (userId, currentStatus) => {
      if (statusChanging) return;

      setStatusChanging(true);
      try {
        const isActive = currentStatus?.toLowerCase() === "active";
        const newStatus = !isActive; 

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ]
  );

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
          return isActive ? "text-[#D4BE17]" : "text-[#1E7C79]";
        },
        iconColor: (item) => {
          const isActive = item.status?.toLowerCase() === "active";
          return isActive ? "text-[#D4BE17]" : "text-[#1E7C79]";
        },
      },
    ],
    [handleStatusChange, handleOpenViewDetail]
  );

  const tabs = [
    { name: "All" },
    { name: "Active" },
    { name: "Inactive" },
    { name: "Expired" },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl md:py-6 md:px-6 py-4 px-4 ">
        <MainTable
          columns={columns}
          data={doctors}
          actionMenuItems={actionMenuItems}
          loading={loading}
          showSearch={true}
          searchPlaceholder="Search doctors..."
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
      </div>
    </div>
  );
};

export default DoctorsAdminPanel;
