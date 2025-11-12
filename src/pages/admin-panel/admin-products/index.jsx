import React, { useState, useEffect, useCallback, useMemo } from "react";
import MainTable from "../../../Common/MainTable";
import FilterDropdown from "../../../Common/FilterDropdown";
import { SecondaryButton } from "../../../Common/Button";
import { PlusIcon } from "../../../icon/PlusIcon";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useDebounce } from "../../../Hooks/useDebounce";
import AreYouSureModel from "../../../modals/AreYouSureModel";
import UpdateQuantityModal from "../../../modals/UpdateQuantityModal";
import { useNavigate } from "react-router-dom";
import Icons from "../../../components/Icons";

const ProductsAdminPanel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pageSize = 10;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/product/getAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data?.data) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filterByTab = useCallback(
    (data) => {
      switch (activeTab) {
        case "Out Of Stock":
          return data.filter((product) => product.stockQuantity === 0);
        case "Best Selling":
          return data.filter((product) => product.topRated === true);
        default:
          return data;
      }
    },
    [activeTab]
  );

  const filterBySearch = useCallback(
    (data) => {
      if (!debouncedSearchQuery.trim()) return data;

      const query = debouncedSearchQuery.toLowerCase();

      if (filterType !== "all") {
        const fieldMap = {
          name: (p) => p.name?.toLowerCase().includes(query),
          productId: (p) => String(p.productId)?.includes(query),
          price: (p) => String(p.price)?.includes(query),
          categoryName: (p) =>
            p.categoryName?.toLowerCase().includes(query) || false,
        };
        return data.filter(fieldMap[filterType] || (() => false));
      }

      return data.filter((product) => {
        return (
          product.name?.toLowerCase().includes(query) ||
          String(product.productId)?.includes(query) ||
          String(product.price)?.includes(query) ||
          (product.categoryName &&
            product.categoryName.toLowerCase().includes(query))
        );
      });
    },
    [debouncedSearchQuery, filterType]
  );

  const filteredData = useMemo(() => {
    let result = filterByTab(products);
    result = filterBySearch(result);
    return result;
  }, [products, filterByTab, filterBySearch]);

  const paginatedData = useMemo(() => {
    if (filteredData.length === 0) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages =
    filteredData.length > 0 ? Math.ceil(filteredData.length / pageSize) : 0;

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
    setSelectedRows([]);
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setFilterType(filter);
    setCurrentPage(1);
  }, []);

  const handleSelectionChange = useCallback((selected) => setSelectedRows(selected), []);

  const getRowId = useCallback((item) => item.productId, []);

  const handleDeleteProducts = useCallback(() => {
    if (selectedRows.length === 0) return;
    setShowDeleteModal(true);
  }, [selectedRows]);

  const confirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await Promise.all(
        selectedRows.map((productId) =>
          axios.delete(`${BASE_URL}/api/product/delete/${productId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        )
      );
      await fetchProducts();
      setSelectedRows([]);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting products:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [selectedRows, fetchProducts]);

  const handleAddStock = useCallback(() => {
    if (selectedRows.length === 0) return;
    setShowQuantityModal(true);
  }, [selectedRows]);

  const handleSaveQuantities = useCallback(
    async (updates) => {
      try {
        await Promise.all(
          updates.map((update) =>
            axios.put(
              `${BASE_URL}/api/product/updateStock`,
              {
                productId: update.productId,
                stockQuantity: update.newTotal,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
          )
        );
        await fetchProducts();
        setSelectedRows([]);
      } catch (error) {
        console.error("Error updating stock:", error);
        throw error;
      }
    },
    [fetchProducts]
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Name",
        render: (value, item) => {
          const imageUrl = item.imageUrls?.[0] || "/assets/product.png";
          return (
            <div className="flex items-center gap-2">
              <img
                src={imageUrl}
                alt={value || "Product"}
                className="w-9 h-9 rounded object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = "/assets/product.png";
                }}
              />
              <span className="font-semibold">{value || "-"}</span>
            </div>
          );
        },
      },
      {
        key: "productId",
        label: "Product ID",
        render: (value) => value || "-",
      },
      {
        key: "categoryName",
        label: "Category",
        render: (value) => value || "-",
      },
      {
        key: "stockQuantity",
        label: "Stock",
        render: (value) => {
          if (value === 0) {
            return (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FDECEC] text-[#7A0202] text-xs font-medium w-fit">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {value}
              </span>
            );
          }
          return <span>{value}</span>;
        },
      },
      {
        key: "price",
        label: "Price",
        render: (value) => `$${value || "0"}`,
      },
    ],
    []
  );

  const tabs = [
    { name: "All" },
    { name: "Out Of Stock" },
    // { name: "Best Selling" },
  ];

  function handleRowClick() {
    navigate("/admin-panel/product-detail");
  }

  return (
    <div>
      <div className="bg-white rounded-2xl md:py-6 md:px-6 py-4 px-4 ">
        <MainTable
          onRowClick={() => handleRowClick()}
          columns={columns}
          data={paginatedData}
          loading={loading}
          emptyStateMessage="No products found"
          showSearch
          searchPlaceholder="Search here..."
          onSearch={handleSearch}
          searchValue={searchQuery}
          searchBarActions={
            <FilterDropdown
              selectedFilter={filterType}
              onFilterChange={handleFilterChange}
            />
          }
          searchBarRightActions={
            <div className="">
              <SecondaryButton
                title={
                  <span className="hidden md:inline">Add Product</span>
                }
                className="rounded-md px-8 py-3 font-semibold bg-[#001D58] text-[#F8F8F8]"
                icon={<Icons.Plus className="w-5 h-5" fill="white" />}
                href="/admin-panel/add-product"
              />
            </div>
          }
          showCheckboxes
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
          getRowId={getRowId}
          tabs={tabs}
          onTabChange={handleTabChange}
          activeTabIndex={tabs.findIndex((tab) => tab.name === activeTab)}
          useBackendPagination={false}
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={filteredData.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>

      {selectedRows.length > 0 && (
        <div className="fixed bottom-8 right-8 z-[70]">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 px-6 py-4 flex items-center gap-4">
            <button
              onClick={handleDeleteProducts}
              className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Delete Products
            </button>
            <button
              onClick={handleAddStock}
              className="px-6 py-2 rounded-2xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              Update Stock
            </button>
          </div>
        </div>
      )}

      <AreYouSureModel
        isLoading={isDeleting}
        title="Are You Sure?"
        desc={`You are about to delete ${selectedRows.length} product${
          selectedRows.length > 1 ? "s" : ""
        }. This action cannot be undone.`}
        handleUpdateStatus={confirmDelete}
        setIsModalOpen={setShowDeleteModal}
        isModalOpen={showDeleteModal}
      />

      <UpdateQuantityModal
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        products={products.filter((p) => selectedRows.includes(p.productId))}
        onSave={handleSaveQuantities}
      />
    </div>
  );
};

export default ProductsAdminPanel;
