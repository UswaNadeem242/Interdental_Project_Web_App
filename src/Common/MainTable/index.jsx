import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import TabsStepper from "../TabsStepper";
import OptionsDots from "../../icon/options-dots";
import { ActionMenuDropdown } from "../DropDown/base-dropdown";

/**
 * TableColumn definition
 * @typedef {Object} TableColumn
 * @property {string} key - The data key to access
 * @property {string} label - Column header label
 * @property {function(value, item, index)} render - Custom render function (optional)
 * @property {string} className - Custom cell className
 * @property {string} headerClassName - Custom header className
 * @property {string} width - Column width (e.g., "150px", "20%")
 * @property {"left"|"center"|"right"} align - Text alignment
 * @property {boolean} hideOnMobile - Hide on mobile screens
 * @property {boolean} hideOnTablet - Hide on tablet screens
 */

/**
 * ActionMenuItem definition
 * @typedef {Object} ActionMenuItem
 * @property {string|function(item)} label - Menu item label (can be function for dynamic labels)
 * @property {function(item)} onClick - Click handler
 * @property {boolean|function(item)} disabled - Whether item is disabled (can be function for dynamic disabling)
 * @property {"default"|"destructive"|function(item)} variant - Visual variant (can be function for dynamic variant)
 * @property {ReactNode|function(item)} icon - Optional icon (can be function for dynamic icons)
 * @property {string|function(item)} textColor - Custom text color class (e.g., "text-green-600", "text-[#1E7C79]")
 * @property {string|function(item)} iconColor - Custom icon color class (defaults to textColor if not specified)
 */

/**
 * Tab definition for tabs integration
 * @typedef {Object} Tab
 * @property {string} name - Tab name
 * @property {ReactNode} content - Tab content (usually the table, optional)
 */

/**
 * MainTable - Professional, reusable table component
 * 
 * @param {Object} props
 * @param {Array} props.data - Table data array
 * @param {TableColumn[]} props.columns - Column definitions
 * @param {ActionMenuItem[]} props.actionMenuItems - Action menu items (optional)
 * @param {function(item, index)} props.onRowClick - Row click handler (optional)
 * @param {boolean} props.loading - Loading state
 * @param {string} props.emptyStateMessage - Empty state message
 * @param {boolean} props.striped - Striped rows
 * @param {boolean} props.compact - Compact mode
 * @param {string} props.className - Additional className
 * 
 * @param {boolean} props.showSearch - Show search bar
 * @param {string} props.searchPlaceholder - Search placeholder
 * @param {function(value)} props.onSearch - Search handler
 * @param {string} props.searchValue - Controlled search value
 * 
 * @param {boolean} props.showSort - Show sort button
 * @param {string} props.sortLabel - Sort button label
 * @param {function(order)} props.onSort - Sort handler
 * @param {string} props.sortOrder - Current sort order ("asc"|"desc")
 * 
 * @param {Tab[]} props.tabs - Tabs configuration (optional)
 * @param {function(tabName)} props.onTabChange - Tab change handler
 * @param {number} props.activeTabIndex - Active tab index
 * 
 * @param {boolean} props.useBackendPagination - Use backend pagination
 * @param {number} props.currentPage - Current page (for backend pagination)
 * @param {number} props.totalPages - Total pages (for backend pagination)
 * @param {number} props.totalResults - Total results count
 * @param {number} props.pageSize - Items per page
 * @param {function(page)} props.onPageChange - Page change handler
 */
export default function MainTable({
  data = [],
  columns = [],
  actionMenuItems = [],
  onRowClick,
  loading = false,
  emptyStateMessage = "No data available",
  striped = false,
  compact = false,
  className = "",

  // Search props
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearch,
  searchValue: controlledSearchValue,
  searchClassName,

  // Sort props
  showSort = false,
  sortLabel = "Sort By",
  onSort,
  sortOrder,

  // Tabs props
  tabs = [],
  onTabChange,
  activeTabIndex: controlledActiveTabIndex,

  // Pagination props
  useBackendPagination = false,
  currentPage = 1,
  totalPages = 0,
  totalResults = 0,
  pageSize = 10,
  onPageChange,

}) {
  const [frontendCurrentPage, setFrontendCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };

    if (openDropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdownIndex]);

  // Handle search - just pass to parent
  const handleSearch = useCallback((value) => {
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);

  // Handle tab change - just pass to parent
  const handleTabIndexChange = useCallback((index) => {
    if (onTabChange && tabs[index]) {
      onTabChange(tabs[index].name);
    }
  }, [onTabChange, tabs]);

  // Get nested value from object
  const getNestedValue = useCallback((obj, path) => {
    if (!path) return undefined;
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }, []);

  // Render cell content
  const renderCellContent = useCallback((column, item, index) => {
    const value = getNestedValue(item, column.key);

    if (column.render) {
      return column.render(value, item, index);
    }

    // Default rendering
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number") return value.toLocaleString();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);

    return String(value);
  }, [getNestedValue]);

  // Get alignment class
  const getAlignmentClass = useCallback((align) => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  }, []);

  // Get responsive column class
  const getResponsiveColumnClass = useCallback((column) => {
    const classes = [];
    if (column.hideOnMobile) classes.push("hidden sm:table-cell");
    if (column.hideOnTablet) classes.push("hidden md:table-cell");
    return classes.join(" ");
  }, []);

  // Apply frontend pagination if needed (no filtering - parent handles all filtering)
  const displayData = useMemo(() => {
    if (useBackendPagination) {
      return data; // Backend already filtered and paginated
    }
    // Frontend pagination only
    const startIndex = (frontendCurrentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, useBackendPagination, frontendCurrentPage, pageSize]);

  const displayCurrentPage = useBackendPagination 
    ? currentPage || 1 
    : frontendCurrentPage;

  const displayTotalPages = useBackendPagination 
    ? totalPages || 0 
    : Math.ceil(data.length / pageSize);

  const displayTotalResults = useBackendPagination 
    ? totalResults || 0 
    : data.length;

  const handlePageChange = useBackendPagination
    ? onPageChange || (() => {})
    : setFrontendCurrentPage;

  // Build table content
  const tableContent = (
    <div
      className={`grid col-span-1 md:col-span-1 ${
        displayData.length === 0 ? "lg:col-span-1" : "lg:col-span-12"
      }`}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondaryBrand"></div>
          <div className="text-gray-500 text-sm mt-2">Loading...</div>
        </div>
      ) : displayData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-500 text-lg font-medium mb-2">
            {emptyStateMessage}
          </div>
          <div className="text-gray-400 text-sm">
            There are no records to display at the moment.
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto min-h-[400px] max-h-[calc(100vh-350px)] scrollbar-hidden">
          <table className="min-w-[300px] md:min-w-full text-left text-xs md:text-sm">
            <thead className="sticky top-0 bg-[#F8F8F8] z-10">
              <tr className="font-poppins font-medium text-xs text-secondaryText capitalize">
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={`py-5 px-3 font-medium text-secondaryText whitespace-nowrap ${
                      getAlignmentClass(column.align)
                    } ${getResponsiveColumnClass(column)} ${column.headerClassName || ""}`}
                    style={column.width ? { width: column.width } : {}}
                  >
                    {column.label}
                  </th>
                ))}
                {actionMenuItems.length > 0 && (
                  <th className="py-5 px-3 text-center" style={{ width: "60px", minWidth: "60px" }}></th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 transition-all font-poppins ${
                    onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                  } ${striped && index % 2 === 1 ? "bg-gray-50" : ""}`}
                  onClick={() => onRowClick?.(item, index)}
                >
                  {columns.map((column, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-4 text-[#333333] text-xs ${
                        compact ? "py-2" : ""
                      } ${getAlignmentClass(column.align)} ${getResponsiveColumnClass(column)} ${column.className || ""}`}
                      style={column.width ? { width: column.width } : {}}
                    >
                      {renderCellContent(column, item, index)}
                    </td>
                  ))}
                  
                  {/* Action Menu */}
                  {actionMenuItems.length > 0 && (
                    <td className="px-4 py-2 text-right relative">
                      <div ref={openDropdownIndex === index ? dropdownRef : null} className="relative inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownIndex(openDropdownIndex === index ? null : index);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <OptionsDots />
                        </button>
                        {openDropdownIndex === index && (
                          <ActionMenuDropdown
                            actionMenuItems={actionMenuItems}
                            rowData={item}
                            onClose={() => setOpenDropdownIndex(null)}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {displayData.length > 0 && !loading && displayTotalPages > 0 && (
        <Pagination
          currentPage={displayCurrentPage}
          totalPages={displayTotalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );

  // If tabs are provided, wrap in TabsStepper
  if (tabs.length > 0) {
    const tabSteps = tabs.map((tab, idx) => ({
      name: tab.name,
      content: tab.content || tableContent,
    }));

    // Handle tab change wrapper
    const handleTabIndexChange = (index) => {
      if (onTabChange && tabs[index]) {
        onTabChange(tabs[index].name);
      }
    };

    return (
      <div className={className}>
        {showSearch && (
          <div className="mb-4">
            <SearchBar
              title={showSort ? sortLabel : undefined}
              onSearch={handleSearch}
              onSort={showSort ? onSort : undefined}
              placeholder={searchPlaceholder}
              className={searchClassName}
            />
          </div>
        )}
        <TabsStepper 
          steps={tabSteps}
          selectedIndex={controlledActiveTabIndex !== undefined ? controlledActiveTabIndex : 0}
          onTabChange={handleTabIndexChange}
        />
      </div>
    );
  }

  // Regular table without tabs
  return (
    <div className={className}>
      {showSearch && (
        <div className="mb-4">
          <SearchBar
            title={showSort ? sortLabel : undefined}
            onSearch={handleSearch}
            onSort={showSort ? onSort : undefined}
            placeholder={searchPlaceholder}
            className={searchClassName}
          />
        </div>
      )}
      {tableContent}
    </div>
  );
}