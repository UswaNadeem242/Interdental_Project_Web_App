import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SecondaryButton } from "../Button";
import FilterIcon from "../../icon/FilterIcon";

/**
 * SearchBar Component
 *
 * A reusable search bar with optional filter dropdown or sort button
 *
 * @param {function} onSearch - Callback when search value changes
 * @param {function} onSort - Callback when sort order changes (asc/desc)
 * @param {string} placeholder - Input placeholder text
 * @param {string} title - Sort button title
 * @param {string} secondaryButton - Show/hide sort button ("hide" to hide)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} filterDropdown - Custom filter dropdown component
 */
export default function SearchBar({
  onSearch,
  onSort,
  placeholder = "Search here...",
  title,
  secondaryButton,
  className = "",
  filterDropdown,
}) {
  const [query, setQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value.trim().toLowerCase());
    }
  };

  const handleSort = (order) => {
    setIsSortOpen(false);
    if (onSort) {
      onSort(order);
    }
  };

  const hasRightAction = filterDropdown || secondaryButton !== "hide";

  return (
    <div
      className={`relative flex items-center gap-3 w-full border bg-background rounded-md shadow-sm px-3 py-3 ${className}`}
    >
      <MagnifyingGlassIcon className="w-5 h-5 text-primaryText" />

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className={`flex-1 outline-none text-sm font-poppins text-primaryText placeholder-primaryText bg-background ${
          hasRightAction ? "pr-28" : ""
        }`}
      />

      {/* Filter Dropdown (Products page) */}
      {filterDropdown && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-50">
          {filterDropdown}
        </div>
      )}

      {/* Sort Dropdown (Doctors page) */}
      {secondaryButton !== "hide" && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <SecondaryButton
              title={title}
              variant="outline"
              size="sm"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="rounded-md px-2 py-2 bg-white text-[#344054] flex gap-2 h-[36px]"
              icon={<FilterIcon className="w-4 h-4" />}
            >
              {title}
            </SecondaryButton>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-[100]">
                <button
                  onClick={() => handleSort("asc")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ascending
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Descending
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
