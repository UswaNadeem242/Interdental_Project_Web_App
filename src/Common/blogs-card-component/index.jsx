// import React, { useState } from "react";

// import OptionsDots from "../../icon/options-dots";

// const BlogsCardComponent = ({ data }) => {
//   const defaultData = {
//     imageSrc:
//       "https://images.unsplash.com/photo-1576091160399-112ba8d25d02?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     category: "HEALTH NEWS",
//     title: "Understanding Modern Medical Advances",
//     link: "#",
//   };

//   const cardData = data || defaultData;
//   const { imageSrc, category, title, link } = cardData;

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleOptionsClick = (e) => {
//     e.stopPropagation(); // Prevent card click when opening options
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Function to simulate a card click
//   const handleCardClick = () => {
//     console.log(`Navigating to: ${link}`);
//   };

//   return (
//     <div className="flex justify-start  ">
//       {/* Card Container */}
//       <div
//         className=" bg-bgWhite  cursor-pointer overflow-hidden"
//         onClick={handleCardClick}
//       >
//         {/* Image Wrapper - KEY for floating button */}
//         <div className="relative">
//           {/* Image */}
//           <img
//             src={imageSrc}
//             alt={title}
//             className="w-[280px] max-h-[230px] object-cover transition-opacity duration-300 group-hover:opacity-90"
//             // Simple image error fallback to ensure component stability
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://placehold.co/600x400/fecaca/991b1b?text=Image+Load+Error";
//             }}
//           />

//           {/* Floating Three-Dot Button (Options) */}
//           <div className="absolute top-3 right-3 z-10">
//             <button
//               onClick={handleOptionsClick}
//               aria-label="Options"
//               className=""
//             >
//               <OptionsDots size={20} />
//             </button>

//             {/* Options Dropdown */}
//             {isMenuOpen && (
//               <div
//                 className="absolute right-0 top-8 mt-2 w-36 font-poppins bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-20"
//                 onClick={(e) => e.stopPropagation()} // Stop propagation to keep menu open
//               >
//                 <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
//                   Edit
//                 </button>
//                 <hr></hr>
//                 <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Text Content Area */}
//         <div className="ml-1 mt-8">
//           {/* Category */}
//           <p className="text-base font-medium tracking-wider uppercase text-[#94D3DD] mt-1 mb-1 font-poppins">
//             {category}
//           </p>

//           {/* Title */}
//           <h2 className="text-sm font-normal text-[#434343]  mt-8 font-poppins max-w-64 text-left">
//             {title}
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogsCardComponent;

import React, { useState, useEffect, useRef } from "react";
import OptionsDots from "../../icon/options-dots";

const BlogsCardComponent = ({ data }) => {
  const defaultData = {
    imageSrc:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d02?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "HEALTH NEWS",
    title: "Understanding Modern Medical Advances",
    link: "#",
  };

  const cardData = data || defaultData;
  const { imageSrc, category, title, link } = cardData;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); //  reference for detecting outside clicks

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleCardClick = () => {
    console.log(`Navigating to: ${link}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-start">
      <div
        className="bg-bgWhite cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-[280px] max-h-[230px] object-cover transition-opacity duration-300 group-hover:opacity-90"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/fecaca/991b1b?text=Image+Load+Error";
            }}
          />

          {/* Dropdown and button container */}
          <div className="absolute top-3 right-3 z-10" ref={menuRef}>
            <button onClick={handleOptionsClick} aria-label="Options">
              <OptionsDots size={20} />
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 top-8 mt-2 w-36 font-poppins bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
                  Edit
                </button>
                <hr />
                <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="ml-1 mt-8">
          <p className="text-base font-medium tracking-wider uppercase text-[#94D3DD] mt-1 mb-1 font-poppins">
            {category}
          </p>
          <h2 className="text-sm font-normal text-[#434343] mt-8 font-poppins max-w-64 text-left">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BlogsCardComponent;
