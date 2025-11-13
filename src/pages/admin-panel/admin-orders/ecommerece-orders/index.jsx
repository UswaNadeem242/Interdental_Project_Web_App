import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainTable from "../../../../Common/MainTable";
import { useDebounce } from "../../../../Hooks/useDebounce";
import { EyeOpenIcon } from "../../../../icon/EyeIcon";
import axios from "axios";
import { BASE_URL } from "../../../../config";

const EcommereceOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Desc");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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
      Pending: "PENDING",
      "In Progress": "IN_PROGRESS",
      Shipped: "SHIPPED",
      Completed: "DELIVERED",
    };
    return statusMap[tabName] || "ALL";
  };

  // Fetch ecommerce orders from backend
  const fetchEcomOrders = useCallback(
    async (page = 1, status = "All", search = "", sort = "desc") => {
      setLoading(true);
      try {
        const statusParam = getStatusFromTab(status);
        // TODO: Replace with actual ecommerce orders endpoint when available
        const response = await axios.get(`${BASE_URL}/orders/getAllOrders`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        let allOrders = response?.data?.data || [];

        // Filter by status
        if (statusParam !== "ALL") {
          allOrders = allOrders.filter(
            (order) => order?.orderStatus?.toUpperCase() === statusParam
          );
        }

        // Filter by search
        if (search) {
          const query = search.toLowerCase();
          allOrders = allOrders.filter((order) =>
            Object.values(order).some((val) =>
              String(val).toLowerCase().includes(query)
            )
          );
        }

        // Sort
        if (sort) {
          allOrders.sort((a, b) => {
            const aDate = new Date(a.createdAt || 0);
            const bDate = new Date(b.createdAt || 0);
            return sort === "asc" ? aDate - bDate : bDate - aDate;
          });
        }

        // Paginate
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const paginatedOrders = allOrders.slice(
          startIndex,
          startIndex + pageSize
        );

        setOrders(paginatedOrders);
        setTotalPages(Math.ceil(allOrders.length / pageSize));
        setTotalRecords(allOrders.length);
      } catch (error) {
        console.error("Error fetching ecommerce orders:", error);
        setOrders([]);
        setTotalPages(0);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch on mount and when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchEcomOrders(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchEcomOrders(page, activeTab, debouncedSearchQuery, sortOrder);
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

  const handleOpenViewDetail = useCallback((rowData) => {
    navigate(`/admin-panel/ecom-detail?id=${rowData.id || rowData.orderId}`);
  }, [navigate]);

  // Define columns for MainTable
  const columns = [
    {
      key: "id",
      label: "Order ID",
      render: (value) => `#${value || "-"}`,
    },
    {
      key: "buyerName",
      label: "Buyer's Name",
      render: (v, item) =>
        item?.buyerName ||
        item?.customerName ||
        `${item?.firstName || ""} ${item?.lastName || ""}`.trim() ||
        "-",
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      key: "totalItems",
      label: "Total Items",
      render: (value) => value || "-",
    },
    {
      key: "totalAmount",
      label: "Price",
      render: (value) => (value ? `$${value}` : "-"),
    },
    {
      key: "orderStatus",
      label: "Order Status",
      render: (value) => {
        const statusLower = (value || "").toLowerCase();
        const statusConfig = {
          pending: "bg-[#FFE30D1A] text-[#D4BE16]",
          in_progress: "bg-[#4ECC530D] text-[#4ECC53]",
          shipped: "bg-[#4ECC530D] text-[#4ECC53]",
          delivered: "bg-[#4ECC530D] text-[#4ECC53]",
          completed: "bg-[#4ECC530D] text-[#4ECC53]",
        };
        const cls =
          statusConfig[statusLower] || "bg-[#FFE30D1A] text-[#D4BE16]";
        return (
          <span
            className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${cls}`}
          >
            {value || "-"}
          </span>
        );
      },
    },
  ];

  // Action menu items
  const actionMenuItems = useMemo(
    () => [
      {
        label: "View Details",
        onClick: (item) => {
          handleOpenViewDetail(item);
        },
        icon: <EyeOpenIcon />,
      },
    ],
    [handleOpenViewDetail]
  );

  // Tabs
  const tabs = [
    { name: "All" },
    { name: "Pending" },
    { name: "In Progress" },
    { name: "Shipped" },
    { name: "Completed" },
  ];

  console.log("orders", orders);
  return (
    <div>
      <MainTable
        columns={columns}
        data={orders}
        actionMenuItems={actionMenuItems}
        loading={loading}
        // Search props
        showSearch={true}
        searchPlaceholder="Search ecommerce orders..."
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
  );
};

export default EcommereceOrders;
