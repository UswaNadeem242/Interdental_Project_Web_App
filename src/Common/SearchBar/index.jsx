// import { useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { SecondaryButton } from "../Button";
// import FilterIcon from "../../icon/FilterIcon";

// export default function SearchBar({
//   onSearch,
//   onSort,
//   placeholder = "Search...",
//   title,
// }) {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     if (onSearch) onSearch(value); // live search
//   };

//   const handleSort = (order) => {
//     setIsOpen(false);
//     if (onSort) onSort(order); // 🚀 send "asc" | "desc" to parent
//   };
//   return (
//     <div className="flex items-center gap-3 w-full border  bg-[#F8F8F8] rounded-md shadow-sm px-3 py-1">
//       {/* Search Icon */}
//       <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

//       {/* Input Field */}
//       <input
//         type="text"
//         value={query}
//         onChange={handleSearch}
//         placeholder={placeholder}
//         className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-[#F8F8F8]"
//       />

//       {/* Sort Button */}
//       {/* <SecondaryButton
//                 title={title}
//                 variant="outline"
//                 size="sm"
//                 onClick={onSort}
//                 className="rounded-md px-2 py-2 bg-white text-[#344054] flex gap-2"
//                 icon={<FilterIcon className="w-4 h-4" />}
//             >
//                 {title}

//             </SecondaryButton> */}

//       {/* Input Field */}

//       {/* Sort Dropdown */}
//       <div className="relative">
//         <SecondaryButton
//           title={title}
//           variant="outline"
//           size="sm"
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="rounded-md px-2 py-2 bg-white text-[#344054] flex gap-2"
//           icon={<FilterIcon className="w-4 h-4" />}
//         >
//           {title}
//         </SecondaryButton>

//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-20">
//             <button
//               onClick={() => handleSort("asc")}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Ascending
//             </button>
//             <button
//               onClick={() => handleSort("desc")}
//               className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Descending
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SecondaryButton } from "../Button";
import FilterIcon from "../../icon/FilterIcon";

export default function SearchBar({
  onSearch,
  onSort,
  placeholder = "Search here...",
  title,
  secondaryButton,
  className,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Trigger search immediately from first character
    if (onSearch) {
      onSearch(value.trim().toLowerCase());
    }
  };
 
  const handleSort = (order) => {
    setIsOpen(false);
    if (onSort) onSort(order); // 🚀 send "asc" | "desc" to parent
  };
  return (
    <div
      className={`flex items-center gap-3 w-full border  bg-background rounded-md shadow-sm px-3 py-1 ${className}`}
    >
      {/* Search Icon */}
      <MagnifyingGlassIcon className="w-5 h-5 text-primaryText" />

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || 'Search here ...'}
        className="flex-1 outline-none text-sm text-primaryText placeholder-primaryText bg-background"
      />
      {/* Sort Dropdown */}

      <div className="relative">
        {secondaryButton !== "hide" && (
          <SecondaryButton
            title={title}
            variant="outline"
            size="sm"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-md px-2 py-2 bg-white text-[#344054] flex gap-2"
            icon={<FilterIcon className="w-4 h-4" />}
          >
            {title}
          </SecondaryButton>
        )}

        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-20">
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
  );
}
