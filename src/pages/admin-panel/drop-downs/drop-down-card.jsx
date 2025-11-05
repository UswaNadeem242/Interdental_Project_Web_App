// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { PlusIcon } from "../../../icon/PlusIcon";
import { ToggleSwitch } from "./toogle-switch";
import {
  NameAddModal,
  NameAndPriceAddModal,
  SmileDesignAddModal,
} from "../../../modals/DentureAddOptionModal";
import ChevronDownIcon from "../../../icon/ChevronDownIcon";
import {
  NameAndPriceEditModal,
  NameEditModal,
} from "../../../modals/EditModals";

const materials = [
  { id: 1, name: "Ivoclar Prime Cad", price: 95.0 },
  { id: 2, name: "Argen HT", price: 45.0 },
  { id: 3, name: "Argen ST", price: 50.0 },
  { id: 4, name: "Emax", price: 95.0 },
  { id: 5, name: "Aidite", price: 85.0 },
  { id: 6, name: "Multilayer Pro", price: 75.0 },
  { id: 7, name: "PMMA", price: 35.0 },
];

const dentures = [
  { id: 1, name: "Full Denture", price: 95.0 },
  { id: 2, name: "Digital Denture", price: 45.0 },
  { id: 3, name: "Partial Denture", price: 50.0 },
];
const smartCrown = [
  { id: 1, name: "Full Contour Crown", price: 35.0 },
  { id: 2, name: "Facial Cut black", price: 50.0 },
  { id: 3, name: "Implant Screw Retained Crown", price: 45.0 },
];
const dentalLab = [
  { id: 1, name: "My Labs", price: 35.0 },
  { id: 2, name: "Ceramic Arts Dental Lab", price: 50.0 },
];
const digitalModel = [
  { id: 1, name: "Full Arch", price: 35.0 },
  { id: 2, name: "Quadrant", price: 50.0 },
];
const photogrammetryFiles = [
  { id: 1, name: "STL", price: 35.0 },
  { id: 2, name: "DICOM", price: 50.0 },
  { id: 2, name: "3Shape", price: 50.0 },
  { id: 2, name: "Exocad", price: 50.0 },
  { id: 2, name: "Blue Sky Bio", price: 50.0 },
  { id: 2, name: "Itero", price: 50.0 },
  { id: 2, name: "Ortho CAD", price: 50.0 },
];
const smileDesigns = [
  { id: 1, name: "Smile Design_1", image: "/assets/doctor/teeth1.png" },
  { id: 2, name: "Smile Design_2", image: "/assets/doctor/teeth1.png" },
  { id: 3, name: "Smile Design_3", image: "/assets/doctor/teeth1.png" },
  { id: 4, name: "Smile Design_4", image: "/assets/doctor/teeth1.png" },
  { id: 5, name: "Smile Design_5", image: "/assets/doctor/teeth1.png" },
  { id: 6, name: "Smile Design_6", image: "/assets/doctor/teeth1.png" },
  { id: 7, name: "Smile Design_7", image: "/assets/doctor/teeth1.png" },
  { id: 7, name: "Smile Design_7", image: "/assets/doctor/teeth1.png" },
  { id: 7, name: "Smile Design_7", image: "/assets/doctor/teeth1.png" },
  { id: 7, name: "Smile Design_7", image: "/assets/doctor/teeth1.png" },
];
const scannerType = [
  { id: 1, name: "3Shape", price: 35.0 },
  { id: 2, name: "Dentsply Sirona", price: 50.0 },
  { id: 2, name: "Itero", price: 50.0 },
  { id: 2, name: "Other", price: 50.0 },
];

function DropDownCard({
  title,
  data,
  showPrice,
  SmileDesignCard,
  smileData,
  setIsDentureModal,
  isDentureModal,
  onClick,
  isMaterialModal,
  setIsMaterialModal,
  isSmileDesignModal,
  setIsSmileDesignModal,
  isScannerModal,
  setIsScannerModal,
  setIsCrownModal,
  isCrownModal,
  isDigitalModalType,
  setIsDigitalModalType,
  setIsDentalLabModal,
  isDentalLabModal,
  isPhotogrammetryModal,
  setIsPhotogrammetryModal,
  setState,
  state,
}) {
  // CLOSED by default
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  //

  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-bgWhite font-[Inter]">
      {/* Header Bar */}
      <div className="flex justify-between items-center pb-4 border-gray-100">
        <h2 className="text-base font-medium text-[#0F153E] capitalize">
          {title}
        </h2>
        <div className="flex items-center space-x-4">
          {/* Add Button */}
          <button
            className="flex items-center px-6 py-3 rounded-lg gap-2 bg-[#F8F8F8]"
            onClick={onClick}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            <span className="text-[#434343] font-semibold text-sm">Add</span>
          </button>

          {/* Dropdown/Collapse Icon */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="materials-content"
            className="p-2 text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Collapsible Content Area */}
      <div
        id="materials-content"
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isExpanded ? "max-h-[5000px] pt-6" : "max-h-0 pt-0"
        }`}
        style={!isExpanded ? { paddingTop: 0 } : {}}
      >
        <div className="flex gap-6 flex-wrap">
          {data &&
            data.map((d, key) => (
              <ToggleSwitch
                key={key}
                label={d.name}
                initialState={true}
                price={d.price}
                showPrice={showPrice}
                // onClick={() => setOpen(true)}
                setOpen={setOpen}
              />
            ))}

          {smileData &&
            smileData.map((d, key) => (
              <SmileDesignCard key={key} label={d.name} image={d.image} />
            ))}
        </div>

        {/* Modals */}
        {isDentureModal && (
          <NameAddModal
            onClose={() => setIsDentureModal(false)}
            title="Add Option for Denture"
          />
        )}
        {isMaterialModal && (
          <NameAndPriceAddModal
            onClose={() => setIsMaterialModal(false)}
            title="Add Option for Material"
          />
        )}
        {isSmileDesignModal && (
          <SmileDesignAddModal
            onClose={() => setIsSmileDesignModal(false)}
            title="Add Option for Smile Design"
          />
        )}
        {isScannerModal && (
          <NameAddModal
            onClose={() => setIsScannerModal(false)}
            title="Add Scanner Type for Smile Design"
          />
        )}
        {isCrownModal && (
          <NameAndPriceAddModal
            onClose={() => setIsCrownModal(false)}
            title="Add Option for Smart Crown"
          />
        )}
        {isDigitalModalType && (
          <NameAndPriceAddModal
            onClose={() => setIsDigitalModalType(false)}
            title="Add Option for Digital Model"
          />
        )}
        {isDentalLabModal && (
          <NameAndPriceAddModal
            onClose={() => setIsDentalLabModal(false)}
            title="Add Option for Dental Lab Alliance"
          />
        )}
        {isPhotogrammetryModal && (
          <NameAddModal
            onClose={() => setIsPhotogrammetryModal(false)}
            title="Add Option for Photogrammetry Files"
          />
        )}
        {state && (
          <NameEditModal onClose={() => setState(false)} title="Edit " />
        )}
        {open && (
          <NameAndPriceEditModal
            onClose={() => setOpen(false)}
            title="Edit Option "
          />
        )}
      </div>
    </div>
  );
}

export default DropDownCard;
