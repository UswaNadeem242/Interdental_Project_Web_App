import React, { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import DropDownCard from "./DropDownCard";
import AddDropDownSidebar from "./AddDropDownSidebar";
import EditDropDownSidebar from "./EditDropDownSidebar";
import SmileDesignCard from "./SmileDesignCard";

// ✅ Move static data outside (best practice)
const dropdownsData = [
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
    title: "Materials",
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
    title: "Smart Crown",
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
    ],
    modalType: "name",
    editModalType: "name",
  },
];

function DropDownAdminPanel() {
  const [modals, setModals] = useState({});
  const [editModals, setEditModals] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);

  // ✅ Fixed dependency
  const filteredDropdowns = useMemo(() => {
    if (!searchQuery.trim()) return dropdownsData;
    return dropdownsData.filter((dropdown) =>
      dropdown.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleOpenAddModal = (id) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  };

  const handleCloseAddModal = (id) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  };

  const handleOpenEditModal = (id) => {
    setEditModals((prev) => ({ ...prev, [id]: true }));
  };

  const handleCloseEditModal = (id) => {
    setEditModals((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar */}
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
          <span>Add New DropDown</span>
        </button>
      </div>

      {/* Dropdown Cards */}
      {filteredDropdowns.map((dropdown) => (
        <DropDownCard
          key={dropdown.id}
          id={dropdown.id}
          title={dropdown.title}
          type={dropdown.type}
          data={dropdown.data}
          showPrice={dropdown.showPrice}
          smileData={dropdown.smileData}
          shadesData={dropdown.shadesData}
          SmileDesignCard={SmileDesignCard}
          setIsEditSidebarOpen={setIsEditSidebarOpen}
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

      {/* Sidebars */}
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