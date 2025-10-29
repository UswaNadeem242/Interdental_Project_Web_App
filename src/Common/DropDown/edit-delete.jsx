import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../../icon/deleteIcon";
import { EyeOpenIcon } from "../../icon/EyeIcon";
import PenIcon from "../../icon/PenIcon";

export const EditDeleteDropdownMenu = ({
  onEdit,
  onDelete,
  onClose,
  OnViewDetail,
}) => {
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [isPositioned, setIsPositioned] = useState(false);

  // Handle outside click detection similar to NotificationsDropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Don't close if clicking on the options button (three dots)
      const optionsButton = event.target.closest('button');
      if (optionsButton && optionsButton.querySelector('svg')) {
        // Check if it's the options dots button by looking for the svg
        return;
      }

      // Close if clicking outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener with a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleOutsideClick);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  // Calculate position on mount only
  useEffect(() => {
    const calculatePosition = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 150; // Approximate height of dropdown
        
        // Calculate space available below and above
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Position above if not enough space below AND there's more space above
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
        
        // Mark as positioned to make visible
        setIsPositioned(true);
      }
    };

    // Small delay to ensure dropdown is rendered
    const timer = setTimeout(calculatePosition, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    onEdit();
    onClose(); // ✅ close dropdown after edit click
  };

  const handleDelete = () => {
    onDelete();
    onClose(); // ✅ close dropdown after delete click
  };

  const handleViewDetail = () => {
    OnViewDetail();
    onClose(); // ✅ close dropdown after delete click
  };

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-opacity duration-150 ${
        dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
      } ${isPositioned ? "opacity-100" : "opacity-0"}`}
    >
      <ul className="py-1 text-sm text-gray-700 font-poppins">
        <li
          onClick={handleViewDetail}
          className="px-4 py-2 text-xs font-poppins capitalize font-normal hover:bg-background cursor-pointer flex items-center gap-2"
        >
          <span>
            <EyeOpenIcon />
          </span>
          <span className="whitespace-nowrap">View Details</span>
        </li>
        <li
          onClick={handleEdit}
          className="px-4 py-2 text-xs font-poppins capitalize font-normal hover:bg-background cursor-pointer flex items-center gap-4"
        >
          <span>
            <PenIcon />
          </span>{" "}
          Edit
        </li>
        <li
          onClick={handleDelete}
          className="px-4 py-2 hover:bg-background cursor-pointer text-red-500 flex items-center gap-4"
        >
          <span>
            <DeleteIcon />
          </span>
          Delete
        </li>
      </ul>
    </div>
  );
};
