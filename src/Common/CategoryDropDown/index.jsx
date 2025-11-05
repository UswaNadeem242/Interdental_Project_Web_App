// import { useState } from "react";

// export default function CategoryDropdown({ onSelect, selected, className }) {
//   const [categories, setCategories] = useState([
//     "Dental",
//     "Health",
//     "Teeth Treatment",
//     "Facecare",
//   ]);
//   const [newCategory, setNewCategory] = useState("");

//   const handleAddCategory = () => {
//     if (newCategory.trim() !== "") {
//       setCategories([...categories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   return (
//     <div
//       className={`absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg p-3 border ${className}`}
//     >
//       {/* Add Category */}
//       <div className="flex items-center mb-3 border rounded-lg px-2 py-1">
//         <input
//           type="text"
//           placeholder="Category name"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           className="flex-1 outline-none text-sm text-gray-600"
//         />
//         <button
//           onClick={handleAddCategory}
//           className="bg-[#0A2342] text-white text-sm px-4 py-1 rounded-full"
//         >
//           Add
//         </button>
//       </div>

//       {/* Category List */}
//       <ul className="space-y-2">
//         {categories.map((cat) => (
//           <li
//             key={cat}
//             onClick={() => onSelect(cat)}
//             className="flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-2"
//           >
//             <span>{cat}</span>
//             <input
//               type="radio"
//               name="category"
//               checked={selected === cat}
//               onChange={() => onSelect(cat)}
//               className="form-radio text-blue-600"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

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

  // ✅ Close on outside click
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
      className={`absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg p-3 border ${className}`}
    >
      {/* Add Category */}
      <div className="flex items-center mb-3 border-2 rounded-lg px-2 py-2">
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-600 font-poppins"
        />
        <button
          onClick={handleAddCategory}
          className="bg-[#001D58] text-[#F8F8F8] text-sm font-poppins font-medium px-5 py-2 rounded-full"
        >
          Add
        </button>
      </div>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex items-center justify-between text-gray-700 cursor-pointer hover:bg-gray-50  px-2 py-2 border-b pb-3"
          >
            <span className="font-poppins text-[#828386] text-sm  font-normal">
              {cat}
            </span>
            <input
              type="radio"
              name="category"
              checked={selected === cat}
              onChange={() => onSelect(cat)}
              className="form-radio text-blue-600 scale-125 "
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
