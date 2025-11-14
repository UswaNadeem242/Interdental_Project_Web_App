import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainTable from "../../../Common/MainTable";
import { getAllOrders } from "../../../services/admin-order";
import { useDebounce } from "../../../Hooks/useDebounce";
import { EyeOpenIcon } from "../../../icon/EyeIcon";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortLabel, setSortLabel] = useState("Desc");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [activeTab, setActiveTab] = useState("All");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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

  const fetchOrders = useCallback(
    async (page = 1, status = "All", search = "", sort = "desc") => {
      setLoading(true);
      try {
        const statusParam = getStatusFromTab(status);
        const sortParam = sort === "asc" ? "createdDateAsc" : "createdDateDesc";
        
        const params = new URLSearchParams();
        params.set("page", String(page - 1));
        params.set("size", "10");
        params.set("status", statusParam);
        if (search) {
          params.set("search", search);
        }
        params.set("sort", sortParam);
        
        const queryString = `?${params.toString()}`;
        const response = await getAllOrders(queryString);
        
        const responseData = response?.data?.data;
        const content = responseData?.data || [];
        const totalRecord = responseData?.totalRecord || 0;
        const totalPagesCount = responseData?.page || 0;

        setOrders(content);
        setTotalPages(totalPagesCount);
        setTotalRecords(totalRecord);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
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
    fetchOrders(1, activeTab, debouncedSearchQuery, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, debouncedSearchQuery, sortOrder]);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      fetchOrders(page, activeTab, debouncedSearchQuery, sortOrder);
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

  const handleOpenViewDetail = useCallback((rowData) => {
    navigate(`/admin-panel/order-detail?id=${rowData.id}`);
  }, [navigate]);

  const columns = [
    {
      key: "id",
      label: "Order ID",
      render: (v, item) => {
        const id = item?.id || item?.orderId;
        return id ? (
          <span className="font-bold text-primaryText">#{id}</span>
        ) : (
          "-"
        );
      }
    },
    {
      key: "doctorName",
      label: "Doctor Name",
      render: (v, item) =>
        item?.doctorName ||
        `${item?.doctorFirstName || ""} ${item?.doctorLastName || ""}`.trim() ||
        "-",
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : "-",
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
        const cls = statusConfig[statusLower] || "bg-[#FFE30D1A] text-[#D4BE16]";
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

  const tabs = [
    { name: "All" },
    { name: "Pending" },
    { name: "In Progress" },
    { name: "Shipped" },
    { name: "Completed" },
  ];

  return (
    <div>
      <MainTable
        columns={columns}
        data={orders}
        actionMenuItems={actionMenuItems}
        loading={loading}
        showSearch={true}
        searchPlaceholder="Search orders..."
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
  );
};

export default OrdersTable;
