import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { useCallback } from "react";
import Icons from "../../components/Icons";

const filterOptions = [
  { value: "all", label: "Category" },
  { value: "categoryName", label: "Category name" },
  { value: "name", label: "Product name" },
  { value: "productId", label: "Product Id" },
  { value: "price", label: "Price" },
];

export default function FilterDropdown({ selectedFilter, onFilterChange }) {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset(4),
      flip({
        fallbackPlacements: ["top-end", "bottom-start", "top-start"],
      }),
      shift({
        padding: 8,
      }),
    ],
  });

  const setReferenceRef = useCallback((node) => {
    refs.setReference(node);
  }, []);

  const selectedLabel = filterOptions.find(
    (opt) => opt.value === selectedFilter
  )?.label || filterOptions[0].label;

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <MenuButton
        ref={setReferenceRef}
        className="flex items-center gap-2 px-4 py-2 bg-[#F8F8F8] rounded-md hover:bg-gray-200 transition-colors relative z-50 h-[36px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Icons.Filter className="w-5 h-5" stroke="#434343" />
        <span className="text-sm font-medium text-gray-700">{selectedLabel}</span>
      </MenuButton>

      <MenuItems
        ref={refs.setFloating}
        style={floatingStyles}
        className="min-w-48 rounded-md bg-white border border-gray-200 shadow-lg z-[100] focus:outline-none mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-1">
          {filterOptions.map((option) => (
            <MenuItem key={option.value}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => onFilterChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm font-poppins flex items-center justify-between ${
                    active ? "bg-gray-50" : ""
                  } ${
                    selectedFilter === option.value
                      ? "text-[#001D58] font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <span>{option.label}</span>
                  {selectedFilter === option.value && (
                    <div className="w-4 h-4 rounded-full bg-[#001D58] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                  {selectedFilter !== option.value && (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  )}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

