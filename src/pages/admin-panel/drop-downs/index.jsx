import React, { useState } from "react";
import DropDownCard from "./drop-down-card";
import SmileDesignCard from "./smile-design-card";

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
function DropDownAdminPanel() {
  const [isDentureModal, setIsDentureModal] = useState(false);
  const [isMaterialModal, setIsMaterialModal] = useState(false);
  const [isSmileDesignModal, setIsSmileDesignModal] = useState(false);
  const [isScannerModal, setIsScannerModal] = useState(false);
  const [isCrownModal, setIsCrownModal] = useState(false);
  const [isDigitalModalType, setIsDigitalModalType] = useState(false);
  const [isDentalLabModal, setIsDentalLabModal] = useState(false);
  const [isPhotogrammetryModal, setIsPhotogrammetryModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <DropDownCard
        title={"Scanner Type"}
        data={scannerType}
        showPrice={"hidden"}
        isScannerModal={isScannerModal}
        setIsScannerModal={setIsScannerModal}
        onClick={() => setIsScannerModal(true)}
      />
      <DropDownCard
        title={"materials"}
        data={materials}
        isMaterialModal={isMaterialModal}
        setIsMaterialModal={setIsMaterialModal}
        onClick={() => setIsMaterialModal(true)}
      />
      <DropDownCard
        title={"smart crown"}
        data={smartCrown}
        isCrownModal={isCrownModal}
        setIsCrownModal={setIsCrownModal}
        onClick={() => setIsCrownModal(true)}
      />
      <DropDownCard
        title={"Smile Design"}
        SmileDesignCard={SmileDesignCard}
        smileData={smileDesigns}
        isSmileDesignModal={isSmileDesignModal}
        setIsSmileDesignModal={setIsSmileDesignModal}
        onClick={() => setIsSmileDesignModal(true)}
      />
      <DropDownCard
        title={"Digital Model Type"}
        data={digitalModel}
        isDigitalModalType={isDigitalModalType}
        setIsDigitalModalType={setIsDigitalModalType}
        onClick={() => setIsDigitalModalType(true)}
      />
      <DropDownCard
        title={"Denture"}
        data={dentures}
        showPrice={"hidden"}
        isDentureModal={isDentureModal}
        setIsDentureModal={setIsDentureModal}
        onClick={() => setIsDentureModal(true)}
      />

      <DropDownCard
        title={"Dental Lab Alliance"}
        data={dentalLab}
        isDentalLabModal={isDentalLabModal}
        setIsDentalLabModal={setIsDentalLabModal}
        onClick={() => setIsDentalLabModal(true)}
      />
      <DropDownCard
        title={"Photogrammetry Files"}
        data={photogrammetryFiles}
        showPrice={"hidden"}
        isPhotogrammetryModal={isPhotogrammetryModal}
        setIsPhotogrammetryModal={setIsPhotogrammetryModal}
        onClick={() => setIsPhotogrammetryModal(true)}
      />
    </div>
  );
}

export default DropDownAdminPanel;
