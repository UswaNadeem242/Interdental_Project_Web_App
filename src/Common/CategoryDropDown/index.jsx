import { useState, useEffect, useRef } from "react";

export default function CategoryDropdown({
  onSelect,
  selected,
  className,
  onClose,
}) {
  const [categories, setCategories] = useState([
    "Dental",
    "Health",
    "Teeth Treatment",
    "Facecare",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.(); // Safely call only if provided
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-10 mt-2 bg-white rounded-xl shadow-lg p-3 border ${className}`}
    >
      {/* Add Category Row */}
      <div className="flex items-center mb-3 border-2 rounded-lg px-2 py-2 gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-600 font-poppins"
        />

        {/* Add Button */}
        <button
          onClick={handleAddCategory}
          className="bg-[#001D58] text-[#F8F8F8] text-sm font-poppins font-medium px-4 py-2 rounded-full"
        >
          Add
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent accidental outside close
            onClose?.();
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 hover:text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-2 border-b pb-3"
          >
            <span className="font-poppins text-[#828386] text-sm font-normal">
              {cat}
            </span>
            <input
              type="radio"
              name="category"
              checked={selected === cat}
              onChange={() => onSelect(cat)}
              className="form-radio text-blue-600 scale-125"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
