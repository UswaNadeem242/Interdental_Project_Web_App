import React, { useState, useMemo } from "react";
import DropDownCard from "./drop-down-card";
import SmileDesignCard from "./smile-design-card";
import SearchBar from "../../../Common/SearchBar";
import { PlusIcon } from "../../../icon/PlusIcon";
import AddDropDownSidebar from "./add-dropdown-sidebar";
import Icons from "../../../components/Icons";
import EditDropDownSidebar from "./edit-dropdown-sidebar";

function DropDownAdminPanel() {
  const [dropdownsData, setDropdownsData] = useState([
    {
      id: "scanner-type",
      title: "Scanner Type",
      type: "standard",
      showPrice: "hidden",
      data: [
        { id: 1, name: "3Shape", price: 35.0 },
        { id: 2, name: "Dentsply Sirona", price: 50.0 },
        { id: 3, name: "Itero", price: 50.0 },
        { id: 4, name: "Other", price: 50.0 },
      ],
      modalType: "name",
      editModalType: "name",
    },
    {
      id: "materials",
      title: "materials",
      type: "standard",
      showPrice: "",
      data: [
        { id: 1, name: "Ivoclar Prime Cad", price: 95.0 },
        { id: 2, name: "Argen HT", price: 45.0 },
        { id: 3, name: "Argen ST", price: 50.0 },
        { id: 4, name: "Emax", price: 95.0 },
        { id: 5, name: "Aidite", price: 85.0 },
        { id: 6, name: "Multilayer Pro", price: 75.0 },
        { id: 7, name: "PMMA", price: 35.0 },
      ],
      modalType: "name-price",
      editModalType: "name-price",
    },
    {
      id: "smart-crown",
      title: "smart crown",
      type: "standard",
      showPrice: "",
      data: [
        { id: 1, name: "Full Contour Crown", price: 35.0 },
        { id: 2, name: "Facial Cut black", price: 50.0 },
        { id: 3, name: "Implant Screw Retained Crown", price: 45.0 },
      ],
      modalType: "name-price",
      editModalType: "name-price",
    },
    {
      id: "smile-design",
      title: "Smile Design",
      type: "smile-design",
      showPrice: "",
      smileData: [
        { id: 1, name: "Smile Design_1", image: "/assets/doctor/teeth1.png" },
        { id: 2, name: "Smile Design_2", image: "/assets/doctor/teeth1.png" },
        { id: 3, name: "Smile Design_3", image: "/assets/doctor/teeth1.png" },
        { id: 4, name: "Smile Design_4", image: "/assets/doctor/teeth1.png" },
        { id: 5, name: "Smile Design_5", image: "/assets/doctor/teeth1.png" },
        { id: 6, name: "Smile Design_6", image: "/assets/doctor/teeth1.png" },
        { id: 7, name: "Smile Design_7", image: "/assets/doctor/teeth1.png" },
      ],
      modalType: "smile-design",
      editModalType: "smile-design",
    },
    {
      id: "digital-model",
      title: "Digital Model Type",
      type: "standard",
      showPrice: "",
      data: [
        { id: 1, name: "Full Arch", price: 35.0 },
        { id: 2, name: "Quadrant", price: 50.0 },
      ],
      modalType: "name-price",
      editModalType: "name-price",
    },
    {
      id: "denture",
      title: "Denture",
      type: "standard",
      showPrice: "hidden",
      data: [
        { id: 1, name: "Full Denture", price: 95.0 },
        { id: 2, name: "Digital Denture", price: 45.0 },
        { id: 3, name: "Partial Denture", price: 50.0 },
      ],
      modalType: "name",
      editModalType: "name",
    },
    {
      id: "dental-lab",
      title: "Dental Lab Alliance",
      type: "standard",
      showPrice: "",
      data: [
        { id: 1, name: "My Labs", price: 35.0 },
        { id: 2, name: "Ceramic Arts Dental Lab", price: 50.0 },
      ],
      modalType: "name-price",
      editModalType: "name-price",
    },
    {
      id: "photogrammetry",
      title: "Photogrammetry Files",
      type: "standard",
      showPrice: "hidden",
      data: [
        { id: 1, name: "STL", price: 35.0 },
        { id: 2, name: "DICOM", price: 50.0 },
        { id: 3, name: "3Shape", price: 50.0 },
        { id: 4, name: "Exocad", price: 50.0 },
        { id: 5, name: "Blue Sky Bio", price: 50.0 },
        { id: 6, name: "Itero", price: 50.0 },
        { id: 7, name: "Ortho CAD", price: 50.0 },
      ],
      modalType: "name",
      editModalType: "name",
    },
    {
      id: "shades",
      title: "Shades",
      type: "shades",
      showPrice: "hidden",
      shadesData: {
        vitaClassic: [
          { id: 1, name: "A1", price: 0 },
          { id: 2, name: "A2", price: 0 },
          { id: 3, name: "A3", price: 0 },
          { id: 3, name: "A3.5", price: 0 },

          { id: 4, name: "A4", price: 0 },
          { id: 5, name: "B1", price: 0 },
          { id: 6, name: "B2", price: 0 },
          { id: 7, name: "B3", price: 0 },
          { id: 8, name: "B4", price: 0 },
          { id: 9, name: "C1", price: 0 },
          { id: 10, name: "C2", price: 0 },
          { id: 11, name: "C3", price: 0 },
          { id: 12, name: "C4", price: 0 },
          { id: 13, name: "D2", price: 0 },
          { id: 14, name: "D3", price: 0 },
          { id: 15, name: "D4", price: 0 },
        ],
        vita3DMaster: [
          { id: 1, name: "1m1", price: 0 },
          { id: 2, name: "1M2", price: 0 },
          { id: 3, name: "2L1.5", price: 0 },
          { id: 4, name: "2L2.5", price: 0 },
          { id: 5, name: "2R 1.5", price: 0 },
          { id: 6, name: "2R 2.5", price: 0 },
          { id: 7, name: "2m1", price: 0 },
          { id: 8, name: "2m2", price: 0 },
          { id: 9, name: "2m3", price: 0 },
          { id: 10, name: "3L 1.5", price: 0 },
          { id: 11, name: "3L 2.5", price: 0 },
          { id: 12, name: "3R 1.5", price: 0 },
          { id: 13, name: "3R 2.5", price: 0 },
          { id: 14, name: "3l 1.5", price: 0 },
          { id: 15, name: "3L 2.5", price: 0 },
          { id: 16, name: "3M1", price: 0 },
          { id: 17, name: "3M3", price: 0 },
          { id: 18, name: "3M2", price: 0 },
          { id: 19, name: "4L 1.5", price: 0 },
          { id: 20, name: "4L 2.5", price: 0 },
          { id: 21, name: "4M1", price: 0 },
          { id: 22, name: "4M2", price: 0 },
          { id: 23, name: "4M3", price: 0 },
          { id: 24, name: "4R 1.5", price: 0 },
          { id: 25, name: "4R 2.5", price: 0 },
          { id: 26, name: "5M1", price: 0 },
          { id: 27, name: "5M2", price: 0 },
          { id: 28, name: "5M3", price: 0 },
        ],
        vita3DMasterShadesSet2: [
          { id: 1, name: "OM1", price: 0 },
          { id: 2, name: "OM2", price: 0 },
          { id: 3, name: "OM3", price: 0 },
          { id: 4, name: "0.5m1", price: 0 },
          { id: 5, name: "1m1", price: 0 },
          { id: 6, name: "1m2", price: 0 },
          { id: 7, name: "1.5m2", price: 0 },
          { id: 8, name: "2m2", price: 0 },
          { id: 9, name: "2.5m2", price: 0 },
          { id: 10, name: "3.5m2", price: 0 },
          { id: 11, name: "4m2", price: 0 },
          { id: 12, name: "4.5m2", price: 0 },
          { id: 13, name: "5m2", price: 0 },
          { id: 14, name: "5m2.5", price: 0 },
          { id: 15, name: "5m3", price: 0 },
        ],
      },
      modalType: "name",
      editModalType: "name",
    },
  ]);

  const [modals, setModals] = useState({});
  const [editModals, setEditModals] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);

  const filteredDropdowns = useMemo(() => {
    if (!searchQuery.trim()) return dropdownsData;
    return dropdownsData.filter((dropdown) =>
      dropdown.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dropdownsData, searchQuery]);

  const handleOpenAddModal = (dropdownId) => {
    setModals((prev) => ({ ...prev, [dropdownId]: true }));
  };

  const handleCloseAddModal = (dropdownId) => {
    setModals((prev) => ({ ...prev, [dropdownId]: false }));
  };

  const handleOpenEditModal = (dropdownId) => {
    setEditModals((prev) => ({ ...prev, [dropdownId]: true }));
  };

  const handleCloseEditModal = (dropdownId) => {
    setEditModals((prev) => ({ ...prev, [dropdownId]: false }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="search here..."
            secondaryButton="hide"
          />
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center px-6 py-3 rounded-lg gap-2 bg-secondaryBrand text-white font-semibold text-sm hover:bg-secondaryBrand/90 transition"
        >
          <span className="font-poppins">Add New DropDown</span>
        </button>
      </div>
      {filteredDropdowns.map((dropdown) => (
        <DropDownCard
          setIsEditSidebarOpen={setIsEditSidebarOpen}
          key={dropdown.id}
          id={dropdown.id}
          title={dropdown.title}
          type={dropdown.type}
          data={dropdown.data}
          showPrice={dropdown.showPrice}
          smileData={dropdown.smileData}
          shadesData={dropdown.shadesData}
          SmileDesignCard={SmileDesignCard}
          isModalOpen={modals[dropdown.id] || false}
          onOpenAddModal={() => handleOpenAddModal(dropdown.id)}
          onCloseAddModal={() => handleCloseAddModal(dropdown.id)}
          isEditModalOpen={editModals[dropdown.id] || false}
          onOpenEditModal={() => handleOpenEditModal(dropdown.id)}
          onCloseEditModal={() => handleCloseEditModal(dropdown.id)}
          modalType={dropdown.modalType}
          editModalType={dropdown.editModalType}
        />
      ))}
      <AddDropDownSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <EditDropDownSidebar
        isOpen={isEditSidebarOpen}
        onClose={() => setIsEditSidebarOpen(false)}
      />
    </div>
  );
}

export default DropDownAdminPanel;
