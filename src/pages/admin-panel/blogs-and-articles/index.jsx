// import { useState } from "react";
// import { SecondaryButton } from "../../../Common/Button";
// import SearchBar from "../../../Common/SearchBar";
// import { tabs } from "../../../Constant";
// import { PlusIcon } from "../../../icon/PlusIcon";
// import BlogsCardComponent from "../../../Common/blogs-card-component";
// import AddBlogModal from "../../../modals/AddBlogModal";
// import { useNavigate } from "react-router-dom";

// function BlogAndArticles() {
//   const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
//   const [showModal, setShowModal] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const cardData = [
//     {
//       imageSrc: "/assets/implant-retained- dentures2.png",
//       category: "PROCEDURES",
//       title: "What Are Implant-Retained Dentures?",
//       link: "/jawline-contouring-techniques",
//     },
//     {
//       imageSrc: "/assets/implant-retained-dentures.png",
//       category: "PROCEDURES",
//       title: "What Are Implant-Retained Dentures?",
//       link: "/jawline-contouring-techniques",
//     },
//     {
//       imageSrc: "/assets/implant-retained- dentures2.png",
//       category: "PROCEDURES",
//       title: "What Are Implant-Retained Dentures?",
//       link: "/jawline-contouring-techniques",
//     },
//     {
//       imageSrc: "/assets/implant-retained-dentures.png",
//       category: "PROCEDURES",
//       title: "What Are Implant-Retained Dentures?",
//       link: "/jawline-contouring-techniques",
//     },
//     {
//       imageSrc: "/assets/implant-retained-dentures.png",
//       category: "PROCEDURES",
//       title: "What Are Implant-Retained Dentures?",
//       link: "/jawline-contouring-techniques",
//     },
//   ];

//   return (
//     <div className="p-6 bg-bgWhite rounded-xl">
//       <div className="flex flex-col md:flex-row justify-between gap-2 pb-3 items-center ">
//         <div className="flex-1 w-full ">
//           <SearchBar
//             title="Sort By"
//             // onSearch={setSearchQuery}
//             // onSort={setSortOrder}
//             secondaryButton="hide"
//             className="py-2 bg-[#F8F8F8] border-none "
//           />
//         </div>

//         <div className="">
//           <SecondaryButton
//             title="Add New"
//             className="rounded-md px-8 py-3 font-semibold bg-[#F8F8F8] "
//             icon={<PlusIcon />}
//             //   href="/admin-panel/list-product"
//             onClick={() => setShowModal(true)}
//           />
//         </div>
//       </div>
//       {/* Tabs Steppers */}
//       <div className="relative flex md:flex-row flex-col justify-between gap-6 mb-6">
//         <div className="flex gap-3">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-6 py-3 rounded-full font-poppins ${
//                 activeTab === tab.id
//                   ? "bg-[#F8F8F8] text-[#434343] text-xs font-bold"
//                   : "text-[#434343] text-xs font-normal  border "
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//         <div className="absolute top-3 right-3 z-20">
//           <button
//             onClick={() => setIsMenuOpen(true)}
//             aria-label="Options"
//             className="text-xs font-normal font-poppins text-[#001D58] px-3 py-2 bg-[#94D3DD33] rounded-full"
//           >
//             Add Category
//           </button>

//           {isMenuOpen && (
//             <div
//               className="absolute right-0 top-8 mt-2 w-36 font-poppins bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
//                 Edit
//               </button>
//               <hr />
//               <button className="block px-4 py-2 text-sm text-gray-700 hover:font-semibold">
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//         {/* <button className="text-xs font-normal font-poppins text-[#001D58] px-3 py-2 bg-[#94D3DD33] rounded-full">
//           Add Category
//         </button> */}
//       </div>

//       {/* Card Component */}
//       <div className="flex flex-col md:flex-row gap-8 flex-wrap items-center w-full md:w-auto">
//         {cardData.map((data, key) => (
//           <div
//             key={key}
//             className=""
//             onClick={() => navigate("/admin-panel/blogs-detail")}
//           >
//             <BlogsCardComponent data={data} />
//           </div>
//         ))}
//       </div>
//       {showModal && <AddBlogModal onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }

// export default BlogAndArticles;

import { useEffect, useRef, useState } from "react";
import { SecondaryButton } from "../../../Common/Button";
import SearchBar from "../../../Common/SearchBar";
import { tabs } from "../../../Constant";
import { PlusIcon } from "../../../icon/PlusIcon";
import BlogsCardComponent from "../../../Common/blogs-card-component";
import AddBlogModal from "../../../modals/AddBlogModal";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "../../../Common/CategoryDropDown";
import AreYouSureModel from "../../../modals/AreYouSureModel";

function BlogAndArticles() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const [showSureModal, setShowSureModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const cardData = [
    {
      imageSrc: "/assets/implant-retained- dentures2.png",
      category: "PROCEDURES",
      title: "What Are Implant-Retained Dentures?",
      link: "/jawline-contouring-techniques",
    },
    {
      imageSrc: "/assets/implant-retained-dentures.png",
      category: "PROCEDURES",
      title: "What Are Implant-Retained Dentures?",
      link: "/jawline-contouring-techniques",
    },
    {
      imageSrc: "/assets/implant-retained- dentures2.png",
      category: "PROCEDURES",
      title: "What Are Implant-Retained Dentures?",
      link: "/jawline-contouring-techniques",
    },
    {
      imageSrc: "/assets/implant-retained-dentures.png",
      category: "PROCEDURES",
      title: "What Are Implant-Retained Dentures?",
      link: "/jawline-contouring-techniques",
    },
    {
      imageSrc: "/assets/implant-retained-dentures.png",
      category: "PROCEDURES",
      title: "What Are Implant-Retained Dentures?",
      link: "/jawline-contouring-techniques",
    },
  ];

  const handleSelect = (cat) => {
    setSelected(cat);
    setIsMenuOpen(false);
  };

  return (
    <div className="p-6 bg-bgWhite rounded-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 pb-3 items-center ">
        <div className="flex-1 w-full">
          <SearchBar
            title="Sort By"
            secondaryButton="hide"
            className="py-2 bg-[#F8F8F8] border-none"
          />
        </div>

        <SecondaryButton
          title="Add New  Blog & Articles "
          className="rounded-md px-8 py-3 text-[#F8F8F8] font-semibold bg-[#001D58]"
          // icon={<PlusIcon />}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Tabs + Add Category */}
      <div className="relative flex md:flex-row flex-col justify-between gap-6 mb-6 mt-3">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-poppins ${
                activeTab === tab.id
                  ? "bg-[#F8F8F8] text-[#434343] text-xs font-bold"
                  : "text-[#434343] text-xs font-normal border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trigger button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Options"
          className="text-xs font-normal font-poppins text-[#001D58] px-5 py-2 bg-[#94D3DD33] rounded-full"
        >
          Add Category
        </button>

        {/* Dropdown */}
        {isMenuOpen && (
          <CategoryDropdown
            className={" z-50  w-[min(20rem,90vw)] right-16 top-10"}
            onSelect={handleSelect}
            selected={selected}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 flex-wrap items-center justify-start w-full md:w-auto">
        {cardData.map((data, key) => (
          <div key={key} onClick={() => navigate("/admin-panel/blog-detail")}>
            <BlogsCardComponent
              data={data}
              setShowSureModal={setShowSureModal}
            />
          </div>
        ))}
      </div>

      {showModal && <AddBlogModal onClose={() => setShowModal(false)} />}
      {/*AreYouSure Modal */}
      {showSureModal && (
        <AreYouSureModel
          title="Are You Sure?"
          desc="You can not undo the action"
          // handleUpdateStatus={handleConfirmClose}
          setIsModalOpen={setShowSureModal}
        />
      )}
    </div>
  );
}

export default BlogAndArticles;
