import { DashboardIcon } from "../icon/dashboard";
import { OrderIcon } from "../icon/OrderIcon";
import { PatienIcon } from "../icon/PatienIcon";
import { ClaimIcon } from "../icon/claimIcon";

export const MATERIAL_OPTIONS = [
    { value: "ivoclar", label: "Ivovlar Prime Cad", price: 95 },
    { value: "argen-ht", label: "Argen HT", price: 45 },
    { value: "argen-st", label: "Argen ST", price: 50 },
    { value: "emax", label: "Emax", price: 95 },
    { value: "aidite", label: "Aidite", price: 85 },
    { value: "pmma", label: "PMMA", price: 35 },
    { value: "multilayer", label: "Multilayer Pro", price: 75 },
];

export const LAB_OPTIONS = [
    { value: "in-house", label: "In-House" },
    { value: "partner", label: "Partner Lab" },
    { value: "argen", label: "Argen" },
    { value: "modern", label: "Modern Dental" },
];

export const DIGITAL_DENTURE = [
    { value: "crown", label: "Crown" },
    { value: "bridge", label: "Bridge" },
    { value: "full_denture", label: "Full Denture" },
    { value: "partial_denture", label: "Partial Denture" },
];

export const SURGICAL_GUIDE = [
    { value: "single_implant_guide", label: "Single Implant Guide" },
    { value: "multiple_implant_guide", label: "Multiple Implant Guide" },
    { value: "full_arch", label: "Full Arch Surgical Guide" },
    { value: "partial_denture", label: "Partial Denture" },
];

export const PHOTOGRAMMETRY_FILES = [
    { value: "STL", label: "STL" },
    { value: "DICOM", label: "DICOM" },
    { value: "3Shape", label: "3Shape" },
    { value: "Exocad", label: "Exocad" },
    { value: "Blue_Sky_Bio", label: "Blue Sky Bio" },
    { value: "Itero", label: "Itero" },
    { value: "OrthoCAD", label: "OrthoCAD" },
];

export const SCANNER_TYPE = [
    { value: "3shap", label: "3Shape" },
    { value: "dentsply_sirona", label: "Dentsply Sirona" },
    { value: "itero", label: "Itero" },
    { value: "other", label: "Other" }
];

export const menuItems = [
    { name: "Dashboard", path: "/doctorAdmin/doctordashboard", icon: DashboardIcon },
    { name: "Orders", path: "/doctorAdmin/orders", icon: OrderIcon },
    { name: "Patient", path: "/doctorAdmin/patientDoctor", icon: PatienIcon },
    { name: "Doctor", path: "/doctorAdmin/doctor", icon: ClaimIcon },

];