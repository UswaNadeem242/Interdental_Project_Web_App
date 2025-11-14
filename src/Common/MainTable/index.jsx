import React, { useState, useCallback, useMemo } from "react";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import TabsStepper from "../TabsStepper";
import OptionsDots from "../../icon/options-dots";
import { ActionMenuDropdown } from "../DropDown/base-dropdown";
import CustomCheckbox from "../CustomCheckbox";

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
 * @param {ReactNode} props.searchBarActions - Filter dropdown to render inside search bar
 * @param {ReactNode} props.searchBarRightActions - Components to render alongside search bar (e.g., buttons)
 *
 * @param {boolean} props.showCheckboxes - Show checkbox column
 * @param {Array} props.selectedRows - Array of selected row IDs/indices
 * @param {function(selectedRows)} props.onSelectionChange - Handler for selection changes
 * @param {function(item)} props.getRowId - Function to get unique ID for each row (defaults to index)
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
  searchBarActions,
  searchBarRightActions,

  // Sort props
  showSort = false,
  sortLabel = "Sort By",
  onSort,
  sortOrder,

  // Checkbox props
  showCheckboxes = false,
  selectedRows = [],
  onSelectionChange,
  getRowId,

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

  const handleSearch = useCallback(
    (value) => {
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  const getNestedValue = useCallback((obj, path) => {
    if (!path) return undefined;
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }, []);

  const renderCellContent = useCallback(
    (column, item, index) => {
      const value = getNestedValue(item, column.key);

      if (column.render) {
        return column.render(value, item, index);
      }

      if (value === null || value === undefined) return "-";
      if (typeof value === "boolean") return value ? "Yes" : "No";
      if (typeof value === "number") return value.toLocaleString();
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value);

      return String(value);
    },
    [getNestedValue]
  );

  const getAlignmentClass = useCallback((align) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  }, []);

  const getResponsiveColumnClass = useCallback((column) => {
    const classes = [];
    if (column.hideOnMobile) classes.push("hidden sm:table-cell");
    if (column.hideOnTablet) classes.push("hidden md:table-cell");
    return classes.join(" ");
  }, []);

  const displayData = useMemo(() => {
    if (useBackendPagination) {
      return data;
    }

    if (data.length === 0) return [];
    const startIndex = (frontendCurrentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, useBackendPagination, frontendCurrentPage, pageSize]);

  const displayCurrentPage = useBackendPagination
    ? currentPage || 1
    : frontendCurrentPage;

  const displayTotalPages = useBackendPagination
    ? totalPages || 0
    : data.length > 0
    ? Math.ceil(data.length / pageSize)
    : 0;

  const displayTotalResults = useBackendPagination
    ? totalResults || 0
    : data.length;

  const handlePageChange = useBackendPagination
    ? onPageChange || (() => {})
    : setFrontendCurrentPage;

  const handleCheckboxChange = useCallback(
    (rowId, checked) => {
      if (!onSelectionChange) return;

      const newSelection = checked
        ? [...selectedRows, rowId]
        : selectedRows.filter((id) => id !== rowId);

      onSelectionChange(newSelection);
    },
    [selectedRows, onSelectionChange]
  );

  const handleSelectAll = useCallback(
    (checked) => {
      if (!onSelectionChange) return;

      const newSelection = checked
        ? displayData.map((item, index) =>
            getRowId ? getRowId(item, index) : index
          )
        : [];

      onSelectionChange(newSelection);
    },
    [displayData, onSelectionChange, getRowId]
  );

  const isRowSelected = useCallback(
    (rowId) => {
      return selectedRows.includes(rowId);
    },
    [selectedRows]
  );

  const isAllSelected = useMemo(() => {
    if (displayData.length === 0) return false;
    return displayData.every((item, index) => {
      const rowId = getRowId ? getRowId(item, index) : index;
      return isRowSelected(rowId);
    });
  }, [displayData, selectedRows, getRowId, isRowSelected]);

  const hasColumnWidths = useMemo(() => {
    return columns.some((column) => column.width);
  }, [columns]);

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
          <table 
            className="min-w-max md:min-w-full text-left text-xs md:text-sm w-full"
            style={hasColumnWidths ? { tableLayout: "auto" } : {}}
          >
            <thead className="sticky top-0 border-b-2 z-10 bg-bgWhite">
              <tr className="font-poppins font-medium bg-bgWhite text-xs text-secondaryText capitalize">
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={`py-2 px-2 md:py-4 md:px-4   font-medium text-secondaryText whitespace-nowrap ${getAlignmentClass(
                      column.align
                    )} ${getResponsiveColumnClass(column)} ${
                      column.headerClassName || ""
                    }`}
                    style={column.width ? { 
                      width: column.width, 
                      minWidth: column.width, 
                      maxWidth: column.width,
                     
                    } : {}}
                  >
                        {showCheckboxes && idx === 0 ? (
                      <div className="flex items-center gap-2 md:gap-4">
                        <CustomCheckbox
                          checked={isAllSelected}
                          onChange={handleSelectAll}
                        />
                        <span>{column.label}</span>
                      </div>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
                {actionMenuItems.length > 0 && (
                  <th
                    className="py-2 px-2 md:py-4 md:px-4 text-center whitespace-nowrap"
                    style={{ width: "60px", minWidth: "60px" }}
                  ></th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => {
                const rowId = getRowId ? getRowId(item, index) : index;
                const isSelected = isRowSelected(rowId);

                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 transition-all font-poppins ${
                      onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                    } ${striped && index % 2 === 1 ? "bg-gray-50" : ""}`}
                    // onClick={() => onRowClick?.(item, index)}
                    // onClick={() => onRowClick()}
                  >
                    {columns.map((column, colIdx) => (
                      <td
                        key={colIdx}
                        className={`px-2 py-2 md:px-4 md:py-4 text-[#333333] text-xs whitespace-nowrap ${
                          compact ? "py-1 md:py-2" : ""
                        } ${getAlignmentClass(
                          column.align
                        )} ${getResponsiveColumnClass(column)} ${
                          column.className || ""
                        }`}
                        style={column.width ? { 
                          width: column.width, 
                          minWidth: column.width, 
                          maxWidth: column.width,
                          boxSizing: "border-box"
                        } : {}}
                      >
                        {showCheckboxes && colIdx === 0 ? (
                          <div className="flex items-center gap-2 md:gap-4">
                            <CustomCheckbox
                              checked={isSelected}
                              onChange={(checked) =>
                                handleCheckboxChange(rowId, checked)
                              }
                            />
                            {renderCellContent(column, item, index)}
                          </div>
                        ) : (
                          renderCellContent(column, item, index)
                        )}
                      </td>
                    ))}

                    {/* Action Menu */}
                    {actionMenuItems.length > 0 && (
                      <td className="px-2 py-1 md:px-6 lg:px-8 md:py-2 text-right relative whitespace-nowrap">
                        <ActionMenuDropdown
                          actionMenuItems={actionMenuItems}
                          rowData={item}
                          triggerButton={
                            <button
                              type="button"
                              className="p-2 hover:bg-gray-100 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <OptionsDots />
                            </button>
                          }
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {displayData.length > 0 && !loading && displayTotalPages > 1 && (
        <Pagination
          currentPage={displayCurrentPage}
          totalPages={displayTotalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );

  const renderSearchBar = () => {
    if (!showSearch) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              title={showSort ? sortLabel : undefined}
              onSearch={handleSearch}
              onSort={showSort ? onSort : undefined}
              placeholder={searchPlaceholder}
              className={searchClassName}
              secondaryButton={showSort ? undefined : "hide"}
              filterDropdown={searchBarActions}
            />
          </div>
          {searchBarRightActions && (
            <div className="flex items-center">{searchBarRightActions}</div>
          )}
        </div>
      </div>
    );
  };

  if (tabs.length > 0) {
    const tabSteps = tabs.map((tab) => ({
      name: tab.name,
      content: tab.content || tableContent,
    }));

    const handleTabIndexChange = (index) => {
      if (onTabChange && tabs[index]) {
        onTabChange(tabs[index].name);
      }
    };

    return (
      <div className={className}>
        {renderSearchBar()}
        <TabsStepper
          steps={tabSteps}
          selectedIndex={
            controlledActiveTabIndex !== undefined
              ? controlledActiveTabIndex
              : 0
          }
          onTabChange={handleTabIndexChange}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {renderSearchBar()}
      {tableContent}
    </div>
  );
}
