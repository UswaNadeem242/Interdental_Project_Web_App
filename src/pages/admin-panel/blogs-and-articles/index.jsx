import { useState } from "react";
import { SecondaryButton } from "../../../Common/Button";
import SearchBar from "../../../Common/SearchBar";
import { tabs } from "../../../Constant";
import { PlusIcon } from "../../../icon/PlusIcon";
import BlogsCardComponent from "../../../Common/blogs-card-component";
import AddBlogModal from "../../../modals/AddBlogModal";
import { useNavigate } from "react-router-dom";

function BlogAndArticles() {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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

  return (
    <div className="p-6 bg-bgWhite rounded-xl">
      <div className="flex flex-col md:flex-row justify-between gap-2 pb-3 items-center ">
        <div className="flex-1 w-full ">
          <SearchBar
            title="Sort By"
            // onSearch={setSearchQuery}
            // onSort={setSortOrder}
            secondaryButton="hide"
            className="py-2 bg-[#F8F8F8] border-none "
          />
        </div>

        <div className="">
          <SecondaryButton
            title="Add New"
            className="rounded-md px-8 py-3 font-semibold bg-[#F8F8F8] "
            icon={<PlusIcon />}
            //   href="/admin-panel/list-product"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {/* Tabs Steppers */}
      <div className="flex md:flex-row flex-col justify-start gap-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-poppins ${
              activeTab === tab.id
                ? "bg-[#F8F8F8] text-[#434343] text-xs font-bold"
                : "text-[#434343] text-xs font-normal  border "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card Component */}
      <div className="flex flex-col md:flex-row gap-8 flex-wrap items-center w-full md:w-auto">
        {cardData.map((data, key) => (
          <div
            key={key}
            className=""
            onClick={() => navigate("/admin-panel/blogs-detail")}
          >
            <BlogsCardComponent data={data} />
          </div>
        ))}
      </div>
      {showModal && <AddBlogModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default BlogAndArticles;
